
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";
import { vacancies } from "@/lib/vacancies";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { BookOpen, Briefcase, Star, Building, Award } from "lucide-react";
import { CodeBlock } from "@/components/dashboard/code-block";
import { EditableImageGrid } from "@/components/dashboard/settings/editable-image-grid";


const stats = [
    { value: '150+', label: 'Cursos Disponíveis' },
    { value: '10K+', label: 'Alunos Formados' },
    { value: '95%', label: 'Taxa de Satisfação' },
    { value: '8+', label: 'Áreas de Especialização' },
];

export default function SettingsPage() {
  const partners = PlaceHolderImages.filter(p => p.id.startsWith('partner-'));
  const certifications = PlaceHolderImages.filter(p => p.id.startsWith('cert-'));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Configurações do Site</h1>
          <p className="text-muted-foreground mt-2">
            Visualize e edite os dados do site. As alterações serão refletidas em tempo real.
          </p>
        </div>
        <div className="space-y-8">
            <CodeBlock 
                title="Estatísticas da Home" 
                description="Os números de destaque exibidos na página inicial. Para editar, copie os dados e solicite a alteração."
                icon={<Star />}
                data={stats}
            />
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building />
                        Parceiros
                    </CardTitle>
                    <CardDescription className="mt-2">Os logotipos de parceiros exibidos no carrossel da página inicial.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditableImageGrid items={partners} itemType="parceiro" idPrefix="partner-" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award />
                        Certificações
                    </CardTitle>
                    <CardDescription className="mt-2">As certificações e acreditações exibidas na página inicial.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditableImageGrid items={certifications} itemType="certificação" idPrefix="cert-" />
                </CardContent>
            </Card>
            
            <CodeBlock 
                title="Cursos" 
                description="A lista completa de cursos disponíveis na plataforma. Solicite alterações para editar."
                icon={<BookOpen />}
                data={courses}
            />
            <CodeBlock 
                title="Vagas" 
                description="As oportunidades de emprego listadas na página de carreiras. Solicite alterações para editar."
                icon={<Briefcase />}
                data={vacancies}
            />
        </div>
    </div>
  );
}
