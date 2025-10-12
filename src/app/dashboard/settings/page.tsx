'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Building, Award, ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/dashboard/code-block";
import { EditableImageGrid } from "@/components/dashboard/settings/editable-image-grid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const stats = [
    { value: '150+', label: 'Cursos Disponíveis' },
    { value: '10K+', label: 'Alunos Formados' },
    { value: '95%', label: 'Taxa de Satisfação' },
    { value: '8+', label: 'Áreas de Especialização' },
];

export default function SettingsPage() {
  const router = useRouter();
  const partners = PlaceHolderImages.filter(p => p.id.startsWith('partner-'));
  const certifications = PlaceHolderImages.filter(p => p.id.startsWith('cert-'));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
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
        </div>
    </div>
  );
}
