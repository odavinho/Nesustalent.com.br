'use client';

import { vacancies } from "@/lib/vacancies";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Clock, MapPin, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { courseCategories } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

export default function VacancyDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const vacancy = vacancies.find(v => v.id === resolvedParams.id);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);

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

    if (!firestore) return;

    setIsApplying(true);
    
    // Check if user has already applied
    const applicationsRef = collection(firestore, 'applications');
    const q = query(applicationsRef, where("userId", "==", user.uid), where("jobPostingId", "==", vacancy.id));
    
    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            toast({
            variant: "destructive",
            title: "Candidatura Duplicada",
            description: "Você já se candiditou para esta vaga.",
            });
            setIsApplying(false);
            return;
        }

        // Add new application
        const applicationData = {
            userId: user.uid,
            jobPostingId: vacancy.id,
            applicationDate: serverTimestamp(),
            status: 'Recebida',
            notes: '',
        };

        addDoc(applicationsRef, applicationData)
        .then(() => {
            toast({
                title: "Candidatura Enviada!",
                description: `Sua candidatura para ${vacancy.title} foi enviada com sucesso.`,
            });
        })
        .catch(async (error) => {
            const permissionError = new FirestorePermissionError({
                path: 'applications',
                operation: 'create',
                requestResourceData: applicationData,
            });
            errorEmitter.emit('permission-error', permissionError);
        }).finally(() => {
            setIsApplying(false);
        });

    } catch (error) {
        const permissionError = new FirestorePermissionError({
            path: 'applications',
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsApplying(false);
    }
  };

  const category = courseCategories.find(c => c.id === vacancy.category);

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
                  <h3 className="font-headline">Responsabilidades:</h3>
                  <ul>
                      <li>Desenvolver e manter aplicações web de alta qualidade.</li>
                      <li>Colaborar com equipes multifuncionais para definir, projetar e enviar novos recursos.</li>
                      <li>Garantir o desempenho, a qualidade e a capacidade de resposta dos aplicativos.</li>
                      <li>Identificar e corrigir gargalos e corrigir bugs.</li>
                  </ul>
                  <h3 className="font-headline">Requisitos:</h3>
                  <ul>
                      <li>Experiência comprovada em desenvolvimento de software.</li>
                      <li>Forte conhecimento das tecnologias relevantes para a vaga.</li>
                      <li>Capacidade de trabalhar em um ambiente de equipe ágil.</li>
                      <li>Excelentes habilidades de comunicação e resolução de problemas.</li>
                  </ul>
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
