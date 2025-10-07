import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
    // Mock data for enrolled courses
    const enrolledCourses = [
        { name: 'Técnicas de Apresentação', progress: 75 },
        { name: 'Gestão de Conflitos', progress: 40 },
        { name: 'Excel Avançado', progress: 100 },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Painel do Formando</h1>
                <p className="text-muted-foreground">Bem-vindo! A sua jornada de aprendizado começa aqui.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen />
                                Meus Cursos
                            </CardTitle>
                            <CardDescription>Continue de onde parou e acompanhe seu progresso.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {enrolledCourses.map(course => (
                                    <div key={course.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-medium text-sm">{course.name}</h4>
                                            <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2.5">
                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <Button asChild className="mt-6">
                                <Link href="/courses">Explorar mais cursos</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar />
                                Próximos Eventos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Nenhuma aula ao vivo ou prazo agendado para breve.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award />
                                Meus Certificados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">Conclua cursos para ganhar certificados.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare />
                                Fóruns e Mensagens
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">Nenhuma mensagem nova.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
