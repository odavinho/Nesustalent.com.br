import { vacancies as initialVacancies } from './vacancies';
import type { Vacancy } from './types';
import { Timestamp } from 'firebase/firestore';

// In-memory store for vacancies
let vacancies: Vacancy[] = [...initialVacancies];

const toDate = (date: Timestamp | Date | undefined): Date | null => {
    if (!date) return null;
    if (date instanceof Timestamp) {
        return date.toDate();
    }
    return date;
}

// Function to get all vacancies, with an option to include expired ones
export const getVacancies = (includeExpired: boolean = false): Vacancy[] => {
    const now = new Date();
    
    const allVacancies = [...vacancies].sort((a, b) => {
        const dateA = toDate(a.postedDate);
        const dateB = toDate(b.postedDate);
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime();
    });

    if (includeExpired) {
        return allVacancies;
    }

    // Default behavior for public view: return only active vacancies
    return allVacancies.filter(v => {
        const closingDate = toDate(v.closingDate);
        // If no closing date, it's considered active
        return !closingDate || closingDate >= now;
    });
};

// Function to find a single vacancy by ID
export const getVacancyById = (id: string): Vacancy | undefined => {
    return vacancies.find(v => v.id === id);
};

// Function to add a new vacancy
export const addVacancy = (vacancyData: Omit<Vacancy, 'id' | 'postedDate'>): Vacancy => {
    const newVacancy: Vacancy = {
        ...vacancyData,
        id: `vaga-${new Date().getTime()}`,
        postedDate: new Date(),
    };

    const existingIndex = vacancies.findIndex(v => v.id === newVacancy.id);
    if (existingIndex !== -1) {
        // This case should be rare with timestamp-based IDs, but as a safeguard
        vacancies[existingIndex] = newVacancy;
    } else {
        vacancies.unshift(newVacancy);
    }
    
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
