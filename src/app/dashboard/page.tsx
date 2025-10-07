'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Shield, GraduationCap } from 'lucide-react';
import Link from 'next/link';

type Role = 'student' | 'instructor' | 'admin';

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isUserLoading) {
            return; // Aguarda o estado de autenticação ser resolvido
        }

        if (!user) {
            router.replace('/login');
            return;
        }

        // Lógica para determinar os papéis do utilizador (substituindo a função async)
        const roles: Role[] = ['student']; // Todos são estudantes por padrão
        const userEmail = user.email || '';
        if (userEmail.includes('admin')) {
            roles.push('admin');
        }
        if (userEmail.includes('instructor')) {
            roles.push('instructor');
        }
        setAvailableRoles(roles);

        // Lógica de redirecionamento ou exibição
        if (roles.length === 1) {
            router.replace(`/dashboard/${roles[0]}`);
        } else {
            setIsLoading(false); // Exibe o seletor de painel
        }

    }, [user, isUserLoading, router]);

    if (isLoading) {
        return <Loading />;
    }

    // Apenas renderiza se isLoading for false e houver mais de um papel
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 text-center">
                <h1 className="font-headline text-4xl font-bold">Selecione um Painel</h1>
                <p className="text-muted-foreground mt-2">
                    Você tem acesso a múltiplos painéis. Escolha qual deseja visualizar.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                {availableRoles.includes('student') && (
                    <Link href="/dashboard/student">
                        <Card className="hover:shadow-lg hover:border-primary transition-all">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><GraduationCap /> Formando</CardTitle>
                                <CardDescription>Acompanhe seus cursos, progresso e certificados.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
                {availableRoles.includes('instructor') && (
                    <Link href="/dashboard/instructor">
                        <Card className="hover:shadow-lg hover:border-primary transition-all">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User /> Formador</CardTitle>
                                <CardDescription>Gerencie seus cursos, alunos e conteúdo.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
                {availableRoles.includes('admin') && (
                    <Link href="/dashboard/admin">
                        <Card className="hover:shadow-lg hover:border-primary transition-all">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Shield /> Administrador</CardTitle>
                                <CardDescription>Gerencie toda a plataforma NexusTalent.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
            </div>
        </div>
    );
}
