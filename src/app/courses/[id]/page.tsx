import { courses, courseCategories } from "@/lib/courses";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle, Target, Book, List } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import React from "react";


export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const course = courses.find(c => c.id === resolvedParams.id);

  if (!course) {
    notFound();
  }

  const category = courseCategories.find(c => c.id === course.category);
  const image = PlaceHolderImages.find(p => p.id === course.imageId);
  const relatedCourses = courses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={16} /> Voltar para cursos
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {category && <Badge className="mb-2">{category.name}</Badge>}
              <h1 className="font-headline text-3xl md:text-4xl font-bold">{course.name}</h1>
              <p className="text-lg text-muted-foreground mt-2 font-mono">{course.id}</p>
              
              <div className="mt-8 prose prose-lg max-w-none text-foreground/90">
                  <div className="p-6 border rounded-lg bg-background">
                      <div className="flex items-start gap-4">
                          <Target className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                          <div>
                              <h3 className="font-headline text-xl mt-0">Objetivo Geral</h3>
                              <p className="text-base">{course.generalObjective}</p>
                          </div>
                      </div>
                  </div>

                  <div className="mt-8">
                      <h3 className="font-headline flex items-center gap-2"><CheckCircle className="w-6 h-6 text-primary" /> O que vai aprender</h3>
                      <ul className="mt-4 space-y-2">
                          {course.whatYouWillLearn.map((objective, index) => (
                              <li key={index} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"/>
                                  <span>{objective}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="mt-12">
                      <h3 className="font-headline flex items-center gap-2"><List className="w-6 h-6 text-primary"/> Conteúdo Programático (Módulos)</h3>
                      <Accordion type="single" collapsible className="w-full mt-4">
                          {course.modules.map((module, index) => (
                              <AccordionItem value={`item-${index}`} key={index}>
                                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">{module.title}</AccordionTrigger>
                                  <AccordionContent>
                                      <ul className="list-disc pl-5 space-y-2 text-base">
                                          {module.topics.map((topic, topicIndex) => (
                                              <li key={topicIndex}>{topic}</li>
                                          ))}
                                      </ul>
                                  </AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </div>
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
                              <span><strong>Carga Horária:</strong> {course.duration}</span>
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
                  <h2 className="font-headline text-3xl font-bold text-center mb-10">Mais cursos para carreiras Profissional de {category?.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {relatedCourses.map(relatedCourse => (
                          <CourseCard key={relatedCourse.id} course={relatedCourse} />
                      ))}
                  </div>
              </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
