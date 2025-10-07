'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// Mock function to get user role. In a real app, this would come from your database.
const getUserRole = async (uid: string): Promise<Array<'student' | 'instructor' | 'admin'>> => {
    // For demonstration, we'll assign roles based on the email.
    // This is NOT secure and should be replaced with a real database call.
    const roles: Array<'student' | 'instructor' | 'admin'> = ['student']; // All users are students by default
    if (uid.includes('admin')) {
      roles.push('admin');
    }
    if (uid.includes('instructor')) {
      roles.push('instructor');
    }
    return roles;
}

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [availableRoles, setAvailableRoles] = React.useState<Array<'student' | 'instructor' | 'admin'>>([]);

    useEffect(() => {
        if (!isUserLoading && user) {
            getUserRole(user.email || '').then(roles => {
                setAvailableRoles(roles);
                // If user has only one role, redirect immediately.
                if (roles.length === 1) {
                    router.replace(`/dashboard/${roles[0]}`);
                }
            });
        } else if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || (user && availableRoles.length <= 1) ) {
        return <Loading />;
    }

    if (!user) {
      return <Loading />; // Or a message telling them to log in
    }

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
                                <CardTitle className="flex items-center gap-2"><GraduationCap/> Formando</CardTitle>
                                <CardDescription>Acompanhe seus cursos, progresso e certificados.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
                {availableRoles.includes('instructor') && (
                     <Link href="/dashboard/instructor">
                        <Card className="hover:shadow-lg hover:border-primary transition-all">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User/> Formador</CardTitle>
                                <CardDescription>Gerencie seus cursos, alunos e conteúdo.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
                {availableRoles.includes('admin') && (
                    <Link href="/dashboard/admin">
                        <Card className="hover:shadow-lg hover:border-primary transition-all">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Shield/> Administrador</CardTitle>
                                <CardDescription>Gerencie toda a plataforma NexusTalent.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )}
            </div>
        </div>
    );
}
