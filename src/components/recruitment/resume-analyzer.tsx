"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { analyzeResumeAction } from '@/app/actions';
import type { AIResumeAnalysisOutput } from '@/ai/flows/ai-resume-analysis';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, FileUp, Trophy, ListChecks, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  jobDescription: z.string().min(50, { message: "A descrição da vaga deve ter pelo menos 50 caracteres." }),
  resume: z.custom<FileList>().refine(files => files?.length > 0, "É necessário enviar um currículo."),
});

type FormValues = z.infer<typeof formSchema>;

const fileToDataUri = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export function ResumeAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<AIResumeAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      if (!data.resume || data.resume.length === 0) {
        throw new Error("Currículo não encontrado.");
      }
      const resumeFile = data.resume[0];
      const resumeDataUri = await fileToDataUri(resumeFile);

      const result = await analyzeResumeAction({
        jobDescription: data.jobDescription,
        resumeDataUri: resumeDataUri,
      });

      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro na Análise",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resumeFileRef = form.register("resume");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Sparkles className="text-primary" />
          Analisador de Currículos por IA
        </CardTitle>
        <CardDescription>
          Faça upload de um currículo e cole a descrição da vaga para obter uma análise instantânea.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel>Currículo (PDF)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileUp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="file" accept=".pdf" className="pl-10 h-12" {...resumeFileRef} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Vaga</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cole a descrição completa da vaga aqui..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                'Analisar Currículo'
              )}
            </Button>
          </form>
        </Form>

        {analysisResult && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-headline text-xl font-bold mb-4">Resultado da Análise</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <Trophy size={18} /> Ranking do Candidato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Progress value={analysisResult.candidateRanking} className="w-full h-3" />
                    <span className="text-2xl font-bold text-primary">{analysisResult.candidateRanking}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Compatibilidade com a vaga.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <ListChecks size={18} /> Resumo do Candidato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{analysisResult.candidateSummary}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                            <Sparkles size={18}/> Habilidades Chave
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{analysisResult.keySkillsMatch}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                            <Target size={18} /> Áreas para Melhoria
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{analysisResult.areasForImprovement}</p>
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
