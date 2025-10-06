'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/courses', label: 'Cursos' },
  { href: '/recruitment', label: 'Vagas' },
  { href: '/about', label: 'Sobre Nós' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors",
                  pathname === link.href ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="/signup">Cadastre-se</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                 pathname === link.href ? "bg-secondary text-primary font-semibold" : "text-foreground/80 hover:bg-secondary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t">
            <div className="flex items-center px-3 space-x-2">
               <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/signup">Cadastre-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
