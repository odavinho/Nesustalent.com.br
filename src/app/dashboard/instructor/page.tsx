import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, BarChart3, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InstructorDashboardPage() {
    // Mock data
    const managedCourses = [
        { name: 'Técnicas de Apresentação', students: 25 },
        { name: 'Gestão de Conflitos', students: 18 },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Painel do Formador</h1>
                <p className="text-muted-foreground">Gerencie seus cursos, alunos e conteúdo.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen />
                            Meus Cursos
                        </CardTitle>
                        <CardDescription>Crie novos cursos e gerencie o conteúdo dos existentes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2 mb-4">
                            {managedCourses.map(course => (
                                <li key={course.name} className="flex justify-between items-center text-sm p-2 bg-secondary rounded-md">
                                    <span className="font-medium">{course.name}</span>
                                    <span className="flex items-center gap-2 text-muted-foreground"><Users size={16} /> {course.students} alunos</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild>
                            <Link href="/dashboard/courses/new">Criar Novo Curso</Link>
                        </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 />
                            Relatórios de Alunos
                        </CardTitle>
                         <CardDescription>Acompanhe o progresso e o desempenho dos seus formandos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">Nenhum relatório disponível no momento.</p>
                         <Button variant="outline" className="mt-4">Ver Relatórios</Button>
                    </CardContent>
                </Card>

                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle />
                            Comunicação
                        </CardTitle>
                         <CardDescription>Envie mensagens e avisos para suas turmas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Nenhuma mensagem recente.</p>
                         <Button>Enviar Nova Mensagem</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
