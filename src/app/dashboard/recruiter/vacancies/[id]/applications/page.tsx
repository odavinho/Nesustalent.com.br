'use client';

import { useParams, notFound, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getVacancyById } from "@/lib/vacancy-service";
import { applications as allApplications } from "@/lib/applications";
import { users as allUsers } from "@/lib/users";
import { type Vacancy, type Application, type UserProfile, type ApplicationStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, FileDown } from "lucide-react";
import { RecruitmentPipeline } from "@/components/recruitment/recruitment-pipeline";
import { Timestamp } from "firebase/firestore";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface TriagedCandidate extends Application {
    candidate: UserProfile;
    score?: number;
}

// Extend jsPDF interface to include autoTable method
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function VacancyApplicationsPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const vacancyId = params.id as string;

    const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);
    const [applications, setApplications] = useState<TriagedCandidate[]>([]);
    
    useEffect(() => {
        const foundVacancy = getVacancyById(vacancyId);
        setVacancy(foundVacancy); 
        
        if (foundVacancy) {
            const existingApps = allApplications
                .filter(app => app.jobPostingId === vacancyId)
                .map(app => {
                    const candidate = allUsers.find(u => u.id === app.userId);
                    return { ...app, candidate };
                })
                .filter((item): item is TriagedCandidate => !!item.candidate);

            const analysisParam = searchParams.get('analysis');
            let newTriagedCandidates: TriagedCandidate[] = [];

            if (analysisParam) {
                try {
                    const triagedData = JSON.parse(decodeURIComponent(analysisParam)) as { id: string, name: string, score: number }[];
                    
                    triagedData.forEach(triagedItem => {
                        const candidateProfile = allUsers.find(u => u.firstName.toLowerCase() === triagedItem.name.split('.')[0].toLowerCase());
                        
                        if (candidateProfile) {
                            const alreadyExists = existingApps.some(app => app.userId === candidateProfile.id);
                            
                            if (!alreadyExists) {
                                newTriagedCandidates.push({
                                    id: `${candidateProfile.id}_${vacancyId}`,
                                    userId: candidateProfile.id,
                                    jobPostingId: vacancyId,
                                    applicationDate: new Date(), 
                                    status: 'Triagem', 
                                    candidate: candidateProfile,
                                    score: triagedItem.score,
                                });
                            } else {
                                const existingApp = existingApps.find(app => app.userId === candidateProfile.id);
                                if (existingApp) {
                                    existingApp.score = triagedItem.score;
                                }
                            }
                        }
                    });
                } catch(e) {
                    console.error("Failed to parse triaged candidates from URL:", e);
                }
            }

            setApplications([...existingApps, ...newTriagedCandidates]);

        } else if (foundVacancy === null) { 
            notFound();
        }
    }, [vacancyId, searchParams]);

    const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
        setApplications(prev => prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app));
    };

    const handleGenerateReport = () => {
        if (!vacancy) return;

        const doc = new jsPDF();
        const tableData = applications.map(app => [
            `${app.candidate.firstName} ${app.candidate.lastName}`,
            app.status,
            app.score !== undefined ? `${app.score}%` : 'N/A',
            app.candidate.academicTitle || 'N/A'
        ]);

        doc.setFontSize(18);
        doc.text(`Relatório de Recrutamento: ${vacancy.title}`, 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Vaga ID: ${vacancy.id}`, 14, 30);
        doc.text(`Total de Candidatos: ${applications.length}`, 14, 36);

        doc.autoTable({
            startY: 45,
            head: [['Candidato', 'Status', 'Pontuação IA', 'Habilitações']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [22, 163, 74] },
        });

        doc.save(`Relatorio_${vacancy.title.replace(/ /g, '_')}.pdf`);
    };

    if (vacancy === undefined) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!vacancy) {
        return notFound();
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar às Minhas Vagas
                    </Button>
                     <Button variant="outline" onClick={handleGenerateReport}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Gerar Relatório (PDF)
                    </Button>
                </div>
                
                <div className="mb-8">
                    <h1 className="font-headline text-3xl font-bold">Pipeline de Recrutamento</h1>
                    <p className="text-muted-foreground mt-1 text-lg">
                        <span className="font-semibold">{vacancy.title}</span> - {applications.length} candidatura(s) no total.
                    </p>
                </div>
            </div>
            
            <RecruitmentPipeline 
                applications={applications}
                onStatusChange={handleStatusChange} 
            />
        </div>
    );
}
    
