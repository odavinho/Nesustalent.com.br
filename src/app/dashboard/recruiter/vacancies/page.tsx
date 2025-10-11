'use client';

import { collection, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Briefcase, FileWarning, PlusCircle } from 'lucide-react';
import type { Vacancy } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function RecruiterVacanciesPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const vacanciesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'vacancies'),
      where('recruiterId', '==', user.uid),
      orderBy('postedDate', 'desc')
    );
  }, [firestore, user]);

  const { data: vacancies, isLoading, error } = useCollection<Vacancy>(vacanciesQuery);

  const handleDelete = async (vacancyId: string) => {
    if (!firestore) return;
    if (!confirm('Tem a certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.')) return;

    try {
        await deleteDoc(doc(firestore, 'vacancies', vacancyId));
        toast({
            title: 'Vaga Excluída!',
            description: 'A sua vaga foi removida com sucesso.',
        });
    } catch (e) {
        console.error(e);
        toast({
            variant: 'destructive',
            title: 'Erro ao Excluir',
            description: 'Não foi possível excluir a vaga. Verifique as permissões.',
        });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Vagas</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as suas vagas. Verifique as permissões do Firestore e tente novamente.
          </AlertDescription>
        </Alert>
      );
    }

    if (!vacancies || vacancies.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhuma vaga publicada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Comece por publicar uma nova vaga para atrair talentos.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/vacancies/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Publicar Nova Vaga
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {vacancies.map(vacancy => (
          <Card key={vacancy.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{vacancy.title}</CardTitle>
                  <CardDescription>{vacancy.location} &middot; {vacancy.category}</CardDescription>
                </div>
                <Badge>{vacancy.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{vacancy.description}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" disabled>Editar</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(vacancy.id)}>Excluir</Button>
                 <Button variant="secondary" size="sm" asChild>
                    <Link href={`/dashboard/recruiter/vacancies/${vacancy.id}/applications`}>Ver Candidatos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold">Minhas Vagas Publicadas</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as suas oportunidades de emprego e os candidatos.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/vacancies/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Publicar Nova Vaga
          </Link>
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}
