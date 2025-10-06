import type { Vacancy } from './types';

export const vacancies: Vacancy[] = [
    {
        id: 'dev-frontend-sr',
        title: 'Desenvolvedor Frontend Sênior',
        location: 'Santa Catarina, Brasil',
        type: 'Full-time',
        category: 'informatica-it',
        description: 'Estamos procurando um Desenvolvedor Frontend Sênior experiente para se juntar à nossa equipe. O candidato ideal tem forte conhecimento em React, Next.js e TypeScript.'
    },
    {
        id: 'analista-rh-pl',
        title: 'Analista de RH Pleno',
        location: 'Luanda, Angola',
        type: 'Full-time',
        category: 'rh-gestao',
        description: 'Buscamos um Analista de RH com experiência em todo o ciclo de recrutamento e seleção, endomarketing e gestão de benefícios. Forte habilidade de comunicação é essencial.'
    },
    {
        id: 'gestor-projetos-ti',
        title: 'Gestor de Projetos de TI',
        location: 'Setúbal, Portugal',
        type: 'Remote',
        category: 'informatica-it',
        description: 'Vaga para Gestor de Projetos de TI com experiência em metodologias ágeis (Scrum/Kanban) para coordenar equipes de desenvolvimento de software em projetos internacionais.'
    },
    {
        id: 'engenheiro-petroleo-jr',
        title: 'Engenheiro de Petróleo Júnior',
        location: 'Luanda, Angola',
        type: 'Full-time',
        category: 'minerios-petroleo',
        description: 'Oportunidade para recém-formados em Engenharia de Petróleo para atuar em projetos de exploração e produção. Requer disponibilidade para viagens.'
    },
    {
        id: 'especialista-mkt-digital',
        title: 'Especialista em Marketing Digital',
        location: 'Santa Catarina, Brasil',
        type: 'Part-time',
        category: 'marketing-comercial',
        description: 'Procuramos um especialista em Marketing Digital para gerenciar nossas campanhas de SEO, SEM e redes sociais. Experiência com Google Analytics e Ads é um diferencial.'
    },
    {
        id: 'auditor-financeiro-sr',
        title: 'Auditor Financeiro Sênior',
        location: 'Setúbal, Portugal',
        type: 'Full-time',
        category: 'financas-admin',
        description: 'Vaga para Auditor Financeiro Sênior com sólida experiência em auditoria externa, IFRS e análise de riscos financeiros. Certificação ACCA ou similar desejável.'
    },
];
