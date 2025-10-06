import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="bg-background py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
                    Pronto para transformar sua carreira?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Junte-se a milhares de profissionais que já alcançaram seus objetivos com a NEXUS TALENT.
                </p>
                <div className="mt-8">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                        <Link href="/courses">
                            Começar Agora <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
