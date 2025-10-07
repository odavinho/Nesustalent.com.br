'use client';

import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, PlusCircle, Trash2 } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { extractProfileFromResumeAction } from '@/app/actions';

const fileToDataUri = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

const profileSchema = z.object({
    firstName: z.string().min(1, 'O nome é obrigatório.'),
    lastName: z.string().min(1, 'O apelido é obrigatório.'),
    academicTitle: z.string().min(3, 'O título académico é obrigatório.'),
    nationality: z.string().min(3, 'A nacionalidade é obrigatória.'),
    yearsOfExperience: z.coerce.number().min(0, 'Os anos de experiência devem ser um número positivo.'),
    functionalArea: z.string().min(3, 'A área funcional é obrigatória.'),
    skills: z.string().describe("Competências separadas por vírgula").optional(),
    resumeUrl: z.string().url('Por favor, insira um URL válido para o seu CV.').optional().or(z.literal('')),
    academicHistory: z.array(z.object({
        institution: z.string().min(1, "Instituição é obrigatória"),
        degree: z.string().min(1, "Curso/Grau é obrigatório"),
        year: z.string().min(4, "Ano é obrigatório"),
    })).optional(),
    workExperience: z.array(z.object({
        company: z.string().min(1, "Empresa é obrigatória"),
        role: z.string().min(1, "Função é obrigatória"),
        period: z.string().min(1, "Período é obrigatório"),
        description: z.string().optional(),
    })).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [cvFile, setCvFile] = useState<File | null>(null);

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            academicTitle: '',
            nationality: '',
            yearsOfExperience: 0,
            functionalArea: '',
            skills: '',
            resumeUrl: '',
            academicHistory: [],
            workExperience: [],
        }
    });

    const { fields: academicFields, append: appendAcademic, remove: removeAcademic } = useFieldArray({
        control: form.control,
        name: "academicHistory"
    });

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
        control: form.control,
        name: "workExperience"
    });

    useEffect(() => {
        if (userProfile) {
            const [firstName, ...lastNameParts] = user?.displayName?.split(' ') || ['', ''];
            form.reset({
                firstName: userProfile.firstName || firstName,
                lastName: userProfile.lastName || lastNameParts.join(' '),
                academicTitle: userProfile.academicTitle || '',
                nationality: userProfile.nationality || '',
                yearsOfExperience: userProfile.yearsOfExperience || 0,
                functionalArea: userProfile.functionalArea || '',
                // @ts-ignore
                skills: userProfile.skills?.join(', ') || '',
                resumeUrl: userProfile.resumeUrl || '',
                academicHistory: userProfile.academicHistory || [],
                workExperience: userProfile.workExperience || [],
            });
        }
    }, [userProfile, form, user]);

    const handleAnalyzeAndFill = async () => {
        if (!cvFile) {
            toast({
                variant: 'destructive',
                title: 'Nenhum ficheiro selecionado',
                description: 'Por favor, carregue o seu CV em formato PDF ou DOCX.',
            });
            return;
        }
        setIsAnalyzing(true);
        try {
            const resumeDataUri = await fileToDataUri(cvFile);
            const result = await extractProfileFromResumeAction({ resumeDataUri });

            form.reset({
                ...form.getValues(),
                ...result,
                skills: result.skills?.join(', ') || '',
            });

            toast({
                title: 'Perfil preenchido!',
                description: 'Os dados do seu CV foram preenchidos. Por favor, reveja e salve.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Erro na Análise',
                description: error instanceof Error ? error.message : 'Não foi possível analisar o CV.',
            });
        } finally {
            setIsAnalyzing(false);
        }
    };


    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        if (!user || !firestore) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Utilizador não autenticado.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userType = userProfile?.userType || 'student';
            
            const finalData = {
                ...data,
                // @ts-ignore
                skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
                userType: userType, 
                email: user.email, 
                id: user.uid,
            };

            await setDoc(userDocRef, finalData, { merge: true });
            
            toast({ title: 'Sucesso!', description: 'O seu perfil foi atualizado.' });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o seu perfil.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (isUserLoading || isProfileLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Meu Perfil Profissional</CardTitle>
                <CardDescription>
                    Mantenha suas informações atualizadas. Um perfil completo aumenta suas chances de ser encontrado por recrutadores.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mb-8 p-6 border rounded-lg bg-secondary/50">
                    <h4 className="font-semibold text-lg">Preenchimento Automático com IA</h4>
                    <p className="text-sm text-muted-foreground">
                        Poupe tempo! Carregue o seu CV em formato PDF ou DOCX e deixe a nossa IA preencher os campos do seu perfil por si.
                    </p>
                    <div className="flex gap-4 items-center">
                        <Input 
                            id="cv-upload" 
                            type="file" 
                            accept=".pdf,.doc,.docx" 
                            className="max-w-xs" 
                            onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                        />
                        <Button variant="outline" onClick={handleAnalyzeAndFill} disabled={isAnalyzing}>
                            {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                             Analisar e Preencher
                        </Button>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <div>
                            <h3 className="font-headline text-xl mb-4">Informação Pessoal</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apelido</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="nationality"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nacionalidade</FormLabel>
                                                <FormControl><Input placeholder="Ex: Angolana" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                             <h3 className="font-headline text-xl mb-4">Formação Académica</h3>
                             <div className="space-y-6">
                                {academicFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                                     <FormField
                                        control={form.control}
                                        name={`academicHistory.${index}.institution`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instituição de Ensino</FormLabel>
                                                <FormControl><Input placeholder="Ex: Universidade Agostinho Neto" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name={`academicHistory.${index}.degree`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Curso/Grau</FormLabel>
                                                <FormControl><Input placeholder="Ex: Licenciatura em Engenharia Informática" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`academicHistory.${index}.year`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ano de Conclusão</FormLabel>
                                                <FormControl><Input placeholder="Ex: 2015" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeAcademic(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendAcademic({ institution: '', degree: '', year: '' })}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Adicionar Formação
                                </Button>
                             </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-headline text-xl mb-4">Experiência Profissional</h3>
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="academicTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título Profissional Principal</FormLabel>
                                            <FormControl><Input placeholder="Ex: Engenheiro de Software Sénior" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="yearsOfExperience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Anos de Experiência</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="functionalArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Área Funcional Principal</FormLabel>
                                                <FormControl><Input placeholder="Ex: Tecnologia da Informação" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {workFields.map((field, index) => (
                                    <div key={field.id} className="p-4 border rounded-md relative space-y-4 pt-6">
                                        <h4 className="font-semibold absolute -top-3 bg-background px-2">Experiência {index + 1}</h4>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name={`workExperience.${index}.company`}
                                                render={({ field }) => (
                                                    <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`workExperience.${index}.role`}
                                                render={({ field }) => (
                                                    <FormItem><FormLabel>Função</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`workExperience.${index}.period`}
                                            render={({ field }) => (
                                                <FormItem><FormLabel>Período</FormLabel><FormControl><Input placeholder="Ex: Jan 2020 - Presente" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`workExperience.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem><FormLabel>Descrição das Responsabilidades</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                                            )}
                                        />
                                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                        </Button>
                                    </div>
                                ))}
                                 <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendWork({ company: '', role: '', period: '', description: '' })}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Adicionar Experiência
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-headline text-xl mb-4">Competências</h3>
                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Principais Competências</FormLabel>
                                        <FormControl><Textarea placeholder="Ex: React, Gestão de Projetos, Liderança,..." rows={3} {...field} /></FormControl>
                                        <FormDescription>Separe as competências por vírgulas.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Separator />
                        
                        <div>
                             <h3 className="font-headline text-xl mb-4">Currículo</h3>
                             <FormField
                                control={form.control}
                                name="resumeUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL do CV (LinkedIn ou Google Drive)</FormLabel>
                                        <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                        <FormDescription>Certifique-se de que o link é público para que os recrutadores possam visualizá-lo.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar Alterações'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

function ProfileSkeleton() {
    return (
         <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                </div>
                <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-11 w-full" />
            </CardContent>
        </Card>
    )
}
