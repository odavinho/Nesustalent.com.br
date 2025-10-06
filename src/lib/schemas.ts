import { z } from "zod";

export const GenerateCourseContentInputSchema = z.object({
    courseName: z.string().describe("The name of the course."),
    courseCategory: z.string().describe("The category of the course."),
    courseLevel: z.string().describe("The level of the course (e.g., beginner, intermediate, advanced)."),
});

export const GenerateCourseContentOutputSchema = z.object({
    courseId: z.string().describe("A unique ID for the course (e.g., 'XY-123')."),
    generalObjective: z.string().describe("The general objective of the course."),
    whatYouWillLearn: z.array(z.string()).describe("A list of specific learning outcomes."),
    modules: z.array(z.object({
        title: z.string(),
        topics: z.array(z.string()),
    })).describe("A list of modules, each with a title and a list of topics."),
    duration: z.string().describe("The total duration of the course in hours."),
    imageHint: z.string().describe("A short hint (1-2 words) for an AI image generator."),
    imageDataUri: z.string().describe("A data URI for the generated course image.").optional(),
});


export const GenerateVacancyContentInputSchema = z.object({
    title: z.string().describe("The title of the job vacancy."),
    category: z.string().describe("The category of the job."),
});

export const GenerateVacancyContentOutputSchema = z.object({
    description: z.string().describe("A general summary of the job vacancy."),
    responsibilities: z.array(z.string()).describe("A list of key responsibilities."),
    requirements: z.array(z.string()).describe("A list of required qualifications and skills."),
});
