
'use client';

import { notFound, useRouter } from "next/navigation";
import { users } from "@/lib/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, User, Briefcase, GraduationCap, Award, FileText, Download } from "lucide-react";
import type { UserProfile } from "@/lib/types";

function ProfileView({ profile }: { profile: UserProfile }) {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Button variant="outline" onClick={() => router.back()} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Banco de Talentos
            </Button>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="font-headline text-4xl font-bold">{profile.firstName} {profile.lastName}</h1>
                    <p className="text-muted-foreground text-xl mt-1">{profile.academicTitle}</p>
                    <p className="text-muted-foreground text-sm mt-2">{profile.functionalArea}  &middot; {profile.yearsOfExperience} anos de experiência</p>
                </div>
                <Button asChild>
                    <a href={`mailto:${profile.email}`}>
                        <User className="mr-2 h-4 w-4" /> Contactar Candidato
                    </a>
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Briefcase /> Experiência Profissional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {profile.workExperience?.length ? profile.workExperience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold">{exp.role}</h3>
                                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                                    </div>
                                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                                    {exp.description && <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>}
                                </div>
                            )) : <p className="text-sm text-muted-foreground">Nenhuma experiência profissional adicionada.</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><GraduationCap /> Formação Académica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile.academicHistory?.length ? profile.academicHistory.map((edu, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                                </div>
                            )) : <p className="text-sm text-muted-foreground">Nenhuma formação académica adicionada.</p>}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award /> Competências</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                             {profile.skills?.length ? profile.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                            )) : <p className="text-sm text-muted-foreground">Nenhuma competência adicionada.</p>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileText /> Currículo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile.resumeUrl ? (
                                <Button asChild variant="outline">
                                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <Download size={16} className="mr-2" /> Baixar CV
                                    </a>
                                </Button>
                            ) : <p className="text-sm text-muted-foreground">Nenhum CV carregado.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const candidate = users.find(u => u.id === params.id && u.userType === 'student');

  if (!candidate) {
    notFound();
  }

  return <ProfileView profile={candidate} />;
}
