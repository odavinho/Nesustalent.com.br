import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RecruiterDashboardPage() {
    // Mock data
    const activeVacancies = [
        { title: 'Desenvolvedor Frontend Sênior', candidates: 45 },
        { title: 'Gestor de Projetos de TI', candidates: 32 },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Painel do Recrutador</h1>
                <p className="text-muted-foreground">Encontre os melhores talentos para a sua empresa.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase />
                            Vagas Publicadas
                        </CardTitle>
                        <CardDescription>Crie novas vagas e gerencie as existentes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2 mb-4">
                            {activeVacancies.map(vacancy => (
                                <li key={vacancy.title} className="flex justify-between items-center text-sm p-2 bg-secondary rounded-md">
                                    <span className="font-medium">{vacancy.title}</span>
                                    <span className="flex items-center gap-2 text-muted-foreground"><Users size={16} /> {vacancy.candidates} candidatos</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild>
                            <Link href="/dashboard/vacancies/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Publicar Nova Vaga
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users />
                            Candidaturas Recebidas
                        </CardTitle>
                         <CardDescription>Analise e organize os candidatos para as suas vagas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">Nenhuma nova candidatura no momento.</p>
                         <Button variant="outline" className="mt-4">Ver Todas as Candidaturas</Button>
                    </CardContent>
                </Card>

                 <Card className="lg:col-span-2">
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
                            <Link href="/recruitment">
                                Ir para o Analisador
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
