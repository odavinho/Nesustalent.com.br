import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, User, Briefcase, GraduationCap, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div>
        <div className="flex items-center gap-4 mb-8">
            <User className="w-10 h-10 text-primary" />
            <div>
            <h1 className="font-headline text-4xl font-bold">Painel do Administrador</h1>
            <p className="text-muted-foreground">Gestão total da plataforma NexusTalent.</p>
            </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 grid gap-8 auto-rows-min">
                <div className="grid md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap />
                            Gestão de Cursos
                        </CardTitle>
                        <CardDescription>Adicione, edite e organize todos os cursos da plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Button asChild>
                            <Link href="/dashboard/courses/new">Adicionar Curso</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="#">Gerir Cursos</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase />
                            Gestão de Vagas
                        </CardTitle>
                        <CardDescription>Publique e administre as oportunidades de emprego.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Button asChild>
                            <Link href="/dashboard/vacancies/new">Adicionar Vaga</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="#">Gerir Vagas</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User />
                            Gestão de Usuários
                        </CardTitle>
                        <CardDescription>Gerencie todos os usuários, papéis e permissões.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Button asChild variant="outline">
                            <Link href="#">Gerir Usuários</Link>
                        </Button>
                    </CardContent>
                </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings />
                            Configurações do Site
                        </CardTitle>
                        <CardDescription>Edite o conteúdo estático do site, como parceiros, certificações e estatísticas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/settings">Gerir Conteúdo</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
