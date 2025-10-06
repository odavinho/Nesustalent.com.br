import { Book, Users, Star, Layers } from 'lucide-react';

const stats = [
    { value: '150+', label: 'Cursos Disponíveis', icon: Book },
    { value: '10K+', label: 'Alunos Formados', icon: Users },
    { value: '95%', label: 'Taxa de Satisfação', icon: Star },
    { value: '8+', label: 'Áreas de Especialização', icon: Layers },
];

export function StatsSection() {
    return (
        <section className="bg-primary text-primary-foreground py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <stat.icon className="w-10 h-10 mb-2" />
                            <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                            <div className="text-sm sm:text-base font-medium opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
