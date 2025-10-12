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
import { useAuth } from '@/firebase/provider';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  role: z.enum(['student', 'instructor', 'recruiter'], { required_error: 'Por favor, selecione um papel.' }),
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  companyName: z.string().optional(),
  specialization: z.string().optional(),
}).refine(data => {
    if (data.role === 'recruiter' && (!data.companyName || data.companyName.trim() === '')) {
        return false;
    }
    return true;
}, {
    message: 'O nome da empresa é obrigatório para recrutadores.',
    path: ['companyName'],
}).refine(data => {
    if (data.role === 'instructor' && (!data.specialization || data.specialization.trim() === '')) {
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'student',
      name: '',
      email: '',
      password: '',
      companyName: '',
      specialization: '',
    }
  });

  const selectedRole = form.watch('role');

  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: data.name });
        // Em uma aplicação real, aqui você salvaria os dados adicionais (role, companyName, etc.)
        // no Firestore ou Realtime Database associado ao UID do usuário.
      }
      toast({
        title: 'Conta criada com sucesso!',
        description: `Bem-vindo(a)! Você já pode fazer o login.`,
      });
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      let description = 'Ocorreu um erro. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'Este endereço de e-mail já está a ser utilizado por outra conta.';
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
                            name="role"
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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="O seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
