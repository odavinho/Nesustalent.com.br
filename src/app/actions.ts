"use server";

import { aiResumeAnalysis, AIResumeAnalysisInput, AIResumeAnalysisOutput } from "@/ai/flows/ai-resume-analysis";
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsInput, PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { generateCourseContent, GenerateCourseContentInput, GenerateCourseContentOutput } from "@/ai/flows/generate-course-content";
import { generateVacancyContent, GenerateVacancyContentInput, GenerateVacancyContentOutput } from "@/ai/flows/generate-vacancy-content";

import { courses } from "@/lib/courses";

export async function analyzeResumeAction(input: AIResumeAnalysisInput): Promise<AIResumeAnalysisOutput> {
  try {
    const output = await aiResumeAnalysis(input);
    return output;
  } catch (error) {
    console.error("Error in analyzeResumeAction:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}

export async function getCourseRecommendationsAction(input: { userProfile: string }): Promise<PersonalizedCourseRecommendationsOutput> {
    const courseCatalog = courses.map(c => `${c.id}: ${c.name}`).join('\n');
    
    const flowInput: PersonalizedCourseRecommendationsInput = {
        userProfile: input.userProfile,
        courseCatalog: courseCatalog,
    }

    try {
        const output = await personalizedCourseRecommendations(flowInput);
        return output;
    } catch (error) {
        console.error("Error in getCourseRecommendationsAction:", error);
        throw new Error("Failed to get course recommendations. Please try again.");
    }
}

export async function generateCourseContentAction(input: GenerateCourseContentInput): Promise<GenerateCourseContentOutput> {
    try {
        const output = await generateCourseContent(input);
        return output;
    } catch (error) {
        console.error("Error in generateCourseContentAction:", error);
        throw new Error("Failed to generate course content. Please try again.");
    }
}

export async function generateVacancyContentAction(input: GenerateVacancyContentInput): Promise<GenerateVacancyContentOutput> {
    try {
        const output = await generateVacancyContent(input);
        return output;
    } catch (error) {
        console.error("Error in generateVacancyContentAction:", error);
        throw new Error("Failed to generate vacancy content. Please try again.");
    }
}
