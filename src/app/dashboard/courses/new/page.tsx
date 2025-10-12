'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCourseCategories } from '@/lib/course-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, ArrowLeft, Link as LinkIcon, PlusCircle, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContentAction, addCourseAction } from '@/app/actions';
import type { GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import Image from 'next/image';
import type { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

const moduleSchema = z.object({
  title: z.string().min(1, "O título do módulo é obrigatório."),
  topics: z.array(z.object({ value: z.string().min(1, "O tópico não pode estar vazio.") })),
  videoUrl: z.string().url("Insira um URL válido.").optional().or(z.literal('')),
});

const formSchema = z.object({
  // AI generation part
  courseName: z.string().min(5, { message: 'O nome do curso deve ter pelo menos 5 caracteres.' }),
  courseCategory: z.string({ required_error: 'Selecione uma categoria.' }),
  courseLevel: z.string({ required_error: 'Selecione um nível.' }),
  
  // Full course content part
  id: z.string().optional(),
  format: z.enum(['Online', 'Presencial', 'Híbrido'], { required_error: 'Selecione um formato.' }),
  duration: z.string().optional(),
  generalObjective: z.string().optional(),
  whatYouWillLearn: z.string().optional(),
  imageDataUri: z.string().optional(),
  modules: z.array(moduleSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewCoursePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showGeneratedContent, setShowGeneratedContent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {user} = useUser();
  const courseCategories = getCourseCategories();


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      format: 'Online',
      modules: []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "modules"
  });

  const handleGenerateContent: SubmitHandler<Pick<FormValues, 'courseName' | 'courseCategory' | 'courseLevel'>> = async (data) => {
    setIsGenerating(true);
    setShowGeneratedContent(false);
    try {
      const result = await generateCourseContentAction(data);
      form.setValue('id', result.courseId);
      form.setValue('duration', result.duration);
      form.setValue('generalObjective', result.generalObjective);
      form.setValue('whatYouWillLearn', result.whatYouWillLearn.join('\n'));
      form.setValue('imageDataUri', result.imageDataUri);
      
      const modulesForForm = result.modules.map(m => ({
        ...m,
        topics: m.topics.map(t => ({ value: t })),
        videoUrl: '',
      }));
      form.setValue('modules', modulesForForm);

      setShowGeneratedContent(true);
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


  const handleSaveCourse: SubmitHandler<FormValues> = async (data) => {
    if (!user) return;
    setIsSaving(true);
    
    const courseData: Omit<Course, 'id'> = {
      id: data.id!, // The ID is now part of the form
      name: data.courseName,
      category: data.courseCategory,
      format: data.format,
      imageId: `course-image-${data.id}`, // Placeholder logic
      duration: data.duration || '',
      generalObjective: data.generalObjective || '',
      whatYouWillLearn: data.whatYouWillLearn?.split('\n').filter(line => line.trim() !== '') || [],
      modules: data.modules?.map(m => ({
          title: m.title,
          topics: m.topics.map(t => t.value),
          videoUrl: m.videoUrl,
      })) || [],
    };

    try {
      // In a real app, you'd handle the upload of the image if imageDataUri is present.
      const result = await addCourseAction(courseData);

      if (result.success) {
        toast({
            title: "Curso salvo!",
            description: "O curso foi adicionado com sucesso.",
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
            <form onSubmit={form.handleSubmit(handleSaveCourse)} className="space-y-6">
              {/* --- AI Generation Section --- */}
              <div className="space-y-6 p-4 border rounded-md">
                <h3 className="font-semibold text-lg">1. Gerar Conteúdo Base com IA</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="courseName" render={({ field }) => ( <FormItem><FormLabel>Nome do Curso</FormLabel><FormControl><Input placeholder="Ex: Gestão de Projetos Ágeis" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="courseCategory" render={({ field }) => ( <FormItem><FormLabel>Categoria</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger></FormControl><SelectContent>{courseCategories.map((c) => (<SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="courseLevel" render={({ field }) => ( <FormItem><FormLabel>Nível do Curso</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o nível" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Iniciante">Iniciante</SelectItem><SelectItem value="Intermediário">Intermediário</SelectItem><SelectItem value="Avançado">Avançado</SelectItem><SelectItem value="Todos os níveis">Todos os níveis</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                <Button type="button" onClick={form.handleSubmit(handleGenerateContent)} disabled={isGenerating} className="w-full">
                  {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...</> : <><Wand2 className="mr-2 h-4 w-4" /> Gerar Conteúdo</> }
                </Button>
              </div>

              {isGenerating && (
                <div className="text-center pt-6"><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /><p className="mt-2 text-muted-foreground">Aguarde...</p></div>
              )}
    
              {showGeneratedContent && (
                <div className="mt-8 pt-6 border-t space-y-6">
                  <h3 className="font-headline text-2xl">2. Edite e Complete o Conteúdo</h3>
                  
                  {form.watch('imageDataUri') && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                        <Image src={form.watch('imageDataUri')!} alt="Imagem gerada para o curso" fill className="object-cover" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <FormField control={form.control} name="format" render={({ field }) => ( <FormItem><FormLabel>Formato do Curso</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o formato" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Online">Online</SelectItem><SelectItem value="Presencial">Presencial</SelectItem><SelectItem value="Híbrido">Híbrido</SelectItem></SelectContent></Select><FormMessage /></FormItem>)}/>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="id" render={({ field }) => ( <FormItem><FormLabel>ID do Curso</FormLabel><FormControl><Input {...field} readOnly /></FormControl><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name="duration" render={({ field }) => ( <FormItem><FormLabel>Duração</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </div>
                    <FormField control={form.control} name="generalObjective" render={({ field }) => ( <FormItem><FormLabel>Objetivo Geral</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="whatYouWillLearn" render={({ field }) => ( <FormItem><FormLabel>O que vai aprender (um por linha)</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem> )} />
    
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Módulos do Curso</h4>
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                           <ModuleField key={field.id} moduleIndex={index} form={form} onRemove={() => remove(index)} />
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => append({ title: '', topics: [{value: ''}], videoUrl: '' })} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4"/>Adicionar Módulo
                      </Button>
                    </div>
                  </div>
    
                  <Button type="submit" disabled={isSaving} className="w-full bg-green-600 hover:bg-green-700">
                     {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Salvar Curso</>}
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


function ModuleField({ moduleIndex, form, onRemove }: { moduleIndex: number; form: any; onRemove: () => void; }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.topics`
  });

  const courseFormat = form.watch('format');

  return (
    <div className="p-4 border rounded-lg relative bg-secondary/30">
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-bold text-md">Módulo {moduleIndex + 1}</h5>
        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.title`}
          render={({ field }) => (
            <FormItem><FormLabel>Título do Módulo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}
        />
        
        <div className='space-y-2'>
            <FormLabel>Tópicos da Aula</FormLabel>
            {fields.map((topicField, topicIndex) => (
                <div key={topicField.id} className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.topics.${topicIndex}.value`}
                        render={({ field }) => (
                           <FormItem className='flex-grow'><FormControl><Input {...field} placeholder={`Tópico ${topicIndex + 1}`} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                     <Button type="button" variant="ghost" size="icon" onClick={() => remove(topicIndex)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="text-xs h-8" onClick={() => append({ value: '' })}>
                <PlusCircle className="mr-2 h-3 w-3"/>Adicionar Tópico
            </Button>
        </div>
        
        {(courseFormat === 'Online' || courseFormat === 'Híbrido') && (
           <FormField
            control={form.control}
            name={`modules.${moduleIndex}.videoUrl`}
            render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Videoaula</FormLabel>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                        <Input placeholder="https://www.youtube.com/watch?v=..." className="pl-9" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
            )}
           />
        )}
      </div>
    </div>
  );
}
