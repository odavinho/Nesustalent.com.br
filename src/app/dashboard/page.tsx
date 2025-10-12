'use client';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './loading';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, `users/${user.uid}`);
    }, [user, firestore]);
    
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    useEffect(() => {
        const isLoading = isUserLoading || isProfileLoading;
        if (isLoading) {
            return; // Aguarda o fim do carregamento
        }

        if (!user) {
            router.replace('/login');
            return;
        }

        // A lógica é agora muito mais simples:
        // 1. Se o perfil do utilizador (com userType) existe, redireciona para o seu painel.
        // 2. Se não existir, o painel de estudante é o fallback.
        const role = userProfile?.userType || 'student';
        
        // Verifica se o email é um dos de teste para acesso de admin (override)
        if (user.email === 'admin@nexustalent.com') {
            router.replace('/dashboard/admin');
        } else {
            router.replace(`/dashboard/${role}`);
        }

    }, [user, isUserLoading, userProfile, isProfileLoading, router]);

    // Exibe o ecrã de carregamento enquanto a autenticação e a leitura do perfil estão a decorrer.
    return <Loading />;
}
