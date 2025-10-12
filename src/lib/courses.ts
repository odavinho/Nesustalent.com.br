

import type { Course, CourseCategory } from './types';

export const courseCategories: CourseCategory[] = [
    { id: 'dev-pessoal', name: 'Desenvolvimento Pessoal e Profissional' },
    { id: 'rh-gestao', name: 'Recursos Humanos e Gestão' },
    { id: 'minerios-petroleo', name: 'Recursos Minerais e Petróleos' },
    { id: 'financas-admin', name: 'Finanças e Administração' },
    { id: 'informatica-it', name: 'Informática, IT & Software' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'seguranca-trabalho', name: 'Higiene & Segurança no Trabalho' },
    { id: 'marketing-comercial', name: 'Gestão Comercial & Marketing' },
    { id: 'ingles', name: 'Curso de Inglês' },
    { id: 'certificacao', name: 'Cursos de Certificação'}
];
// This file is now a data source. The service will manage the data in memory.
export { courses as coursesData } from './courses-data';
