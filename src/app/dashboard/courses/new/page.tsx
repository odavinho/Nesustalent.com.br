'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCourseCategories } from '@/lib/course-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, ArrowLeft, Link as LinkIcon, PlusCircle, Trash2, Save, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addCourseAction, generateCourseContentAction, generateModuleAssessmentAction } from '@/app/actions';
import type { GenerateCourseContentOutput, GenerateModuleAssessmentOutput, ModuleAssessmentFormValues } from '@/lib/types';
import Image from 'next/image';
import type { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModuleAssessmentFormSchema } from '@/lib/schemas';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const moduleSchema = z.object({
  title: z.string().min(1, "O título do módulo é obrigatório."),
  topics: z.array(z.object({ value: z.string().min(1, "O tópico não pode estar vazio.") })),
  videoUrl: z.string().url("Insira um URL válido.").optional().or(z.literal('')),
});

const formSchema = z.object({
  courseName: z.string().min(5, { message: 'O nome do curso deve ter pelo menos 5 caracteres.' }),
  courseCategory: z.string({ required_error: 'Selecione uma categoria.' }),
  courseLevel: z.string({ required_error: 'Selecione um nível.' }),
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
      if (!result) {
        throw new Error("A geração de conteúdo não retornou nenhum resultado.");
      }
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
      toast({
        title: "Conteúdo Gerado!",
        description: "O conteúdo base para o seu curso foi criado. Edite e salve quando estiver pronto.",
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


  const handleSaveCourse: SubmitHandler<FormValues> = async (data) => {
    if (!user) return;
    setIsSaving(true);
    
    if (!data.id) {
        toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'O ID do curso não foi gerado. Tente gerar o conteúdo novamente.',
        });
        setIsSaving(false);
        return;
    }

    const courseData: Omit<Course, 'id'> & {id: string} = {
      id: data.id,
      name: data.courseName,
      category: data.courseCategory,
      format: data.format,
      imageId: `course-image-${data.id}`,
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
  const moduleTitle = form.watch(`modules.${moduleIndex}.title`);
  const moduleTopics = form.watch(`modules.${moduleIndex}.topics`);

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
        <ModuleAssessmentGenerator 
            moduleTitle={moduleTitle} 
            topics={moduleTopics?.map((t: {value: string}) => t.value) || []} 
        />
      </div>
    </div>
  );
}


function ModuleAssessmentGenerator({ moduleTitle, topics }: { moduleTitle: string, topics: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const assessmentForm = useForm<ModuleAssessmentFormValues>({
    resolver: zodResolver(ModuleAssessmentFormSchema),
    defaultValues: {
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: assessmentForm.control,
    name: 'questions',
  });

  const configForm = useForm({
    defaultValues: {
      numMultipleChoice: 2,
      numShortAnswer: 1,
      level: 'Médio' as 'Fácil' | 'Médio' | 'Difícil',
    },
  });

  const handleGenerate = async (configData: any) => {
    if (!moduleTitle || topics.length === 0 || topics.every(t => !t)) {
        toast({
            variant: "destructive",
            title: "Faltam Dados",
            description: "O módulo precisa de um título e pelo menos um tópico para gerar um teste.",
        });
        return;
    }
    setIsGenerating(true);
    assessmentForm.reset({ questions: [] });
    try {
        const result = await generateModuleAssessmentAction({ moduleTitle, topics: topics.filter(t => t), ...configData });
        const questionsForForm = result.questions.map(q => ({
          ...q,
          options: q.options ? q.options.map(opt => ({ value: opt })) : [],
        }));
        assessmentForm.reset({ questions: questionsForForm });
        setHasGenerated(true);
        toast({
            title: "Pré-visualização do Teste Gerada!",
            description: "Pode agora rever, editar e guardar o teste."
        });
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Erro ao gerar teste',
            description: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
        });
    } finally {
        setIsGenerating(false);
    }
  };
  
  const handleSaveTest = (data: ModuleAssessmentFormValues) => {
    // Lógica para salvar o teste (atualmente simulada)
    console.log("Saving test:", data);
    toast({
        title: "Teste Salvo (Simulado)",
        description: `O teste para o módulo "${moduleTitle}" foi salvo com sucesso.`,
    });
    setIsOpen(false);
  }

  const addNewQuestion = (type: 'multiple-choice' | 'short-answer') => {
    append({
        question: '',
        type,
        options: type === 'multiple-choice' ? [{value: ''}, {value: ''}, {value: ''}, {value: ''}] : [],
        correctAnswerIndex: type === 'multiple-choice' ? 0 : undefined,
        shortAnswer: type === 'short-answer' ? '' : undefined,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-2">
              <Bot className="mr-2 h-4 w-4" /> Gerir/Criar Teste de Avaliação
          </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70vw] h-[90vh] flex flex-col">
          <DialogHeader>
              <DialogTitle>Gerador de Teste para: {moduleTitle}</DialogTitle>
              <DialogDescription>
                  Configure, gere com IA, edite e salve o teste para este módulo.
              </DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden flex-grow'>
            {/* Coluna de Configuração */}
            <div className='lg:col-span-1 border-r pr-6 flex flex-col'>
                <h4 className='font-semibold mb-4'>1. Configurar e Gerar</h4>
                 <Form {...configForm}>
                    <form onSubmit={configForm.handleSubmit(handleGenerate)} className="space-y-4">
                        <FormField control={configForm.control} name="numMultipleChoice" render={({ field }) => ( <FormItem><FormLabel>Nº de Múltipla Escolha</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem> )} />
                        <FormField control={configForm.control} name="numShortAnswer" render={({ field }) => ( <FormItem><FormLabel>Nº de Resposta Curta</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem> )} />
                        <FormField control={configForm.control} name="level" render={({ field }) => ( <FormItem><FormLabel>Nível</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Fácil">Fácil</SelectItem><SelectItem value="Médio">Médio</SelectItem><SelectItem value="Difícil">Difícil</SelectItem></SelectContent></Select></FormItem> )} />
                         <Button type="submit" disabled={isGenerating} className="w-full">
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4"/>}
                            {hasGenerated ? 'Gerar Novamente' : 'Gerar Teste com IA'}
                        </Button>
                    </form>
                 </Form>
            </div>
            
            {/* Coluna de Edição */}
            <div className='lg:col-span-2 overflow-y-auto pr-2 flex flex-col'>
              <h4 className='font-semibold mb-4'>2. Pré-visualizar e Editar Teste</h4>
              {isGenerating && <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              
              {!isGenerating && !hasGenerated && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>Gere um teste com IA ou adicione perguntas manualmente.</p>
                </div>
              )}

              {hasGenerated && (
                  <Form {...assessmentForm}>
                    <form onSubmit={assessmentForm.handleSubmit(handleSaveTest)} className="space-y-4">
                        {fields.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md relative bg-background">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                            <FormField control={assessmentForm.control} name={`questions.${index}.question`} render={({ field }) => ( <FormItem><FormLabel>Pergunta {index + 1}</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage/></FormItem> )} />
                            
                            {item.type === 'multiple-choice' && (
                            <div className='mt-4 space-y-2'>
                                <FormLabel>Opções (Marque a correta)</FormLabel>
                                <Controller
                                    control={assessmentForm.control}
                                    name={`questions.${index}.correctAnswerIndex`}
                                    render={({ field: radioField }) => (
                                        <RadioGroup
                                            onValueChange={(value) => radioField.onChange(parseInt(value))}
                                            value={radioField.value?.toString()}
                                            className="space-y-1"
                                        >
                                            <div className='space-y-2'>
                                                {Array.from({length: 4}).map((_, optionIndex) => (
                                                    <FormField
                                                    key={`${item.id}-opt-${optionIndex}`}
                                                    control={assessmentForm.control}
                                                    name={`questions.${index}.options.${optionIndex}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className='flex items-center gap-2 space-y-0'>
                                                        <FormControl>
                                                            <RadioGroupItem value={optionIndex.toString()} />
                                                        </FormControl>
                                                        <Input {...field} placeholder={`Opção ${optionIndex + 1}`} className="flex-1"/>
                                                        </FormItem>
                                                    )}
                                                    />
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    )}
                                />
                            </div>
                            )}

                            {item.type === 'short-answer' && (
                            <FormField control={assessmentForm.control} name={`questions.${index}.shortAnswer`} render={({ field }) => ( <FormItem className='mt-2'><FormLabel>Resposta Ideal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem> )} />
                            )}

                        </div>
                        ))}
                        
                        <Separator />
                        
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => addNewQuestion('multiple-choice')}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Múltipla Escolha</Button>
                            <Button type="button" variant="outline" onClick={() => addNewQuestion('short-answer')}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Resposta Curta</Button>
                        </div>

                        <DialogFooter className="pt-4 !justify-end">
                        <Button type="submit" disabled={fields.length === 0} size="lg">
                            <Save className="mr-2 h-4 w-4" /> Guardar Teste no Módulo
                        </Button>
                        </DialogFooter>
                    </form>
                  </Form>
                )}

            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
