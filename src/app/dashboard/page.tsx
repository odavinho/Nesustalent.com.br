'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './loading';

// Mock function to get user role. In a real app, this would come from your database.
const getUserRole = async (uid: string): Promise<'student' | 'instructor' | 'admin'> => {
    // For demonstration, we'll assign roles based on the email.
    // This is NOT secure and should be replaced with a real database call.
    if (uid.includes('admin')) return 'admin';
    if (uid.includes('instructor')) return 'instructor';
    return 'student';
}


export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && user) {
            getUserRole(user.email || '').then(role => {
                switch (role) {
                    case 'admin':
                        router.replace('/dashboard/admin');
                        break;
                    case 'instructor':
                        router.replace('/dashboard/instructor');
                        break;
                    case 'student':
                        router.replace('/dashboard/student');
                        break;
                    default:
                        router.replace('/'); // Fallback to home
                }
            });
        } else if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    return <Loading />;
}
