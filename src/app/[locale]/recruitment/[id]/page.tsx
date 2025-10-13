'use client';

import { getVacancyById } from "@/lib/vacancy-service";
import { notFound, useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Clock, MapPin, Share2, Loader2, HelpCircle, Building, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getCourseCategories } from "@/lib/course-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError, useDoc, useMemoFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import type { UserProfile, Vacancy, CourseCategory } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function VacancyDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);
  const [category, setCategory] = useState<CourseCategory | null>(null);

  useEffect(() => {
    if (id) {
        const foundVacancy = getVacancyById(id);
        setVacancy(foundVacancy);
        if(foundVacancy){
            const categories = getCourseCategories();
            setCategory(categories.find(c => c.name === foundVacancy.category) || null);
        }
    }
  }, [id]);

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
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
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

  return (
    <>
      <Header />
      <main className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/recruitment" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={16} /> Voltar para as vagas
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div>
                {category && <Badge className="mb-2">{category.name}</Badge>}
                <h1 className="font-headline text-3xl md:text-4xl font-bold">{vacancy.title}</h1>
              </div>
              
              <Card>
                <CardHeader>
                    <CardTitle className="font-bold text-lg">Descrição da Vaga</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <p>{vacancy.description}</p>
                </CardContent>
              </Card>

              {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bold text-lg flex items-center gap-2"><CheckCircle size={20}/>Responsabilidades</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <ul className="space-y-2">
                      {vacancy.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {vacancy.requirements && vacancy.requirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bold text-lg flex items-center gap-2"><CheckCircle size={20}/>Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <ul className="space-y-2">
                      {vacancy.requirements.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1 sticky top-24 space-y-6">
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-bold text-lg">Resumo da Vaga</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              <div>
                                <p className="font-bold">Localização</p>
                                <p className="text-muted-foreground">{vacancy.location}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-3">
                              <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                               <div>
                                <p className="font-bold">Tipo de Contrato</p>
                                <p className="text-muted-foreground">{vacancy.type}</p>
                              </div>
                          </div>
                          {vacancy.salaryRange && vacancy.showSalary && (
                             <div className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                 <div>
                                  <p className="font-bold">Salário</p>
                                  <p className="text-muted-foreground">{vacancy.salaryRange}</p>
                                </div>
                            </div>
                          )}
                      </CardContent>
                  </Card>
                  
                  {vacancy.employerName && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-bold text-lg flex items-center gap-2"><Building size={20}/> Sobre o Recrutador</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <h3 className="font-semibold">{vacancy.employerName}</h3>
                           <p className="text-sm text-muted-foreground">{vacancy.aboutEmployer}</p>
                        </CardContent>
                    </Card>
                  )}

                  <div className="p-4 border rounded-lg bg-background">
                     {vacancy.screeningQuestions && vacancy.screeningQuestions.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-semibold mb-4 flex items-center gap-2"><HelpCircle size={18}/> Perguntas de Triagem</h4>
                            <div className="space-y-4">
                            {vacancy.screeningQuestions.map((question, index) => (
                                <div key={index} className="space-y-2">
                                    <Label htmlFor={`question-${index}`} className="text-sm">{question}</Label>
                                    <Textarea id={`question-${index}`} placeholder="Sua resposta..." rows={3} />
                                </div>
                            ))}
                            </div>
                        </div>
                      )}

                      <Button 
                        size="lg" 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={handleApply}
                        disabled={isUserLoading || isApplying}
                      >
                        {isApplying ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>A processar...</>
                        ) : (
                            "Candidatar-se Agora"
                        )}
                      </Button>
                      <Button size="lg" variant="outline" className="w-full mt-2">
                          <Share2 size={16} className="mr-2"/>
                          Compartilhar
                      </Button>
                  </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
