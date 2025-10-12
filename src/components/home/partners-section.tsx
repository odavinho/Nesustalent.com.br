import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const partners = [
    { name: "Partner 1", imageId: "partner-logo-1" },
    { name: "Partner 2", imageId: "partner-logo-2" },
    { name: "Partner 3", imageId: "partner-logo-3" },
    { name: "Partner 4", imageId: "partner-logo-4" },
    { name: "Partner 5", imageId: "partner-logo-5" },
    { name: "Partner 6", imageId: "partner-logo-6" },
];

export function PartnersSection() {
    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
                        Nossos Clientes e Parceiros
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Construímos relações de confiança com empresas líderes em diversos setores.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {partners.map((partner, index) => {
                            const image = PlaceHolderImages.find(p => p.id === partner.imageId);
                            return image ? (
                                <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="p-4 bg-card rounded-lg flex items-center justify-center h-32">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={image.imageUrl}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ) : null;
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>
    );
}
