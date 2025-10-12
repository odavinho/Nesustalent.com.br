'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { courseCategories } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CalendarIcon, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams, notFound } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { getVacancyById, updateVacancy } from '@/lib/vacancy-service';
import type { Vacancy } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


const formSchema = z.object({
  title: z.string().min(5, { message: 'O título da vaga deve ter pelo menos 5 caracteres.' }),
  category: z.string({ required_error: 'Selecione uma área funcional.' }),
  industry: z.string().min(3, { message: 'A indústria é obrigatória.' }),
  minExperience: z.string({ required_error: 'Selecione a experiência mínima.' }).optional(),
  demandLevel: z.string({ required_error: 'Selecione o grau de exigência.' }).optional(),
  location: z.string().min(3, { message: 'A localização é obrigatória.' }),
  type: z.enum(['Full-time', 'Part-time', 'Remote']),
  numberOfVacancies: z.coerce.number().min(1, 'Deve haver pelo menos uma vaga.'),
  closingDate: z.date().optional(),
  salaryRange: z.string().optional(),
  showSalary: z.boolean().default(true),
  languages: z.string().optional(),
  requiredNationality: z.string().optional(),
  employerName: z.string().min(1, 'O nome do empregador é obrigatório.'),
  aboutEmployer: z.string().min(10, 'A descrição sobre o empregador é obrigatória.'),
  hideEmployerData: z.boolean().default(false),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  responsibilities: z.string().min(1, 'As responsabilidades são obrigatórias.'),
  requirements: z.string().min(1, 'Os requisitos são obrigatórios.'),
  screeningQuestions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const toDate = (date: any): Date | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) return date;
  if (date.toDate) return date.toDate(); // Firebase Timestamp
  return new Date(date);
};

export default function EditVacancyPage() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params.id as string;
  
  const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      industry: '',
      location: '',
      type: 'Full-time',
      numberOfVacancies: 1,
      showSalary: true,
      hideEmployerData: false,
    }
  });

  useEffect(() => {
    if (vacancyId) {
      const foundVacancy = getVacancyById(vacancyId);
      setVacancy(foundVacancy);
      if (foundVacancy) {
        form.reset({
          ...foundVacancy,
          closingDate: toDate(foundVacancy.closingDate),
          languages: foundVacancy.languages?.join(', '),
          responsibilities: foundVacancy.responsibilities.join('\n'),
          requirements: foundVacancy.requirements.join('\n'),
          screeningQuestions: foundVacancy.screeningQuestions?.join('\n'),
        });
      }
    }
  }, [vacancyId, form]);
  
  const handleUpdateVacancy: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    
    const vacancyDataToUpdate = {
        ...data,
        responsibilities: data.responsibilities.split('\n').filter(r => r.trim() !== ''),
        requirements: data.requirements.split('\n').filter(q => q.trim() !== ''),
        screeningQuestions: data.screeningQuestions?.split('\n').filter(q => q.trim() !== ''),
        languages: data.languages?.split(',').map(l => l.trim()).filter(l => l),
    };

    if (data.hideEmployerData && vacancy) {
        vacancyDataToUpdate.employerName = `Empresa líder no setor de ${vacancy.industry}`;
        vacancyDataToUpdate.aboutEmployer = `Oportunidade confidencial numa empresa de referência no setor de ${vacancy.industry}.`;
    }

    try {
        updateVacancy(vacancyId, vacancyDataToUpdate);
        toast({
          title: "Vaga Atualizada!",
          description: "As alterações na vaga foram guardadas com sucesso.",
        });
        router.push('/dashboard/recruiter/vacancies');
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Erro ao Atualizar",
            description: "Não foi possível guardar as alterações. Tente novamente.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (vacancy === undefined) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"><Skeleton className="h-96" /></div>;
  }

  if (vacancy === null) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Editar Vaga</CardTitle>
          <CardDescription>
            Faça as alterações necessárias nos detalhes da vaga e guarde.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateVacancy)} className="space-y-6">
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição Geral</FormLabel>
                            <FormControl>
                                <Textarea rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Responsabilidades (uma por linha)</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                       <FormItem>
                            <FormLabel>Requisitos (um por linha)</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="screeningQuestions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perguntas de Triagem (uma por linha)</FormLabel>
                            <FormControl>
                                <Textarea rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

              {/* Other form fields */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Localização</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="type" render={({ field }) => (<FormItem><FormLabel>Tipo de Contrato</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Remote">Remoto</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="numberOfVacancies" render={({ field }) => (<FormItem><FormLabel>Nº de Vagas</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="salaryRange" render={({ field }) => (<FormItem><FormLabel>Salário Oferecido</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="showSalary" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-6"><div className="space-y-0.5"><FormLabel>Mostrar Salário</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
              </div>
              <FormField control={form.control} name="closingDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Data Limite</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><>{field.value ? format(field.value, "PPP", { locale: pt }) : <span>Escolha uma data</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
              
              <div className="border-t pt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
