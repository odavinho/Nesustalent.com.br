
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";
import { vacancies } from "@/lib/vacancies";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Briefcase, Star, Building, Award, Clipboard, Link as LinkIcon, Trash2, PlusCircle } from "lucide-react";
import { CodeBlock } from "@/components/dashboard/code-block";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// These need to be hardcoded here for now as they are inside a component
const stats = [
    { value: '150+', label: 'Cursos Disponíveis' },
    { value: '10K+', label: 'Alunos Formados' },
    { value: '95%', label: 'Taxa de Satisfação' },
    { value: '8+', label: 'Áreas de Especialização' },
];

const partners = PlaceHolderImages.filter(p => p.id.startsWith('partner-'));
const certifications = PlaceHolderImages.filter(p => p.id.startsWith('cert-'));

const AddItemDialog = ({ type }: { type: 'parceiro' | 'certificação' }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Novo
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Adicionar Novo {type === 'parceiro' ? 'Parceiro' : 'Certificação'}</AlertDialogTitle>
                <AlertDialogDescription>
                    Para adicionar um novo item, por favor, solicite ao assistente fornecendo as seguintes informações:
                </AlertDialogDescription>
                 <div className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 mt-2 text-foreground/80 bg-secondary p-3 rounded-md">
                        <li>Um <strong>ID único</strong> (ex: 'partner-novo-logo' ou 'cert-nova-iso')</li>
                        <li>O <strong>URL da imagem</strong> do logotipo/certificado.</li>
                        <li>Uma <strong>descrição</strong> para a imagem (ex: 'Logotipo da Nova Empresa').</li>
                        <li>Uma <strong>dica para IA</strong> (1-2 palavras, ex: 'tech logo').</li>
                    </ul>
                    <p className="mt-2">Exemplo de solicitação: "Adicione um novo parceiro com ID 'partner-techcorp', URL '...', descrição '...', e dica 'tech logo'."</p>
                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction>Entendido</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);


const EditableImageCard = ({ item }: { item: { id: string; imageUrl: string; description: string } }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <p className="text-sm font-mono text-muted-foreground">{item.id}</p>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8" title="Excluir (solicitar)">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Solicitar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                                Para excluir este item, copie o ID abaixo e peça ao assistente:
                                <br />
                                <strong className="font-mono text-primary">{item.id}</strong>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>Entendido</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center flex-grow p-4 pt-0">
                <div className="relative w-32 h-20 mb-4">
                    <Image
                        src={item.imageUrl}
                        alt={item.description}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-full space-y-2">
                    <p className="text-xs text-muted-foreground break-all bg-secondary p-2 rounded-md">{item.imageUrl}</p>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Alterar URL da Imagem
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Solicitar Alteração de URL</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Para alterar a imagem, peça ao assistente para atualizar o item com o ID <strong className="font-mono text-primary">{item.id}</strong>, fornecendo o novo URL da imagem.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction>Entendido</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                title="Estatísticas da Home" 
                description="Os números de destaque exibidos na página inicial."
                icon={<Star />}
                data={stats}
            />
            
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Building />
                                Parceiros
                            </CardTitle>
                            <CardDescription className="mt-2">Os logotipos de parceiros exibidos no carrossel da página inicial.</CardDescription>
                        </div>
                        <AddItemDialog type="parceiro" />
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {partners.map(partner => (
                        <EditableImageCard key={partner.id} item={partner} />
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Award />
                                Certificações
                            </CardTitle>
                            <CardDescription className="mt-2">As certificações e acreditações exibidas na página inicial.</CardDescription>
                        </div>
                        <AddItemDialog type="certificação" />
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {certifications.map(cert => (
                        <EditableImageCard key={cert.id} item={cert} />
                    ))}
                </CardContent>
            </Card>
            
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
        </div>
    </div>
  );
}

    