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

export const GenerateAssessmentTestInputSchema = z.object({
  jobDescription: z.string().describe('The full job description for the vacancy.'),
  testType: z.enum(['knowledge', 'psychometric']).describe('The type of test to generate.'),
  numMultipleChoice: z.coerce.number().describe('The number of multiple-choice questions.'),
  numShortAnswer: z.coerce.number().describe('The number of short-answer questions.'),
});
export type GenerateAssessmentTestInput = z.infer<typeof GenerateAssessmentTestInputSchema>;

const QuestionSchema = z.object({
  id: z.string().describe("A unique ID for the question (e.g., 'q1')."),
  question: z.string().describe('The text of the question.'),
  type: z.enum(['multiple-choice', 'short-answer', 'psychometric']).describe('The type of the question.'),
  options: z.array(z.string()).optional().describe('A list of 4 options for multiple-choice questions.'),
});

export const GenerateAssessmentTestOutputSchema = z.object({
  id: z.string().describe("A unique ID for the test (e.g., 'test-123')."),
  title: z.string().describe('A concise and relevant title for the generated test.'),
  questions: z.array(QuestionSchema).describe('The list of generated questions.'),
});
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
