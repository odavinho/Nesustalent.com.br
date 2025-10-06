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
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContentAction } from '@/app/actions';
import type { GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import Image from 'next/image';

const formSchema = z.object({
  courseName: z.string().min(5, { message: 'O nome do curso deve ter pelo menos 5 caracteres.' }),
  courseCategory: z.string({ required_error: 'Selecione uma categoria.' }),
  courseLevel: z.string({ required_error: 'Selecione um nível.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewCoursePage() {
  const [generatedContent, setGeneratedContent] = useState<GenerateCourseContentOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
    },
  });

  const handleGenerateContent: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    try {
      const result = await generateCourseContentAction(data);
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

  const handleSaveCourse = () => {
    // TODO: Implement saving logic to a database
    toast({
      title: "Curso salvo!",
      description: "O curso foi salvo com sucesso (simulação).",
    });
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Adicionar Novo Curso</CardTitle>
          <CardDescription>
            Preencha as informações básicas e deixe a IA gerar o resto do conteúdo para você.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateContent)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Curso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Gestão de Projetos Ágeis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseCategory"
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

              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível do Curso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                        <SelectItem value="Todos os níveis">Todos os níveis</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Gerar Conteúdo com IA</>
                )}
              </Button>
            </form>
          </Form>

          {generatedContent && (
            <div className="mt-8 pt-6 border-t space-y-6">
              <h3 className="font-headline text-2xl">Conteúdo Gerado</h3>
              
              {generatedContent.imageDataUri && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image src={generatedContent.imageDataUri} alt="Imagem gerada para o curso" fill className="object-cover" />
                </div>
              )}

              <div className="space-y-4">
                <Input label="ID do Curso" defaultValue={generatedContent.courseId} readOnly />
                <Input label="Duração" defaultValue={generatedContent.duration} readOnly />
                <Textarea label="Objetivo Geral" defaultValue={generatedContent.generalObjective} rows={4} />
                <Textarea label="O que vai aprender (separado por nova linha)" defaultValue={generatedContent.whatYouWillLearn.join('\\n')} rows={5} />

                <div>
                  <h4 className="font-semibold mb-2">Módulos</h4>
                  <div className="space-y-2">
                    {generatedContent.modules.map((module, index) => (
                      <Input key={index} label={`Módulo ${index + 1}`} defaultValue={`${module.title}: ${module.topics.join(', ')}`} />
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveCourse} className="w-full bg-green-600 hover:bg-green-700">
                Salvar Curso
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component to add a label to the Input
const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { label: string }
>(({ label, ...props }, ref) => (
  <div className="space-y-2">
    <FormLabel>{label}</FormLabel>
    <Input ref={ref} {...props} />
  </div>
));
InputWithLabel.displayName = "InputWithLabel";

const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea> & { label: string }
>(({ label, ...props }, ref) => (
    <div className="space-y-2">
    <FormLabel>{label}</FormLabel>
    <Textarea ref={ref} {...props} />
  </div>
));
TextareaWithLabel.displayName = "TextareaWithLabel";
