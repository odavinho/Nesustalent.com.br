import { vacancies as initialVacancies } from './vacancies';
import type { Vacancy } from './types';
import { Timestamp } from 'firebase/firestore';

// In-memory store for vacancies
let vacancies: Vacancy[] = [...initialVacancies];

const toDate = (date: Timestamp | Date): Date => {
    if (date instanceof Timestamp) {
        return date.toDate();
    }
    return date;
}

// Function to get all vacancies
export const getVacancies = (): Vacancy[] => {
    // Return a copy to prevent direct modification of the in-memory array
    return [...vacancies].sort((a, b) => toDate(b.postedDate).getTime() - toDate(a.postedDate).getTime());
};

// Function to find a single vacancy by ID
export const getVacancyById = (id: string): Vacancy | undefined => {
    return vacancies.find(v => v.id === id);
};

// Function to add a new vacancy
export const addVacancy = (vacancyData: Omit<Vacancy, 'id' | 'postedDate'>): Vacancy => {
    const newVacancy: Vacancy = {
        ...vacancyData,
        // Always generate a new unique ID for any new entry (including duplicates)
        id: `vacancy-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
        postedDate: new Date(),
    };
    
    // Add the new vacancy to the start of the array
    vacancies.unshift(newVacancy);
    
    return newVacancy;
};

// Function to update an existing vacancy
export const updateVacancy = (id: string, updatedData: Partial<Omit<Vacancy, 'id' | 'postedDate'>>): Vacancy | null => {
    const vacancyIndex = vacancies.findIndex(v => v.id === id);
    if (vacancyIndex === -1) {
        return null; // Vacancy not found
    }

    const updatedVacancy = {
        ...vacancies[vacancyIndex],
        ...updatedData,
    };
    
    vacancies[vacancyIndex] = updatedVacancy;
    
    return updatedVacancy;
}

// Function to delete a vacancy
export const deleteVacancy = (id: string): void => {
    vacancies = vacancies.filter(v => v.id !== id);
};
