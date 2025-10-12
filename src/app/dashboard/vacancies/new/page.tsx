'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { courseCategories } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateVacancyContentAction } from '@/app/actions';
import type { GenerateVacancyContentOutput } from '@/ai/flows/generate-vacancy-content';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';


const formSchema = z.object({
  title: z.string().min(5, { message: 'O título da vaga deve ter pelo menos 5 caracteres.' }),
  category: z.string({ required_error: 'Selecione uma categoria.' }),
  location: z.string().min(3, { message: 'A localização é obrigatória.' }),
  type: z.enum(['Full-time', 'Part-time', 'Remote']),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewVacancyPage() {
  const [generatedContent, setGeneratedContent] = useState<GenerateVacancyContentOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      location: 'Luanda, Angola',
      type: 'Full-time'
    },
  });

  const handleGenerateContent: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    try {
      const result = await generateVacancyContentAction({title: data.title, category: data.category});
      setGeneratedContent(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar conteúdo',
        description: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveVacancy = async () => {
    if (!generatedContent || !form.formState.isValid || !user) {
        toast({
          variant: 'destructive',
          title: 'Faltam dados',
          description: 'Gere a descrição, preencha todos os campos e certifique-se que está autenticado.',
        });
        return;
      }
      setIsSaving(true);
  
      // In a real app, this would save to a database.
      // Here, we just simulate the process.
      setTimeout(() => {
        toast({
            title: "Vaga publicada! (Simulação)",
            description: "A sua vaga seria publicada e já estaria visível para os candidatos.",
          });
          setIsSaving(false);
          // Redirect to a page where the recruiter can see their vacancies.
          router.push('/dashboard/recruiter/vacancies');
      }, 1000);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Publicar Nova Vaga</CardTitle>
          <CardDescription>
            Preencha as informações básicas e deixe a IA gerar a descrição completa da vaga.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateContent)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Vaga</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Desenvolvedor Frontend Sênior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Luanda, Angola" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contrato</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Remote">Remoto</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando Descrição...</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Gerar Descrição com IA</>
                )}
              </Button>

              {generatedContent && (
                <div className="mt-8 pt-6 border-t space-y-6">
                  <h3 className="font-headline text-2xl">Descrição Gerada</h3>
                  <div className="space-y-4">
                    <TextareaWithLabel label="Descrição Geral" value={generatedContent.description} onChange={(e) => setGeneratedContent({...generatedContent, description: e.target.value})} rows={4} />
                    <TextareaWithLabel label="Responsabilidades (separado por nova linha)" value={generatedContent.responsibilities.join('\n')} onChange={(e) => setGeneratedContent({...generatedContent, responsibilities: e.target.value.split('\n')})} rows={6} />
                    <TextareaWithLabel label="Requisitos (separado por nova linha)" value={generatedContent.requirements.join('\n')} onChange={(e) => setGeneratedContent({...generatedContent, requirements: e.target.value.split('\n')})} rows={6} />
                  </div>
                  <Button onClick={handleSaveVacancy} disabled={isSaving} className="w-full bg-green-600 hover:bg-green-700">
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Publicar Vaga'}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component
const TextareaWithLabel = ({ label, ...props }: React.ComponentProps<typeof Textarea> & { label: string }) => (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <Textarea {...props} />
    </div>
  );
