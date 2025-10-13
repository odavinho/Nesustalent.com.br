'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, PlusCircle, MessageSquare, ClipboardCheck, BarChart, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase";
import { getVacancies } from "@/lib/vacancy-service";
import type { Vacancy } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { users } from "@/lib/users";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jan", applications: 186, hired: 80 },
  { month: "Feb", applications: 305, hired: 200 },
  { month: "Mar", applications: 237, hired: 120 },
  { month: "Apr", applications: 73, hired: 190 },
  { month: "May", applications: 209, hired: 130 },
  { month: "Jun", applications: 214, hired: 140 },
]

const chartConfig = {
  applications: {
    label: "Candidaturas",
    color: "hsl(var(--chart-1))",
  },
  hired: {
    label: "Contratados",
    color: "hsl(var(--chart-2))",
  },
}


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

             <div className="mb-8">
                <h2 className="font-headline text-2xl font-bold mb-4">Dashboard</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vagas Ativas</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">+2 que no mês passado</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Novas Candidaturas</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+52</div>
                            <p className="text-xs text-muted-foreground">nos últimos 7 dias</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Contratações</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+5</div>
                            <p className="text-xs text-muted-foreground">neste trimestre</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taxa de Contratação</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12%</div>
                             <p className="text-xs text-muted-foreground">+3% que no trimestre passado</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Candidaturas vs. Contratações</CardTitle>
                             <CardDescription>Janeiro - Junho 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={chartConfig} className="h-64">
                                <RechartsBarChart accessibilityLayer data={chartData}>
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
                                    <Bar dataKey="hired" fill="var(--color-hired)" radius={4} />
                                </RechartsBarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
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
                            <Link href="/dashboard/recruiter/analyzer">
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
