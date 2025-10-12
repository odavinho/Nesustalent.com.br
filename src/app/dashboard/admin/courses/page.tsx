'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, FileWarning, PlusCircle, ArrowLeft } from 'lucide-react';
import type { Course } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getCourses } from '@/lib/course-service';
import { useEffect, useState } from 'react';


export default function ManageCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const allCourses = getCourses();
      setCourses(allCourses);
    } catch (e) {
        if (e instanceof Error) {
            setError(e);
        } else {
            setError(new Error("An unknown error occurred."));
        }
    } finally {
        setIsLoading(false);
    }
  }, []);


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
          <AlertTitle>Erro ao Carregar Cursos</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os dados dos cursos.
          </AlertDescription>
        </Alert>
      );
    }

    if (!courses || courses.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum curso encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Comece por adicionar um novo curso à plataforma.
          </p>
          <Button asChild className='mt-4'>
            <Link href="/dashboard/courses/new"><PlusCircle className='mr-2 h-4 w-4' />Adicionar Curso</Link>
          </Button>
        </div>
      );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <Card key={course.id}>
                    <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge>{course.format}</Badge>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{course.generalObjective}</p>
                        <div className='mt-4 flex gap-2'>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/courses/${course.id}`}>Ver</Link>
                            </Button>
                            <Button variant="outline" size="sm" disabled>Editar</Button>
                            <Button variant="destructive" size="sm" disabled>Excluir</Button>
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
                <h1 className="font-headline text-4xl font-bold">Gestão de Cursos</h1>
                <p className="text-muted-foreground mt-2">
                Visualize, adicione, edite e organize todos os cursos da plataforma.
                </p>
            </div>
            <Button asChild>
                <Link href="/dashboard/courses/new"><PlusCircle className='mr-2 h-4 w-4' />Adicionar Novo Curso</Link>
            </Button>
        </div>
        {renderContent()}
    </div>
  );
}
