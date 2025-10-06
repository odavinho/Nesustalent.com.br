"use server";

import { aiResumeAnalysis, AIResumeAnalysisInput, AIResumeAnalysisOutput } from "@/ai/flows/ai-resume-analysis";
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsInput, PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
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
