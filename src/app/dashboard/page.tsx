import { CourseRecommendations } from "@/components/dashboard/course-recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, User } from "lucide-react";

export default function DashboardPage() {
    // Mock data for enrolled courses
    const enrolledCourses = [
        { name: 'Técnicas de Apresentação', progress: 75 },
        { name: 'Gestão de Conflitos', progress: 40 },
        { name: 'Excel Avançado', progress: 100 },
    ];
  
    return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <User className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">Meu Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, Usuário!</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <CourseRecommendations />
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookMarked />
                        Meus Cursos
                    </CardTitle>
                    <CardDescription>Seu progresso de aprendizado.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {enrolledCourses.map(course => (
                            <div key={course.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-sm">{course.name}</h4>
                                    <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{width: `${course.progress}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
