
'use client';

import type { Application, Vacancy, UserProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Briefcase, User, Calendar, Download, ThumbsUp } from 'lucide-react';
import { vacancies } from '@/lib/vacancies';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '../ui/button';

interface ApplicationCardProps {
    application: Application;
}

const UserInfo = ({ userId }: { userId: string }) => {
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

    return (
        <CardTitle className="font-headline text-xl">{user.firstName} {user.lastName}</CardTitle>
    );
};

export function ApplicationCard({ application }: ApplicationCardProps) {
    const vacancy = vacancies.find(v => v.id === application.jobPostingId);
    
    const applicationDate = application.applicationDate?.toDate();

    return (
        <Card className="flex flex-col">
            <CardHeader>
                 {vacancy && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Briefcase size={14} /> 
                        <span>{vacancy.title}</span>
                    </div>
                )}
                <UserInfo userId={application.userId} />
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
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4"/>
                        Ver CV
                    </Button>
                     <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
