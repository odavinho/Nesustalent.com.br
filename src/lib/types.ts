import type { Timestamp } from 'firebase/firestore';

export interface Course {
    id: string;
    name: string;
    category: string;
    imageId: string;
    duration: string;
    generalObjective: string;
    whatYouWillLearn: string[];
    modules: { title: string; topics: string[] }[];
  }
  
  export interface CourseCategory {
    id: string;
    name: string;
  }

  export interface Vacancy {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Remote';
    category: string;
    description: string;
  }
  
  export interface Application {
    id: string;
    userId: string;
    jobPostingId: string;
    applicationDate: Timestamp;
    status: 'Recebida' | 'Em análise' | 'Entrevistando' | 'Oferta' | 'Rejeitada';
    notes?: string;
  }

  export interface AcademicHistory {
    institution: string;
    degree: string;
    year: string;
  }

  export interface WorkExperience {
    company: string;
    role: string;
    period: string;
    description: string;
  }

  export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    resumeUrl?: string;
    academicTitle?: string;
    nationality?: string;
    dateOfBirth?: string;
    yearsOfExperience?: number;
    functionalArea?: string;
    subFunctionalArea?: string;
    latestCompany?: string;
    latestRole?: string;
    professionalLevel?: string;
    academicHistory?: AcademicHistory[];
    workExperience?: WorkExperience[];
  }
  