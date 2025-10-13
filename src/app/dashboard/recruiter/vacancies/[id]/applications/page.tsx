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

export default function VacancyApplicationsPage() {
    const params = useParams();
    const router = useRouter();
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
            const vacancyCandidates = allUsers.filter(user => appUserIds.includes(user.id));
            setCandidates(vacancyCandidates);
        } else if (foundVacancy === null) { 
            notFound();
        }
    }, [vacancyId]);

    const candidatesWithApplications = useMemo(() => {
        return applications.map(app => {
            const candidate = candidates.find(c => c.id === app.userId);
            return {
                ...app,
                candidate: candidate,
            }
        }).filter(item => item.candidate); // Filter out any applications where the candidate wasn't found
    }, [applications, candidates]);

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
                applications={candidatesWithApplications as (Application & { candidate: UserProfile })[]}
                onStatusChange={handleStatusChange} 
            />
        </div>
    );
}