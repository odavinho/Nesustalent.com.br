'use client';
import React from 'react';
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { courses } from '@/lib/courses';
import Image from 'next/image';
import { Card } from '../ui/card';

export function RunningCourses() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const runningCourseIds = ['TA-001', 'LMP-006', 'EN-427', 'NE-74', 'GC-002', 'GE-003'];
    const runningCourses = courses.filter(course => runningCourseIds.includes(course.id));

    return (
        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
                        Cursos em Andamento
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Junte-se aos nossos cursos atualmente em andamento e comece a aprender hoje mesmo.
                    </p>
                </div>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {runningCourses.map((course, index) => {
                             const image = PlaceHolderImages.find(p => p.id === course.imageId);
                             return (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                    <Card className="overflow-hidden">
                                        {image && (
                                            <div className="relative h-48 w-full">
                                                <Image 
                                                    src={image.imageUrl} 
                                                    alt={image.description} 
                                                    fill
                                                    className="object-cover" 
                                                />
                                            </div>
                                        )}
                                     </Card>
                                    </div>
                                </CarouselItem>
                             )
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
