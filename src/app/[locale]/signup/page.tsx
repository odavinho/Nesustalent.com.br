'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserProfile } from '@/lib/types';


const formSchema = z.object({
  userType: z.enum(['student', 'instructor', 'recruiter'], { required_error: 'Por favor, selecione um papel.' }),
  firstName: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  lastName: z.string().min(2, 'O apelido deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  companyName: z.string().optional(),
  specialization: z.string().optional(),
}).refine(data => {
    if (data.userType === 'recruiter' && (!data.companyName || data.companyName.trim() === '')) {
        return false;
    }
    return true;
}, {
    message: 'O nome da empresa é obrigatório para recrutadores.',
    path: ['companyName'],
}).refine(data => {
    if (data.userType === 'instructor' && (!data.specialization || data.specialization.trim() === '')) {
        return false;
    }
    return true;
}, {
    message: 'A área de especialização é obrigatória para formadores.',
    path: ['specialization'],
});


type FormValues = z.infer<typeof formSchema>;


export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: 'student',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      companyName: '',
      specialization: '',
    }
  });

  const selectedRole = form.watch('userType');

  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // 2. Update Auth user profile (displayName)
      await updateProfile(user, { displayName: `${data.firstName} ${data.lastName}` });

      // 3. Create user document in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const newUserProfile: UserProfile = {
        id: user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        // Add other fields as necessary, potentially empty initially
        academicTitle: data.userType === 'instructor' ? data.specialization : undefined,
      };

      await setDoc(userDocRef, newUserProfile);

      toast({
        title: 'Conta criada com sucesso!',
        description: `Bem-vindo(a)! Você já pode fazer o login.`,
      });
      router.push('/login');

    } catch (error: any) {
        console.error("Signup Error:", error);
        let description = 'Ocorreu um erro. Tente novamente.';
        if (error.code === 'auth/email-already-in-use') {
            description = 'Este endereço de e-mail já está a ser utilizado por outra conta.';
        } else if (error.code === 'permission-denied') {
             const permissionError = new FirestorePermissionError({
                path: `users/${auth.currentUser?.uid || 'new_user'}`,
                operation: 'create',
             });
             errorEmitter.emit('permission-error', permissionError);
             return; 
        }

        toast({
            variant: 'destructive',
            title: 'Erro ao criar conta',
            description: description,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
              <Link href="/" className="inline-block">
                  <Logo />
              </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline">
              Crie sua conta gratuita
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                Faça login
              </Link>
            </p>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>Cadastre-se</CardTitle>
                  <CardDescription>Para testar os diferentes painéis, use os emails 'admin@nexustalent.com', 'instructor@nexustalent.com' ou 'recruiter@nexustalent.com' e selecione o papel correspondente abaixo.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eu sou um...</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Selecione o seu papel" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="student">Candidato / Formando</SelectItem>
                                            <SelectItem value="recruiter">Recrutador / Empresa</SelectItem>
                                            <SelectItem value="instructor">Formador / Instrutor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {selectedRole === 'recruiter' && (
                             <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da Empresa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="O nome da sua empresa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="O seu nome" {...field} />
                                        </FormControl>
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
                                        <FormControl>
                                            <Input placeholder="O seu apelido" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        {selectedRole === 'instructor' && (
                             <FormField
                                control={form.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Área de Especialização</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Finanças, Gestão de Projetos" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="seu@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Criar Conta'}
                        </Button>
                    </form>
                </Form>
              </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
