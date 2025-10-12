'use server';
/**
 * @fileOverview AI-powered assessment test generation.
 *
 * - generateAssessmentTest - A function that handles the test generation process.
 * - GenerateAssessmentTestInput - The input type for the function.
 * - GenerateAssessmentTestOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateAssessmentTestInputSchema, GenerateAssessmentTestOutputSchema } from '@/lib/schemas';

export type GenerateAssessmentTestInput = z.infer<typeof GenerateAssessmentTestInputSchema>;
export type GenerateAssessmentTestOutput = z.infer<typeof GenerateAssessmentTestOutputSchema>;


export async function generateAssessmentTest(input: GenerateAssessmentTestInput): Promise<GenerateAssessmentTestOutput> {
  return generateAssessmentTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssessmentTestPrompt',
  input: { schema: GenerateAssessmentTestInputSchema },
  output: { schema: GenerateAssessmentTestOutputSchema },
  prompt: `You are an expert in creating professional assessments for job candidates. Your task is to generate a test based on the provided job description.

Job Description:
{{{jobDescription}}}

Test Requirements:
- Type: {{{testType}}}
- Number of Multiple-Choice Questions: {{{numMultipleChoice}}}
- Number of Short-Answer Questions: {{{numShortAnswer}}}

Generate a test with a clear title and the specified number of questions.

For 'knowledge' tests, create questions that assess the technical skills and knowledge required for the job. Use a mix of multiple-choice and short-answer questions as requested. The questions should require the application of knowledge, not just memorization. For short-answer questions, ask the candidate to explain their reasoning.

For 'psychometric' tests, create questions (all multiple-choice) that evaluate logical reasoning, problem-solving abilities, and behavioral traits relevant to the role. Do not ask for personal opinions or feelings.

Ensure all multiple-choice questions have exactly 4 plausible options.`,
});

const generateAssessmentTestFlow = ai.defineFlow(
  {
    name: 'generateAssessmentTestFlow',
    inputSchema: GenerateAssessmentTestInputSchema,
    outputSchema: GenerateAssessmentTestOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
