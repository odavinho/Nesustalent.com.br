'use client';

import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Briefcase, FileWarning, PlusCircle, ArrowLeft } from 'lucide-react';
import type { Vacancy } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getVacancies, deleteVacancy } from '@/lib/vacancy-service';
import { useEffect, useState } from 'react';

export default function ManageVacanciesPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const allVacancies = getVacancies();
      setVacancies(allVacancies);
    } catch(e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (vacancyId: string) => {
    if (!confirm('Tem a certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.')) return;

    try {
        deleteVacancy(vacancyId);
        setVacancies(vacs => vacs.filter(v => v.id !== vacancyId));
        toast({
            title: 'Vaga Excluída!',
            description: 'A vaga foi removida com sucesso.',
        });
    } catch (e) {
        console.error(e);
        toast({
            variant: 'destructive',
            title: 'Erro ao Excluir',
            description: 'Não foi possível excluir a vaga.',
        });
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
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
            Não foi possível carregar os dados das vagas.
          </AlertDescription>
        </Alert>
      );
    }

    if (!vacancies || vacancies.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhuma vaga encontrada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Comece por adicionar uma nova vaga de emprego.
          </p>
          <Button asChild className='mt-4'>
            <Link href="/dashboard/vacancies/new"><PlusCircle className='mr-2 h-4 w-4' />Adicionar Vaga</Link>
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
                        <div className='mt-4 flex gap-2'>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/recruiter/vacancies/${vacancy.id}/edit`}>Editar</Link>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(vacancy.id)}>Excluir</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="font-headline text-4xl font-bold">Gestão de Vagas</h1>
                <p className="text-muted-foreground mt-2">
                Publique e administre as oportunidades de emprego.
                </p>
            </div>
            <Button asChild>
                <Link href="/dashboard/vacancies/new"><PlusCircle className='mr-2 h-4 w-4' />Publicar Nova Vaga</Link>
            </Button>
        </div>
        {renderContent()}
    </div>
  );
}
