import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'home-hero');

  return (
    <section className="relative w-full h-auto min-h-[70vh] flex items-center justify-center text-center py-20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
          Conectando <span className="text-primary">Talentos</span> ao Futuro
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-semibold text-neutral-100">
          1,2 milhão de talentos e empresas se encontram aqui.
        </p>
        <p className="mt-2 max-w-3xl mx-auto text-base md:text-lg text-neutral-200">
            A plataforma completa de formação, recrutamento e Cedencia de mão de obra, que reúne os profissionais do futuro e as carreiras do amanhã.
        </p>
        <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-neutral-300">
            Capacite-se, Divulgue suas vagas, busque ativamente no maior Banco de Talentos da Transformação Digital ou contrate o serviço de headhunting que nós conduziremos o seu processo de ponta a ponta.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto" asChild>
            <Link href="/courses">
              Explorar Cursos <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-black w-full sm:w-auto" asChild>
            <Link href="/recruitment">
              Ver Vagas Abertas
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
