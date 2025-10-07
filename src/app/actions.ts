"use server";

import { aiResumeAnalysis, AIResumeAnalysisInput, AIResumeAnalysisOutput } from "@/ai/flows/ai-resume-analysis";
import { personalizedCourseRecommendations, PersonalizedCourseRecommendationsInput, PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { generateCourseContent, GenerateCourseContentInput, GenerateCourseContentOutput } from "@/ai/flows/generate-course-content";
import { generateVacancyContent, GenerateVacancyContentInput, GenerateVacancyContentOutput } from "@/ai/flows/generate-vacancy-content";

import { courses } from "@/lib/courses";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from "next/cache";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

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

async function readImagesFile(): Promise<{ placeholderImages: ImagePlaceholder[] }> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return { placeholderImages: [] };
        }
        throw error;
    }
}

async function writeImagesFile(data: { placeholderImages: ImagePlaceholder[] }): Promise<void> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');
    const fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, fileContent, 'utf-8');
    revalidatePath('/dashboard/settings');
    revalidatePath('/');
    revalidatePath('/about');
}

export async function addImageAction(image: ImagePlaceholder): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readImagesFile();
        if (data.placeholderImages.some(p => p.id === image.id)) {
            return { success: false, message: 'Já existe um item com este ID.' };
        }
        data.placeholderImages.push(image);
        await writeImagesFile(data);
        return { success: true, message: 'Item adicionado com sucesso!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Falha ao adicionar item.';
        return { success: false, message };
    }
}

export async function updateImageAction(image: ImagePlaceholder): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readImagesFile();
        const index = data.placeholderImages.findIndex(p => p.id === image.id);
        if (index === -1) {
            return { success: false, message: 'Item não encontrado.' };
        }
        data.placeholderImages[index] = image;
        await writeImagesFile(data);
        return { success: true, message: 'Item atualizado com sucesso!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Falha ao atualizar item.';
        return { success: false, message };
    }
}

export async function deleteImageAction(id: string): Promise<{ success: boolean; message: string }> {
    try {
        const data = await readImagesFile();
        const initialLength = data.placeholderImages.length;
        data.placeholderImages = data.placeholderImages.filter(p => p.id !== id);
        if (data.placeholderImages.length === initialLength) {
            return { success: false, message: 'Item não encontrado para excluir.' };
        }
        await writeImagesFile(data);
        return { success: true, message: 'Item excluído com sucesso!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Falha ao excluir item.';
        return { success: false, message };
    }
}
