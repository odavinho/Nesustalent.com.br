'use server';
/**
 * @fileOverview AI-powered module assessment generation.
 *
 * - generateModuleAssessment - A function that handles the test generation process.
 * - GenerateModuleAssessmentInput - The input type for the function.
 * - GenerateModuleAssessmentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateModuleAssessmentInputSchema, GenerateModuleAssessmentOutputSchema } from '@/lib/schemas';

export type GenerateModuleAssessmentInput = z.infer<typeof GenerateModuleAssessmentInputSchema>;
export type GenerateModuleAssessmentOutput = z.infer<typeof GenerateModuleAssessmentOutputSchema>;


export async function generateModuleAssessment(input: GenerateModuleAssessmentInput): Promise<GenerateModuleAssessmentOutput> {
  return generateModuleAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateModuleAssessmentPrompt',
  input: { schema: GenerateModuleAssessmentInputSchema },
  output: { schema: GenerateModuleAssessmentOutputSchema },
  prompt: `You are an expert in creating educational assessments. Your task is to generate a short, 3-question quiz based on a course module's title and topics. The quiz should validate a student's understanding of the material.

Module Title:
{{{moduleTitle}}}

Topics Covered:
{{#each topics}}
- {{{this}}}
{{/each}}

Generate a quiz with:
- 2 multiple-choice questions. Each must have exactly 4 options, and you must indicate the correct one.
- 1 short-answer question that requires the student to explain a concept. Provide an ideal, concise answer.

The questions should be clear, directly related to the topics, and suitable for a quick knowledge check.`,
});

const generateModuleAssessmentFlow = ai.defineFlow(
  {
    name: 'generateModuleAssessmentFlow',
    inputSchema: GenerateModuleAssessmentInputSchema,
    outputSchema: GenerateModuleAssessmentOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
