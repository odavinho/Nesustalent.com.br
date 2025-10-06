import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const certifications = [
    { name: "ISO 9001", imageId: "cert-iso-9001" },
    { name: "ISO 14001", imageId: "cert-iso-14001" },
    { name: "ISO 45001", imageId: "cert-iso-45001" },
    { name: "NEBOSH", imageId: "cert-nebosh" },
    { name: "IRATA", imageId: "cert-irata" },
    { name: "Liberian", imageId: "cert-liberian" },
    { name: "INEFOP", imageId: "cert-inefop" },
    { name: "MEC", imageId: "cert-mec" },
];

export function CertificationsSection() {
    return (
        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
                        Nossas Certificações e Acreditações
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Compromisso com a qualidade e excelência, reconhecido nacional e internacionalmente.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {certifications.map(cert => {
                        const image = PlaceHolderImages.find(p => p.id === cert.imageId);
                        return image ? (
                            <div key={cert.name} className="flex flex-col items-center gap-2" title={cert.name}>
                                <div className="relative w-36 h-24">
                                    <Image
                                        src={image.imageUrl}
                                        alt={`${cert.name} logo`}
                                        fill
                                        className="object-contain"
                                        data-ai-hint={image.imageHint}
                                    />
                                </div>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </section>
    );
}
