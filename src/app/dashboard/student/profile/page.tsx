'use client';

import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const profileSchema = z.object({
    firstName: z.string().min(1, 'O nome é obrigatório.'),
    lastName: z.string().min(1, 'O apelido é obrigatório.'),
    academicTitle: z.string().min(3, 'O título académico é obrigatório.'),
    nationality: z.string().min(3, 'A nacionalidade é obrigatória.'),
    yearsOfExperience: z.coerce.number().min(0, 'Os anos de experiência devem ser um número positivo.'),
    functionalArea: z.string().min(3, 'A área funcional é obrigatória.'),
    latestCompany: z.string().optional(),
    latestRole: z.string().optional(),
    resumeUrl: z.string().url('Por favor, insira um URL válido para o seu CV.').optional().or(z.literal('')),
    // Campos adicionados - por agora como objetos únicos para simplicidade da UI
    academicHistory: z.object({
        institution: z.string().optional(),
        degree: z.string().optional(),
        year: z.string().optional(),
    }).optional(),
    workExperience: z.object({
        company: z.string().optional(),
        role: z.string().optional(),
        period: z.string().optional(),
        description: z.string().optional(),
    }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            latestCompany: '',
            latestRole: '',
            resumeUrl: '',
        }
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
                latestCompany: userProfile.latestCompany || '',
                latestRole: userProfile.latestRole || '',
                resumeUrl: userProfile.resumeUrl || '',
                // @ts-ignore
                academicHistory: userProfile.academicHistory?.[0] || { institution: '', degree: '', year: '' },
                // @ts-ignore
                workExperience: userProfile.workExperience?.[0] || { company: '', role: '', period: '', description: '' },
            });
        }
    }, [userProfile, form, user]);

    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        if (!user || !firestore) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Utilizador não autenticado.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userType = userProfile?.userType || 'student';
            
            // Estrutura os dados para arrays
            const finalData = {
                ...data,
                userType: userType, 
                email: user.email, 
                id: user.uid,
                academicHistory: data.academicHistory?.institution ? [data.academicHistory] : [],
                workExperience: data.workExperience?.company ? [data.workExperience] : [],
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
                    <h4 className="font-semibold text-lg">Preenchimento Automático</h4>
                    <p className="text-sm text-muted-foreground">
                        Poupe tempo! Carregue o seu CV em formato PDF e deixe a nossa IA preencher os campos do seu perfil por si.
                    </p>
                    <div className="flex gap-4 items-center">
                        <Input id="cv-upload" type="file" accept=".pdf" className="max-w-xs" />
                        <Button variant="outline">
                            <Wand2 className="mr-2 h-4 w-4" /> Analisar e Preencher
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
                                 <FormField
                                    control={form.control}
                                    name="academicHistory.institution"
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
                                    name="academicHistory.degree"
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
                                    name="academicHistory.year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ano de Conclusão</FormLabel>
                                            <FormControl><Input placeholder="Ex: 2015" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
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
                                <h4 className="font-semibold pt-4">Última Experiência</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <FormField
                                        control={form.control}
                                        name="workExperience.company"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Empresa</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="workExperience.role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Função</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                 <FormField
                                    control={form.control}
                                    name="workExperience.period"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Período</FormLabel>
                                            <FormControl><Input placeholder="Ex: Jan 2020 - Presente" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="workExperience.description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição das Responsabilidades</FormLabel>
                                            <FormControl><Textarea rows={4} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
