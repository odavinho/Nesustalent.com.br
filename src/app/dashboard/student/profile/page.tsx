'use client';

import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

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

            await setDoc(userDocRef, { ...data, userType: userType, email: user.email, id: user.uid }, { merge: true });
            
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                         <FormField
                            control={form.control}
                            name="academicTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título Académico</FormLabel>
                                    <FormControl><Input placeholder="Ex: Licenciado em Engenharia Informática" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                        </div>

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

                        <div className="grid md:grid-cols-2 gap-6">
                             <FormField
                                control={form.control}
                                name="latestCompany"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Empresa Mais Recente</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="latestRole"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Função Mais Recente</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
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
