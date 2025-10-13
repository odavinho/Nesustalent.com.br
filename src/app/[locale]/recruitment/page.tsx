'use client';
import { VacancyList } from "@/components/recruitment/vacancy-list";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";
import { getVacancies } from "@/lib/vacancy-service";
import { useRouter } from "next/navigation";


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
             Dê o próximo passo na sua carreira. Explore as nossas vagas abertas e encontre a oportunidade ideal para si.
            </p>
          </div>

           <div className="mt-8">
              <VacancyList />
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
