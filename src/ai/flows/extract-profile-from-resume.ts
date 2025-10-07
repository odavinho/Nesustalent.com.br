'use server';
/**
 * @fileOverview Extracts structured user profile information from a resume file.
 *
 * - extractProfileFromResume - A function that handles the resume parsing process.
 * - ExtractProfileFromResumeInput - The input type for the function.
 * - ExtractProfileFromResumeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractProfileFromResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume or CV, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractProfileFromResumeInput = z.infer<typeof ExtractProfileFromResumeInputSchema>;

const ExtractProfileFromResumeOutputSchema = z.object({
    firstName: z.string().describe("The user's first name."),
    lastName: z.string().describe("The user's last name."),
    academicTitle: z.string().describe("The user's main professional title or headline (e.g., 'Senior Software Engineer')."),
    nationality: z.string().describe("The user's nationality."),
    yearsOfExperience: z.coerce.number().describe("The user's total years of professional experience, calculated from the work history."),
    functionalArea: z.string().describe("The primary functional area of the user's expertise (e.g., 'Information Technology', 'Finance')."),
    skills: z.array(z.string()).describe("A list of key skills, technologies, and competencies mentioned in the resume."),
    academicHistory: z.array(z.object({
        institution: z.string().describe("Name of the educational institution."),
        degree: z.string().describe("The degree or course obtained."),
        year: z.string().describe("The year of conclusion."),
    })).describe("The user's academic history."),
    workExperience: z.array(z.object({
        company: z.string().describe("Name of the company."),
        role: z.string().describe("The user's job title or role."),
        period: z.string().describe("The employment period (e.g., 'Jan 2020 - Present' or '2018 - 2022')."),
        description: z.string().describe("A brief description of the responsibilities and achievements in that role."),
    })).describe("The user's professional work experience."),
});
export type ExtractProfileFromResumeOutput = z.infer<typeof ExtractProfileFromResumeOutputSchema>;

export async function extractProfileFromResume(input: ExtractProfileFromResumeInput): Promise<ExtractProfileFromResumeOutput> {
  return extractProfileFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractProfileFromResumePrompt',
  input: { schema: ExtractProfileFromResumeInputSchema },
  output: { schema: ExtractProfileFromResumeOutputSchema },
  prompt: `You are an expert HR assistant. Your task is to analyze the provided resume and extract structured information to fill out a user's professional profile. Be as accurate as possible.

Resume: {{media url=resumeDataUri}}

Extract the following information in Portuguese:
- First Name
- Last Name
- Professional Title (academicTitle): The most relevant or recent job title.
- Nationality
- Years of Experience: Calculate the total years of experience based on the dates provided.
- Functional Area: The main area of work (e.g., 'Recursos Humanos', 'Tecnologia da Informação').
- Skills: A list of relevant technical and soft skills.
- Academic History: A list of all academic qualifications.
- Work Experience: A list of all professional experiences, including company, role, period, and a brief description.`,
});

const extractProfileFromResumeFlow = ai.defineFlow(
  {
    name: 'extractProfileFromResumeFlow',
    inputSchema: ExtractProfileFromResumeInputSchema,
    outputSchema: ExtractProfileFromResume-OutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
