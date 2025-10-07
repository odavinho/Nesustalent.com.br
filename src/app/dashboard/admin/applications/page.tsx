
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileWarning, Files } from 'lucide-react';
import type { Application } from '@/lib/types';
import { ApplicationCard } from '@/components/admin/application-card';

export default function ManageApplicationsPage() {
  const firestore = useFirestore();
  
  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'applications'), orderBy('applicationDate', 'desc'));
  }, [firestore]);

  const { data: applications, isLoading, error } = useCollection<Application>(applicationsQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
            <FileWarning className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Candidaturas</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os dados das candidaturas. Verifique as permissões do Firestore.
          </AlertDescription>
        </Alert>
      );
    }

    if (!applications || applications.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Files className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhuma candidatura encontrada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ainda não há candidaturas para as vagas publicadas.
          </p>
        </div>
      );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map(app => (
                <ApplicationCard key={app.id} application={app} />
            ))}
        </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Gestão de Candidaturas</h1>
        <p className="text-muted-foreground mt-2">
          Visualize e organize os candidatos para as suas vagas.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-12 mb-8">
          <TabsTrigger value="all" className="h-10">Todos os Candidatos</TabsTrigger>
          <TabsTrigger value="interesting" className="h-10">Candidatos Interessantes</TabsTrigger>
          <TabsTrigger value="rejected" className="h-10">Candidatos Rejeitados</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {renderContent()}
        </TabsContent>
        <TabsContent value="interesting">
          {renderContent()}
        </TabsContent>
        <TabsContent value="rejected">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
