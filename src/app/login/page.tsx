'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Mock function to get user role. In a real app, this would come from your database.
const getUserRole = async (uid: string): Promise<'student' | 'instructor' | 'admin'> => {
  // For demonstration, we'll assign roles based on the email.
  // This is NOT secure and should be replaced with a real database call.
  if (uid.includes('admin')) return 'admin';
  if (uid.includes('instructor')) return 'instructor';
  return 'student';
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: 'Login bem-sucedido!',
        description: 'Redirecionando para o seu painel.',
      });

      // Mock role-based redirection
      const role = await getUserRole(userCredential.user.email || '');
      switch (role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'instructor':
          router.push('/dashboard/instructor');
          break;
        case 'student':
          router.push('/dashboard/student');
          break;
        default:
          router.push('/dashboard');
      }

    } catch (error: any) {
      console.error(error);
      let description = 'Verifique suas credenciais e tente novamente.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          description = 'E-mail ou senha inválidos. Por favor, verifique seus dados ou crie uma conta se ainda não tiver uma.';
      } else if (error.message) {
          description = error.message;
      }
      
      toast({
        variant: 'destructive',
        title: 'Erro no login',
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
              Acesse sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Ou{' '}
              <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
                crie uma conta agora
              </Link>
            </p>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>Entrar</CardTitle>
                  <CardDescription>Digite seu e-mail e senha para acessar a plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu-admin@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center justify-between">
                          <Label htmlFor="password">Senha</Label>
                          <Link href="#" className="text-sm font-medium text-primary hover:underline">
                              Esqueceu sua senha?
                          </Link>
                      </div>
                      <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar'}
                  </Button>
                </form>
              </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
