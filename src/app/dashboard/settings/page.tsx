import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";
import { vacancies } from "@/lib/vacancies";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Briefcase, Star, Building, Award, Clipboard, Link as LinkIcon, Trash2 } from "lucide-react";
import { CodeBlock } from "@/components/dashboard/code-block";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// These need to be hardcoded here for now as they are inside a component
const stats = [
    { value: '150+', label: 'Cursos Disponíveis' },
    { value: '10K+', label: 'Alunos Formados' },
    { value: '95%', label: 'Taxa de Satisfação' },
    { value: '8+', label: 'Áreas de Especialização' },
];

const partners = PlaceHolderImages.filter(p => p.id.startsWith('partner-'));
const certifications = PlaceHolderImages.filter(p => p.id.startsWith('cert-'));

const EditableImageCard = ({ item }: { item: { id: string; imageUrl: string; description: string } }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <p className="text-sm font-mono text-muted-foreground">{item.id}</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Excluir (solicitar)">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center flex-grow p-4">
                <div className="relative w-32 h-20 mb-4">
                    <Image
                        src={item.imageUrl}
                        alt={item.description}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-full space-y-2">
                    <p className="text-xs text-muted-foreground break-all">{item.imageUrl}</p>
                    <Button variant="outline" size="sm" className="w-full" title="Editar (solicitar)">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Alterar URL da Imagem
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};


export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Configurações do Site</h1>
          <p className="text-muted-foreground mt-2">
            Visualize e prepare os dados do site para atualização. Para editar, copie os dados ou solicite a alteração.
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
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building />
                        Parceiros
                    </CardTitle>
                    <CardDescription className="mt-2">Os logotipos de parceiros exibidos no carrossel da página inicial. Para editar, solicite a alteração do URL da imagem.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {partners.map(partner => (
                        <EditableImageCard key={partner.id} item={partner} />
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award />
                        Certificações
                    </CardTitle>
                    <CardDescription className="mt-2">As certificações e acreditações exibidas na página inicial. Para editar, solicite a alteração do URL da imagem.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {certifications.map(cert => (
                        <EditableImageCard key={cert.id} item={cert} />
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}