'use client';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Shield, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';

type Role = 'student' | 'instructor' | 'admin' | 'recruiter';

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    // Memoize the doc reference
    const userDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, `users/${user.uid}`);
    }, [user, firestore]);
    
    // Fetch user profile from Firestore
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    useEffect(() => {
        if (isUserLoading || isProfileLoading) {
            return; // Wait for both auth and profile to load
        }

        if (!user) {
            router.replace('/login');
            return;
        }

        if (userProfile) {
            // All users have a student role, plus their specific role
            const roles: Role[] = ['student'];
            if (userProfile.userType && userProfile.userType !== 'student') {
                // Ensure the specific role is pushed if it exists and isn't student
                if(!roles.includes(userProfile.userType)) {
                    roles.push(userProfile.userType);
                }
            }

            // For testing purposes, add roles based on email
             const userEmail = user.email || '';
             if (userEmail.includes('admin') && !roles.includes('admin')) {
                 roles.push('admin');
             }
             if (userEmail.includes('instructor') && !roles.includes('instructor')) {
                 roles.push('instructor');
             }
             if (userEmail.includes('recruiter') && !roles.includes('recruiter')) {
                 roles.push('recruiter');
             }

            // If there's only one effective role (student), redirect directly
            if (roles.length === 1) {
                 router.replace(`/dashboard/${roles[0]}`);
            } else {
                // If multiple roles, let the user choose
                // The component will re-render with the role selection UI
            }
        } else if (!isProfileLoading) {
            // Profile doc doesn't exist, default to student dashboard
            router.replace('/dashboard/student');
        }

    }, [user, isUserLoading, userProfile, isProfileLoading, router]);

    if (isUserLoading || isProfileLoading) {
        return <Loading />;
    }

    // Only render role selection if there's more than one role
    if (userProfile && (userProfile.userType !== 'student' || (user.email && (user.email.includes('admin') || user.email.includes('instructor') || user.email.includes('recruiter'))))) {
        const availableRoles: Role[] = ['student'];
        if (userProfile.userType && !availableRoles.includes(userProfile.userType)) {
            availableRoles.push(userProfile.userType);
        }
         const userEmail = user.email || '';
         if (userEmail.includes('admin') && !availableRoles.includes('admin')) availableRoles.push('admin');
         if (userEmail.includes('instructor') && !availableRoles.includes('instructor')) availableRoles.push('instructor');
         if (userEmail.includes('recruiter') && !availableRoles.includes('recruiter')) availableRoles.push('recruiter');
        
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 text-center">
                    <h1 className="font-headline text-4xl font-bold">Selecione um Painel</h1>
                    <p className="text-muted-foreground mt-2">
                        Você tem acesso a múltiplos painéis. Escolha qual deseja visualizar.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                     {availableRoles.includes('recruiter') && (
                        <Link href="/dashboard/recruiter">
                            <Card className="hover:shadow-lg hover:border-primary transition-all">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Briefcase /> Recrutador</CardTitle>
                                    <CardDescription>Gerencie vagas e analise candidaturas.</CardDescription>
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
    
    return <Loading />;
}
