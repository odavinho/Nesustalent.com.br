'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, PlusCircle, MessageSquare, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase";
import { getVacancies } from "@/lib/vacancy-service";
import type { Vacancy } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { users } from "@/lib/users";

function VacancyList({ recruiterId }: { recruiterId: string }) {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (recruiterId) {
            const allVacancies = getVacancies();
            // Use test recruiter UID for mock data
            const testRecruiter = users.find(u => u.email === 'recruiter@nexustalent.com.br');
            const userVacancies = allVacancies.filter(v => v.recruiterId === testRecruiter?.id);
            setVacancies(userVacancies);
        }
        setIsLoading(false);
    }, [recruiterId]);


    if (isLoading) {
        return (
            <ul className="space-y-2 mb-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </ul>
        )
    }

    return (
        <ul className="space-y-2 mb-4">
            {vacancies && vacancies.length > 0 ? (
                vacancies.slice(0, 2).map(vacancy => (
                    <li key={vacancy.id} className="flex justify-between items-center text-sm p-2 bg-secondary rounded-md">
                        <span className="font-medium">{vacancy.title}</span>
                        {/* A contagem de candidatos será implementada no futuro */}
                        {/* <span className="flex items-center gap-2 text-muted-foreground"><Users size={16} /> {vacancy.candidates} candidatos</span> */}
                    </li>
                ))
            ) : (
                <p className="text-sm text-muted-foreground">Ainda não publicou nenhuma vaga.</p>
            )}
        </ul>
    );
}


export default function RecruiterDashboardPage() {
    const { user } = useUser();

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Painel do Recrutador</h1>
                <p className="text-muted-foreground">Encontre os melhores talentos para a sua empresa.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase />
                            Vagas Publicadas
                        </CardTitle>
                        <CardDescription>Crie novas vagas e gerencie as existentes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {user && <VacancyList recruiterId={user.uid} />}
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/dashboard/recruiter/vacancies/new">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Publicar Nova Vaga
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/dashboard/recruiter/vacancies">Gerir Vagas</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users />
                            Candidatos
                        </CardTitle>
                         <CardDescription>Pesquise perfis no nosso banco de talentos e encontre o candidato ideal.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Filtre por competências, experiência e mais.</p>
                         <Button asChild variant="outline">
                            <Link href="/dashboard/recruiter/candidates">Pesquisar CVs</Link>
                         </Button>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare />
                            Conversas
                        </CardTitle>
                         <CardDescription>Veja e responda às suas mensagens com os candidatos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Centralize a sua comunicação.</p>
                         <Button asChild>
                            <Link href="/dashboard/recruiter/conversations">Ver Conversas</Link>
                         </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText />
                            Analisador de Currículos com IA
                        </CardTitle>
                         <CardDescription>Use nossa ferramenta de IA para analisar a compatibilidade de um currículo com uma vaga.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Acelere seu processo de triagem.</p>
                         <Button asChild>
                            <Link href="/recruitment?tab=analyzer">
                                Ir para o Analisador
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardCheck />
                            Testes de Avaliação
                        </CardTitle>
                         <CardDescription>Crie e gira testes de conhecimento e psicotécnicos para as suas vagas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">A IA gera testes relevantes para filtrar os melhores candidatos.</p>
                         <Button asChild variant="outline">
                            <Link href="/dashboard/recruiter/vacancies">
                                Gerir Testes por Vaga
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
