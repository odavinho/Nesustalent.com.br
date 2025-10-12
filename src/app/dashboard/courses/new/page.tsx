'use client';

import { useState, forwardRef, ComponentProps } from 'react';
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
import { Loader2, Wand2, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContentAction, addCourseAction } from '@/app/actions';
import type { GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import Image from 'next/image';
import type { Course, CourseModule } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  courseName: z.string().min(5, { message: 'O nome do curso deve ter pelo menos 5 caracteres.' }),
  courseCategory: z.string({ required_error: 'Selecione uma categoria.' }),
  courseLevel: z.string({ required_error: 'Selecione um nível.' }),
  courseFormat: z.enum(['Online', 'Presencial', 'Híbrido'], { required_error: 'Selecione um formato.' }),
});

type FormValues = z.infer<typeof formSchema>;

type GeneratedContent = GenerateCourseContentOutput & {
    modules: (CourseModule & { id: string, videoUrl?: string })[];
};


export default function NewCoursePage() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      courseFormat: 'Online',
    },
  });

  const handleGenerateContent: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    try {
      const result = await generateCourseContentAction(data);
      setGeneratedContent({
        ...result,
        modules: result.modules.map(m => ({ ...m, id: `mod-${Math.random().toString(36).substr(2, 9)}`, videoUrl: '' }))
      });
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

  const handleVideoUrlChange = (moduleIndex: number, url: string) => {
    if (!generatedContent) return;
    const newModules = [...generatedContent.modules];
    newModules[moduleIndex].videoUrl = url;
    setGeneratedContent({ ...generatedContent, modules: newModules });
  };


  const handleSaveCourse = async () => {
    const courseFormat = form.getValues().courseFormat;
    if (!generatedContent || !form.getValues().courseName) {
      toast({
        variant: 'destructive',
        title: 'Faltam dados',
        description: 'Gere o conteúdo do curso e preencha todos os campos obrigatórios antes de salvar.',
      });
      return;
    }
    
    setIsSaving(true);
    
    const courseData: Omit<Course, 'id'> = {
      name: form.getValues().courseName,
      category: form.getValues().courseCategory,
      format: courseFormat,
      imageId: `course-image-${generatedContent.courseId}`, // Placeholder imageId
      duration: generatedContent.duration,
      generalObjective: generatedContent.generalObjective,
      whatYouWillLearn: generatedContent.whatYouWillLearn,
      modules: generatedContent.modules.map(m => ({
          title: m.title,
          topics: m.topics,
          videoUrl: m.videoUrl,
      })),
    };

    try {
      const result = await addCourseAction(courseData);
      if (result.success) {
        toast({
            title: "Curso salvo! (Simulado)",
            description: "O curso foi adicionado com sucesso à lista de cursos.",
        });
        router.push('/dashboard/admin/courses');
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar o curso',
        description: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
      });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
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

                <div className="grid md:grid-cols-2 gap-6">
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
                    <FormField
                        control={form.control}
                        name="courseFormat"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Formato do Curso</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecione o formato" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Online">Online</SelectItem>
                                <SelectItem value="Presencial">Presencial</SelectItem>
                                <SelectItem value="Híbrido">Híbrido (Online e Presencial)</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Gerar Conteúdo com IA</>
                )}
              </Button>
              
              {isGenerating && (
                <div className="mt-8 pt-6 border-t text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-muted-foreground">A IA está a criar o seu curso, por favor aguarde...</p>
                </div>
              )}
    
              {generatedContent && (
                <div className="mt-8 pt-6 border-t space-y-6">
                  <h3 className="font-headline text-2xl">Conteúdo Gerado e Editável</h3>
                  
                  {generatedContent.imageDataUri && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                        <Image src={generatedContent.imageDataUri} alt="Imagem gerada para o curso" fill className="object-cover" />
                    </div>
                  )}
    
                  <div className="space-y-4">
                    <InputWithLabel label="ID do Curso" defaultValue={generatedContent.courseId} readOnly />
                    <InputWithLabel label="Duração" defaultValue={generatedContent.duration} />
                    <TextareaWithLabel label="Objetivo Geral" defaultValue={generatedContent.generalObjective} rows={4} />
                    <TextareaWithLabel label="O que vai aprender (separado por nova linha)" defaultValue={generatedContent.whatYouWillLearn.join('\n')} rows={5} />
    
                    <div>
                      <h4 className="font-semibold mb-2">Módulos</h4>
                      <div className="space-y-4">
                        {generatedContent.modules.map((module, index) => (
                          <div key={module.id} className="p-4 border rounded-md">
                            <InputWithLabel label={`Título do Módulo ${index + 1}`} defaultValue={module.title} />
                            <TextareaWithLabel className="mt-2" label={`Tópicos (separados por vírgula)`} defaultValue={module.topics.join(', ')} />
    
                            {(form.getValues().courseFormat === 'Online' || form.getValues().courseFormat === 'Híbrido') && (
                               <div className='mt-4'>
                                 <FormLabel>URL da Videoaula</FormLabel>
                                 <div className="relative">
                                   <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                   <Input 
                                     placeholder="https://www.youtube.com/watch?v=..." 
                                     className="pl-9" 
                                     value={module.videoUrl || ''}
                                     onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                                   />
                                 </div>
                               </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
    
                  <Button onClick={handleSaveCourse} disabled={isSaving} className="w-full bg-green-600 hover:bg-green-700">
                     {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar Curso'}
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

// Helper component to add a label to the Input
const InputWithLabel = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input> & { label: string }
>(({ label, ...props }, ref) => (
  <div className="space-y-2">
    <FormLabel>{label}</FormLabel>
    <Input ref={ref} {...props} />
  </div>
));
InputWithLabel.displayName = "InputWithLabel";

const TextareaWithLabel = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof Textarea> & { label: string }
>(({ label, className, ...props }, ref) => (
    <div className={cn("space-y-2", className)}>
    <FormLabel>{label}</FormLabel>
    <Textarea ref={ref} {...props} />
  </div>
));
TextareaWithLabel.displayName = "TextareaWithLabel";
