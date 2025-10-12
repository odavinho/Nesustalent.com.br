'use client';

import { getVacancyById } from "@/lib/vacancy-service";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Clock, MapPin, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { courseCategories } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError, useDoc, useMemoFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import type { UserProfile, Vacancy } from "@/lib/types";

export default function VacancyDetailPage({ params }: { params: { id: string } }) {
  const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);

  useEffect(() => {
    const foundVacancy = getVacancyById(params.id);
    setVacancy(foundVacancy);
  }, [params.id]);


  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  if (vacancy === undefined) {
    // Still loading
    return <div>Loading...</div>;
  }
  
  if (!vacancy) {
    notFound();
  }

  const handleApply = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Acesso Negado",
        description: "Você precisa fazer login para se candidatar a uma vaga.",
      });
      router.push('/login');
      return;
    }

    // Profile completion check
    if (!userProfile?.resumeUrl || !userProfile?.academicTitle || !userProfile?.yearsOfExperience) {
        toast({
            variant: "destructive",
            title: "Perfil Incompleto",
            description: "Para se candidatar, por favor, preencha as seções de experiência, formação, competências, certificados e adicione o seu CV no seu painel.",
          });
        return;
    }

    if (!firestore) return;

    setIsApplying(true);
    
    const applicationId = `${user.uid}_${vacancy.id}`;
    const applicationRef = doc(firestore, 'applications', applicationId);
    
    // First, check if the application already exists to provide a specific message.
    try {
        const docSnap = await getDoc(applicationRef);
        if (docSnap.exists()) {
            toast({
                variant: "destructive",
                title: "Candidatura Duplicada",
                description: "Você já se candiditou para esta vaga.",
            });
            setIsApplying(false);
            return;
        }
    } catch (error) {
        console.error("Get Doc Error:", error);
        const permissionError = new FirestorePermissionError({
            path: applicationRef.path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsApplying(false);
        return;
    }
    
    const applicationData = {
        userId: user.uid,
        jobPostingId: vacancy.id,
        applicationDate: serverTimestamp(),
        status: 'Recebida',
        notes: '',
    };

    setDoc(applicationRef, applicationData)
      .then(() => {
        toast({
          title: "Candidatura Enviada!",
          description: `Sua candidatura para ${vacancy.title} foi enviada com sucesso.`,
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
            path: applicationRef.path,
            operation: 'create',
            requestResourceData: applicationData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsApplying(false);
      });
  };

  const category = courseCategories.find(c => c.name === vacancy.category);

  return (
    <>
      <Header />
      <main className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/recruitment" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={16} /> Voltar para as vagas
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {category && <Badge className="mb-2">{category.name}</Badge>}
              <h1 className="font-headline text-3xl md:text-4xl font-bold">{vacancy.title}</h1>
              
              <div className="mt-6 prose prose-lg max-w-none text-foreground/90">
                  <p>{vacancy.description}</p>
                  
                  {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
                    <>
                      <h3 className="font-headline">Responsabilidades:</h3>
                      <ul>
                        {vacancy.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </>
                  )}

                  {vacancy.requirements && vacancy.requirements.length > 0 && (
                    <>
                      <h3 className="font-headline">Requisitos:</h3>
                      <ul>
                        {vacancy.requirements.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </>
                  )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                  <Card>
                      <CardHeader>
                          <CardTitle>Resumo da Vaga</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4 text-sm">
                              <div className="flex items-center gap-3">
                                  <MapPin className="w-5 h-5 text-muted-foreground" />
                                  <span><strong>Localização:</strong> {vacancy.location}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                                  <span><strong>Tipo:</strong> {vacancy.type}</span>
                              </div>
                          </div>
                          <Button 
                            size="lg" 
                            className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                            onClick={handleApply}
                            disabled={isUserLoading || isApplying}
                          >
                            {isApplying ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>A processar...</>
                            ) : (
                                "Candidatar-se"
                            )}
                          </Button>
                          <Button size="lg" variant="outline" className="w-full mt-2">
                              <Share2 size={16} className="mr-2"/>
                              Compartilhar
                          </Button>
                      </CardContent>
                  </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
