
'use client';

import type { Application, Vacancy, UserProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Briefcase, User, Calendar, Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { vacancies } from '@/lib/vacancies';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ApplicationCardProps {
    application: Application;
}

const UserInfo = ({ userId, onUserLoad }: { userId: string, onUserLoad: (user: UserProfile) => void }) => {
    const firestore = useFirestore();
    const userRef = useMemoFirebase(() => {
        if (!firestore || !userId) return null;
        return doc(firestore, 'users', userId);
    }, [firestore, userId]);
    const { data: user, isLoading } = useDoc<UserProfile>(userRef);

    if (isLoading) {
        return <Skeleton className="h-5 w-3/4" />;
    }

    if (!user) {
        return <p className="text-sm text-destructive">Utilizador não encontrado</p>;
    }
    
    onUserLoad(user);

    return (
        <CardTitle className="font-headline text-xl">{user.firstName} {user.lastName}</CardTitle>
    );
};

export function ApplicationCard({ application }: ApplicationCardProps) {
    const vacancy = vacancies.find(v => v.id === application.jobPostingId);
    const firestore = useFirestore();
    const { toast } = useToast();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const applicationDate = application.applicationDate?.toDate();

    const handleStatusChange = async (newStatus: 'Em análise' | 'Rejeitada') => {
        if (!firestore) return;
        const appRef = doc(firestore, 'applications', application.id);
        try {
            await updateDoc(appRef, { status: newStatus });
            toast({
                title: "Status Atualizado!",
                description: `A candidatura foi movida para '${newStatus}'.`
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "Erro ao atualizar",
                description: "Não foi possível alterar o status da candidatura."
            });
        }
    };


    return (
        <Card className="flex flex-col">
            <CardHeader>
                 {vacancy && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Briefcase size={14} /> 
                        <span>{vacancy.title}</span>
                    </div>
                )}
                <UserInfo userId={application.userId} onUserLoad={setUserProfile} />
                <CardDescription className="flex items-center gap-2 text-xs">
                    <Calendar size={14} /> 
                    {applicationDate ? 
                    `candidatou-se ${formatDistanceToNow(applicationDate, { addSuffix: true, locale: pt })}` 
                    : 'Data indisponível'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <div className="mb-4">
                    <Badge>{application.status}</Badge>
                </div>
                <div className="flex gap-2 justify-between">
                    {userProfile?.resumeUrl ? (
                         <Button asChild variant="outline" size="sm" className="flex-1">
                            <a href={userProfile.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4"/>
                                Ver CV
                            </a>
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" className="flex-1" disabled>
                            <Download className="mr-2 h-4 w-4"/>
                            Sem CV
                        </Button>
                    )}
                    <div className='flex gap-1'>
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange('Em análise')} title="Marcar como interessante">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange('Rejeitada')} title="Rejeitar">
                            <ThumbsDown className="h-5 w-5 text-red-500" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
