
'use client';

import { useState, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, BookOpen, Globe, User, Filter, SlidersHorizontal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';


const CandidateCard = ({ candidate }: { candidate: UserProfile }) => {
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage src={candidate.profilePictureUrl} />
                    <AvatarFallback>{getInitials(`${candidate.firstName} ${candidate.lastName}`)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <CardTitle className="font-headline text-xl">{candidate.firstName} {candidate.lastName}</CardTitle>
                    <CardDescription>{candidate.academicTitle}</CardDescription>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 flex-wrap">
                        {candidate.functionalArea && <span className='flex items-center gap-1'><Briefcase size={14}/>{candidate.functionalArea}</span>}
                        {candidate.yearsOfExperience !== undefined && <span>&middot; {candidate.yearsOfExperience} anos</span>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills?.slice(0, 5).map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
                <Button className="w-full">Ver Perfil Completo</Button>
            </CardContent>
        </Card>
    );
}

const CandidateSkeleton = () => (
    <Card>
        <CardHeader className="flex flex-row items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex-grow space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
        </CardContent>
    </Card>
)


export default function CandidatesPage() {
    const firestore = useFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        functionalArea: 'all',
        experience: [0, 50],
        nationality: '',
    });
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    
    // Query to get all student profiles
    const candidatesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'users'), where('userType', '==', 'student'));
    }, [firestore]);

    const { data: allCandidates, isLoading } = useCollection<UserProfile>(candidatesQuery);

    const filteredCandidates = useMemo(() => {
        if (!allCandidates) return [];
        return allCandidates.filter(c => {
            const searchMatch = searchTerm === '' ||
                `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.academicTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

            const areaMatch = filters.functionalArea === 'all' || c.functionalArea === filters.functionalArea;
            const expMatch = (c.yearsOfExperience ?? 0) >= filters.experience[0] && (c.yearsOfExperience ?? 0) <= filters.experience[1];
            const nationalityMatch = filters.nationality === '' || c.nationality?.toLowerCase().includes(filters.nationality.toLowerCase());

            return searchMatch && areaMatch && expMatch && nationalityMatch;
        });
    }, [allCandidates, searchTerm, filters]);
    
    const functionalAreas = useMemo(() => {
        if (!allCandidates) return [];
        const areas = new Set(allCandidates.map(c => c.functionalArea).filter(Boolean));
        return ['all', ...Array.from(areas)] as string[];
    }, [allCandidates]);


    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h1 className="font-headline text-4xl font-bold">Banco de Talentos</h1>
                    <p className="text-muted-foreground mt-2">
                        Encontre os candidatos ideais para as suas vagas.
                    </p>
                </div>
                 <Collapsible open={isAdvancedSearchOpen} onOpenChange={setIsAdvancedSearchOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4"/>Filtros Avançados</Button>
                    </CollapsibleTrigger>
                </Collapsible>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                     <CollapsibleContent className="lg:block">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Filter size={18} /> Filtros</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="search">Palavra-chave</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="search" placeholder="Cargo, competência, nome..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Área Funcional</Label>
                                    <Select value={filters.functionalArea} onValueChange={(v) => handleFilterChange('functionalArea', v)}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            {functionalAreas.map(area => (
                                                <SelectItem key={area} value={area}>
                                                    {area === 'all' ? 'Todas as Áreas' : area}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label>Anos de Experiência ({filters.experience[0]} - {filters.experience[1]})</Label>
                                     <Slider
                                        value={[filters.experience[0]]}
                                        onValueChange={(v) => handleFilterChange('experience', [v[0], filters.experience[1]])}
                                        max={50}
                                        step={1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nationality">Nacionalidade</Label>
                                    <Input id="nationality" placeholder="Ex: Angolana" value={filters.nationality} onChange={e => handleFilterChange('nationality', e.target.value)} />
                                </div>
                                
                                <div className="space-y-2 pt-4 border-t">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="lived-angola" className="text-sm">Vive/viveu em Angola</Label>
                                        <Switch id="lived-angola" disabled />
                                    </div>
                                     <div className="flex items-center justify-between">
                                        <Label htmlFor="relocate" className="text-sm">Disposto a mudar de residência</Label>
                                        <Switch id="relocate" disabled />
                                    </div>
                                </div>


                            </CardContent>
                        </Card>
                    </CollapsibleContent>
                </div>

                {/* Candidates List */}
                <div className="lg:col-span-3">
                     <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-muted-foreground">A mostrar <span className="font-bold text-foreground">{filteredCandidates.length}</span> de <span className="font-bold text-foreground">{allCandidates?.length ?? 0}</span> candidatos.</p>
                         <div className="flex items-center gap-2">
                             <span className="text-sm text-muted-foreground">Ordenar por:</span>
                             <Select defaultValue="featured">
                                <SelectTrigger className="w-[180px] h-9 text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Destacados</SelectItem>
                                    <SelectItem value="recent">Mais Recentes</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                    </div>
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {Array.from({length: 6}).map((_, i) => <CandidateSkeleton key={i} />)}
                        </div>
                    ) : filteredCandidates.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredCandidates.map(candidate => (
                                <CandidateCard key={candidate.id} candidate={candidate} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-24 border-2 border-dashed rounded-lg">
                            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Nenhum candidato encontrado</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Tente alargar os seus critérios de pesquisa.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
