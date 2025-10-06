import { VacancyList } from "@/components/recruitment/vacancy-list";

export default function RecruitmentPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold">Encontre sua Próxima Oportunidade</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
         Explore as vagas disponíveis e dê o próximo passo na sua carreira. A NexusTalent conecta você às melhores empresas.
        </p>
      </div>

      <VacancyList />
      
    </div>
  );
}