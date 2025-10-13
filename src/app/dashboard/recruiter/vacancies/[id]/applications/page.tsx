'use client';

import { useParams, notFound, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { getVacancyById } from "@/lib/vacancy-service";
import { applications as allApplications } from "@/lib/applications";
import { users as allUsers } from "@/lib/users";
import { type Vacancy, type Application, type UserProfile, type ApplicationStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecruitmentPipeline } from "@/components/recruitment/recruitment-pipeline";
import { Timestamp } from "firebase/firestore";

interface TriagedCandidate extends Application {
    candidate: UserProfile;
    score?: number;
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
            // 1. Get existing applications for the vacancy
            const vacancyApps = allApplications
                .filter(app => app.jobPostingId === vacancyId)
                .map(app => {
                    const candidate = allUsers.find(u => u.id === app.userId);
                    return { ...app, candidate };
                })
                .filter((item): item is TriagedCandidate => !!item.candidate);

            // 2. Check for new candidates from AI analysis in the URL
            const analysisParam = searchParams.get('analysis');
            let triagedCandidates: TriagedCandidate[] = [];

            if (analysisParam) {
                try {
                    const triagedData = JSON.parse(decodeURIComponent(analysisParam)) as { id: string, name: string, score: number }[];
                    
                    triagedData.forEach(triagedItem => {
                        // Find the real user profile based on the mock name from the file
                        const candidateProfile = allUsers.find(u => u.firstName.toLowerCase() === triagedItem.name.split('.')[0].toLowerCase());
                        
                        if (candidateProfile) {
                            // Check if this candidate isn't already in the pipeline for this vacancy
                            const alreadyExists = vacancyApps.some(app => app.userId === candidateProfile.id);
                            if (!alreadyExists) {
                                triagedCandidates.push({
                                    id: `${candidateProfile.id}_${vacancyId}`, // Create a mock application ID
                                    userId: candidateProfile.id,
                                    jobPostingId: vacancyId,
                                    applicationDate: new Date(), // Use current date for triaged candidates
                                    status: 'Triagem', 
                                    candidate: candidateProfile,
                                    score: triagedItem.score,
                                });
                            } else {
                                // If they already exist, just update their score
                                const existingApp = vacancyApps.find(app => app.userId === candidateProfile.id);
                                if(existingApp) existingApp.score = triagedItem.score;
                            }
                        }
                    });
                } catch(e) {
                    console.error("Failed to parse triaged candidates from URL:", e);
                }
            }

            // 3. Combine existing applications with new triaged candidates
            setApplications([...vacancyApps, ...triagedCandidates]);

        } else if (foundVacancy === null) { 
            notFound();
        }
    }, [vacancyId, searchParams]);

    const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
        setApplications(prev => prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app));
        // In a real app, you would also persist this change to Firestore here.
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
                <Button variant="outline" onClick={() => router.back()} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar às Minhas Vagas
                </Button>
                
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
    