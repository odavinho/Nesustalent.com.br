'use client';

import { useParams, notFound, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { getVacancyById } from "@/lib/vacancy-service";
import { applications as allApplications } from "@/lib/applications";
import { users } from "@/lib/users";
import { type Vacancy, type Application, type UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Wand2, Users, Check, Trash2, ThumbsUp, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeResumeAction } from "@/app/actions";
import { toast } from "@/hooks/use-toast";
import { RecruiterApplicationCard } from "@/components/recruitment/recruiter-application-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const fileToDataUri = (fileUrl: string) => {
    return Promise.resolve("data:application/pdf;base64,a-mock-pdf-file");
}

type TriagedCandidate = { id: string; score: number; name: string; summary: string; skills: string };

export default function VacancyApplicationsPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const vacancyId = params.id as string;
    const initialTab = searchParams.get('tab') || 'received';

    const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);
    const [applications, setApplications] = useState<Application[]>([]);
    const [candidates, setCandidates] = useState<UserProfile[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<Record<string, number>>({});
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [triagedCandidates, setTriagedCandidates] = useState<TriagedCandidate[]>([]);
    
    useEffect(() => {
        const foundVacancy = getVacancyById(vacancyId);
        setVacancy(foundVacancy); 
        
        if (foundVacancy) {
            const vacancyApps = allApplications.filter(app => app.jobPostingId === vacancyId);
            setApplications(vacancyApps);
            
            const appUserIds = vacancyApps.map(app => app.userId);
            const vacancyCandidates = users.filter(user => appUserIds.includes(user.id));
            setCandidates(vacancyCandidates);
            
            // Pre-fill analysis from previous page if available
            const analysisParam = searchParams.get('analysis');
            if(analysisParam) {
                try {
                    const decodedResults: TriagedCandidate[] = JSON.parse(decodeURIComponent(analysisParam));
                    setTriagedCandidates(decodedResults);
                } catch (e) {
                    console.error("Failed to parse analysis results from URL", e);
                }
            }

        } else if (foundVacancy === null) { 
            notFound();
        }
    }, [vacancyId, searchParams]);

    const candidatesWithScores = useMemo(() => {
        return candidates.map(c => ({
            ...c,
            score: analysisResults[c.id]
        })).sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    }, [candidates, analysisResults]);
    
    if (vacancy === undefined) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!vacancy) {
        return notFound();
    }

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setSelectedCandidates([]);
        const results: Record<string, number> = {};
        
        await Promise.all(candidates.map(async (candidate) => {
            if (!candidate.resumeUrl) {
                results[candidate.id] = 0;
                return;
            }
            try {
                const resumeDataUri = await fileToDataUri(candidate.resumeUrl);
                const analysis = await analyzeResumeAction({
                    jobDescription: vacancy.description,
                    resumeDataUri: resumeDataUri,
                });
                results[candidate.id] = analysis.candidateRanking;
            } catch (error) {
                console.error(`Error analyzing resume for ${candidate.firstName}:`, error);
                results[candidate.id] = 0;
            }
        }));

        setAnalysisResults(results);
        setIsAnalyzing(false);
        toast({
            title: "Análise Concluída",
            description: `A compatibilidade de ${candidates.length} candidatos foi calculada.`,
        });
    };

    const handleSelect = (candidateId: string, isSelected: boolean) => {
        setSelectedCandidates(prev => 
            isSelected ? [...prev, candidateId] : prev.filter(id => id !== candidateId)
        );
    };

    const handleSelectOver50 = () => {
        const over50 = Object.entries(analysisResults)
            .filter(([, score]) => score > 50)
            .map(([id]) => id);
        setSelectedCandidates(over50);
    };

     const handleBulkAction = (action: 'interesting' | 'reject') => {
        if (selectedCandidates.length === 0) {
            toast({ variant: 'destructive', title: 'Nenhum candidato selecionado.'});
            return;
        }
        toast({
            title: 'Ação Executada (Simulação)',
            description: `${selectedCandidates.length} candidatos foram processados.`
        });
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="outline" onClick={() => router.back()} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar às Minhas Vagas
            </Button>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Candidatos para: {vacancy.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                        <Users /> {applications.length} candidatura(s) recebida(s) no total.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={initialTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="received">Candidaturas Recebidas ({applications.length})</TabsTrigger>
                            <TabsTrigger value="triaged">Candidatos Triados pela IA ({triagedCandidates.length})</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="received" className="mt-6">
                            <div className="flex justify-end mb-4 gap-2">
                                {Object.keys(analysisResults).length > 0 && selectedCandidates.length === 0 && (
                                    <Button onClick={handleSelectOver50} variant="outline">
                                        <Check className="mr-2 h-4 w-4"/> Selecionar &gt;50%
                                    </Button>
                                )}
                                {selectedCandidates.length > 0 && (
                                    <>
                                       <Button size="sm" variant="outline" onClick={() => handleBulkAction('interesting')}>
                                           <ThumbsUp className="mr-2 h-4 w-4 text-green-500" /> Marcar como Interessante ({selectedCandidates.length})
                                       </Button>
                                       <Button size="sm" variant="destructive" onClick={() => handleBulkAction('reject')}>
                                           <Trash2 className="mr-2 h-4 w-4" /> Rejeitar Selecionados
                                       </Button>
                                    </>
                                )}
                                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                                    {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4"/>}
                                    {Object.keys(analysisResults).length > 0 ? 'Reanalisar' : 'Analisar com IA'}
                                </Button>
                            </div>
                            {candidates.length > 0 ? (
                                <div className="space-y-4">
                                    {candidatesWithScores.map(candidate => (
                                        <RecruiterApplicationCard 
                                            key={candidate.id}
                                            candidate={candidate}
                                            score={analysisResults[candidate.id]}
                                            isSelected={selectedCandidates.includes(candidate.id)}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                                </div>
                            ) : (
                                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">Nenhuma candidatura recebida</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Ainda não há candidatos para esta vaga.</p>
                                </div>
                            )}
                        </TabsContent>
                        
                        <TabsContent value="triaged" className="mt-6">
                             {triagedCandidates.length > 0 ? (
                                <div className="space-y-4">
                                    {triagedCandidates.map(candidate => (
                                        <Card key={candidate.id} className="transition-shadow hover:shadow-md">
                                            <CardHeader className="flex flex-row items-center gap-4">
                                                <div className="flex flex-col items-center justify-center w-24">
                                                    <p className="font-bold text-2xl text-primary">{candidate.score}%</p>
                                                    <p className="text-xs text-muted-foreground">Compat.</p>
                                                </div>
                                                <div className="flex-grow">
                                                    <CardTitle className="font-headline text-lg">{candidate.name}</CardTitle>
                                                    <CardDescription className="line-clamp-2">{candidate.summary}</CardDescription>
                                                    <p className="text-xs text-muted-foreground mt-2"><strong>Competências:</strong> {candidate.skills}</p>
                                                </div>
                                                <Button variant="outline" size="sm" disabled>Ver Detalhes</Button>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <Database className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">Nenhum candidato triado</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Use o "Analisador de Currículos" para adicionar candidatos aqui.</p>
                                    <Button asChild variant="secondary" className="mt-4">
                                        <Link href="/recruitment?tab=analyzer">
                                            <Wand2 className="mr-2 h-4 w-4"/> Ir para o Analisador
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

        </div>
    );
}
