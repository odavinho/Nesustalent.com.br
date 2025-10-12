import { vacancies as initialVacancies } from './vacancies';
import type { Vacancy } from './types';

// In-memory store for vacancies
let vacancies: Vacancy[] = [...initialVacancies];

// Function to get all vacancies
export const getVacancies = (): Vacancy[] => {
    // Return a copy to prevent direct modification of the in-memory array
    return [...vacancies].sort((a, b) => (b.postedDate as Date).getTime() - (a.postedDate as Date).getTime());
};

// Function to find a single vacancy by ID
export const getVacancyById = (id: string): Vacancy | undefined => {
    return vacancies.find(v => v.id === id);
};

// Function to add a new vacancy
export const addVacancy = (vacancyData: Omit<Vacancy, 'id' | 'postedDate'>): Vacancy => {
    const newVacancy: Vacancy = {
        ...vacancyData,
        id: `vacancy-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
        postedDate: new Date(),
    };
    vacancies.unshift(newVacancy); // Add to the beginning of the array
    return newVacancy;
};

// Function to delete a vacancy
export const deleteVacancy = (id: string): void => {
    vacancies = vacancies.filter(v => v.id !== id);
};
