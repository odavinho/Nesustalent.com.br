'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Shield, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// Mock function to get user role. In a real app, this would come from your database.
const getUserRole = async (email: string): Promise<Array<'student' | 'instructor' | 'admin'>> => {
    // For demonstration, we'll assign roles based on the email.
    // This is NOT secure and should be replaced with a real database call.
    const roles: Array<'student' | 'instructor' | 'admin'>> = ['student']; // All users are students by default
    if (email.includes('admin')) {
      roles.push('admin');
    }
    if (email.includes('instructor')) {
      roles.push('instructor');
    }
    return roles;
}

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [availableRoles, setAvailableRoles] = useState<Array<'student' | 'instructor' | 'admin'>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isUserLoading) {
            return; // Wait until user auth state is resolved
        }

        if (!user) {
            router.replace('/login');
            return;
        }

        getUserRole(user.email || '').then(roles => {
            setAvailableRoles(roles);
            if (roles.length === 1) {
                router.replace(`/dashboard/${roles[0]}`);
            } else {
                setIsLoading(false); // Only stop loading if we need to show the role selector
            }
        });
    }, [user, isUserLoading, router]);
    
    if (isLoading) {
        return <Loading />;
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
