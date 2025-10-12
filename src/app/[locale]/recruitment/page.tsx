'use client';
import { VacancyList } from "@/components/recruitment/vacancy-list";
import { ResumeAnalyzer } from "@/components/recruitment/resume-analyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";
import { getVacancies } from "@/lib/vacancy-service";

export default function RecruitmentPage() {

    // Pre-warm the vacancies data
    useEffect(() => {
        getVacancies();
    }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">Carreiras na NexusTalent</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Dê o próximo passo na sua carreira. Explore nossas vagas ou use nossa IA para analisar a compatibilidade do seu currículo.
            </p>
          </div>

          <Tabs defaultValue="vacancies" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto h-12">
              <TabsTrigger value="vacancies" className="h-10">Vagas Abertas</TabsTrigger>
              <TabsTrigger value="analyzer" className="h-10">Analisador de CV</TabsTrigger>
            </TabsList>
            <TabsContent value="vacancies">
                <div className="mt-8">
                    <VacancyList />
                </div>
            </TabsContent>
            <TabsContent value="analyzer">
                <div className="mt-8 max-w-4xl mx-auto">
                    <ResumeAnalyzer />
                </div>
            </TabsContent>
          </Tabs>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
