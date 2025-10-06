import { ResumeAnalyzer } from "@/components/recruitment/resume-analyzer";
import { FileText, Scan, Star } from "lucide-react";

export default function RecruitmentPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold">Plataforma de Recrutamento</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Otimize seu processo de seleção com nossa ferramenta de análise de currículos com Inteligência Artificial.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <ResumeAnalyzer />
        </div>
        <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card p-8 rounded-lg border">
                <h2 className="font-headline text-2xl font-bold mb-4">Como Funciona?</h2>
                <p className="text-muted-foreground mb-6">
                    Nossa IA avançada lê, entende e analisa currículos em segundos, comparando-os com a descrição da sua vaga para encontrar os candidatos mais promissores.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">1. Faça o Upload do Currículo</h3>
                            <p className="text-sm text-muted-foreground">Envie o CV do candidato em formato PDF.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                            <Scan size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">2. Insira a Descrição da Vaga</h3>
                            <p className="text-sm text-muted-foreground">Cole a descrição do cargo que você está tentando preencher.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                            <Star size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">3. Receba a Análise</h3>
                            <p className="text-sm text-muted-foreground">Obtenha um ranking, resumo, e pontos fortes do candidato instantaneamente.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
