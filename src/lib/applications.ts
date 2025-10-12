import type { Application } from './types';
import { Timestamp } from 'firebase/firestore';

function createTimestamp(dateString: string): Timestamp {
    const date = new Date(dateString);
    return new Timestamp(Math.floor(date.getTime() / 1000), 0);
}

export const applications: Application[] = [
    {
        id: 'student1_dev-frontend-sr',
        userId: 'student1',
        jobPostingId: 'dev-frontend-sr',
        applicationDate: createTimestamp('2024-07-28T10:00:00Z'),
        status: 'Recebida',
        notes: 'Candidato com bom portfólio.',
    },
    {
        id: 'student2_dev-frontend-sr',
        userId: 'student2',
        jobPostingId: 'dev-frontend-sr',
        applicationDate: createTimestamp('2024-07-27T14:30:00Z'),
        status: 'Em análise',
        notes: 'Experiência relevante em Next.js.',
    },
    {
        id: 'student3_analista-rh-pl',
        userId: 'student3',
        jobPostingId: 'analista-rh-pl',
        applicationDate: createTimestamp('2024-07-26T09:00:00Z'),
        status: 'Recebida',
    },
    {
        id: 'student4_gestor-projetos-ti',
        userId: 'student4',
        jobPostingId: 'gestor-projetos-ti',
        applicationDate: createTimestamp('2024-07-25T18:00:00Z'),
        status: 'Rejeitada',
        notes: 'Não possui certificação PMP.',
    },
    {
        id: 'student1_engenheiro-petroleo-jr',
        userId: 'student1',
        jobPostingId: 'engenheiro-petroleo-jr',
        applicationDate: createTimestamp('2024-07-29T11:00:00Z'),
        status: 'Em análise',
    },
];
