"use server";

import { aiResumeAnalysis, AIResumeAnalysisInput, AIResumeAnalysisOutput } from "@/ai/flows/ai-resume-analysis";
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsInput, PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { generateCourseContent, GenerateCourseContentInput, GenerateCourseContentOutput } from "@/ai/flows/generate-course-content";
import { generateVacancyContent, GenerateVacancyContentInput, GenerateVacancyContentOutput } from "@/ai/flows/generate-vacancy-content";
import { extractProfileFromResume, ExtractProfileFromResumeInput, ExtractProfileFromResumeOutput } from "@/ai/flows/extract-profile-from-resume";
import { generateAssessmentTest, GenerateAssessmentTestInput, GenerateAssessmentTestOutput } from "@/ai/flows/generate-assessment-test";


import { revalidatePath } from "next/cache";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { promises as fs } from 'fs';
import path from 'path';

// AI Actions
export async function analyzeResumeAction(input: AIResumeAnalysisInput): Promise<AIResumeAnalysisOutput> {
  try {
    const output = await aiResumeAnalysis(input);
    return output;
  } catch (error) {
    console.error("Error in analyzeResumeAction:", error);
    // Simulating a more detailed error message for demonstration
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("A chave de API para o serviço de IA não é válida. Por favor, verifique as configurações.");
    }
    throw new Error("Falha ao analisar o currículo. Tente novamente mais tarde.");
  }
}

export async function extractProfileFromResumeAction(input: ExtractProfileFromResumeInput): Promise<ExtractProfileFromResumeOutput> {
    try {
      const output = await extractProfileFromResume(input);
      return output;
    } catch (error) {
      console.error("Error in extractProfileFromResumeAction:", error);
      throw new Error("Failed to extract profile from resume. Please try again.");
    }
  }

export async function getCourseRecommendationsAction(input: { userProfile: string }): Promise<PersonalizedCourseRecommendationsOutput> {
    // This action might need to be updated to fetch courses from Firestore in the future
    const courseCatalog: string[] = []; // Mocked for now
    
    const flowInput: PersonalizedCourseRecommendationsInput = {
        userProfile: input.userProfile,
        courseCatalog: courseCatalog.join('\n'),
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

export async function generateAssessmentTestAction(input: GenerateAssessmentTestInput): Promise<GenerateAssessmentTestOutput> {
    try {
      const output = await generateAssessmentTest(input);
      return output;
    } catch (error) {
      console.error("Error in generateAssessmentTestAction:", error);
      throw new Error("Failed to generate assessment test. Please try again.");
    }
  }


// JSON file actions
const getPlaceholderFilePath = () => path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');

async function readPlaceholderFile(): Promise<{ placeholderImages: ImagePlaceholder[] }> {
    try {
        const filePath = getPlaceholderFilePath();
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading placeholder file:', error);
        return { placeholderImages: [] };
    }
}

async function writePlaceholderFile(data: { placeholderImages: ImagePlaceholder[] }): Promise<void> {
    const filePath = getPlaceholderFilePath();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}


export async function addImageAction(image: ImagePlaceholder): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readPlaceholderFile();
        if (data.placeholderImages.some(p => p.id === image.id)) {
            return { success: false, message: 'Já existe um item com este ID.' };
        }
        data.placeholderImages.push(image);
        await writePlaceholderFile(data);
        revalidatePath('/dashboard/settings');
        return { success: true, message: 'Item adicionado com sucesso!' };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : 'Falha ao adicionar item.' };
    }
}

export async function updateImageAction(image: ImagePlaceholder): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readPlaceholderFile();
        const index = data.placeholderImages.findIndex(p => p.id === image.id);
        if (index === -1) {
            return { success: false, message: 'Item não encontrado.' };
        }
        data.placeholderImages[index] = image;
        await writePlaceholderFile(data);
        revalidatePath('/dashboard/settings');
        return { success: true, message: 'Item atualizado com sucesso!' };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : 'Falha ao atualizar item.' };
    }
}

export async function deleteImageAction(id: string): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readPlaceholderFile();
        const initialLength = data.placeholderImages.length;
        data.placeholderImages = data.placeholderImages.filter(p => p.id !== id);
        if (data.placeholderImages.length === initialLength) {
            return { success: false, message: 'Item não encontrado para exclusão.' };
        }
        await writePlaceholderFile(data);
        revalidatePath('/dashboard/settings');
        return { success: true, message: 'Item excluído com sucesso!' };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : 'Falha ao excluir item.' };
    }
}
