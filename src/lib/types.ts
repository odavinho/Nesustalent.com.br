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
    recruiterId: string;
    postedDate: Timestamp | Date; // Allow Date for mock data
    closingDate?: Timestamp | Date;
    responsibilities: string[];
    requirements: string[];
    screeningQuestions?: string[];
    industry?: string;
    numberOfVacancies?: number;
    requiredNationality?: string;
    languages?: string[];
    salaryRange?: string;
    showSalary?: boolean;
    employerName?: string;
    aboutEmployer?: string;
    hideEmployerData?: boolean;
  }
  
  export interface Application {
    id: string;
    userId: string;
    jobPostingId: string;
    applicationDate: Timestamp | Date; // Allow Date for mock data
    status: 'Recebida' | 'Em análise' | 'Rejeitada';
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
    description?: string;
  }

  export interface Certification {
    name: string;
    issuingOrganization: string;
    year: string;
  }

  export type EducationLevel = 'Ensino Primário' | 'Ensino Médio' | 'Frequência Universitária' | 'Licenciatura' | 'Mestrado' | 'Doutoramento';

  export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: 'student' | 'instructor' | 'admin' | 'recruiter';
    profilePictureUrl?: string;
    summary?: string;
    resumeUrl?: string;
    academicTitle?: string;
    nationality?: string;
    cidade?: string;
    dateOfBirth?: string; // Format "YYYY-MM-DD"
    gender?: 'Masculino' | 'Feminino';
    languages?: string[];
    educationLevel?: EducationLevel;
    yearsOfExperience?: number;
    functionalArea?: string;
    subFunctionalArea?: string;
    skills?: string[];
    professionalLevel?: 'Estagiário / Júnior' | 'Pleno' | 'Sénior' | 'Especialista / Liderança';
    academicHistory?: AcademicHistory[];
    workExperience?: WorkExperience[];
    certifications?: Certification[];
  }
  
