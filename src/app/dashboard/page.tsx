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
        
        // Don't do anything until all user and profile data has finished loading.
        if (isLoading) {
            return;
        }

        // If after loading there is no user, redirect to login.
        if (!user) {
            router.replace('/login');
            return;
        }

        // Now that we have a user, determine the role and redirect.
        // The admin email is a special override.
        if (user.email === 'admin@nexustalent.com') {
            router.replace('/dashboard/admin');
            return;
        }

        // For all other users, the userType from their Firestore profile is the source of truth.
        // If the profile or userType doesn't exist for some reason, fallback to the student dashboard.
        const role = userProfile?.userType || 'student';
        router.replace(`/dashboard/${role}`);

    }, [user, isUserLoading, userProfile, isProfileLoading, router]);

    // Display a loading screen while authentication and profile fetching are in progress.
    return <Loading />;
}
