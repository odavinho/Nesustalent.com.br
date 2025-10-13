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
  prompt: `You are an expert in creating professional assessments for job candidates. Your task is to generate a test based on the provided job description and requirements.

Job Description:
{{{jobDescription}}}

Test Requirements:
- Test Type: {{{testType}}}
- Number of Multiple-Choice Questions: {{{numMultipleChoice}}}
- Number of Short-Answer Questions: {{{numShortAnswer}}}

Please generate the following:
1.  A concise and relevant title for the test.
2.  A unique ID for the test (e.g., 'test-followed-by-random-chars').
3.  A list of questions, each with its own unique ID (e.g., 'q1', 'q2').

{{#if (eq testType "knowledge")}}
For this 'knowledge' test, create questions that assess the technical skills and knowledge required for the job.
- Use a mix of {{{numMultipleChoice}}} multiple-choice and {{{numShortAnswer}}} short-answer questions.
- The questions should require the application of knowledge, not just memorization.
- For short-answer questions, ask the candidate to explain their reasoning or provide a code snippet if applicable.
{{/if}}

{{#if (eq testType "psychometric")}}
For this 'psychometric' test, create questions that evaluate logical reasoning, problem-solving abilities, and behavioral traits relevant to the role.
- All questions should be multiple-choice.
- The questions should present hypothetical scenarios or logical puzzles. Do not ask for personal opinions or feelings.
{{/if}}

IMPORTANT: Ensure all multiple-choice questions have exactly 4 plausible options.`,
});

const generateAssessmentTestFlow = ai.defineFlow(
  {
    name: 'generateAssessmentTestFlow',
    inputSchema: GenerateAssessmentTestInputSchema,
    outputSchema: GenerateAssessmentTestOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a valid test structure.');
    }
    return output;
  }
);
