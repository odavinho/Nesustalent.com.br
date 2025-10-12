import type { UserProfile } from './types';

export const users: UserProfile[] = [
  {
    id: 'student1',
    firstName: 'Ana',
    lastName: 'Pereira',
    email: 'ana.pereira@email.com',
    userType: 'student',
    academicTitle: 'Engenheira de Software',
    nationality: 'Brasileira',
    yearsOfExperience: 5,
    functionalArea: 'Tecnologia da Informação',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    resumeUrl: '#',
    academicHistory: [
        { institution: 'Universidade de São Paulo', degree: 'Engenharia da Computação', year: '2019' }
    ],
    workExperience: [
        { company: 'Tech Solutions', role: 'Desenvolvedora Frontend', period: '2021 - Presente', description: 'Desenvolvimento de aplicações web com React e Next.js.'},
        { company: 'Inova Web', role: 'Desenvolvedora Júnior', period: '2019 - 2021', description: 'Manutenção de sistemas legados em Angular.'}
    ]
  },
  {
    id: 'student2',
    firstName: 'Bruno',
    lastName: 'Costa',
    email: 'bruno.costa@email.com',
    userType: 'student',
    academicTitle: 'Gestor de Projetos',
    nationality: 'Portuguesa',
    yearsOfExperience: 8,
    functionalArea: 'Gestão de Projetos',
    skills: ['Scrum', 'Kanban', 'JIRA', 'PMBOK', 'Gestão de Riscos'],
    resumeUrl: '#',
     academicHistory: [
        { institution: 'Universidade do Porto', degree: 'Mestrado em Gestão', year: '2016' }
    ],
    workExperience: [
        { company: 'Project Movers', role: 'Gestor de Projetos de TI', period: '2018 - Presente', description: 'Liderança de equipas ágeis no desenvolvimento de software.'},
    ]
  },
  {
    id: 'student3',
    firstName: 'Carla',
    lastName: 'Santos',
    email: 'carla.santos@email.com',
    userType: 'student',
    academicTitle: 'Analista de Recursos Humanos',
    nationality: 'Angolana',
    yearsOfExperience: 4,
    functionalArea: 'Recursos Humanos',
    skills: ['Recrutamento e Seleção', 'Entrevistas por Competências', 'Onboarding', 'Legislação Laboral'],
    resumeUrl: '#',
    academicHistory: [
        { institution: 'Universidade Agostinho Neto', degree: 'Licenciatura em Psicologia', year: '2020' }
    ],
     workExperience: [
        { company: 'Talent Hub Angola', role: 'Analista de RH', period: '2020 - Presente', description: 'Foco em recrutamento para o setor de petróleo e gás.'},
    ]
  },
  {
    id: 'student4',
    firstName: 'Diogo',
    lastName: 'Alves',
    email: 'diogo.alves@email.com',
    userType: 'student',
    academicTitle: 'Engenheiro de Petróleo',
    nationality: 'Angolana',
    yearsOfExperience: 2,
    functionalArea: 'Recursos Minerais e Petróleos',
    skills: ['Engenharia de Reservatórios', 'Análise de Perfis', 'Petrel', 'Simulação de Fluxo'],
    academicHistory: [
        { institution: 'ISPTEC', degree: 'Engenharia de Petróleo', year: '2022' }
    ],
  },
];
