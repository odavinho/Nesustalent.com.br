import { courses, courseCategories } from "@/lib/courses";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  const category = courseCategories.find(c => c.id === course.category);
  const image = PlaceHolderImages.find(p => p.id === category?.imageId);
  const relatedCourses = courses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 4);

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={16} /> Voltar para cursos
        </Link>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {category && <Badge className="mb-2">{category.name}</Badge>}
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{course.name}</h1>
            <p className="text-lg text-muted-foreground mt-2 font-mono">{course.id}</p>
            
            <div className="mt-6 prose prose-lg max-w-none text-foreground/90">
                <p>Este curso abrangente sobre <strong>{course.name}</strong> foi projetado para fornecer as habilidades e conhecimentos essenciais para se destacar nesta área. Seja você um iniciante ou um profissional experiente, nosso conteúdo irá desafiá-lo e inspirá-lo.</p>
                <p>Aprenda com especialistas da indústria através de uma mistura de aulas teóricas, estudos de caso práticos e projetos do mundo real. Este curso pode ser feito online ou presencialmente, oferecendo flexibilidade para se adequar à sua agenda.</p>
                <h3 className="font-headline">O que você vai aprender:</h3>
                <ul>
                    <li>Fundamentos essenciais de {course.name.toLowerCase()}.</li>
                    <li>Técnicas avançadas e melhores práticas do setor.</li>
                    <li>Como aplicar seus conhecimentos em cenários práticos.</li>
                    <li>Estratégias para resolver problemas complexos e tomar decisões informadas.</li>
                </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
                {image && (
                    <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6 shadow-lg">
                        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                    </div>
                )}
                <div className="border rounded-lg p-6 bg-background">
                    <div className="space-y-4 text-sm">
                         <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                            <span><strong>Modalidade:</strong> Online e Presencial</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <span><strong>Duração:</strong> 8 semanas</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <span><strong>Nível:</strong> Todos os níveis</span>
                        </div>
                    </div>
                    <Button size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">Inscreva-se Agora</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
      {relatedCourses.length > 0 && (
        <div className="bg-background py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="font-headline text-3xl font-bold text-center mb-10">Cursos Relacionados</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedCourses.map(relatedCourse => (
                        <CourseCard key={relatedCourse.id} course={relatedCourse} />
                    ))}
                 </div>
            </div>
        </div>
      )}
    </div>
  );
}
