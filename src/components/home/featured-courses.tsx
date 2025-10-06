import { courses } from '@/lib/courses';
import { CourseCard } from '@/components/courses/course-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedCoursesProps {
    title?: string;
}

export function FeaturedCourses({ title = "Cursos em Destaque" }: FeaturedCoursesProps) {
  const featuredCourseIds = ['TA-001', 'LMP-006', 'EN-427', 'NE-74'];
  const featured = courses.filter(course => featuredCourseIds.includes(course.id));

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Comece sua jornada de aprendizado com nossos cursos mais populares.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/courses">
              Ver todos os cursos
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
