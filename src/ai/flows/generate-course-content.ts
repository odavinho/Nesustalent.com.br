'use server';
/**
 * @fileOverview AI-powered course content generation.
 *
 * - generateCourseContent - A function that handles the course content generation process.
 * - GenerateCourseContentInput - The input type for the generateCourseContent function.
 * - GenerateCourseContentOutput - The return type for the generateCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenerateCourseContentInputSchema, GenerateCourseContentOutputSchema } from '@/lib/schemas';

export type GenerateCourseContentInput = z.infer<typeof GenerateCourseContentInputSchema>;
export type GenerateCourseContentOutput = z.infer<typeof GenerateCourseContentOutputSchema>;

export async function generateCourseContent(input: GenerateCourseContentInput): Promise<GenerateCourseContentOutput> {
  return generateCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseContentPrompt',
  input: {schema: GenerateCourseContentInputSchema},
  output: {schema: GenerateCourseContentOutputSchema},
  prompt: `You are an expert instructional designer. Based on the course title, category, and level, generate the following content in Portuguese:
- A unique and descriptive course ID (e.g., 'XY-123').
- A detailed general objective.
- A list of 4-6 specific learning outcomes ('what you will learn').
- A course structure with 4 modules, each containing 2-4 topics.
- A suggested course duration in hours.
- A short hint (1-2 words, e.g. "tech course") for an AI image generator to create a relevant course image.

Course Title: {{{courseName}}}
Category: {{{courseCategory}}}
Level: {{{courseLevel}}}
`,
});


const imagePrompt = ai.definePrompt({
  name: 'generateCourseImagePrompt',
  input: {schema: z.object({ imageHint: z.string() })},
  prompt: 'A professional and modern image for a course catalog, related to: {{{imageHint}}}. The image should be clean, visually appealing, and suitable for an educational platform. Avoid text and people.',
});


const generateCourseContentFlow = ai.defineFlow(
  {
    name: 'generateCourseContentFlow',
    inputSchema: GenerateCourseContentInputSchema,
    outputSchema: GenerateCourseContentOutputSchema,
  },
  async input => {
    const {output: textOutput} = await prompt(input);

    if(!textOutput) {
        throw new Error("Failed to generate course content text.");
    }
    
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: await imagePrompt.render({input: {imageHint: textOutput.imageHint}}),
      });

    return {
      ...textOutput,
      imageDataUri: media.url
    };
  }
);
