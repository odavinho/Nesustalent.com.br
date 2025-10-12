import type { Course } from './types';

export const courses: Course[] = [
  { 
    id: 'TA-001', 
    name: 'Técnicas de Apresentação', 
    category: 'dev-pessoal', 
    imageId: 'course-presentation',
    duration: '24 horas',
    format: 'Presencial',
    generalObjective: 'Desenvolver as competências de comunicação e apresentação em público, permitindo realizar apresentações eficazes e de alto impacto.',
    whatYouWillLearn: [
      'Estruturar uma apresentação de forma lógica e cativante.',
      'Utilizar a comunicação verbal e não-verbal de forma eficaz.',
      'Gerir o nervosismo e a ansiedade ao falar em público.',
      'Criar suportes visuais (slides) claros e apelativos.',
      'Adaptar a apresentação a diferentes tipos de audiência.'
    ],
    modules: [
      { title: 'Módulo 1: Planeamento e Estrutura da Apresentação', topics: ['Definição de objetivos', 'Análise da audiência', 'Estruturas de discurso (Storytelling)', 'Organização do conteúdo'] },
      { title: 'Módulo 2: Comunicação e Expressão', topics: ['Linguagem verbal: clareza, tom e ritmo', 'Linguagem não-verbal: postura, gestos e contacto visual', 'Técnicas de dicção e projecção de voz'] },
      { title: 'Módulo 3: O Apresentador', topics: ['Gestão da ansiedade e autoconfiança', 'Interação com a audiência', 'Gestão de perguntas e respostas'] },
      { title: 'Módulo 4: Suportes Visuais', topics: ['Design de slides (PowerPoint/Google Slides)', 'Princípios de design gráfico para apresentações', 'Uso de imagens, gráficos e multimédia'] }
    ]
  },
  { 
    id: 'GC-002', 
    name: 'Gestão de Conflitos', 
    category: 'dev-pessoal', 
    imageId: 'course-conflict',
    duration: '20 horas',
    format: 'Online',
    generalObjective: 'Capacitar os participantes com ferramentas e técnicas para identificar, gerir e resolver conflitos de forma construtiva no ambiente de trabalho.',
    whatYouWillLearn: [
      'Compreender a natureza e as causas dos conflitos.',
      'Identificar os diferentes estilos de gestão de conflitos.',
      'Aplicar técnicas de negociação e mediação.',
      'Desenvolver a comunicação assertiva para prevenção de conflitos.',
      'Transformar situações de conflito em oportunidades de crescimento.'
    ],
    modules: [
      { title: 'Módulo 1: Introdução ao Conflito', topics: ['Tipos e níveis de conflito', 'Causas comuns de conflitos nas organizações', 'O ciclo de vida do conflito'], videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Módulo 2: Estilos de Gestão de Conflitos', topics: ['Diagnóstico de estilos pessoais', 'Vantagens e desvantagens de cada estilo (evitamento, acomodação, competição, colaboração, compromisso)'] },
      { title: 'Módulo 3: Comunicação e Negociação', topics: ['Escuta ativa e empatia', 'Comunicação assertiva vs. agressiva/passiva', 'Princípios da negociação de Harvard'] },
      { title: 'Módulo 4: Mediação e Resolução', topics: ['O papel do mediador', 'Passos para a resolução de conflitos', 'Criação de acordos ganha-ganha'] }
    ]
  },
  { 
    id: 'LMP-006', 
    name: 'Liderança e Motivação de Pessoas', 
    category: 'rh-gestao', 
    imageId: 'course-leadership', 
    duration: '30 horas', 
    format: 'Híbrido',
    generalObjective: 'Capacitar os participantes com as competências essenciais para liderar e motivar equipas, promovendo um ambiente de trabalho produtivo e positivo.', 
    whatYouWillLearn: [
      'Compreender os diferentes estilos de liderança e quando aplicá-los.', 
      'Desenvolver a inteligência emocional para liderar com empatia.', 
      'Aprender técnicas eficazes de comunicação e feedback.', 
      'Aplicar estratégias de motivação e reconhecimento.', 
      'Gerir o desempenho da equipa e promover o desenvolvimento individual.'
    ], 
    modules: [
      { title: 'Módulo 1: Fundamentos da Liderança', topics: ['Teorias de liderança', 'Líder vs. Chefe', 'O papel do líder no século XXI'] }, 
      { title: 'Módulo 2: Inteligência Emocional na Liderança', topics: ['Autoconhecimento e autogestão', 'Empatia e gestão de relacionamentos', 'Tomada de decisão emocionalmente inteligente'] }, 
      { title: 'Módulo 3: Comunicação e Feedback', topics: ['Comunicação assertiva', 'Técnicas de feedback construtivo', 'Condução de reuniões eficazes'] }, 
      { title: 'Módulo 4: Motivação e Gestão de Desempenho', topics: ['Teorias da motivação (Maslow, Herzberg)', 'Estratégias de reconhecimento e recompensa', 'Definição de metas SMART e avaliação de desempenho'] }] 
  },
  { 
    id: 'EN-427', 
    name: 'Gestão de Projectos', 
    category: 'rh-gestao', 
    imageId: 'course-project-management', 
    duration: '40 horas', 
    format: 'Online',
    generalObjective: 'Fornecer aos participantes os conhecimentos, ferramentas e técnicas fundamentais para gerir projectos de forma eficaz, desde o início até à conclusão.', 
    whatYouWillLearn: [
      'Compreender o ciclo de vida de um projecto.', 
      'Definir o escopo, cronograma, custos e qualidade do projecto.', 
      'Identificar e gerir riscos.', 
      'Gerir a comunicação e as partes interessadas (stakeholders).', 
      'Utilizar metodologias de gestão de projectos (PMBOK, Agile).'
    ], 
    modules: [
      { title: 'Módulo 1: Introdução à Gestão de Projectos', topics: ['O que é um projecto?', 'O papel do Gestor de Projectos', 'Estruturas organizacionais e projectos'] }, 
      { title: 'Módulo 2: Iniciação e Planeamento do Projecto', topics: ['Elaboração do Project Charter', 'Definição do escopo (WBS)', 'Criação do cronograma e orçamento'] }, 
      { title: 'Módulo 3: Execução, Monitorização e Controlo', topics: ['Gestão da equipa do projecto', 'Monitorização do progresso (KPIs)', 'Gestão de mudanças e riscos'] }, 
      { title: 'Módulo 4: Encerramento do Projecto e Metodologias', topics: ['Entrega do projecto', 'Lições aprendidas', 'Introdução ao Scrum e Kanban'] }] 
  },
  { 
    id: 'NE-74', 
    name: 'Power BI Microsoft', 
    category: 'informatica-it', 
    imageId: 'course-power-bi', 
    duration: '35 horas', 
    format: 'Online',
    generalObjective: 'Capacitar os participantes a transformar dados brutos em dashboards e relatórios interactivos e visualmente apelativos, utilizando o Microsoft Power BI.', 
    whatYouWillLearn: [
      'Conectar e transformar dados de diversas fontes (Excel, SQL, etc.).', 
      'Modelar dados para criar relações e hierarquias.', 
      'Criar visualizações de dados (gráficos, tabelas, mapas).', 
      'Utilizar a linguagem DAX para criar medidas e colunas calculadas.', 
      'Publicar e partilhar relatórios no serviço Power BI.'
    ], 
    modules: [
      { title: 'Módulo 1: Introdução ao Power BI', topics: ['O que é o Power BI (Desktop, Service, Mobile)', 'Instalação e interface', 'Fluxo de trabalho no Power BI'] }, 
      { title: 'Módulo 2: Obter e Transformar Dados (Power Query)', topics: ['Conectar a diferentes fontes de dados', 'Limpeza e transformação de dados', 'Fusão e anexação de consultas'] }, 
      { title: 'Módulo 3: Modelação de Dados e DAX', topics: ['Criação de relacionamentos', 'Criação de colunas calculadas e medidas', 'Introdução às funções DAX mais comuns'] }, 
      { title: 'Módulo 4: Visualização e Publicação', topics: ['Criação de relatórios e dashboards', 'Formatação e personalização de visuais', 'Publicação no Power BI Service e partilha'] }] 
  },
  { 
    id: 'GE-003', 
    name: 'Gestão Emocional', 
    category: 'dev-pessoal', 
    imageId: 'course-emotional', 
    duration: '16 horas', 
    format: 'Presencial',
    generalObjective: 'Desenvolver a inteligência emocional dos participantes para melhorarem o autoconhecimento, a autogestão, a empatia e os relacionamentos interpessoais.', 
    whatYouWillLearn: [
      'Reconhecer e compreender as próprias emoções.', 
      'Gerir emoções e impulsos de forma saudável.', 
      'Desenvolver a empatia para compreender os outros.', 
      'Construir relacionamentos mais fortes e positivos.', 
      'Aplicar a inteligência emocional na resolução de problemas.'
    ], 
    modules: [
      { title: 'Módulo 1: Os Pilares da Inteligência Emocional', topics: ['Definição e importância', 'Autoconsciência emocional'] }, 
      { title: 'Módulo 2: Autogestão', topics: ['Controlo de impulsos', 'Gestão do stress', 'Automotivação'] }, 
      { title: 'Módulo 3: Consciência Social', topics: ['Empatia', 'Consciência organizacional'] }, 
      { title: 'Módulo 4: Gestão de Relacionamentos', topics: ['Comunicação eficaz', 'Influência e liderança', 'Trabalho em equipa'] }] 
  }
];
