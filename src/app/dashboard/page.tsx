import { CourseRecommendations } from "@/components/dashboard/course-recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, User, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    // Mock data for enrolled courses
    const enrolledCourses = [
        { name: 'Técnicas de Apresentação', progress: 75 },
        { name: 'Gestão de Conflitos', progress: 40 },
        { name: 'Excel Avançado', progress: 100 },
    ];
  
    return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <User className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">Meu Painel</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, Administrador!</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid gap-8 auto-rows-min">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap />
                        Gestão de Cursos
                    </CardTitle>
                    <CardDescription>Adicione novos cursos à plataforma. Use a IA para gerar o conteúdo programático e a imagem.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/dashboard/courses/new">Adicionar Novo Curso</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase />
                        Gestão de Vagas
                    </CardTitle>
                    <CardDescription>Publique novas oportunidades de emprego e gerencie as candidaturas recebidas.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                     <Button asChild>
                        <Link href="/dashboard/vacancies/new">Adicionar Nova Vaga</Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="#">Gerir Candidaturas</Link>
                    </Button>
                </CardContent>
            </Card>
             <CourseRecommendations />
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookMarked />
                        Meus Cursos Atuais
                    </CardTitle>
                    <CardDescription>Seu progresso de aprendizado.</CardDescription>
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
                                    <div className="bg-primary h-2.5 rounded-full" style={{width: `${course.progress}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
