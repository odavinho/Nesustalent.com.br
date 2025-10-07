import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";
import { vacancies } from "@/lib/vacancies";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Briefcase, Star, Users, Building, Award } from "lucide-react";
import { CodeBlock } from "@/components/dashboard/code-block";

// These need to be hardcoded here for now as they are inside a component
const stats = [
    { value: '150+', label: 'Cursos Disponíveis' },
    { value: '10K+', label: 'Alunos Formados' },
    { value: '95%', label: 'Taxa de Satisfação' },
    { value: '8+', label: 'Áreas de Especialização' },
];

const partners = PlaceHolderImages.filter(p => p.id.startsWith('partner-'));
const certifications = PlaceHolderImages.filter(p => p.id.startsWith('cert-'));


export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Configurações do Site</h1>
          <p className="text-muted-foreground mt-2">
            Visualize os dados estáticos do site. Para atualizar, copie o bloco de código, edite-o e solicite a alteração.
          </p>
        </div>
        <div className="space-y-8">
            <CodeBlock 
                title="Cursos" 
                description="A lista completa de cursos disponíveis na plataforma."
                icon={<BookOpen />}
                data={courses}
            />
            <CodeBlock 
                title="Vagas" 
                description="As oportunidades de emprego listadas na página de carreiras."
                icon={<Briefcase />}
                data={vacancies}
            />
            <CodeBlock 
                title="Estatísticas da Home" 
                description="Os números de destaque exibidos na página inicial."
                icon={<Star />}
                data={stats}
            />
            <CodeBlock 
                title="Parceiros" 
                description="Os logotipos de parceiros exibidos no carrossel da página inicial."
                icon={<Building />}
                data={partners}
            />
            <CodeBlock 
                title="Certificações" 
                description="As certificações e acreditações exibidas na página inicial."
                icon={<Award />}
                data={certifications}
            />
        </div>
    </div>
  );
}
