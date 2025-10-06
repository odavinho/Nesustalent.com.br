import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { courseCategories } from '@/lib/courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const category = courseCategories.find(c => c.id === course.category);
  const image = PlaceHolderImages.find(p => p.id === course.imageId);

  return (
    <Link href={`/courses/${course.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        <div className="relative w-full h-40">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-secondary"></div>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          {category && (
            <Badge variant="secondary" className="mb-2 self-start">{category.name}</Badge>
          )}
          <h3 className="font-headline font-semibold text-lg flex-grow">{course.name}</h3>
          <div className="flex justify-between items-center mt-4">
             <p className="text-sm text-muted-foreground font-mono">{course.id}</p>
             <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold">Ver mais</span>
                <ArrowRight className="h-4 w-4 ml-1" />
             </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
