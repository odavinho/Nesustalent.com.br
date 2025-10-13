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
    const [applications, setApplications] = useState<Application[]>([]);
    const [candidates, setCandidates] = useState<UserProfile[]>([]);
    
    useEffect(() => {
        const foundVacancy = getVacancyById(vacancyId);
        setVacancy(foundVacancy); 
        
        if (foundVacancy) {
            const vacancyApps = allApplications.filter(app => app.jobPostingId === vacancyId);
            setApplications(vacancyApps);
            
            const appUserIds = vacancyApps.map(app => app.userId);

            const analysisParam = searchParams.get('analysis');
            if(analysisParam) {
                try {
                    const triagedData = JSON.parse(decodeURIComponent(analysisParam));
                    // The analysis data contains a fake candidate ID like "analyzed-0". We need to find the real candidate profile.
                    // This is a workaround because the analyzer doesn't have the real candidate ID.
                    // In a real app, the analyzer would work with existing user profiles.
                    // Here, we just add ALL student users to the list to ensure the profile can be found.
                    const allStudentUsers = allUsers.filter(u => u.userType === 'student');
                    setCandidates(allStudentUsers);
                } catch(e) {
                     const vacancyCandidates = allUsers.filter(user => appUserIds.includes(user.id));
                     setCandidates(vacancyCandidates);
                }
            } else {
                const vacancyCandidates = allUsers.filter(user => appUserIds.includes(user.id));
                setCandidates(vacancyCandidates);
            }

        } else if (foundVacancy === null) { 
            notFound();
        }
    }, [vacancyId, searchParams]);

    const candidatesWithApplications = useMemo(() => {
        let combined: TriagedCandidate[] = applications.map(app => {
            const candidate = candidates.find(c => c.id === app.userId);
            return {
                ...app,
                candidate: candidate,
            }
        }).filter((item): item is Application & { candidate: UserProfile } => !!item.candidate);

        const analysisParam = searchParams.get('analysis');
        if (analysisParam) {
             try {
                const triagedData = JSON.parse(decodeURIComponent(analysisParam)) as { id: string, name: string, score: number }[];
                 
                 triagedData.forEach((triaged) => {
                    // This is a mock: find a candidate by matching the filename from analysis.
                    // In a real app, you'd have a persistent ID.
                    const candidateProfile = allUsers.find(u => u.firstName.toLowerCase() === triaged.name.split('.')[0].toLowerCase());
                    
                    if (candidateProfile) {
                        const existing = combined.find(c => c.candidate.id === candidateProfile.id);
                        if (!existing) {
                             combined.push({
                                id: `${candidateProfile.id}_${vacancyId}`,
                                userId: candidateProfile.id,
                                jobPostingId: vacancyId,
                                applicationDate: new Date(),
                                status: 'Triagem', 
                                candidate: candidateProfile,
                                score: triaged.score,
                            });
                         }
                    }
                 });
             } catch(e) {
                 console.error("Failed to parse triaged candidates:", e);
             }
        }


        return combined;
    }, [applications, candidates, searchParams, vacancyId]);

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
                        <span className="font-semibold">{vacancy.title}</span> - {candidatesWithApplications.length} candidatura(s) no total.
                    </p>
                </div>
            </div>
            
            <RecruitmentPipeline 
                applications={candidatesWithApplications}
                onStatusChange={handleStatusChange} 
            />
        </div>
    );
}
    