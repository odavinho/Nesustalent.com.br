import { Logo } from '@/components/shared/logo';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Capacitando talentos e conectando oportunidades para um futuro brilhante.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-medium">{t('platform')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Cursos</Link></li>
              <li><Link href="/recruitment" className="text-muted-foreground hover:text-primary">Vagas</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Planos</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Sobre Nós</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Minha Conta</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-medium">{t('company')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Sobre Nós</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contato</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Termos de Serviço</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-medium">{t('resources')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Ajuda</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} NexusTalent. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
