
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

export const courses: Course[] = [
  { 
    id: 'TA-001', 
    name: 'Técnicas de Apresentação', 
    category: 'dev-pessoal', 
    imageId: 'course-presentation',
    duration: '24 horas',
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
    generalObjective: 'Capacitar os participantes com ferramentas e técnicas para identificar, gerir e resolver conflitos de forma construtiva no ambiente de trabalho.',
    whatYouWillLearn: [
      'Compreender a natureza e as causas dos conflitos.',
      'Identificar os diferentes estilos de gestão de conflitos.',
      'Aplicar técnicas de negociação e mediação.',
      'Desenvolver a comunicação assertiva para prevenção de conflitos.',
      'Transformar situações de conflito em oportunidades de crescimento.'
    ],
    modules: [
      { title: 'Módulo 1: Introdução ao Conflito', topics: ['Tipos e níveis de conflito', 'Causas comuns de conflitos nas organizações', 'O ciclo de vida do conflito'] },
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
  },
  { 
    id: 'EA-004', 
    name: 'Excelência no Atendimento', 
    category: 'marketing-comercial', 
    imageId: 'course-service', 
    duration: '20 horas', 
    generalObjective: 'Capacitar os profissionais com as técnicas e atitudes necessárias para prestar um atendimento ao cliente de excelência, fidelizando clientes e fortalecendo a marca.', 
    whatYouWillLearn: [
      'Compreender as expectativas do cliente moderno.', 
      'Desenvolver competências de comunicação e escuta ativa.', 
      'Lidar com clientes difíceis e situações de reclamação.', 
      'Personalizar o atendimento e criar experiências memoráveis.', 
      'Utilizar o feedback do cliente para a melhoria contínua.'
    ], 
    modules: [
      { title: 'Módulo 1: O Cliente no Centro', topics: ['Jornada do cliente', 'Momentos da verdade', 'Criação de valor para o cliente'] }, 
      { title: 'Módulo 2: Comunicação Efetiva', topics: ['Comunicação verbal e não-verbal', 'Técnicas de questionamento', 'Empatia no atendimento'] }, 
      { title: 'Módulo 3: Gestão de Reclamações', topics: ['Oportunidades nas reclamações', 'Passos para resolver uma reclamação', 'Técnicas de "descompressão"'] }, 
      { title: 'Módulo 4: Fidelização e Encantamento', topics: ['Ir além das expectativas', 'Técnicas de personalização', 'O papel do pós-venda'] }] 
  },
  { 
    id: 'GR-005', 
    name: 'Gestão de Reclamações', 
    category: 'marketing-comercial', 
    imageId: 'course-complaint', 
    duration: '16 horas', 
    generalObjective: 'Dotar os participantes das competências necessárias para gerir reclamações de forma eficaz, transformando clientes insatisfeitos em clientes leais.', 
    whatYouWillLearn: [
      'Entender a importância de uma boa gestão de reclamações.', 
      'Aplicar um processo estruturado para o tratamento de reclamações.', 
      'Desenvolver a capacidade de escuta ativa e empatia.', 
      'Comunicar de forma clara e assertiva em situações de tensão.', 
      'Utilizar as reclamações como fonte de melhoria para a organização.'
    ], 
    modules: [
      { title: 'Módulo 1: A Reclamação como Oportunidade', topics: ['Por que os clientes reclamam (e por que não reclamam)', 'Impacto de uma má gestão de reclamações', 'O valor do cliente que reclama'] }, 
      { title: 'Módulo 2: Processo de Gestão de Reclamações', topics: ['Acolhimento e registo', 'Análise e investigação', 'Resolução e compensação', 'Comunicação e fecho'] }, 
      { title: 'Módulo 3: Competências Comportamentais', topics: ['Inteligência emocional na gestão de reclamações', 'Técnicas de comunicação assertiva', 'Como lidar com a agressividade'] }, 
      { title: 'Módulo 4: Prevenção e Melhoria Contínua', topics: ['Análise da causa raiz das reclamações', 'Implementação de ações corretivas e preventivas', 'Criação de uma cultura focada no cliente'] }] 
  },
  { 
    id: 'GT-008', 
    name: 'Gestão do Tempo', 
    category: 'dev-pessoal', 
    imageId: 'course-time', 
    duration: '12 horas', 
    generalObjective: 'Ajudar os participantes a otimizar o uso do seu tempo, aumentando a produtividade pessoal e profissional e reduzindo o stress.', 
    whatYouWillLearn: [
      'Identificar os principais "ladrões de tempo".', 
      'Aprender a definir prioridades e a planear tarefas.', 
      'Aplicar ferramentas e técnicas de organização (Matriz de Eisenhower, Pomodoro).', 
      'Gerir interrupções e aprender a dizer "não".', 
      'Criar um sistema de gestão do tempo pessoal e sustentável.'
    ], 
    modules: [
      { title: 'Módulo 1: Diagnóstico e Consciencialização', topics: ['Registo e análise do uso do tempo', 'Identificação de maus hábitos e "desperdiçadores" de tempo'] }, 
      { title: 'Módulo 2: Planeamento e Priorização', topics: ['Definição de metas e objetivos', 'Matriz de Eisenhower (Urgente vs. Importante)', 'Planeamento diário e semanal'] }, 
      { title: 'Módulo 3: Ferramentas e Técnicas', topics: ['Técnica Pomodoro', 'Método GTD (Getting Things Done)', 'Uso de agendas e ferramentas digitais'] }, 
      { title: 'Módulo 4: Foco e Disciplina', topics: ['Gestão de interrupções e distrações', 'A arte de delegar', 'Equilíbrio entre vida profissional e pessoal'] }] 
  },
  { 
    id: 'CV-392', 
    name: 'Comunicação Criativa', 
    category: 'dev-pessoal', 
    imageId: 'course-creative', 
    duration: '18 horas', 
    generalObjective: 'Estimular a criatividade na comunicação, permitindo aos participantes gerar ideias inovadoras e comunicá-las de forma impactante e memorável.', 
    whatYouWillLearn: [
      'Desbloquear o pensamento criativo.', 
      'Aplicar técnicas de brainstorming e ideação.', 
      'Estruturar narrativas envolventes (storytelling).', 
      'Utilizar o humor e a emoção na comunicação.', 
      'Adaptar a comunicação criativa a diferentes meios (digital, presencial).'
    ], 
    modules: [
      { title: 'Módulo 1: O Que é a Criatividade?', topics: ['Mitos sobre a criatividade', 'O processo criativo', 'Técnicas para estimular a criatividade'] }, 
      { title: 'Módulo 2: Ferramentas de Ideação', topics: ['Brainstorming e Brainwriting', 'Mapas Mentais', 'Técnica SCAMPER'] }, 
      { title: 'Módulo 3: Storytelling para Negócios', topics: ['A jornada do herói aplicada a marcas e produtos', 'Construção de personagens e enredo', 'Como usar histórias para vender ideias'] }, 
      { title: 'Módulo 4: Comunicação de Alto Impacto', topics: ['O poder da metáfora e da analogia', 'Uso do humor e da surpresa', 'Design de apresentações criativas'] }] 
  },
  { 
    id: 'MI-334', 
    name: 'Técnicas de Produtividade de Alta Performance', 
    category: 'dev-pessoal', imageId: 'course-performance', 
    duration: '24 horas', 
    generalObjective: 'Equipar os participantes com um arsenal de técnicas e hábitos para alcançar a alta performance, maximizando a produtividade e o bem-estar.', 
    whatYouWillLearn: [
      'Compreender os princípios da alta performance.', 
      'Desenvolver o foco profundo (Deep Work).', 
      'Otimizar a energia física e mental.', 
      'Construir hábitos de sucesso.', 
      'Utilizar a tecnologia a favor da produtividade.'
    ], 
    modules: [
      { title: 'Módulo 1: A Mentalidade da Alta Performance', topics: ['Clareza de objetivos', 'Psicologia do flow', 'Mindset de crescimento'] }, 
      { title: 'Módulo 2: Gestão do Foco e Energia', topics: ['Técnicas de Deep Work', 'Gestão de ciclos de energia (Ultradian Rhythms)', 'A importância do descanso e da recuperação'] }, 
      { title: 'Módulo 3: Hábitos e Rotinas', topics: ['O poder dos hábitos (O Loop do Hábito)', 'Construção de rotinas matinais e noturnas', 'Técnica do "Habit Stacking"'] }, 
      { title: 'Módulo 4: Ferramentas e Sistemas', topics: ['Método Zettelkasten para gestão do conhecimento', 'Automação de tarefas repetitivas', 'Configuração de um ambiente de trabalho produtivo'] }] 
  },
  {
    id: 'HS-001',
    name: 'Segurança em Plataformas Petrolíferas',
    category: 'seguranca-trabalho',
    imageId: 'course-team-management',
    duration: '40 horas',
    generalObjective: 'Capacitar profissionais para identificar riscos e aplicar procedimentos de segurança em plataformas de petróleo e gás, em conformidade com as normas internacionais.',
    whatYouWillLearn: [
      'Compreender o ambiente offshore e seus riscos específicos.',
      'Aplicar procedimentos de emergência e evacuação.',
      'Utilizar equipamentos de proteção individual (EPIs) corretamente.',
      'Conhecer as normas de segurança (NRs, IMO, etc.).',
      'Participar em investigações de incidentes.'
    ],
    modules: [
      { title: 'Módulo 1: Introdução ao Ambiente Offshore', topics: ['Tipos de plataformas', 'Riscos ambientais e operacionais', 'Legislação e normas'] },
      { title: 'Módulo 2: Prevenção e Combate a Incêndios', topics: ['Classes de fogo', 'Sistemas de detecção e alarme', 'Uso de extintores e hidrantes'] },
      { title: 'Módulo 3: Sobrevivência no Mar', topics: ['Técnicas de sobrevivência', 'Uso de botes salva-vidas e coletes', 'Primeiros socorros em ambiente offshore'] },
      { title: 'Módulo 4: Permissão para Trabalho (PTW)', topics: ['Sistema de permissão para trabalho', 'Análise de risco da tarefa (ART)', 'Trabalhos a quente, em altura e em espaços confinados'] }
    ]
  },
  {
    id: 'FA-002',
    name: 'Contabilidade para Não Contabilistas',
    category: 'financas-admin',
    imageId: 'course-accounting-non-accountants',
    duration: '24 horas',
    generalObjective: 'Proporcionar uma compreensão fundamental dos princípios e práticas contabilísticas a gestores e profissionais de outras áreas, permitindo uma melhor tomada de decisão.',
    whatYouWillLearn: [
      'Interpretar as principais demonstrações financeiras (Balanço, Demonstração de Resultados).',
      'Compreender os conceitos de débito, crédito, ativo e passivo.',
      'Analisar a saúde financeira de uma empresa através de rácios.',
      'Entender a relação entre a contabilidade e a gestão orçamental.',
      'Dialogar de forma mais eficaz com os departamentos financeiros.'
    ],
    modules: [
      { title: 'Módulo 1: Fundamentos da Contabilidade', topics: ['O objetivo da contabilidade', 'Princípios contabilísticos geralmente aceites', 'O ciclo contabilístico'] },
      { title: 'Módulo 2: As Demonstrações Financeiras', topics: ['Balanço Patrimonial', 'Demonstração de Resultados', 'Demonstração de Fluxos de Caixa'] },
      { title: 'Módulo 3: Análise Financeira', topics: ['Análise de rácios de liquidez, rentabilidade e endividamento', 'Ponto de equilíbrio (Break-even point)'] },
      { title: 'Módulo 4: Contabilidade de Gestão', topics: ['Custos fixos e variáveis', 'Orçamentação e controlo orçamental', 'Contabilidade na tomada de decisões'] }
    ]
  },
  {
    id: 'IT-003',
    name: 'Introdução à Programação com Python',
    category: 'informatica-it',
    imageId: 'course-python-intro',
    duration: '40 horas',
    generalObjective: 'Oferecer uma introdução sólida à programação de computadores utilizando a linguagem Python, capacitando os alunos a resolver problemas e a automatizar tarefas.',
    whatYouWillLearn: [
      'Entender os conceitos fundamentais de lógica de programação.',
      'Escrever scripts em Python para manipular dados e ficheiros.',
      'Utilizar estruturas de dados como listas, dicionários e tuplas.',
      'Criar funções para reutilizar código.',
      'Introdução à programação orientada a objetos (POO).'
    ],
    modules: [
      { title: 'Módulo 1: Primeiros Passos com Python', topics: ['Instalação do ambiente', 'Variáveis e tipos de dados', 'Operadores aritméticos e lógicos'] },
      { title: 'Módulo 2: Estruturas de Controlo', topics: ['Condicionais (if, elif, else)', 'Loops (for, while)', 'Tratamento de exceções (try, except)'] },
      { title: 'Módulo 3: Estruturas de Dados', topics: ['Listas e Tuplas', 'Dicionários e Sets', 'Manipulação de strings'] },
      { title: 'Módulo 4: Funções e Módulos', topics: ['Definição e chamada de funções', 'Escopo de variáveis', 'Importação de módulos e bibliotecas padrão'] }
    ]
  },
  { 
    id: 'GERH-007', 
    name: 'Gestão Estratégica de Recursos Humanos', 
    category: 'rh-gestao', 
    imageId: 'course-strategic-hr', 
    duration: '35 horas', 
    generalObjective: 'Alinhar a gestão de pessoas com os objetivos estratégicos da organização, transformando o RH num parceiro de negócio.', 
    whatYouWillLearn: ['Desenvolver planeamento estratégico de RH.', 'Implementar modelos de gestão por competências.', 'Gerir talentos e sucessão.', 'Analisar métricas de RH (HR Analytics).'], 
    modules: [{ title: 'Módulo 1: RH Estratégico', topics: ['O papel do RH estratégico', 'Diagnóstico organizacional'] }, { title: 'Módulo 2: Gestão por Competências', topics: ['Mapeamento de competências', 'Avaliação de desempenho'] }] 
  },
  { 
    id: 'PU-595', 
    name: 'Técnicas de Recrutamento e Selecção Pessoal', 
    category: 'rh-gestao', 
    imageId: 'course-recruitment', 
    duration: '25 horas', 
    generalObjective: 'Capacitar profissionais de RH com as mais modernas técnicas para atrair, entrevistar e selecionar os melhores talentos para a organização.', 
    whatYouWillLearn: ['Realizar o sourcing de candidatos em diferentes canais.', 'Conduzir entrevistas por competências.', 'Aplicar testes e dinâmicas de grupo.', 'Melhorar a experiência do candidato (Candidate Experience).'], 
    modules: [{ title: 'Módulo 1: Atração de Talentos', topics: ['Employer branding', 'Sourcing ativo e passivo'] }, { title: 'Módulo 2: O Processo de Seleção', topics: ['Entrevista comportamental (STAR)', 'Assessment centers'] }] 
  },
  { 
    id: 'EP-432', 
    name: 'Secretariado Executivo de Alta Direção', 
    category: 'financas-admin', 
    imageId: 'course-executive-assistant', 
    duration: '30 horas', 
    generalObjective: 'Desenvolver as competências necessárias para um desempenho de excelência no apoio a executivos de topo, gerindo agendas, comunicação e eventos.',
    whatYouWillLearn: ['Gerir agendas complexas e viagens.', 'Organizar reuniões e eventos corporativos.', 'Dominar a comunicação escrita e oral em contexto executivo.', 'Manter a confidencialidade e a discrição.'], 
    modules: [{ title: 'Módulo 1: Organização e Planeamento', topics: ['Gestão de tempo e prioridades', 'Planeamento de viagens'] }, { title: 'Módulo 2: Comunicação e Etiqueta', topics: ['Comunicação interpessoal', 'Etiqueta empresarial']}] 
  },
  { 
    id: 'GW-14', 
    name: 'Gestão de Equipas & Liderança', 
    category: 'rh-gestao', 
    imageId: 'course-document-management', 
    duration: '28 horas', 
    generalObjective: 'Aprofundar as competências de liderança para a gestão eficaz de equipas, focando na delegação, motivação e desenvolvimento de pessoas.', 
    whatYouWillLearn: ['Delegar tarefas de forma eficaz.', 'Dar feedback construtivo e motivador.', 'Gerir o desempenho da equipa.', 'Promover um ambiente de colaboração.'], 
    modules: [{ title: 'Módulo 1: Liderança Situacional', topics: ['Diagnóstico da maturidade da equipa', 'Adaptação do estilo de liderança'] }, { title: 'Módulo 2: Ferramentas de Gestão', topics: ['Definição de metas OKR', 'Condução de one-on-ones'] }] 
  },
  { 
    id: 'NG-302', 
    name: 'Finanças para não Financeiros', 
    category: 'financas-admin', imageId: 'course-finance-non-finance', 
    duration: '20 horas', 
    generalObjective: 'Dotar profissionais de áreas não-financeiras com os conhecimentos essenciais para compreenderem a linguagem financeira e participarem em decisões de negócio.', 
    whatYouWillLearn: ['Ler e interpretar demonstrações financeiras.', 'Compreender os principais indicadores de performance (KPIs).', 'Participar na elaboração de orçamentos.', 'Analisar a viabilidade de pequenos projetos.'], 
    modules: [{ title: 'Módulo 1: Contabilidade Básica', topics: ['Ativo, Passivo, Capital Próprio', 'Receitas e Despesas'] }, { title: 'Módulo 2: Análise Financeira', topics: ['Rácios de rentabilidade', 'Análise do ponto de equilíbrio'] }] 
  },
  { 
    id: 'FI-696', 
    name: 'Gestão Documental e Arquivo', 
    category: 'financas-admin', 
    imageId: 'course-procurement', 
    duration: '16 horas', 
    generalObjective: 'Capacitar os participantes a organizar, gerir e arquivar documentos (físicos e digitais) de forma eficiente e segura, em conformidade com a legislação.', 
    whatYouWillLearn: ['Criar e implementar um plano de classificação de documentos.', 'Dominar técnicas de arquivo físico e digital.', 'Compreender os requisitos legais de retenção de documentos.', 'Utilizar software de gestão documental (GED).'], 
    modules: [{ title: 'Módulo 1: Princípios de Arquivística', topics: ['Ciclo de vida dos documentos', 'Tabelas de temporalidade'] }, { title: 'Módulo 2: Arquivo Digital', topics: ['Digitalização e indexação', 'Segurança da informação'] }] 
  },
  { 
    id: 'WT-424', 
    name: 'Operações Logísticas', 
    category: 'industrial', 
    imageId: 'course-logistics', 
    duration: '24 horas', 
    generalObjective: 'Fornecer uma visão integrada das operações logísticas, desde o aprovisionamento até à distribuição, com foco na eficiência e redução de custos.', 
    whatYouWillLearn: ['Compreender a cadeia de abastecimento (Supply Chain).', 'Gerir o transporte e a distribuição.', 'Otimizar a gestão de stocks.', 'Conhecer as tecnologias aplicadas à logística.'], 
    modules: [{ title: 'Módulo 1: Supply Chain Management', topics: ['Fluxos de materiais e informação', 'Logística Inbound e Outbound'] }, { title: 'Módulo 2: Gestão de Armazém', topics: ['Layout de armazém', 'Picking e packing'] }] 
  },
  { 
    id: 'KR-550', 
    name: 'Gestão de Compras e Aprovisionamento', 
    category: 'industrial', 
    imageId: 'course-excel-purchasing', 
    duration: '22 horas', 
    generalObjective: 'Desenvolver competências para a gestão estratégica do processo de compras, desde a seleção de fornecedores até à negociação e gestão de contratos.', 
    whatYouWillLearn: ['Realizar a qualificação e avaliação de fornecedores.', 'Conduzir processos de negociação eficazes.', 'Gerir contratos e SLAs (Service Level Agreements).', 'Implementar estratégias de redução de custos (Strategic Sourcing).'], 
    modules: [{ title: 'Módulo 1: O Processo de Compras', topics: ['Requisição, cotação, ordem de compra', 'E-procurement'] }, { title: 'Módulo 2: Negociação em Compras', topics: ['Técnicas de negociação', 'Gestão de relacionamento com fornecedores'] }] 
  },
  { 
    id: 'MB-161', 
    name: 'Microsoft Excel Aplicado às Compras', 
    category: 'financas-admin', 
    imageId: 'course-mineral-resources', 
    duration: '20 horas', 
    generalObjective: 'Capacitar profissionais da área de compras a utilizar o Microsoft Excel como uma ferramenta poderosa para análise de dados, criação de dashboards e otimização de processos.', 
    whatYouWillLearn: ['Criar tabelas dinâmicas para analisar dados de compras.', 'Utilizar funções avançadas (PROCV, SOMASES) para criar relatórios.', 'Desenvolver dashboards de KPIs de compras.', 'Automatizar tarefas com macros simples.'], 
    modules: [{ title: 'Módulo 1: Análise de Dados', topics: ['Tabelas dinâmicas', 'Filtros avançados'] }, { title: 'Módulo 2: Dashboards', topics: ['Criação de gráficos', 'Formatação condicional'] }] 
  },
  { 
    id: 'XZ-173', 
    name: 'Gestão de Recursos Minerais', 
    category: 'minerios-petroleo', 
    imageId: 'course-oil-reservoir', 
    duration: '35 horas', 
    generalObjective: 'Fornecer uma visão abrangente sobre a gestão de projetos de exploração e explotação de recursos minerais, abordando aspetos técnicos, económicos e ambientais.', 
    whatYouWillLearn: ['Compreender o ciclo de vida de um projeto mineiro.', 'Analisar a viabilidade económica de jazigos minerais.', 'Conhecer as principais técnicas de extração.', 'Aplicar princípios de gestão ambiental e responsabilidade social.'], 
    modules: [{ title: 'Módulo 1: Exploração Mineral', topics: ['Geologia e prospeção', 'Avaliação de depósitos'] }, { title: 'Módulo 2: Explotação e Processamento', topics: ['Métodos de lavra', 'Britagem e moagem'] }] 
  },
  { 
    id: 'XX-168', 
    name: 'Gestão de Reservatórios de Petróleo e Gás', 
    category: 'minerios-petroleo', 
    imageId: 'course-financial-analysis', 
    duration: '40 horas', 
    generalObjective: 'Capacitar engenheiros e geocientistas com as competências para a caracterização e gestão otimizada de reservatórios de hidrocarbonetos.', 
    whatYouWillLearn: ['Caracterizar reservatórios através de dados geológicos e de engenharia.', 'Estimar volumes de óleo e gás in-place.', 'Analisar o comportamento de produção dos poços.', 'Planear estratégias de recuperação secundária e avançada.'], 
    modules: [{ title: 'Módulo 1: Caracterização de Reservatórios', topics: ['Petrofísica', 'Análise de fluidos PVT'] }, { title: 'Módulo 2: Engenharia de Reservatórios', topics: ['Balanço de materiais', 'Simulação de reservatórios'] }] 
  },
  { 
    id: 'RD-117', 
    name: 'Planeamento Estratégico e Comercial', 
    category: 'marketing-comercial', 
    imageId: 'course-strategic-planning', 
    duration: '30 horas', 
    generalObjective: 'Desenvolver a capacidade de elaborar e implementar um plano estratégico e comercial alinhado com os objetivos da empresa, o mercado e a concorrência.', 
    whatYouWillLearn: ['Realizar a análise SWOT e PESTAL.', 'Definir a missão, visão e valores.', 'Estabelecer objetivos e metas SMART.', 'Desenvolver o plano de marketing e vendas.'], 
    modules: [{ title: 'Módulo 1: Análise Estratégica', topics: ['Análise interna e externa', 'Forças de Porter'] }, { title: 'Módulo 2: Formulação e Implementação', topics: ['Balanced Scorecard', 'Planos de ação'] }] 
  },
  { 
    id: 'XL-702', 
    name: 'Análise Financeira', 
    category: 'financas-admin', 
    imageId: 'course-workplace-safety', 
    duration: '25 horas', 
    generalObjective: 'Aprofundar os conhecimentos em análise financeira, capacitando os participantes a avaliar a performance e a saúde financeira de uma empresa para a tomada de decisão.', 
    whatYouWillLearn: ['Analisar demonstrações financeiras em detalhe.', 'Calcular e interpretar rácios financeiros complexos.', 'Realizar a análise de sensibilidade e cenários.', 'Avaliar empresas (Valuation).'], 
    modules: [{ title: 'Módulo 1: Análise de Demonstrações', topics: ['Análise vertical e horizontal', 'Análise de fluxos de caixa'] }, { title: 'Módulo 2: Avaliação de Empresas', topics: ['Método dos fluxos de caixa descontados (DCF)', 'Múltiplos de mercado'] }] 
  },
  { 
    id: 'YX-341', 
    name: 'Segurança da Informação', 
    category: 'informatica-it', 
    imageId: 'course-info-security', 
    duration: '40 horas', 
    generalObjective: 'Fornecer uma base sólida sobre os princípios, políticas e tecnologias de segurança da informação para proteger os ativos digitais de uma organização.', 
    whatYouWillLearn: ['Compreender os pilares da segurança da informação (CIA Triad).', 'Identificar ameaças e vulnerabilidades.', 'Implementar controlos de acesso.', 'Conhecer os fundamentos de criptografia e gestão de redes.'], 
    modules: [{ title: 'Módulo 1: Fundamentos de Segurança', topics: ['Ameaças, vulnerabilidades e riscos', 'Políticas de segurança'] }, { title: 'Módulo 2: Tecnologias de Segurança', topics: ['Firewalls e IDS/IPS', 'Criptografia e assinaturas digitais'] }] 
  },
  { 
    id: 'BH-705', 
    name: 'Montagem e Inspeção de Andaimes', 
    category: 'industrial', 
    imageId: 'course-scaffolding', 
    duration: '24 horas', 
    generalObjective: 'Capacitar profissionais para a montagem, desmontagem e inspeção segura de andaimes, em conformidade com as normas de segurança no trabalho.', 
    whatYouWillLearn: ['Identificar os tipos de andaimes e seus componentes.', 'Realizar a montagem e desmontagem de forma segura.', 'Inspecionar andaimes para garantir a sua estabilidade e segurança.', 'Conhecer e aplicar as normas regulamentadoras.'], 
    modules: [{ title: 'Módulo 1: Tipologia e Componentes', topics: ['Andaimes tubulares, fachadeiros, etc.', 'Bases, montantes, travessas'] }, { title: 'Módulo 2: Montagem e Segurança', topics: ['Sequência de montagem', 'Sistemas de proteção contra quedas'] }] 
  },
  { 
    id: 'GR-610', 
    name: 'Higiene e Segurança no Trabalho', 
    category: 'seguranca-trabalho', 
    imageId: 'course-english-beginner', 
    duration: '35 horas', 
    generalObjective: 'Fornecer conhecimentos fundamentais sobre a prevenção de riscos profissionais, promovendo um ambiente de trabalho seguro e saudável.', 
    whatYouWillLearn: ['Identificar perigos e avaliar riscos no local de trabalho.', 'Compreender a legislação de segurança e saúde no trabalho.', 'Implementar medidas de prevenção e proteção.', 'Investigar acidentes de trabalho.'], 
    modules: [{ title: 'Módulo 1: Legislação e Conceitos', topics: ['Normas regulamentadoras', 'Conceitos de perigo, risco, acidente'] }, { title: 'Módulo 2: Gestão de Riscos', topics: ['Identificação de perigos', 'Avaliação de riscos (Matriz de Risco)'] }] 
  },
  { 
    id: 'YR-504', 
    name: 'Gestão Comercial', 
    category: 'marketing-comercial', 
    imageId: 'course-commercial-management', 
    duration: '30 horas', 
    generalObjective: 'Desenvolver uma visão estratégica e integrada da área comercial, desde o planeamento de vendas até à gestão da equipa e relacionamento com clientes.', 
    whatYouWillLearn: ['Elaborar um plano de vendas e definir metas.', 'Gerir o funil de vendas (pipeline).', 'Liderar e motivar a equipa de vendas.', 'Utilizar CRM para gestão de clientes.'], 
    modules: [{ title: 'Módulo 1: Estratégia de Vendas', topics: ['Análise de mercado e concorrência', 'Definição de canais de venda'] }, { title: 'Módulo 2: Gestão da Equipa', topics: ['Recrutamento de vendedores', 'Sistemas de remuneração e incentivos'] }] 
  },
  { 
    id: 'YA-332', 
    name: 'Inglês - Beginner', 
    category: 'ingles', 
    imageId: 'course-negotiation-techniques-2', 
    duration: '50 horas', 
    generalObjective: 'Introduzir o aluno à língua inglesa, desenvolvendo competências básicas de compreensão e expressão oral e escrita para situações do dia-a-dia.', 
    whatYouWillLearn: ['Apresentar-se e falar sobre si.', 'Compreender e usar expressões familiares e quotidianas.', 'Interagir de forma simples.', 'Construir frases básicas sobre necessidades imediatas.'], 
    modules: [{ title: 'Módulo 1: Greetings and Introductions', topics: ['The verb "to be"', 'Alphabet and numbers'] }, { title: 'Módulo 2: My World', topics: ['Family and professions', 'Simple present tense'] }] 
  },
  {
    id: 'ZJ-280',
    name: 'Desenvolvimento da Eficácia',
    category: 'dev-pessoal',
    imageId: 'course-effectiveness-dev',
    duration: '20 horas',
    generalObjective: 'Potenciar a eficácia pessoal e profissional através de técnicas de autogestão e organização.',
    whatYouWillLearn: ['Definir metas claras', 'Priorizar tarefas', 'Melhorar a concentração', 'Otimizar rotinas de trabalho'],
    modules: [{ title: 'Módulo 1: Autoconhecimento', topics: ['Identificação de pontos fortes e fracos'] }, { title: 'Módulo 2: Planeamento', topics: ['Técnicas de planeamento semanal e diário'] }]
  },
  {
    id: 'ZH-106',
    name: 'Gestão Estratégica de Recursos Humanos',
    category: 'rh-gestao',
    imageId: 'course-strategic-hr-2',
    duration: '35 horas',
    generalObjective: 'Alinhar a gestão de pessoas com os objetivos estratégicos da organização.',
    whatYouWillLearn: ['Desenvolver planeamento de RH', 'Implementar gestão por competências', 'Gerir talentos e sucessão', 'Analisar métricas de RH'],
    modules: [{ title: 'Módulo 1: Diagnóstico Organizacional', topics: ['Análise de cenários'] }, { title: 'Módulo 2: Modelos de Competências', topics: ['Desenho e implementação'] }]
  },
  {
    id: 'EL-229',
    name: 'Gestão de Tesouraria',
    category: 'financas-admin',
    imageId: 'course-treasury-management',
    duration: '25 horas',
    generalObjective: 'Otimizar a gestão dos recursos financeiros de curto prazo da empresa.',
    whatYouWillLearn: ['Gerir fluxos de caixa', 'Analisar o risco de liquidez', 'Negociar com instituições financeiras', 'Otimizar o capital de giro'],
    modules: [{ title: 'Módulo 1: Fluxo de Caixa', topics: ['Projeção e controlo'] }, { title: 'Módulo 2: Risco Financeiro', topics: ['Gestão de risco de crédito e mercado'] }]
  },
  {
    id: 'YZ-719',
    name: 'SAP BASIS - Melhores Práticas de Administração',
    category: 'certificacao',
    imageId: 'course-sap-basis',
    duration: '40 horas',
    generalObjective: 'Capacitar administradores de sistemas SAP com as melhores práticas para a manutenção e otimização do ambiente.',
    whatYouWillLearn: ['Monitorizar o desempenho do sistema', 'Gerir transportes e mandantes', 'Aplicar patches e atualizações', 'Configurar a segurança do sistema'],
    modules: [{ title: 'Módulo 1: Arquitetura SAP', topics: ['Componentes e processos'] }, { title: 'Módulo 2: Administração Diária', topics: ['Monitorização e troubleshooting'] }]
  },
  {
    id: 'SE-447',
    name: 'Microsoft Powerpoint',
    category: 'informatica-it',
    imageId: 'course-powerpoint',
    duration: '15 horas',
    generalObjective: 'Dominar o Microsoft PowerPoint para criar apresentações profissionais e de alto impacto.',
    whatYouWillLearn: ['Criar slides com design profissional', 'Utilizar animações e transições', 'Inserir e formatar elementos multimédia', 'Apresentar com eficácia usando os recursos do PowerPoint'],
    modules: [{ title: 'Módulo 1: Design de Slides', topics: ['Master slides e layouts'] }, { title: 'Módulo 2: Apresentações Dinâmicas', topics: ['Animações e interatividade'] }]
  },
  {
    id: 'NR-123',
    name: 'Formação Avançada de Gestores',
    category: 'rh-gestao',
    imageId: 'course-advanced-management',
    duration: '40 horas',
    generalObjective: 'Desenvolver competências de liderança estratégica e gestão de mudança em gestores experientes.',
    whatYouWillLearn: ['Pensamento estratégico', 'Liderança transformacional', 'Gestão da inovação', 'Tomada de decisão complexa'],
    modules: [{ title: 'Módulo 1: Liderança Estratégica', topics: ['Visão e estratégia'] }, { title: 'Módulo 2: Gestão da Mudança', topics: ['Comunicação e engajamento'] }]
  },
  {
    id: 'CM-602',
    name: 'Técnicas de Recrutamento e Selecção de Pessoal',
    category: 'rh-gestao',
    imageId: 'course-recruitment-techniques-2',
    duration: '25 horas',
    generalObjective: 'Aprofundar as técnicas de recrutamento e seleção para otimizar a contratação de talentos.',
    whatYouWillLearn: ['Sourcing avançado', 'Entrevistas por competências', 'Avaliação psicométrica', 'Employer branding'],
    modules: [{ title: 'Módulo 1: Atração de Talentos', topics: ['Marketing de recrutamento'] }, { title: 'Módulo 2: Avaliação de Candidatos', topics: ['Assessment centers'] }]
  },
  {
    id: 'DX-267',
    name: 'Logística e Gestão Orçamental',
    category: 'industrial',
    imageId: 'course-logistics-budget',
    duration: '28 horas',
    generalObjective: 'Integrar a gestão logística com o planeamento e controlo orçamental para maximizar a eficiência e rentabilidade.',
    whatYouWillLearn: ['Elaborar orçamentos para operações logísticas', 'Analisar custos logísticos', 'Otimizar a relação custo-serviço', 'Medir o desempenho logístico-financeiro'],
    modules: [{ title: 'Módulo 1: Orçamentação Logística', topics: ['Custeio de transporte e armazenagem'] }, { title: 'Módulo 2: Controlo e Análise', topics: ['Análise de desvios'] }]
  },
  {
    id: 'IE-284',
    name: 'Gestão de Stock',
    category: 'industrial',
    imageId: 'course-stock-management',
    duration: '20 horas',
    generalObjective: 'Capacitar os participantes a gerir os níveis de stock de forma a minimizar custos e maximizar o nível de serviço ao cliente.',
    whatYouWillLearn: ['Classificação ABC de inventário', 'Calcular o lote económico de compra', 'Definir stocks de segurança', 'Utilizar KPIs de gestão de stock'],
    modules: [{ title: 'Módulo 1: Modelos de Inventário', topics: ['Custos de stock'] }, { title: 'Módulo 2: Otimização', topics: ['Previsão de demanda'] }]
  },
  {
    id: 'QE-678',
    name: 'Gestão de Operações',
    category: 'industrial',
    imageId: 'course-operations-management',
    duration: '30 horas',
    generalObjective: 'Fornecer uma visão abrangente da gestão de operações em empresas de serviços e produção.',
    whatYouWillLearn: ['Mapear e otimizar processos', 'Gerir a qualidade (TQM)', 'Planear a capacidade produtiva', 'Melhoria contínua (Kaizen)'],
    modules: [{ title: 'Módulo 1: Desenho de Processos', topics: ['Fluxogramas e VSM'] }, { title: 'Módulo 2: Qualidade e Melhoria', topics: ['Ferramentas da qualidade'] }]
  },
  {
    id: 'QA-627',
    name: 'Gestão de Armazéns',
    category: 'industrial',
    imageId: 'course-warehouse-management',
    duration: '24 horas',
    generalObjective: 'Otimizar a gestão de armazéns, desde o layout e organização até à gestão de equipas e equipamentos.',
    whatYouWillLearn: ['Desenhar layouts eficientes', 'Gerir processos de receção, armazenagem e expedição', 'Selecionar e gerir equipamentos (empilhadoras, etc.)', 'Implementar sistemas WMS'],
    modules: [{ title: 'Módulo 1: Layout e Processos', topics: ['Organização do espaço'] }, { title: 'Módulo 2: Tecnologia e Equipamentos', topics: ['Sistemas de gestão de armazém (WMS)'] }]
  },
  {
    id: 'SS-526',
    name: 'Gestão da Cadeia de Suprimentos',
    category: 'industrial',
    imageId: 'course-supply-chain',
    duration: '30 horas',
    generalObjective: 'Desenvolver uma visão estratégica e integrada da cadeia de suprimentos (Supply Chain Management).',
    whatYouWillLearn: ['Mapear a cadeia de suprimentos', 'Gerir o relacionamento com fornecedores e clientes', 'Implementar estratégias de logística integrada', 'Analisar o risco na cadeia de suprimentos'],
    modules: [{ title: 'Módulo 1: Estratégia de SCM', topics: ['Modelos de supply chain'] }, { title: 'Módulo 2: Logística Integrada', topics: ['Gestão de transportes e distribuição'] }]
  },
  {
    id: 'KF-460',
    name: 'Gestão de Fornecedores',
    category: 'industrial',
    imageId: 'course-supplier-management',
    duration: '20 horas',
    generalObjective: 'Desenvolver e gerir relacionamentos estratégicos com fornecedores para garantir qualidade, inovação e redução de custos.',
    whatYouWillLearn: ['Qualificar e homologar fornecedores', 'Avaliar o desempenho dos fornecedores', 'Desenvolver planos de melhoria conjunta', 'Gerir o risco de fornecedores'],
    modules: [{ title: 'Módulo 1: Seleção e Qualificação', topics: ['Critérios de avaliação'] }, { title: 'Módulo 2: Gestão de Relacionamento (SRM)', topics: ['Colaboração e desenvolvimento'] }]
  },
  {
    id: 'LM-471',
    name: 'Gestão Estratégica de Fornecedores e Outsourcing',
    category: 'industrial',
    imageId: 'course-strategic-sourcing',
    duration: '28 horas',
    generalObjective: 'Capacitar os participantes a tomar decisões estratégicas sobre compras e outsourcing, alinhadas com os objetivos do negócio.',
    whatYouWillLearn: ['Analisar o mercado de fornecedores', 'Desenvolver estratégias de sourcing por categoria', 'Estruturar e negociar contratos de outsourcing', 'Gerir a transição e a governação de serviços terceirizados'],
    modules: [{ title: 'Módulo 1: Strategic Sourcing', topics: ['Análise de spend'] }, { title: 'Módulo 2: Gestão de Outsourcing', topics: ['Definição de SLAs'] }]
  },
  {
    id: 'XL-161',
    name: 'Produção e Gestão de Transportes',
    category: 'industrial',
    imageId: 'course-transport-management',
    duration: '24 horas',
    generalObjective: 'Otimizar a gestão da frota e das operações de transporte para reduzir custos e melhorar o nível de serviço.',
    whatYouWillLearn: ['Planear rotas e cargas', 'Gerir a manutenção da frota', 'Calcular custos de transporte', 'Conhecer a legislação de transportes'],
    modules: [{ title: 'Módulo 1: Planeamento de Rotas', topics: ['Roteirização'] }, { title: 'Módulo 2: Gestão de Frota', topics: ['Manutenção preventiva'] }]
  },
  {
    id: 'YE-743',
    name: 'Recursos Minerais e Ambiente',
    category: 'minerios-petroleo',
    imageId: 'course-minerals-environment',
    duration: '30 horas',
    generalObjective: 'Analisar os impactos ambientais da atividade mineira e aprender as melhores práticas para a sua mitigação e gestão.',
    whatYouWillLearn: ['Avaliar impactos ambientais', 'Desenvolver planos de gestão ambiental', 'Implementar técnicas de recuperação de áreas degradadas', 'Compreender a legislação ambiental aplicável'],
    modules: [{ title: 'Módulo 1: Impactos Ambientais da Mineração', topics: ['Poluição da água e do ar'] }, { title: 'Módulo 2: Gestão e Recuperação', topics: ['Planos de fecho de mina'] }]
  },
  {
    id: 'NH-96',
    name: 'Sistema de Gestão Ambiental - ISO14001',
    category: 'certificacao',
    imageId: 'course-iso14001',
    duration: '24 horas',
    generalObjective: 'Capacitar os participantes a implementar e auditar um Sistema de Gestão Ambiental (SGA) de acordo com a norma ISO 14001.',
    whatYouWillLearn: ['Interpretar os requisitos da ISO 14001', 'Realizar o levantamento de aspetos e impactes ambientais', 'Elaborar a documentação do SGA', 'Planear e conduzir auditorias internas'],
    modules: [{ title: 'Módulo 1: Requisitos da Norma', topics: ['Estrutura e cláusulas'] }, { title: 'Módulo 2: Implementação e Auditoria', topics: ['Passos para a certificação'] }]
  },
  {
    id: 'RA-253',
    name: 'Geologia para não Geólogos',
    category: 'minerios-petroleo',
    imageId: 'course-geology-non-geologists',
    duration: '20 horas',
    generalObjective: 'Fornecer a profissionais de outras áreas os conceitos fundamentais de geologia necessários para compreenderem projetos de mineração e petróleo.',
    whatYouWillLearn: ['Entender a formação de rochas e minerais', 'Compreender os processos geológicos', 'Interpretar mapas geológicos simples', 'Conhecer os principais tipos de depósitos minerais e de hidrocarbonetos'],
    modules: [{ title: 'Módulo 1: Fundamentos de Geologia', topics: ['Ciclo das rochas'] }, { title: 'Módulo 2: Geologia Aplicada', topics: ['Geologia do petróleo e mineração'] }]
  },
  {
    id: 'OL-341',
    name: 'Geofísica Nível I',
    category: 'minerios-petroleo',
    imageId: 'course-geophysics-1',
    duration: '30 horas',
    generalObjective: 'Introduzir os princípios e métodos geofísicos utilizados na exploração de recursos minerais e petrolíferos.',
    whatYouWillLearn: ['Fundamentos dos métodos sísmicos, gravimétricos e magnéticos', 'Adquirir dados geofísicos', 'Processamento básico de dados', 'Interpretação de anomalias'],
    modules: [{ title: 'Módulo 1: Métodos Potenciais', topics: ['Gravimetria e Magnetometria'] }, { title: 'Módulo 2: Métodos Sísmicos', topics: ['Reflexão e refração sísmica'] }]
  },
  {
    id: 'PM-599',
    name: 'Geofísica Nível II',
    category: 'minerios-petroleo',
    imageId: 'course-geophysics-2',
    duration: '35 horas',
    generalObjective: 'Aprofundar o conhecimento em métodos geofísicos, com foco no processamento e interpretação de dados.',
    whatYouWillLearn: ['Processamento avançado de dados sísmicos', 'Inversão geofísica', 'Interpretação integrada de dados', 'Modelagem geofísica'],
    modules: [{ title: 'Módulo 1: Processamento Sísmico', topics: ['Migração e análise de velocidades'] }, { title: 'Módulo 2: Interpretação', topics: ['Mapeamento de horizontes e falhas'] }]
  },
  {
    id: 'DE-510',
    name: 'Geofísica Nível III',
    category: 'minerios-petroleo',
    imageId: 'course-geophysics-3',
    duration: '40 horas',
    generalObjective: 'Capacitar os participantes com técnicas avançadas de geofísica para a caracterização detalhada de reservatórios e jazigos minerais.',
    whatYouWillLearn: ['Sísmica 4D e AVO', 'Geofísica de poço', 'Integração de dados geofísicos com geologia e engenharia', 'Análise de incertezas'],
    modules: [{ title: 'Módulo 1: Técnicas Avançadas', topics: ['Análise AVO (Amplitude Versus Offset)'] }, { title: 'Módulo 2: Caracterização de Reservatórios', topics: ['Estimativa de propriedades petrofísicas'] }]
  },
  {
    id: 'FW-403',
    name: 'Drilling and Well Completion',
    category: 'minerios-petroleo',
    imageId: 'course-drilling',
    duration: '40 horas',
    generalObjective: 'Fornecer uma visão completa sobre as operações de perfuração e completação de poços de petróleo e gás.',
    whatYouWillLearn: ['Projetar a perfuração de um poço', 'Selecionar fluidos de perfuração', 'Gerir operações de cimentação', 'Projetar sistemas de completação'],
    modules: [{ title: 'Módulo 1: Perfuração de Poços', topics: ['Equipamentos e processos'] }, { title: 'Módulo 2: Completação de Poços', topics: ['Tipos de completação'] }]
  },
  {
    id: 'SK-299',
    name: 'Produção e Gestão de Transportes',
    category: 'industrial',
    imageId: 'course-production-planning',
    duration: '35 horas',
    generalObjective: 'Capacitar profissionais para planear, programar e controlar a produção de forma a otimizar recursos e cumprir prazos.',
    whatYouWillLearn: ['Realizar a previsão da procura', 'Elaborar o plano mestre de produção (PMP)', 'Gerir a capacidade produtiva (CRP)', 'Utilizar sistemas MRP e ERP'],
    modules: [{ title: 'Módulo 1: Planeamento da Produção', topics: ['Previsão de vendas'] }, { title: 'Módulo 2: Controlo da Produção', topics: ['Programação e sequenciamento'] }]
  },
  {
    id: 'QC-191',
    name: 'Processamento e análise de dados Sísmicos',
    category: 'minerios-petroleo',
    imageId: 'course-seismic-data',
    duration: '35 horas',
    generalObjective: 'Aprofundar as técnicas de processamento de dados sísmicos para obtenção de imagens de subsuperfície de alta qualidade.',
    whatYouWillLearn: ['Aplicar filtros e deconvolução', 'Realizar análise de velocidades', 'Executar migração sísmica (PSTM, PSDM)', 'Melhorar a relação sinal-ruído'],
    modules: [{ title: 'Módulo 1: Pré-processamento', topics: ['Edição e geometria'] }, { title: 'Módulo 2: Processamento Principal', topics: ['Análise de velocidades e migração'] }]
  },
  {
    id: 'DS-691',
    name: 'Gestão do Risco em Projectos de Produção e Exploração de recursos minerais',
    category: 'minerios-petroleo',
    imageId: 'course-risk-management-mining',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a identificar, analisar, avaliar e mitigar os riscos associados a projetos de mineração e petróleo.',
    whatYouWillLearn: ['Identificar riscos técnicos, económicos e ambientais', 'Realizar análises qualitativas e quantitativas de risco', 'Desenvolver planos de resposta a riscos', 'Monitorizar e controlar os riscos do projeto'],
    modules: [{ title: 'Módulo 1: Identificação de Riscos', topics: ['Brainstorming e checklists'] }, { title: 'Módulo 2: Análise e Mitigação', topics: ['Matriz de probabilidade e impacto'] }]
  },
  {
    id: 'IC-464',
    name: 'Avaliação de Formações',
    category: 'minerios-petroleo',
    imageId: 'course-formation-evaluation',
    duration: '35 horas',
    generalObjective: 'Ensinar as técnicas de perfilagem de poços para a avaliação de formações rochosas e identificação de zonas de interesse.',
    whatYouWillLearn: ['Interpretar perfis de raios gama, neutrão e densidade', 'Calcular porosidade e saturação de água', 'Identificar litologias e fluidos', 'Integrar dados de perfis com amostras de rocha'],
    modules: [{ title: 'Módulo 1: Perfis de Poço', topics: ['Princípios e ferramentas'] }, { title: 'Módulo 2: Interpretação Petrofísica', topics: ['Cálculo de propriedades'] }]
  },
  {
    id: 'SI-622',
    name: 'Caracterização de Reservatórios',
    category: 'minerios-petroleo',
    imageId: 'course-reservoir-characterization',
    duration: '40 horas',
    generalObjective: 'Integrar dados geológicos, geofísicos e de engenharia para construir um modelo estático detalhado do reservatório.',
    whatYouWillLearn: ['Construir modelos estruturais', 'Modelar a distribuição de fácies', 'Popular o modelo com propriedades petrofísicas', 'Analisar a incerteza do modelo'],
    modules: [{ title: 'Módulo 1: Modelagem Estrutural e de Fácies', topics: ['Mapeamento de falhas e horizontes'] }, { title: 'Módulo 2: Modelagem Petrofísica', topics: ['Geoestatística'] }]
  },
  {
    id: 'HA-745',
    name: 'Fiscalidade Petrolífera Angolana',
    category: 'minerios-petroleo',
    imageId: 'course-angola-oil-tax',
    duration: '24 horas',
    generalObjective: 'Proporcionar um entendimento detalhado do regime fiscal e contratual da indústria petrolífera em Angola.',
    whatYouWillLearn: ['Compreender os tipos de contratos petrolíferos', 'Calcular impostos e royalties', 'Analisar os aspetos económicos dos projetos', 'Navegar na legislação angolana'],
    modules: [{ title: 'Módulo 1: Regimes Contratuais', topics: ['Concessão vs. Partilha de Produção'] }, { title: 'Módulo 2: Tributação', topics: ['Impostos sobre a produção e o rendimento'] }]
  },
  {
    id: 'IP-472',
    name: 'Geofísica de Reservatórios',
    category: 'minerios-petroleo',
    imageId: 'course-reservoir-geophysics',
    duration: '35 horas',
    generalObjective: 'Aplicar técnicas geofísicas avançadas para monitorizar e caracterizar reservatórios de hidrocarbonetos ao longo do tempo.',
    whatYouWillLearn: ['Utilizar sísmica 4D para monitorizar a produção', 'Estimar propriedades do reservatório a partir de dados sísmicos', 'Analisar atributos sísmicos', 'Integrar dados de sísmica com produção'],
    modules: [{ title: 'Módulo 1: Sísmica 4D', topics: ['Aquisição e processamento de dados repetidos'] }, { title: 'Módulo 2: Inversão e Atributos', topics: ['Extração de propriedades da rocha'] }]
  },
  {
    id: 'RJ-222',
    name: 'Geologia de campo (Técnicas de amostragem)',
    category: 'minerios-petroleo',
    imageId: 'course-field-geology',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a realizar trabalhos de campo em geologia, incluindo mapeamento e recolha de amostras.',
    whatYouWillLearn: ['Utilizar bússola e GPS para mapeamento', 'Descrever afloramentos', 'Recolher amostras de rocha e solo', 'Elaborar relatórios de campo'],
    modules: [{ title: 'Módulo 1: Mapeamento Geológico', topics: ['Leitura de mapas e orientação'] }, { title: 'Módulo 2: Recolha e Descrição de Amostras', topics: ['Técnicas de amostragem'] }]
  },
  {
    id: 'HM-620',
    name: 'Geoquímica',
    category: 'minerios-petroleo',
    imageId: 'course-geochemistry',
    duration: '30 horas',
    generalObjective: 'Introduzir os princípios da geoquímica e a sua aplicação na exploração de recursos minerais e petrolíferos.',
    whatYouWillLearn: ['Compreender a distribuição de elementos químicos', 'Utilizar a geoquímica como ferramenta de exploração', 'Analisar a geoquímica de rochas geradoras de petróleo', 'Interpretar anomalias geoquímicas'],
    modules: [{ title: 'Módulo 1: Princípios de Geoquímica', topics: ['Elementos e isótopos'] }, { title: 'Módulo 2: Geoquímica de Exploração', topics: ['Análise de amostras'] }]
  },
  {
    id: 'BS-556',
    name: 'Integrated Reservoir Management and Monitoring',
    category: 'minerios-petroleo',
    imageId: 'course-irmm',
    duration: '40 horas',
    generalObjective: 'Capacitar equipas multidisciplinares a gerir reservatórios de forma integrada para maximizar a recuperação de hidrocarbonetos.',
    whatYouWillLearn: ['Integrar geologia, geofísica e engenharia', 'Desenvolver planos de desenvolvimento de campo', 'Monitorizar o desempenho do reservatório', 'Tomar decisões de gestão baseadas em dados'],
    modules: [{ title: 'Módulo 1: Gestão Integrada', topics: ['Equipas multidisciplinares'] }, { title: 'Módulo 2: Monitorização e Otimização', topics: ['Análise de produção e injeção'] }]
  },
  {
    id: 'IM-626',
    name: 'Interpretação Sísmica',
    category: 'minerios-petroleo',
    imageId: 'course-seismic-interpretation',
    duration: '35 horas',
    generalObjective: 'Desenvolver as competências necessárias para a interpretação de dados sísmicos 2D e 3D para a exploração de hidrocarbonetos.',
    whatYouWillLearn: ['Identificar e mapear horizontes refletores', 'Mapear falhas e outras estruturas geológicas', 'Analisar atributos sísmicos para identificar potenciais reservatórios', 'Construir mapas estruturais e estratigráficos'],
    modules: [{ title: 'Módulo 1: Interpretação Estrutural', topics: ['Mapeamento de falhas e dobras'] }, { title: 'Módulo 2: Interpretação Estratigráfica', topics: ['Análise de sequências sísmicas'] }]
  },
  {
    id: 'WM-2',
    name: 'Bacias Angolanas',
    category: 'minerios-petroleo',
    imageId: 'course-angolan-basins',
    duration: '24 horas',
    generalObjective: 'Fornecer um conhecimento aprofundado sobre a geologia e o potencial petrolífero das principais bacias sedimentares de Angola.',
    whatYouWillLearn: ['Compreender a evolução tectónica das bacias', 'Conhecer os sistemas petrolíferos (rocha-geradora, reservatório, selo)', 'Analisar os principais campos produtores', 'Identificar novas oportunidades exploratórias'],
    modules: [{ title: 'Módulo 1: Bacia do Baixo Congo', topics: ['Geologia e campos'] }, { title: 'Módulo 2: Bacia do Kwanza', topics: ['História exploratória e potencial'] }]
  },
  {
    id: 'PJ-525',
    name: 'Negociação e Contratos na Indústria Petrolífera',
    category: 'minerios-petroleo',
    imageId: 'course-oil-contracts',
    duration: '28 hours',
    generalObjective: 'Capacitar os participantes a negociar e gerir os diversos tipos de contratos utilizados na indústria do petróleo e gás.',
    whatYouWillLearn: ['Entender os diferentes tipos de contratos (Joint Venture, Farm-out, etc.)', 'Negociar cláusulas contratuais chave', 'Gerir a execução de contratos', 'Resolver disputas contratuais'],
    modules: [{ title: 'Módulo 1: Tipos de Contratos', topics: ['Análise de cláusulas'] }, { title: 'Módulo 2: Negociação e Gestão', topics: ['Estratégias de negociação'] }]
  },
  {
    id: 'EV-137',
    name: 'Geologia do Poço',
    category: 'minerios-petroleo',
    imageId: 'course-wellsite-geology',
    duration: '30 horas',
    generalObjective: 'Formar geólogos para trabalhar na boca do poço (wellsite), monitorizando as operações de perfuração e recolhendo dados geológicos.',
    whatYouWillLearn: ['Descrever amostras de calha', 'Interpretar perfis de lama (mud logging)', 'Identificar topos de formação', 'Garantir a qualidade dos dados geológicos recolhidos'],
    modules: [{ title: 'Módulo 1: Operações de Wellsite', topics: ['Funções do geólogo de poço'] }, { title: 'Módulo 2: Análise de Dados em Tempo Real', topics: ['Interpretação de perfis'] }]
  },
  {
    id: 'XV-126',
    name: 'Registo & Análise de Testemunho de Sondagem',
    category: 'minerios-petroleo',
    imageId: 'course-core-analysis',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a descrever, registar e analisar testemunhos de sondagem (cores) para caracterizar reservatórios.',
    whatYouWillLearn: ['Descrever litologias e estruturas sedimentares', 'Realizar análises petrofísicas em testemunhos', 'Integrar dados de testemunho com perfis de poço', 'Compreender a importância dos testemunhos na avaliação de formações'],
    modules: [{ title: 'Módulo 1: Descrição de Testemunhos', topics: ['Técnicas e padrões'] }, { title: 'Módulo 2: Análise Laboratorial', topics: ['Medição de porosidade e permeabilidade'] }]
  },
  {
    id: 'ML-424',
    name: 'Reservatórios Areníticos',
    category: 'minerios-petroleo',
    imageId: 'course-sandstone-reservoirs',
    duration: '28 horas',
    generalObjective: 'Aprofundar o conhecimento sobre a geologia e as características de reservatórios em arenitos.',
    whatYouWillLearn: ['Compreender os ambientes deposicionais de arenitos', 'Analisar a diagénese e o seu impacto na qualidade do reservatório', 'Caracterizar a heterogeneidade de reservatórios areníticos', 'Modelar reservatórios em arenito'],
    modules: [{ title: 'Módulo 1: Ambientes Deposicionais', topics: ['Fluvial, eólico, marinho'] }, { title: 'Módulo 2: Qualidade do Reservatório', topics: ['Diagénese e porosidade'] }]
  },
  {
    id: 'WS-674',
    name: 'Reservatórios Carbonáticos',
    category: 'minerios-petroleo',
    imageId: 'course-carbonate-reservoirs',
    duration: '28 horas',
    generalObjective: 'Aprofundar o conhecimento sobre a geologia e as complexidades dos reservatórios em rochas carbonáticas.',
    whatYouWillLearn: ['Compreender os ambientes de deposição de carbonatos', 'Analisar o impacto da diagénese (dissolução, cimentação)', 'Caracterizar sistemas de porosidade complexos (fraturas, vugs)', 'Modelar reservatórios carbonáticos'],
    modules: [{ title: 'Módulo 1: Ambientes Carbonáticos', topics: ['Plataformas e recifes'] }, { title: 'Módulo 2: Sistemas Porosos Complexos', topics: ['Diagénese e caracterização'] }]
  },
  {
    id: 'ZQ-337',
    name: 'Alinhamento de Bombas',
    category: 'industrial',
    imageId: 'course-pump-alignment',
    duration: '20 horas',
    generalObjective: 'Capacitar técnicos de manutenção a realizar o alinhamento de precisão de conjuntos motor-bomba para aumentar a vida útil do equipamento.',
    whatYouWillLearn: ['Compreender os tipos de desalinhamento', 'Utilizar relógios comparadores', 'Utilizar sistemas de alinhamento a laser', 'Corrigir o desalinhamento (pé manco, etc.)'],
    modules: [{ title: 'Módulo 1: Fundamentos do Alinhamento', topics: ['Tipos de desalinhamento'] }, { title: 'Módulo 2: Técnicas de Alinhamento', topics: ['Alinhamento a laser'] }]
  },
  {
    id: 'LJ-246',
    name: 'Corrosão Aplicada a Indústria Petrolífera',
    category: 'minerios-petroleo',
    imageId: 'course-oil-corrosion',
    duration: '30 horas',
    generalObjective: 'Fornecer uma compreensão dos mecanismos de corrosão e das técnicas de controlo e monitorização na indústria de petróleo e gás.',
    whatYouWillLearn: ['Identificar os tipos de corrosão', 'Selecionar materiais resistentes à corrosão', 'Aplicar métodos de proteção catódica e anódica', 'Utilizar inibidores de corrosão'],
    modules: [{ title: 'Módulo 1: Mecanismos de Corrosão', topics: ['Corrosão por CO2 e H2S'] }, { title: 'Módulo 2: Controlo e Monitorização', topics: ['Inibidores e proteção catódica'] }]
  },
  {
    id: 'JM-665',
    name: 'Inspecção e Calibração de equipamentos',
    category: 'industrial',
    imageId: 'course-inspection-calibration',
    duration: '24 horas',
    generalObjective: 'Capacitar os participantes a realizar a inspeção e calibração de instrumentos de medição industrial, garantindo a sua precisão e conformidade.',
    whatYouWillLearn: ['Compreender os conceitos de metrologia', 'Calibrar instrumentos de pressão, temperatura e nível', 'Utilizar padrões de calibração', 'Elaborar certificados de calibração'],
    modules: [{ title: 'Módulo 1: Metrologia Industrial', topics: ['Incerteza e rastreabilidade'] }, { title: 'Módulo 2: Calibração de Instrumentos', topics: ['Procedimentos e padrões'] }]
  },
  {
    id: 'OB-60',
    name: 'Manutenção e Reparação de Válvulas',
    category: 'industrial',
    imageId: 'course-valve-maintenance',
    duration: '24 horas',
    generalObjective: 'Formar técnicos de manutenção para a correta desmontagem, inspeção, reparação e montagem de válvulas industriais.',
    whatYouWillLearn: ['Identificar tipos de válvulas (gaveta, globo, esfera, etc.)', 'Desmontar e montar válvulas', 'Inspecionar e substituir componentes internos', 'Realizar testes de estanquicidade'],
    modules: [{ title: 'Módulo 1: Tipos de Válvulas', topics: ['Componentes e funcionamento'] }, { title: 'Módulo 2: Procedimentos de Manutenção', topics: ['Desmontagem, inspeção e reparação'] }]
  },
  {
    id: 'EQ-477',
    name: 'Inspecção de Equipamentos',
    category: 'industrial',
    imageId: 'course-equipment-inspection',
    duration: '30 horas',
    generalObjective: 'Capacitar inspetores a realizar a avaliação da integridade de equipamentos estáticos e dinâmicos na indústria.',
    whatYouWillLearn: ['Utilizar técnicas de ensaios não destrutivos (END)', 'Inspecionar vasos de pressão e tanques', 'Inspecionar tubagens e soldaduras', 'Elaborar relatórios de inspeção'],
    modules: [{ title: 'Módulo 1: Ensaios Não Destrutivos', topics: ['Líquidos penetrantes, ultrassom'] }, { title: 'Módulo 2: Inspeção de Equipamentos Específicos', topics: ['Normas e critérios'] }]
  },
  {
    id: 'IT-121',
    name: 'Revestimento de Tubulações',
    category: 'industrial',
    imageId: 'course-pipe-coating',
    duration: '24 horas',
    generalObjective: 'Formar profissionais nas técnicas de aplicação e inspeção de revestimentos anticorrosivos em tubagens.',
    whatYouWillLearn: ['Preparar a superfície para revestimento', 'Aplicar diferentes tipos de revestimentos', 'Realizar testes de aderência e espessura', 'Conhecer as normas de qualidade'],
    modules: [{ title: 'Módulo 1: Preparação de Superfície', topics: ['Jateamento e limpeza'] }, { title: 'Módulo 2: Aplicação e Inspeção', topics: ['Técnicas de aplicação e controlo de qualidade'] }]
  },
  {
    id: 'YL-705',
    name: 'ROV - Remotely Operated Vehicle',
    category: 'minerios-petroleo',
    imageId: 'course-rov',
    duration: '40 horas',
    generalObjective: 'Formar pilotos e técnicos de ROV para operações submarinas na indústria de petróleo e gás.',
    whatYouWillLearn: ['Pilotar diferentes classes de ROVs', 'Realizar a manutenção de sistemas de ROV', 'Executar tarefas de inspeção e intervenção submarina', 'Cumprir os procedimentos de segurança em operações de ROV'],
    modules: [{ title: 'Módulo 1: Sistemas de ROV', topics: ['Componentes e operação'] }, { title: 'Módulo 2: Pilotagem e Manutenção', topics: ['Simulador e prática'] }]
  },
  {
    id: 'NO-351',
    name: 'Produção de petroleo em Subsea',
    category: 'minerios-petroleo',
    imageId: 'course-subsea-production',
    duration: '35 horas',
    generalObjective: 'Fornecer uma visão geral dos sistemas de produção submarina utilizados no desenvolvimento de campos de petróleo em águas profundas.',
    whatYouWillLearn: ['Conhecer os equipamentos submarinos (árvores de natal, manifolds)', 'Compreender os sistemas de controlo e umbilicais', 'Analisar os desafios da garantia de escoamento', 'Gerir a integridade de sistemas submarinos'],
    modules: [{ title: 'Módulo 1: Equipamentos Subsea', topics: ['Layout de campo submarino'] }, { title: 'Módulo 2: Operação e Garantia de Escoamento', topics: ['Hidratos e parafinas'] }]
  },
  {
    id: 'RX-63',
    name: 'Contabilidade do Petróleo',
    category: 'minerios-petroleo',
    imageId: 'course-oil-accounting',
    duration: '28 horas',
    generalObjective: 'Apresentar as particularidades da contabilidade na indústria de exploração e produção de petróleo e gás.',
    whatYouWillLearn: ['Contabilizar custos de exploração e desenvolvimento', 'Amortizar ativos petrolíferos', 'Compreender os contratos de partilha de produção', 'Analisar as demonstrações financeiras de empresas petrolíferas'],
    modules: [{ title: 'Módulo 1: Contabilidade E&P', topics: ['Successful Efforts vs. Full Cost'] }, { title: 'Módulo 2: Contratos e Análise', topics: ['Joint ventures e partilha de produção'] }]
  },
  {
    id: 'MX-32',
    name: 'Gestão de Tesouraria',
    category: 'financas-admin',
    imageId: 'course-treasury-management-2',
    duration: '25 horas',
    generalObjective: 'Otimizar a gestão dos recursos financeiros de curto prazo da empresa.',
    whatYouWillLearn: ['Gerir fluxos de caixa', 'Analisar o risco de liquidez', 'Negociar com instituições financeiras', 'Otimizar o capital de giro'],
    modules: [{ title: 'Módulo 1: Fluxo de Caixa', topics: ['Projeção e controlo'] }, { title: 'Módulo 2: Risco Financeiro', topics: ['Gestão de risco de crédito e mercado'] }]
  },
  {
    id: 'IU-688',
    name: 'Contabilidade Geral',
    category: 'financas-admin',
    imageId: 'course-general-accounting',
    duration: '30 horas',
    generalObjective: 'Fornecer uma base sólida e completa sobre os princípios e práticas da contabilidade financeira.',
    whatYouWillLearn: ['Realizar lançamentos contabilísticos', 'Elaborar o balancete e as demonstrações financeiras', 'Compreender o tratamento de impostos', 'Aplicar as normas contabilísticas'],
    modules: [{ title: 'Módulo 1: O Ciclo Contabilístico', topics: ['Do lançamento ao balanço'] }, { title: 'Módulo 2: Operações Específicas', topics: ['Ativos fixos, inventários, etc.'] }]
  },
  {
    id: 'FI-33',
    name: 'Auditoria Financeira',
    category: 'financas-admin',
    imageId: 'course-financial-audit',
    duration: '35 horas',
    generalObjective: 'Capacitar os participantes a planear e executar uma auditoria às demonstrações financeiras de uma empresa.',
    whatYouWillLearn: ['Compreender as normas de auditoria', 'Avaliar o sistema de controlo interno', 'Aplicar procedimentos de auditoria (testes de controlo e substantivos)', 'Elaborar o relatório de auditoria'],
    modules: [{ title: 'Módulo 1: Planeamento da Auditoria', topics: ['Avaliação de risco'] }, { title: 'Módulo 2: Execução e Relatório', topics: ['Testes e evidências de auditoria'] }]
  },
  {
    id: 'HE-737',
    name: 'Fiscalidade',
    category: 'financas-admin',
    imageId: 'course-taxation',
    duration: '30 horas',
    generalObjective: 'Proporcionar um conhecimento abrangente sobre o sistema fiscal, com foco nos principais impostos sobre empresas e indivíduos.',
    whatYouWillLearn: ['Calcular o imposto sobre o rendimento (IRC/IRPF)', 'Compreender o funcionamento do IVA', 'Realizar o planeamento fiscal', 'Cumprir as obrigações declarativas'],
    modules: [{ title: 'Módulo 1: Imposto sobre o Rendimento', topics: ['Incidência e taxas'] }, { title: 'Módulo 2: Imposto sobre o Valor Acrescentado (IVA)', topics: ['Mecanismos de liquidação'] }]
  },
  {
    id: 'SG-650',
    name: 'Análise e Gestão Financeira de Empresas',
    category: 'financas-admin',
    imageId: 'course-corp-finance-management',
    duration: '30 horas',
    generalObjective: 'Capacitar gestores a utilizar a informação financeira para diagnosticar a saúde da empresa e tomar decisões estratégicas.',
    whatYouWillLearn: ['Analisar a performance económica e financeira', 'Gerir o capital de giro', 'Avaliar políticas de investimento e financiamento', 'Construir planos financeiros'],
    modules: [{ title: 'Módulo 1: Diagnóstico Financeiro', topics: ['Análise de rácios'] }, { title: 'Módulo 2: Decisões Financeiras', topics: ['Orçamento de capital'] }]
  },
  {
    id: 'ET-651',
    name: 'Elaboração e Análise de projectos de Investimentos',
    category: 'financas-admin',
    imageId: 'course-investment-projects',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a elaborar e avaliar a viabilidade económica e financeira de projetos de investimento.',
    whatYouWillLearn: ['Projetar fluxos de caixa de projetos', 'Calcular indicadores de viabilidade (VAL, TIR)', 'Analisar o risco e a sensibilidade do projeto', 'Estruturar o financiamento do projeto'],
    modules: [{ title: 'Módulo 1: Estruturação do Projeto', topics: ['Estudo de mercado e técnico'] }, { title: 'Módulo 2: Análise de Viabilidade', topics: ['Cálculo de VAL e TIR'] }]
  },
  {
    id: 'FU-581',
    name: 'Técnicas de Vendas',
    category: 'marketing-comercial',
    imageId: 'course-sales-techniques',
    duration: '24 horas',
    generalObjective: 'Dotar a força de vendas com técnicas e competências para aumentar a sua eficácia e alcançar os objetivos comerciais.',
    whatYouWillLearn: ['Dominar o processo de venda consultiva', 'Aplicar técnicas de prospeção e qualificação de leads', 'Conduzir apresentações de vendas persuasivas', 'Contornar objeções e fechar negócios'],
    modules: [{ title: 'Módulo 1: Prospeção e Abordagem', topics: ['Funil de vendas'] }, { title: 'Módulo 2: Negociação e Fecho', topics: ['Técnicas de fecho'] }]
  },
  {
    id: 'PJ-465',
    name: 'Análise de investimentos',
    category: 'financas-admin',
    imageId: 'course-investment-analysis',
    duration: '28 horas',
    generalObjective: 'Aprofundar os conhecimentos em análise de investimentos financeiros, abrangendo ações, obrigações e outros ativos.',
    whatYouWillLearn: ['Avaliar ações (valuation)', 'Analisar o risco e retorno de uma carteira', 'Compreender os mercados de derivados', 'Aplicar os princípios da gestão de portfólios'],
    modules: [{ title: 'Módulo 1: Análise de Ações', topics: ['Análise fundamentalista e técnica'] }, { title: 'Módulo 2: Gestão de Carteiras', topics: ['Teoria moderna de portfólio'] }]
  },
  {
    id: 'EU-444',
    name: 'Técnicas de Elaboração de Documentos e Pareceres Técnicos',
    category: 'dev-pessoal',
    imageId: 'course-technical-writing',
    duration: '20 horas',
    generalObjective: 'Desenvolver a capacidade de redigir documentos técnicos, relatórios e pareceres de forma clara, precisa e estruturada.',
    whatYouWillLearn: ['Estruturar um documento técnico', 'Escrever com clareza e objetividade', 'Adaptar a linguagem ao público-alvo', 'Argumentar e fundamentar pareceres técnicos'],
    modules: [{ title: 'Módulo 1: Estrutura e Clareza', topics: ['Organização da informação'] }, { title: 'Módulo 2: Argumentação', topics: ['Lógica e fundamentação'] }]
  },
  {
    id: 'RE-125',
    name: 'Gestão Financeira',
    category: 'financas-admin',
    imageId: 'course-financial-management',
    duration: '30 horas',
    generalObjective: 'Fornecer uma visão integrada da gestão financeira empresarial, cobrindo decisões de investimento, financiamento e dividendos.',
    whatYouWillLearn: ['Analisar a estrutura de capital da empresa', 'Avaliar projetos de investimento', 'Gerir a tesouraria e o risco financeiro', 'Compreender a política de dividendos'],
    modules: [{ title: 'Módulo 1: Decisões de Investimento', topics: ['Orçamento de capital'] }, { title: 'Módulo 2: Decisões de Financiamento', topics: ['Custo de capital'] }]
  },
  {
    id: 'WZ-590',
    name: 'Mercado de Capitais',
    category: 'financas-admin',
    imageId: 'course-capital-markets',
    duration: '25 horas',
    generalObjective: 'Proporcionar uma compreensão do funcionamento do mercado de capitais, seus produtos e intervenientes.',
    whatYouWillLearn: ['Compreender o papel da bolsa de valores', 'Analisar ações, obrigações e fundos de investimento', 'Entender as operações de IPO e ofertas de ações', 'Conhecer a regulação do mercado'],
    modules: [{ title: 'Módulo 1: Ações e Obrigações', topics: ['Mercado primário e secundário'] }, { title: 'Módulo 2: Outros Instrumentos', topics: ['Derivados e fundos'] }]
  },
  {
    id: 'NE-466',
    name: 'Gestão de Riscos Financeiros',
    category: 'financas-admin',
    imageId: 'course-financial-risk-management',
    duration: '28 horas',
    generalObjective: 'Capacitar os participantes a identificar, medir e gerir os riscos financeiros (mercado, crédito, liquidez) a que uma empresa está exposta.',
    whatYouWillLearn: ['Identificar e medir o risco de mercado (taxa de juro, cambial)', 'Avaliar o risco de crédito de clientes', 'Gerir o risco de liquidez', 'Utilizar instrumentos derivados para hedging'],
    modules: [{ title: 'Módulo 1: Risco de Mercado', topics: ['VaR (Value at Risk)'] }, { title: 'Módulo 2: Risco de Crédito e Liquidez', topics: ['Modelos de crédito'] }]
  },
  {
    id: 'YM-244',
    name: 'Gestão de Recursos Humanos',
    category: 'rh-gestao',
    imageId: 'course-hr-management',
    duration: '30 horas',
    generalObjective: 'Fornecer uma visão geral e integrada das principais funções e processos da gestão de Recursos Humanos.',
    whatYouWillLearn: ['Gerir o ciclo de vida do colaborador (recrutamento, onboarding, desenvolvimento, offboarding)', 'Administrar salários e benefícios', 'Aplicar a legislação laboral', 'Promover um bom clima organizacional'],
    modules: [{ title: 'Módulo 1: Processos de RH', topics: ['Recrutamento e seleção'] }, { title: 'Módulo 2: Administração de Pessoal', topics: ['Legislação laboral'] }]
  },
  {
    id: 'NW-323',
    name: 'Contabilidade para não Contabilistas',
    category: 'financas-admin',
    imageId: 'course-accounting-for-non-accountants-2',
    duration: '24 horas',
    generalObjective: 'Proporcionar uma compreensão fundamental dos princípios e práticas contabilísticas a gestores e profissionais de outras áreas.',
    whatYouWillLearn: ['Interpretar demonstrações financeiras', 'Compreender os conceitos de débito e crédito', 'Analisar a saúde financeira de uma empresa', 'Dialogar com departamentos financeiros'],
    modules: [{ title: 'Módulo 1: Fundamentos', topics: ['Balanço e Demonstração de Resultados'] }, { title: 'Módulo 2: Análise', topics: ['Rácios financeiros'] }]
  },
  {
    id: 'PJ-434',
    name: 'Gestão da Qualidade',
    category: 'industrial',
    imageId: 'course-quality-management-2',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a implementar e gerir sistemas de gestão da qualidade, com base na norma ISO 9001 e em ferramentas de melhoria contínua.',
    whatYouWillLearn: ['Compreender os princípios da gestão da qualidade total (TQM)', 'Implementar um sistema de gestão da qualidade (SGQ)', 'Utilizar as ferramentas da qualidade (Ishikawa, Pareto, etc.)', 'Conduzir auditorias da qualidade'],
    modules: [{ title: 'Módulo 1: Sistemas de Gestão da Qualidade', topics: ['Norma ISO 9001'] }, { title: 'Módulo 2: Ferramentas e Melhoria', topics: ['PDCA e Six Sigma'] }]
  },
  {
    id: 'HG-699',
    name: 'Gestão de Frotas',
    category: 'industrial',
    imageId: 'course-fleet-management',
    duration: '24 horas',
    generalObjective: 'Otimizar a gestão de frotas de veículos, visando a redução de custos, o aumento da eficiência e a segurança das operações.',
    whatYouWillLearn: ['Dimensionar e selecionar a frota', 'Planear e controlar a manutenção', 'Gerir o consumo de combustível', 'Utilizar sistemas de telemetria e rastreamento'],
    modules: [{ title: 'Módulo 1: Manutenção e Custos', topics: ['Manutenção preventiva vs. corretiva'] }, { title: 'Módulo 2: Tecnologia e Otimização', topics: ['Sistemas de gestão de frotas'] }]
  },
  {
    id: 'UX-668',
    name: 'Introdução à Gestão de Projectos para não PMs',
    category: 'rh-gestao',
    imageId: 'course-intro-pm-non-pms',
    duration: '16 horas',
    generalObjective: 'Fornecer a profissionais de qualquer área os conceitos e ferramentas essenciais para participarem e contribuírem eficazmente em projetos.',
    whatYouWillLearn: ['Compreender o que é um projeto e o seu ciclo de vida', 'Participar na definição do escopo e objetivos', 'Colaborar no planeamento de tarefas e prazos', 'Comunicar e trabalhar em equipas de projeto'],
    modules: [{ title: 'Módulo 1: Conceitos Fundamentais', topics: ['O que é um projeto?'] }, { title: 'Módulo 2: Ferramentas Práticas', topics: ['Estrutura Analítica de Projeto (WBS)'] }]
  },
  {
    id: 'IK-463',
    name: 'Gestão do Risco em Projectos',
    category: 'rh-gestao',
    imageId: 'course-project-risk-management',
    duration: '24 horas',
    generalObjective: 'Capacitar gestores de projeto e equipas a identificar, analisar e responder aos riscos que podem afetar os objetivos do projeto.',
    whatYouWillLearn: ['Implementar um processo de gestão de riscos', 'Identificar e categorizar riscos', 'Analisar qualitativa e quantitativamente os riscos', 'Planear e implementar respostas aos riscos'],
    modules: [{ title: 'Módulo 1: Processo de Gestão de Riscos', topics: ['Planeamento da gestão de riscos'] }, { title: 'Módulo 2: Análise e Resposta', topics: ['Matriz de probabilidade e impacto'] }]
  },
  {
    id: 'FX-528',
    name: 'ISO 21500 - Norma sobre Gestão de Projectos',
    category: 'certificacao',
    imageId: 'course-iso21500',
    duration: '20 horas',
    generalObjective: 'Proporcionar um entendimento da norma ISO 21500 e como ela pode ser usada para melhorar a gestão de projetos numa organização.',
    whatYouWillLearn: ['Compreender a estrutura e os conceitos da ISO 21500', 'Relacionar a norma com outras boas práticas (PMBOK)', 'Aplicar os processos da norma à gestão de projetos', 'Preparar a organização para a conformidade'],
    modules: [{ title: 'Módulo 1: Visão Geral da Norma', topics: ['Grupos de processos e temas'] }, { title: 'Módulo 2: Aplicação Prática', topics: ['Implementação dos processos'] }]
  },
  {
    id: 'FY-131',
    name: 'Gestão Estratégica de Projectos',
    category: 'rh-gestao',
    imageId: 'course-strategic-project-management',
    duration: '30 horas',
    generalObjective: 'Alinhar a gestão de projetos com a estratégia da empresa, garantindo que os projetos certos são executados da forma certa.',
    whatYouWillLearn: ['Gerir o portfólio de projetos da empresa', 'Selecionar e priorizar projetos', 'Estabelecer e gerir um PMO (Project Management Office)', 'Medir o valor e o retorno dos projetos'],
    modules: [{ title: 'Módulo 1: Gestão de Portfólio', topics: ['Seleção e priorização'] }, { title: 'Módulo 2: O PMO Estratégico', topics: ['Funções e implementação'] }]
  },
  {
    id: 'LE-340',
    name: 'Planeamento e Gestão Orçamental',
    category: 'financas-admin',
    imageId: 'course-budget-planning',
    duration: '28 horas',
    generalObjective: 'Capacitar os participantes a elaborar, acompanhar e controlar o orçamento empresarial como uma ferramenta de gestão estratégica.',
    whatYouWillLearn: ['Elaborar o orçamento anual da empresa', 'Acompanhar a execução orçamental', 'Analisar desvios e tomar ações corretivas', 'Utilizar o orçamento para a tomada de decisão'],
    modules: [{ title: 'Módulo 1: Elaboração do Orçamento', topics: ['Orçamento de vendas, produção, etc.'] }, { title: 'Módulo 2: Controlo Orçamental', topics: ['Análise de variações'] }]
  },
  {
    id: 'UE-320',
    name: 'Modelos de Previsão Financeiras',
    category: 'financas-admin',
    imageId: 'course-financial-forecasting',
    duration: '24 horas',
    generalObjective: 'Construir e utilizar modelos de previsão financeira em Excel para apoiar o planeamento e a tomada de decisão.',
    whatYouWillLearn: ['Construir modelos financeiros integrados (DRE, Balanço, Fluxo de Caixa)', 'Utilizar técnicas de previsão (regressão, médias móveis)', 'Realizar análise de cenários e sensibilidade', 'Apresentar os resultados das previsões'],
    modules: [{ title: 'Módulo 1: Construção de Modelos', topics: ['Estrutura e boas práticas'] }, { title: 'Módulo 2: Análise e Cenários', topics: ['Simulação de Monte Carlo'] }]
  },
  {
    id: 'HM-336',
    name: 'Estudo de Viabilidade Económico - Financeira',
    category: 'financas-admin',
    imageId: 'course-feasibility-study',
    duration: '28 horas',
    generalObjective: 'Capacitar os participantes a conduzir estudos de viabilidade completos para novos projetos ou negócios.',
    whatYouWillLearn: ['Realizar o estudo de mercado', 'Definir o plano de investimento', 'Projetar as demonstrações financeiras', 'Analisar a viabilidade e o risco do projeto'],
    modules: [{ title: 'Módulo 1: Estudo de Mercado e Técnico', topics: ['Análise da procura e concorrência'] }, { title: 'Módulo 2: Análise Económico-Financeira', topics: ['Cálculo de VAL, TIR e Payback'] }]
  },
  {
    id: 'LQ-553',
    name: 'Gestão da Dívida',
    category: 'financas-admin',
    imageId: 'course-debt-management',
    duration: '20 horas',
    generalObjective: 'Analisar e gerir a estrutura de endividamento de uma empresa para otimizar o seu custo e risco.',
    whatYouWillLearn: ['Analisar o perfil da dívida da empresa', 'Avaliar diferentes fontes de financiamento', 'Negociar e reestruturar dívidas', 'Gerir o risco de taxa de juro'],
    modules: [{ title: 'Módulo 1: Análise do Endividamento', topics: ['Rácios de endividamento'] }, { title: 'Módulo 2: Estratégias de Financiamento', topics: ['Mercado de dívida'] }]
  },
  {
    id: 'MA-290',
    name: 'Excel para Finanças',
    category: 'financas-admin',
    imageId: 'course-excel-finance',
    duration: '24 horas',
    generalObjective: 'Dominar as ferramentas e funções do Excel aplicadas à análise e modelagem financeira.',
    whatYouWillLearn: ['Utilizar funções financeiras (VAL, TIR, PGTO)', 'Construir tabelas dinâmicas para análise financeira', 'Criar dashboards financeiros', 'Automatizar tarefas com macros'],
    modules: [{ title: 'Módulo 1: Funções e Ferramentas', topics: ['Funções financeiras e de pesquisa'] }, { title: 'Módulo 2: Modelagem e Dashboards', topics: ['Construção de modelos'] }]
  },
  {
    id: 'RN-195',
    name: 'Auditoria Contabilística e Financeira',
    category: 'financas-admin',
    imageId: 'course-accounting-audit',
    duration: '35 horas',
    generalObjective: 'Capacitar os participantes a planear e executar uma auditoria às demonstrações financeiras, em conformidade com as normas internacionais.',
    whatYouWillLearn: ['Compreender o processo de auditoria', 'Avaliar o controlo interno', 'Aplicar procedimentos de auditoria', 'Elaborar o parecer de auditoria'],
    modules: [{ title: 'Módulo 1: Planeamento e Risco', topics: ['Avaliação do risco de auditoria'] }, { title: 'Módulo 2: Procedimentos e Relatório', topics: ['Testes substantivos e de controlo'] }]
  },
  {
    id: 'OG-56',
    name: 'Contabilidade Geral I',
    category: 'financas-admin',
    imageId: 'course-general-accounting-1',
    duration: '30 horas',
    generalObjective: 'Introduzir os conceitos e as práticas fundamentais da contabilidade financeira.',
    whatYouWillLearn: ['Compreender o método das partidas dobradas', 'Realizar lançamentos contabilísticos', 'Elaborar balancetes', 'Conhecer a estrutura das demonstrações financeiras'],
    modules: [{ title: 'Módulo 1: Introdução à Contabilidade', topics: ['O património e o balanço'] }, { title: 'Módulo 2: O Ciclo Contabilístico', topics: ['Lançamentos no diário e razão'] }]
  },
  {
    id: 'MA-306',
    name: 'Contabilidade Geral II',
    category: 'financas-admin',
    imageId: 'course-general-accounting-2',
    duration: '30 horas',
    generalObjective: 'Aprofundar os conhecimentos em contabilidade financeira, abordando operações e normas contabilísticas específicas.',
    whatYouWillLearn: ['Contabilizar operações com ativos fixos e inventários', 'Tratar de operações com impostos e financiamentos', 'Elaborar as demonstrações financeiras completas', 'Aplicar as principais normas contabilísticas'],
    modules: [{ title: 'Módulo 1: Contabilização de Operações', topics: ['Ativos, passivos e capital próprio'] }, { title: 'Módulo 2: Demonstrações Financeiras', topics: ['Elaboração e análise'] }]
  },
  {
    id: 'YY-646',
    name: 'Contabilidade Analítica e Orçamental',
    category: 'financas-admin',
    imageId: 'course-analytical-accounting',
    duration: '30 horas',
    generalObjective: 'Utilizar a contabilidade analítica (de custos) como ferramenta de apoio à decisão e à gestão orçamental.',
    whatYouWillLearn: ['Apurar os custos dos produtos e serviços', 'Utilizar diferentes métodos de custeio (ABC, etc.)', 'Analisar a relação custo-volume-resultado', 'Integrar a contabilidade de custos com o orçamento'],
    modules: [{ title: 'Módulo 1: Contabilidade de Custos', topics: ['Métodos de custeio'] }, { title: 'Módulo 2: Análise Custo-Volume-Resultado', topics: ['Ponto de equilíbrio'] }]
  },
  {
    id: 'IX-778',
    name: 'Regime Fiscal Angolano',
    category: 'financas-admin',
    imageId: 'course-angolan-tax-regime',
    duration: '24 horas',
    generalObjective: 'Proporcionar um conhecimento detalhado do sistema fiscal de Angola.',
    whatYouWillLearn: ['Compreender o Imposto Industrial', 'Calcular o Imposto sobre o Rendimento do Trabalho (IRT)', 'Liquidar o Imposto sobre o Valor Acrescentado (IVA)', 'Conhecer outros impostos e obrigações'],
    modules: [{ title: 'Módulo 1: Impostos sobre o Rendimento', topics: ['Imposto Industrial e IRT'] }, { title: 'Módulo 2: Impostos sobre o Consumo', topics: ['IVA e Imposto de Selo'] }]
  },
  {
    id: 'OI-637',
    name: 'Balanced Scorecard',
    category: 'rh-gestao',
    imageId: 'course-balanced-scorecard',
    duration: '24 horas',
    generalObjective: 'Capacitar os participantes a implementar o Balanced Scorecard (BSC) como um sistema de gestão estratégica e medição de desempenho.',
    whatYouWillLearn: ['Traduzir a estratégia em objetivos e indicadores', 'Construir mapas estratégicos', 'Alinhar a organização com a estratégia', 'Gerir a execução da estratégia com o BSC'],
    modules: [{ title: 'Módulo 1: Conceitos do BSC', topics: ['As quatro perspetivas'] }, { title: 'Módulo 2: Implementação e Gestão', topics: ['Mapas estratégicos e indicadores'] }]
  },
  {
    id: 'WN-613',
    name: 'Gestão de Projectos com o MS Project',
    category: 'informatica-it',
    imageId: 'course-ms-project',
    duration: '24 horas',
    generalObjective: 'Dominar o Microsoft Project para planear, executar e controlar projetos de forma eficaz.',
    whatYouWillLearn: ['Criar e estruturar um projeto (WBS)', 'Definir tarefas, durações e dependências', 'Alocar recursos e custos', 'Acompanhar o progresso e gerar relatórios'],
    modules: [{ title: 'Módulo 1: Planeamento do Projeto', topics: ['Criação de tarefas e cronograma'] }, { title: 'Módulo 2: Controlo e Relatórios', topics: ['Linha de base e acompanhamento'] }]
  },
  {
    id: 'VF-86',
    name: 'Excel avançado',
    category: 'informatica-it',
    imageId: 'course-excel-advanced',
    duration: '20 horas',
    generalObjective: 'Aprofundar o conhecimento do Excel, explorando as suas ferramentas e funções mais poderosas para análise de dados e automação.',
    whatYouWillLearn: ['Dominar tabelas dinâmicas', 'Utilizar funções avançadas (lógicas, pesquisa, texto)', 'Realizar análises de hipóteses (Solver, Atingir Objetivo)', 'Introdução à automação com macros'],
    modules: [{ title: 'Módulo 1: Análise de Dados', topics: ['Tabelas e gráficos dinâmicos'] }, { title: 'Módulo 2: Funções Avançadas e Automação', topics: ['Macros e VBA'] }]
  },
  {
    id: 'HE-749',
    name: 'Marketing Digital',
    category: 'marketing-comercial',
    imageId: 'course-digital-marketing',
    duration: '30 horas',
    generalObjective: 'Fornecer uma visão estratégica e prática do marketing digital, capacitando os participantes a criar e gerir campanhas online eficazes.',
    whatYouWillLearn: ['Desenvolver uma estratégia de marketing digital', 'Otimizar websites para motores de busca (SEO)', 'Criar e gerir campanhas de anúncios (Google Ads, Social Ads)', 'Utilizar o email marketing e as redes sociais para engage'],
    modules: [{ title: 'Módulo 1: Estratégia e SEO', topics: ['Funil de marketing digital'] }, { title: 'Módulo 2: Publicidade Online e Redes Sociais', topics: ['Google Ads e Facebook Ads'] }]
  },
  {
    id: 'JA-604',
    name: 'Auto Cad 3D',
    category: 'certificacao',
    imageId: 'course-autocad-3d',
    duration: '35 horas',
    generalObjective: 'Capacitar os utilizadores de AutoCAD a criar e manipular modelos tridimensionais.',
    whatYouWillLearn: ['Navegar no ambiente 3D do AutoCAD', 'Criar sólidos e superfícies', 'Editar modelos 3D', 'Gerar vistas e renderings a partir do modelo'],
    modules: [{ title: 'Módulo 1: Modelação 3D', topics: ['Sólidos primitivos e operações booleanas'] }, { title: 'Módulo 2: Visualização e Documentação', topics: ['Renderização e criação de vistas 2D'] }]
  },
  {
    id: 'BX-274',
    name: 'Primavera',
    category: 'certificacao',
    imageId: 'course-primavera',
    duration: '40 horas',
    generalObjective: 'Dominar o software Primavera P6 para a gestão de projetos complexos, especialmente na área da construção e engenharia.',
    whatYouWillLearn: ['Planear e controlar projetos com o Primavera', 'Gerir recursos e custos', 'Analisar o caminho crítico', 'Gerar relatórios de progresso'],
    modules: [{ title: 'Módulo 1: Planeamento no Primavera', topics: ['Estrutura do projeto e atividades'] }, { title: 'Módulo 2: Controlo e Análise', topics: ['Atualização do cronograma e análise de valor agregado'] }]
  },
  {
    id: 'YU-738',
    name: 'Processamento de Salários com Primavera',
    category: 'informatica-it',
    imageId: 'course-primavera-payroll',
    duration: '24 horas',
    generalObjective: 'Capacitar os utilizadores a processar salários de forma eficiente e correta utilizando o módulo de RH do software Primavera.',
    whatYouWillLearn: ['Configurar o módulo de RH', 'Processar salários mensalmente', 'Gerir férias, faltas e outras ocorrências', 'Gerar mapas e declarações legais'],
    modules: [{ title: 'Módulo 1: Configuração e Cadastro', topics: ['Fichas de funcionários'] }, { title: 'Módulo 2: Processamento e Relatórios', topics: ['Cálculo de salários e impostos'] }]
  },
  {
    id: 'WR-82',
    name: 'SAP HCM - Configuração de Processamento Salarial',
    category: 'certificacao',
    imageId: 'course-sap-hcm',
    duration: '40 horas',
    generalObjective: 'Capacitar consultores e utilizadores avançados a configurar o módulo de processamento salarial (Payroll) do SAP HCM.',
    whatYouWillLearn: ['Compreender a estrutura do Payroll no SAP', 'Configurar esquemas de cálculo e regras', 'Personalizar rubricas salariais', 'Realizar testes e simulações'],
    modules: [{ title: 'Módulo 1: Estrutura do Payroll SAP', topics: ['Infotipos e tabelas'] }, { title: 'Módulo 2: Configuração e Personalização', topics: ['Esquemas e regras'] }]
  },
  {
    id: 'ZW-61',
    name: 'Excel Intermédio',
    category: 'informatica-it',
    imageId: 'course-excel-intermediate',
    duration: '20 horas',
    generalObjective: 'Aprofundar os conhecimentos em Excel, focando em funções e ferramentas que aumentam a produtividade na análise de dados.',
    whatYouWillLearn: ['Utilizar funções lógicas (SE, E, OU)', 'Dominar funções de pesquisa (PROCV, PROCH)', 'Criar gráficos e formatá-los', 'Introdução a tabelas dinâmicas'],
    modules: [{ title: 'Módulo 1: Funções Essenciais', topics: ['Funções lógicas e de pesquisa'] }, { title: 'Módulo 2: Análise e Visualização', topics: ['Gráficos e tabelas dinâmicas'] }]
  },
  {
    id: 'JS-779',
    name: 'Excel Avançado',
    category: 'informatica-it',
    imageId: 'course-excel-advanced-2',
    duration: '20 horas',
    generalObjective: 'Aprofundar o conhecimento do Excel, explorando as suas ferramentas e funções mais poderosas para análise de dados e automação.',
    whatYouWillLearn: ['Dominar tabelas dinâmicas', 'Utilizar funções avançadas (lógicas, pesquisa, texto)', 'Realizar análises de hipóteses (Solver, Atingir Objetivo)', 'Introdução à automação com macros'],
    modules: [{ title: 'Módulo 1: Análise de Dados', topics: ['Tabelas e gráficos dinâmicos'] }, { title: 'Módulo 2: Funções Avançadas e Automação', topics: ['Macros e VBA'] }]
  },
  {
    id: 'WH-155',
    name: 'Excel Basico',
    category: 'informatica-it',
    imageId: 'course-excel-basic',
    duration: '15 horas',
    generalObjective: 'Introduzir os participantes ao Microsoft Excel, capacitando-os a criar e formatar folhas de cálculo e a utilizar fórmulas básicas.',
    whatYouWillLearn: ['Navegar na interface do Excel', 'Criar e formatar folhas de cálculo', 'Utilizar fórmulas e funções matemáticas básicas', 'Criar gráficos simples'],
    modules: [{ title: 'Módulo 1: Introdução ao Excel', topics: ['Interface e conceitos básicos'] }, { title: 'Módulo 2: Fórmulas e Gráficos', topics: ['Cálculos e representação de dados'] }]
  },
  {
    id: 'YF-360',
    name: 'SAP BASIS - Melhores Práticas de Administração',
    category: 'certificacao',
    imageId: 'course-sap-basis-2',
    duration: '40 horas',
    generalObjective: 'Capacitar administradores de sistemas SAP com as melhores práticas para a manutenção e otimização do ambiente.',
    whatYouWillLearn: ['Monitorizar o desempenho do sistema', 'Gerir transportes e mandantes', 'Aplicar patches e atualizações', 'Configurar a segurança do sistema'],
    modules: [{ title: 'Módulo 1: Arquitetura SAP', topics: ['Componentes e processos'] }, { title: 'Módulo 2: Administração Diária', topics: ['Monitorização e troubleshooting'] }]
  },
  {
    id: 'BT-436',
    name: 'Administração de Redes e Infraestruturas',
    category: 'informatica-it',
    imageId: 'course-network-admin',
    duration: '40 horas',
    generalObjective: 'Formar profissionais para a instalação, configuração e manutenção de redes de computadores e infraestruturas de TI.',
    whatYouWillLearn: ['Compreender os modelos TCP/IP e OSI', 'Configurar routers e switches', 'Implementar serviços de rede (DNS, DHCP)', 'Gerir a segurança da rede'],
    modules: [{ title: 'Módulo 1: Fundamentos de Redes', topics: ['Topologias e protocolos'] }, { title: 'Módulo 2: Administração de Redes', topics: ['Configuração de equipamentos e serviços'] }]
  },
  {
    id: 'PN-781',
    name: 'Segurança Informática (Sistemas e Informação)',
    category: 'informatica-it',
    imageId: 'course-it-security',
    duration: '35 horas',
    generalObjective: 'Fornecer uma visão abrangente sobre a segurança de sistemas de informação, cobrindo aspetos técnicos e de gestão.',
    whatYouWillLearn: ['Identificar ameaças e vulnerabilidades', 'Implementar políticas de segurança', 'Configurar firewalls e sistemas de deteção de intrusão', 'Realizar análise de risco'],
    modules: [{ title: 'Módulo 1: Gestão da Segurança', topics: ['Políticas e análise de risco'] }, { title: 'Módulo 2: Segurança Técnica', topics: ['Segurança de redes e sistemas operativos'] }]
  },
  {
    id: 'KE-540',
    name: 'Microsoft Word',
    category: 'informatica-it',
    imageId: 'course-word',
    duration: '15 horas',
    generalObjective: 'Dominar o Microsoft Word para a criação e formatação de documentos profissionais complexos.',
    whatYouWillLearn: ['Utilizar estilos e formatação avançada', 'Criar índices automáticos', 'Gerir a impressão em série (mail merge)', 'Trabalhar com documentos longos (secções, cabeçalhos)'],
    modules: [{ title: 'Módulo 1: Formatação Avançada', topics: ['Estilos e modelos'] }, { title: 'Módulo 2: Ferramentas de Produtividade', topics: ['Mail merge e índices'] }]
  },
  {
    id: 'TY-158',
    name: 'Microsoft Outlook',
    category: 'informatica-it',
    imageId: 'course-outlook',
    duration: '12 horas',
    generalObjective: 'Otimizar o uso do Microsoft Outlook para uma gestão mais eficaz do email, agenda e tarefas.',
    whatYouWillLearn: ['Organizar e gerir emails (regras, pastas)', 'Gerir a agenda e agendar reuniões', 'Utilizar o gestor de tarefas', 'Personalizar o Outlook para maior produtividade'],
    modules: [{ title: 'Módulo 1: Gestão de Email', topics: ['Organização e regras'] }, { title: 'Módulo 2: Gestão do Tempo e Tarefas', topics: ['Calendário e tarefas'] }]
  },
  {
    id: 'WI-132',
    name: 'Microsoft Access',
    category: 'informatica-it',
    imageId: 'course-access',
    duration: '24 horas',
    generalObjective: 'Capacitar os participantes a criar e gerir pequenas bases de dados relacionais com o Microsoft Access.',
    whatYouWillLearn: ['Modelar uma base de dados (tabelas e relações)', 'Criar formulários para inserção de dados', 'Construir consultas para extrair informação', 'Gerar relatórios para apresentar os dados'],
    modules: [{ title: 'Módulo 1: Estrutura da Base de Dados', topics: ['Tabelas e relacionamentos'] }, { title: 'Módulo 2: Interface e Relatórios', topics: ['Formulários, consultas e relatórios'] }]
  },
  {
    id: 'LT-654',
    name: 'Microsoft Teams',
    category: 'informatica-it',
    imageId: 'course-teams',
    duration: '12 horas',
    generalObjective: 'Dominar o Microsoft Teams como plataforma de comunicação e colaboração para equipas.',
    whatYouWillLearn: ['Comunicar através de chat e videochamadas', 'Criar e gerir equipas e canais', 'Partilhar e colaborar em ficheiros', 'Integrar outras aplicações no Teams'],
    modules: [{ title: 'Módulo 1: Comunicação e Colaboração', topics: ['Chat e reuniões'] }, { title: 'Módulo 2: Gestão de Equipas e Ficheiros', topics: ['Canais e partilha'] }]
  },
  {
    id: 'CZ-730',
    name: 'Microsoft Office',
    category: 'informatica-it',
    imageId: 'course-office',
    duration: '30 horas',
    generalObjective: 'Fornecer uma visão integrada e prática das principais ferramentas do Microsoft Office (Word, Excel, PowerPoint).',
    whatYouWillLearn: ['Criar documentos profissionais no Word', 'Analisar dados e criar gráficos no Excel', 'Desenvolver apresentações de impacto no PowerPoint', 'Integrar informação entre as diferentes aplicações'],
    modules: [{ title: 'Módulo 1: Word', topics: ['Formatação de documentos'] }, { title: 'Módulo 2: Excel e PowerPoint', topics: ['Cálculos e apresentações'] }]
  },
  {
    id: 'TF-83',
    name: 'Primavera',
    category: 'certificacao',
    imageId: 'course-primavera-2',
    duration: '40 horas',
    generalObjective: 'Dominar o software Primavera P6 para a gestão de projetos complexos, especialmente na área da construção e engenharia.',
    whatYouWillLearn: ['Planear e controlar projetos com o Primavera', 'Gerir recursos e custos', 'Analisar o caminho crítico', 'Gerar relatórios de progresso'],
    modules: [{ title: 'Módulo 1: Planeamento no Primavera', topics: ['Estrutura do projeto e atividades'] }, { title: 'Módulo 2: Controlo e Análise', topics: ['Atualização do cronograma e análise de valor agregado'] }]
  },
  {
    id: 'IW-791',
    name: 'SAP-Aplicação IPL (módulo 1)',
    category: 'certificacao',
    imageId: 'course-sap-ipl-1',
    duration: '30 horas',
    generalObjective: 'Introduzir os utilizadores ao ambiente SAP e aos processos fundamentais do módulo IPL.',
    whatYouWillLearn: ['Navegar na interface SAP', 'Compreender os processos de negócio suportados pelo módulo', 'Executar transações básicas', 'Gerar relatórios standard'],
    modules: [{ title: 'Módulo 1: Navegação e Conceitos', topics: ['Interface e dados mestre'] }, { title: 'Módulo 2: Processos de Negócio', topics: ['Execução de transações'] }]
  },
  {
    id: 'TQ-229',
    name: 'SAP-Aplicação IPL (módulo 2)',
    category: 'certificacao',
    imageId: 'course-sap-ipl-2',
    duration: '30 horas',
    generalObjective: 'Aprofundar os conhecimentos no módulo IPL do SAP, abordando processos e configurações avançadas.',
    whatYouWillLearn: ['Executar transações complexas', 'Personalizar processos de negócio', 'Analisar dados e relatórios avançados', 'Resolver problemas comuns do módulo'],
    modules: [{ title: 'Módulo 1: Processos Avançados', topics: ['Transações e cenários complexos'] }, { title: 'Módulo 2: Configuração e Análise', topics: ['Personalização e relatórios'] }]
  },
  {
    id: 'IP-304',
    name: 'Hardware',
    category: 'informatica-it',
    imageId: 'course-hardware',
    duration: '25 horas',
    generalObjective: 'Fornecer conhecimentos sobre os componentes de hardware de um computador e como realizar a sua montagem e diagnóstico.',
    whatYouWillLearn: ['Identificar os principais componentes de um PC', 'Montar um computador a partir dos seus componentes', 'Diagnosticar e resolver problemas de hardware', 'Realizar upgrades de hardware'],
    modules: [{ title: 'Módulo 1: Componentes', topics: ['CPU, RAM, Motherboard, etc.'] }, { title: 'Módulo 2: Montagem e Diagnóstico', topics: ['Montagem e troubleshooting'] }]
  },
  {
    id: 'BA-621',
    name: 'Redes e Comunicações Estruturadas',
    category: 'informatica-it',
    imageId: 'course-structured-cabling',
    duration: '30 horas',
    generalObjective: 'Capacitar profissionais a projetar e instalar sistemas de cablagem estruturada para redes de comunicação.',
    whatYouWillLearn: ['Compreender as normas de cablagem estruturada', 'Projetar a infraestrutura de cablagem', 'Instalar e certificar cabos de cobre e fibra ótica', 'Organizar bastidores e salas técnicas'],
    modules: [{ title: 'Módulo 1: Normas e Projeto', topics: ['ANSI/TIA-568'] }, { title: 'Módulo 2: Instalação e Certificação', topics: ['Técnicas de instalação e teste'] }]
  },
  {
    id: 'AE-78',
    name: 'Segurança Informática',
    category: 'informatica-it',
    imageId: 'course-it-security-2',
    duration: '35 horas',
    generalObjective: 'Fornecer uma visão abrangente sobre a segurança de sistemas de informação, cobrindo aspetos técnicos e de gestão.',
    whatYouWillLearn: ['Identificar ameaças e vulnerabilidades', 'Implementar políticas de segurança', 'Configurar firewalls e sistemas de deteção de intrusão', 'Realizar análise de risco'],
    modules: [{ title: 'Módulo 1: Gestão da Segurança', topics: ['Políticas e análise de risco'] }, { title: 'Módulo 2: Segurança Técnica', topics: ['Segurança de redes e sistemas operativos'] }]
  },
  {
    id: 'BH-705-2',
    name: 'Montagem e Inspeção de Andaimes',
    category: 'industrial',
    imageId: 'course-scaffolding-2',
    duration: '24 horas',
    generalObjective: 'Capacitar profissionais para a montagem, desmontagem e inspeção segura de andaimes, em conformidade com as normas de segurança no trabalho.',
    whatYouWillLearn: ['Identificar os tipos de andaimes e seus componentes.', 'Realizar a montagem e desmontagem de forma segura.', 'Inspecionar andaimes para garantir a sua estabilidade e segurança.', 'Conhecer e aplicar as normas regulamentadoras.'],
    modules: [{ title: 'Módulo 1: Tipologia e Componentes', topics: ['Andaimes tubulares, fachadeiros, etc.', 'Bases, montantes, travessas'] }, { title: 'Módulo 2: Montagem e Segurança', topics: ['Sequência de montagem', 'Sistemas de proteção contra quedas'] }]
  },
  {
    id: 'YG-545',
    name: 'Operador De Empilhadora Pettibone',
    category: 'industrial',
    imageId: 'course-forklift-pettibone',
    duration: '24 horas',
    generalObjective: 'Formar e certificar operadores de empilhadoras tipo Pettibone, garantindo uma operação segura e eficiente.',
    whatYouWillLearn: ['Operar a empilhadora de forma segura', 'Realizar a inspeção diária do equipamento', 'Movimentar e empilhar cargas', 'Conhecer as normas de segurança aplicáveis'],
    modules: [{ title: 'Módulo 1: Operação Segura', topics: ['Princípios de estabilidade'] }, { title: 'Módulo 2: Manutenção e Inspeção', topics: ['Checklists diários'] }]
  },
  {
    id: 'QE-471',
    name: 'Instrumentação Industrial',
    category: 'industrial',
    imageId: 'course-industrial-instrumentation',
    duration: '35 horas',
    generalObjective: 'Fornecer uma base sólida sobre os instrumentos de medição e controlo utilizados em processos industriais.',
    whatYouWillLearn: ['Compreender o funcionamento de sensores de pressão, temperatura, nível e vazão', 'Interpretar diagramas de instrumentação (P&ID)', 'Calibrar e manter instrumentos', 'Conhecer os sistemas de controlo (PLC, SDCD)'],
    modules: [{ title: 'Módulo 1: Sensores e Medição', topics: ['Princípios de funcionamento'] }, { title: 'Módulo 2: Sistemas de Controlo', topics: ['Malhas de controlo'] }]
  },
  {
    id: 'XD-764',
    name: 'Soldadura Industrial',
    category: 'industrial',
    imageId: 'course-industrial-welding',
    duration: '40 horas',
    generalObjective: 'Capacitar os participantes com as técnicas de soldadura mais comuns na indústria (SMAW, GMAW, GTAW).',
    whatYouWillLearn: ['Preparar juntas para soldadura', 'Executar soldaduras em diferentes posições', 'Inspecionar visualmente as soldas', 'Cumprir os procedimentos de segurança em soldadura'],
    modules: [{ title: 'Módulo 1: Processos de Soldadura', topics: ['SMAW, GMAW, GTAW'] }, { title: 'Módulo 2: Prática e Segurança', topics: ['Técnicas de execução e inspeção'] }]
  },
  {
    id: 'FV-577',
    name: 'Pintura Industrial',
    category: 'industrial',
    imageId: 'course-industrial-painting',
    duration: '30 horas',
    generalObjective: 'Formar pintores industriais nas técnicas de preparação de superfície e aplicação de tintas para proteção anticorrosiva.',
    whatYouWillLearn: ['Realizar a preparação de superfícies (jateamento, limpeza)', 'Aplicar tintas com pistola airless e outros métodos', 'Controlar a espessura e aderência da película', 'Conhecer as normas de segurança e ambientais'],
    modules: [{ title: 'Módulo 1: Preparação e Tintas', topics: ['Tipos de tintas e preparação'] }, { title: 'Módulo 2: Aplicação e Controlo', topics: ['Técnicas de aplicação e inspeção'] }]
  },
  {
    id: 'GS-392',
    name: 'Instrumentação e Controle de Processos',
    category: 'industrial',
    imageId: 'course-process-control',
    duration: '40 horas',
    generalObjective: 'Aprofundar os conhecimentos em instrumentação e controlo automático de processos industriais.',
    whatYouWillLearn: ['Modelar processos industriais', 'Sintonizar controladores PID', 'Projetar malhas de controlo avançadas (cascata, feedforward)', 'Compreender a arquitetura de sistemas de controlo distribuído (SDCD)'],
    modules: [{ title: 'Módulo 1: Dinâmica e Modelação', topics: ['Modelagem de processos'] }, { title: 'Módulo 2: Estratégias de Controlo', topics: ['Sintonia de controladores PID'] }]
  },
  {
    id: 'GD-306',
    name: 'Automação Industrial',
    category: 'industrial',
    imageId: 'course-industrial-automation',
    duration: '40 horas',
    generalObjective: 'Fornecer uma visão abrangente sobre as tecnologias de automação industrial, desde sensores a sistemas de supervisão.',
    whatYouWillLearn: ['Programar Controladores Lógicos Programáveis (PLCs)', 'Configurar Interfaces Homem-Máquina (IHMs)', 'Implementar redes de comunicação industrial', 'Compreender a pirâmide da automação'],
    modules: [{ title: 'Módulo 1: PLCs e IHMs', topics: ['Programação em Ladder'] }, { title: 'Módulo 2: Redes e Supervisórios', topics: ['Sistemas SCADA'] }]
  },
  {
    id: 'UB-322',
    name: 'Operador de Produção',
    category: 'industrial',
    imageId: 'course-production-operator',
    duration: '30 horas',
    generalObjective: 'Formar operadores de produção para atuarem em processos industriais, garantindo a eficiência e a qualidade.',
    whatYouWillLearn: ['Operar máquinas e equipamentos de produção', 'Monitorizar os parâmetros do processo', 'Realizar controlos de qualidade', 'Cumprir normas de segurança e boas práticas de fabrico'],
    modules: [{ title: 'Módulo 1: Processos e Equipamentos', topics: ['Operação e controlo'] }, { title: 'Módulo 2: Qualidade e Segurança', topics: ['Controlo de qualidade e segurança no trabalho'] }]
  },
  {
    id: 'LV-253',
    name: 'Operador de Sala de Controlo',
    category: 'industrial',
    imageId: 'course-control-room-operator',
    duration: '40 horas',
    generalObjective: 'Capacitar operadores para monitorizar e controlar processos industriais complexos a partir de uma sala de controlo central.',
    whatYouWillLearn: ['Monitorizar processos através de sistemas SDCD/SCADA', 'Responder a alarmes e situações anormais', 'Otimizar o processo a partir da sala de controlo', 'Comunicar eficazmente com as equipas de campo'],
    modules: [{ title: 'Módulo 1: Sistemas de Supervisão', topics: ['Operação de SDCD/SCADA'] }, { title: 'Módulo 2: Gestão de Anomalias', topics: ['Tratamento de alarmes'] }]
  },
  {
    id: 'LR-505',
    name: 'PLC - Controladores Lógicos Programáveis',
    category: 'industrial',
    imageId: 'course-plc',
    duration: '35 horas',
    generalObjective: 'Capacitar os participantes a programar, instalar e manter Controladores Lógicos Programáveis (PLCs).',
    whatYouWillLearn: ['Programar em linguagem Ladder', 'Configurar entradas e saídas (digitais e analógicas)', 'Realizar o diagnóstico de falhas em sistemas com PLC', 'Integrar PLCs com IHMs e outros dispositivos'],
    modules: [{ title: 'Módulo 1: Hardware e Programação', topics: ['Linguagem Ladder'] }, { title: 'Módulo 2: Aplicações e Diagnóstico', topics: ['Troubleshooting de sistemas automatizados'] }]
  },
  {
    id: 'MU-18',
    name: 'Manutenção Industrial',
    category: 'industrial',
    imageId: 'course-industrial-maintenance',
    duration: '30 horas',
    generalObjective: 'Fornecer os conceitos e técnicas fundamentais da manutenção industrial para garantir a disponibilidade e fiabilidade dos equipamentos.',
    whatYouWillLearn: ['Compreender os tipos de manutenção (corretiva, preventiva, preditiva)', 'Planear e programar ordens de serviço', 'Analisar falhas e identificar a causa raiz', 'Gerir sobressalentes'],
    modules: [{ title: 'Módulo 1: Tipos de Manutenção', topics: ['Estratégias de manutenção'] }, { title: 'Módulo 2: Gestão da Manutenção', topics: ['Planeamento e controlo'] }]
  },
  {
    id: 'IJ-222',
    name: 'Gestão da Qualidade',
    category: 'rh-gestao',
    imageId: 'course-quality-management-2',
    duration: '30 horas',
    generalObjective: 'Capacitar os participantes a implementar e gerir sistemas de gestão da qualidade, com base na norma ISO 9001 e em ferramentas de melhoria contínua.',
    whatYouWillLearn: ['Compreender os princípios da gestão da qualidade total (TQM)', 'Implementar um sistema de gestão da qualidade (SGQ)', 'Utilizar as ferramentas da qualidade (Ishikawa, Pareto, etc.)', 'Conduzir auditorias da qualidade'],
    modules: [{ title: 'Módulo 1: Sistemas de Gestão da Qualidade', topics: ['Norma ISO 9001'] }, { title: 'Módulo 2: Ferramentas e Melhoria', topics: ['PDCA e Six Sigma'] }]
  },
  {
    id: 'TG-1',
    name: 'Segurança Elétrica Industrial',
    category: 'seguranca-trabalho',
    imageId: 'course-electrical-safety',
    duration: '24 horas',
    generalObjective: 'Capacitar profissionais que trabalham com eletricidade a identificar riscos e aplicar procedimentos de segurança para prevenir acidentes.',
    whatYouWillLearn: ['Identificar os riscos do trabalho com eletricidade', 'Aplicar procedimentos de bloqueio e etiquetagem (LOTO)', 'Utilizar equipamentos de proteção individual (EPIs) e coletiva (EPCs)', 'Conhecer as normas de segurança elétrica (ex: NR-10)'],
    modules: [{ title: 'Módulo 1: Riscos e Prevenção', topics: ['Choque elétrico e arco elétrico'] }, { title: 'Módulo 2: Procedimentos Seguros', topics: ['Bloqueio e etiquetagem (LOTO)'] }]
  },
  {
    id: 'ER-426',
    name: 'Segurança de Processos Industriais',
    category: 'seguranca-trabalho',
    imageId: 'course-process-safety',
    duration: '35 horas',
    generalObjective: 'Fornecer os conhecimentos para a gestão da segurança de processos (PSM) em indústrias de alto risco, como a química e petrolífera.',
    whatYouWillLearn: ['Compreender os elementos de um sistema de gestão de segurança de processos', 'Realizar análises de risco de processo (HAZOP, What-if)', 'Gerir a integridade de equipamentos críticos', 'Investigar incidentes de processo'],
    modules: [{ title: 'Módulo 1: Gestão da Segurança de Processos', topics: ['Elementos do PSM'] }, { title: 'Módulo 2: Análise de Riscos', topics: ['Técnicas como HAZOP'] }]
  },
  {
    id: 'KF-580',
    name: 'Manutenção e Reparação de Válvulas',
    category: 'industrial',
    imageId: 'course-valve-maintenance-2',
    duration: '24 horas',
    generalObjective: 'Formar técnicos de manutenção para a correta desmontagem, inspeção, reparação e montagem de válvulas industriais.',
    whatYouWillLearn: ['Identificar tipos de válvulas (gaveta, globo, esfera, etc.)', 'Desmontar e montar válvulas', 'Inspecionar e substituir componentes internos', 'Realizar testes de estanquicidade'],
    modules: [{ title: 'Módulo 1: Tipos de Válvulas', topics: ['Componentes e funcionamento'] }, { title: 'Módulo 2: Procedimentos de Manutenção', topics: ['Desmontagem, inspeção e reparação'] }]
  },
  {
    id: 'LF-556',
    name: 'Gestão e Controle da Manutenção Industrial',
    category: 'industrial',
    imageId: 'course-maintenance-management-control',
    duration: '30 horas',
    generalObjective: 'Aprofundar as competências em gestão da manutenção, focando no planeamento, programação e controlo das atividades para maximizar a fiabilidade.',
    whatYouWillLearn: ['Desenvolver planos de manutenção preventiva e preditiva', 'Gerir ordens de serviço e backlogs', 'Calcular e analisar indicadores de manutenção (MTBF, MTTR)', 'Implementar sistemas de gestão da manutenção (CMMS/EAM)'],
    modules: [{ title: 'Módulo 1: Planeamento e Programação', topics: ['PCM'] }, { title: 'Módulo 2: Controlo e Indicadores', topics: ['KPIs de manutenção'] }]
  },
  {
    id: 'ER-534',
    name: 'Gestão por Processos e Indicadores de Desempenho',
    category: 'rh-gestao',
    imageId: 'course-process-kpi',
    duration: '28 horas',
    generalObjective: 'Capacitar os participantes a mapear, otimizar e gerir os processos de negócio, utilizando indicadores de desempenho (KPIs) para monitorizar e melhorar a performance.',
    whatYouWillLearn: ['Mapear processos de negócio (BPMN)', 'Identificar oportunidades de melhoria de processos', 'Definir e implementar KPIs relevantes', 'Construir dashboards de gestão'],
    modules: [{ title: 'Módulo 1: Gestão de Processos (BPM)', topics: ['Mapeamento e análise de processos'] }, { title: 'Módulo 2: Gestão de Desempenho', topics: ['Definição de KPIs e dashboards'] }]
  },
  {
    id: 'YW-773',
    name: 'Gestão de Resíduos Industriais - Introdução',
    category: 'seguranca-trabalho',
    imageId: 'course-industrial-waste',
    duration: '20 horas',
    generalObjective: 'Introduzir os conceitos de gestão de resíduos industriais, desde a classificação até ao tratamento e disposição final, em conformidade com a legislação.',
    whatYouWillLearn: ['Classificar os resíduos industriais', 'Compreender a legislação ambiental aplicável', 'Conhecer as opções de tratamento e valorização de resíduos', 'Elaborar um plano de gestão de resíduos'],
    modules: [{ title: 'Módulo 1: Classificação e Legislação', topics: ['Tipos de resíduos'] }, { title: 'Módulo 2: Tratamento e Disposição', topics: ['Minimização e reciclagem'] }]
  },
  {
    id: 'AI-522',
    name: 'Gestão de Projectos Industriais',
    category: 'industrial',
    imageId: 'course-industrial-projects',
    duration: '35 horas',
    generalObjective: 'Aplicar os princípios da gestão de projetos às particularidades dos projetos industriais (instalação de fábricas, paragens de manutenção, etc.).',
    whatYouWillLearn: ['Gerir o escopo, prazo e custo de projetos industriais', 'Coordenar as fases de engenharia, compras e construção (EPC)', 'Gerir a segurança e a qualidade no estaleiro', 'Realizar o comissionamento e startup do projeto'],
    modules: [{ title: 'Módulo 1: Planeamento de Projetos Industriais', topics: ['Fases do projeto'] }, { title: 'Módulo 2: Execução e Controlo', topics: ['Gestão de estaleiro e comissionamento'] }]
  },
  {
    id: 'EH-537',
    name: 'Gestão da Manutenção de Máquinas e Equipamentos',
    category: 'industrial',
    imageId: 'course-machine-maintenance',
    duration: '30 horas',
    generalObjective: 'Capacitar gestores e técnicos a planear e executar a manutenção de máquinas e equipamentos industriais para garantir a sua máxima fiabilidade e vida útil.',
    whatYouWillLearn: ['Desenvolver planos de manutenção para diferentes tipos de equipamentos', 'Aplicar técnicas de manutenção preditiva (análise de vibrações, termografia)', 'Gerir a lubrificação de equipamentos', 'Analisar falhas e implementar melhorias'],
    modules: [{ title: 'Módulo 1: Planos de Manutenção', topics: ['Manutenção baseada na fiabilidade (RCM)'] }, { title: 'Módulo 2: Técnicas Preditivas', topics: ['Análise de vibrações e óleos'] }]
  },
  {
    id: 'XX-136',
    name: 'Segurança Industrial e Prevenção de Riscos',
    category: 'seguranca-trabalho',
    imageId: 'course-industrial-safety',
    duration: '35 horas',
    generalObjective: 'Fornecer uma visão abrangente sobre a segurança industrial, focando na identificação de perigos e na prevenção de acidentes em ambiente fabril.',
    whatYouWillLearn: ['Identificar riscos mecânicos, elétricos e químicos', 'Implementar programas de prevenção de acidentes', 'Realizar inspeções de segurança', 'Promover uma cultura de segurança na organização'],
    modules: [{ title: 'Módulo 1: Identificação de Riscos', topics: ['Riscos em máquinas e equipamentos'] }, { title: 'Módulo 2: Programas de Prevenção', topics: ['Inspeções e cultura de segurança'] }]
  },
  {
    id: 'CF-669',
    name: 'Segurança de Máquinas – ISO 13857',
    category: 'certificacao',
    imageId: 'course-machine-safety-iso',
    duration: '24 horas',
    generalObjective: 'Interpretar e aplicar os requisitos da norma ISO 13857 para garantir a segurança no projeto e utilização de máquinas.',
    whatYouWillLearn: ['Compreender os princípios de segurança em máquinas', 'Calcular as distâncias de segurança para zonas de perigo', 'Projetar proteções fixas e móveis', 'Realizar a apreciação de riscos de máquinas'],
    modules: [{ title: 'Módulo 1: Norma ISO 13857', topics: ['Requisitos e cálculos'] }, { title: 'Módulo 2: Apreciação de Riscos', topics: ['Análise de perigos em máquinas'] }]
  },
  {
    id: 'VH-377',
    name: 'Gestão de Clientes',
    category: 'marketing-comercial',
    imageId: 'course-client-management',
    duration: '24 horas',
    generalObjective: 'Desenvolver estratégias e competências para gerir o relacionamento com os clientes, aumentando a sua satisfação e lealdade.',
    whatYouWillLearn: ['Segmentar a base de clientes', 'Gerir o ciclo de vida do cliente', 'Implementar programas de fidelização', 'Utilizar sistemas de CRM para gestão do relacionamento'],
    modules: [{ title: 'Módulo 1: Estratégia de CRM', topics: ['Valor do tempo de vida do cliente (LTV)'] }, { title: 'Módulo 2: Ferramentas de Gestão', topics: ['Software de CRM'] }]
  },
  {
    id: 'RT-97',
    name: 'Gestão de Cobranças',
    category: 'marketing-comercial',
    imageId: 'course-collections-management',
    duration: '20 horas',
    generalObjective: 'Capacitar profissionais a gerir o processo de cobrança de forma eficaz e profissional, recuperando créditos e mantendo o bom relacionamento com o cliente.',
    whatYouWillLearn: ['Estruturar o processo de cobrança', 'Aplicar técnicas de negociação em cobranças', 'Gerir clientes difíceis', 'Compreender os aspetos legais da cobrança'],
    modules: [{ title: 'Módulo 1: Processo de Cobrança', topics: ['Régua de cobrança'] }, { title: 'Módulo 2: Negociação e Legislação', topics: ['Técnicas de comunicação'] }]
  },
  {
    id: 'FG-179',
    name: 'Técnicas de Venda',
    category: 'marketing-comercial',
    imageId: 'course-sales-techniques-2',
    duration: '24 horas',
    generalObjective: 'Dotar a força de vendas com técnicas e competências para aumentar a sua eficácia e alcançar os objetivos comerciais.',
    whatYouWillLearn: ['Dominar o processo de venda consultiva', 'Aplicar técnicas de prospeção e qualificação de leads', 'Conduzir apresentações de vendas persuasivas', 'Contornar objeções e fechar negócios'],
    modules: [{ title: 'Módulo 1: Prospeção e Abordagem', topics: ['Funil de vendas'] }, { title: 'Módulo 2: Negociação e Fecho', topics: ['Técnicas de fecho'] }]
  },
  {
    id: 'JF-104',
    name: 'Técnicas de Negociação',
    category: 'dev-pessoal',
    imageId: 'course-negotiation-techniques-2',
    duration: '20 horas',
    generalObjective: 'Desenvolver as competências de negociação dos participantes para que alcancem melhores acordos em situações profissionais e pessoais.',
    whatYouWillLearn: ['Preparar uma negociação', 'Identificar os interesses das partes', 'Criar opções de ganho mútuo (win-win)', 'Gerir impasses e táticas de negociação'],
    modules: [{ title: 'Módulo 1: Preparação para a Negociação', topics: ['Método de Harvard'] }, { title: 'Módulo 2: O Processo de Negociação', topics: ['Comunicação e táticas'] }]
  },
  {
    id: 'ND-408',
    name: 'Gestão da Cadeia de Suprimentos',
    category: 'industrial',
    imageId: 'course-supply-chain-3',
    duration: '30 horas',
    generalObjective: 'Desenvolver uma visão estratégica e integrada da cadeia de suprimentos (Supply Chain Management).',
    whatYouWillLearn: ['Mapear a cadeia de suprimentos', 'Gerir o relacionamento com fornecedores e clientes', 'Implementar estratégias de logística integrada', 'Analisar o risco na cadeia de suprimentos'],
    modules: [{ title: 'Módulo 1: Estratégia de SCM', topics: ['Modelos de supply chain'] }, { title: 'Módulo 2: Logística Integrada', topics: ['Gestão de transportes e distribuição'] }]
  },
  {
    id: 'QW-537',
    name: 'Gestão de Fornecedores',
    category: 'industrial',
    imageId: 'course-supplier-management-3',
    duration: '20 horas',
    generalObjective: 'Desenvolver e gerir relacionamentos estratégicos com fornecedores para garantir qualidade, inovação e redução de custos.',
    whatYouWillLearn: ['Qualificar e homologar fornecedores', 'Avaliar o desempenho dos fornecedores', 'Desenvolver planos de melhoria conjunta', 'Gerir o risco de fornecedores'],
    modules: [{ title: 'Módulo 1: Seleção e Qualificação', topics: ['Critérios de avaliação'] }, { title: 'Módulo 2: Gestão de Relacionamento (SRM)', topics: ['Colaboração e desenvolvimento'] }]
  },
  {
    id: 'NX-537',
    name: 'Inglês - Elementary',
    category: 'ingles',
    imageId: 'course-english-elementary',
    duration: '50 horas',
    generalObjective: 'Consolidar as bases do inglês e expandir o vocabulário e as estruturas gramaticais para comunicação em situações simples.',
    whatYouWillLearn: ['Falar sobre rotinas e hábitos (present simple)', 'Descrever pessoas, lugares e coisas', 'Fazer compras e pedir comida', 'Falar sobre eventos passados (past simple)'],
    modules: [{ title: 'Módulo 1: Daily Life', topics: ['Routines and free time'] }, { title: 'Módulo 2: Past Events', topics: ['Simple Past of regular and irregular verbs'] }]
  },
  {
    id: 'ZY-640',
    name: 'Inglês - Pre-Intermediate',
    category: 'ingles',
    imageId: 'course-english-pre-intermediate',
    duration: '50 horas',
    generalObjective: 'Desenvolver a fluência e a confiança para comunicar em uma variedade maior de situações quotidianas e profissionais.',
    whatYouWillLearn: ['Falar sobre experiências de vida (present perfect)', 'Comparar e contrastar (comparatives and superlatives)', 'Fazer planos e previsões para o futuro (future tenses)', 'Dar conselhos e fazer sugestões'],
    modules: [{ title: 'Módulo 1: Experiences', topics: ['Present Perfect vs. Past Simple'] }, { title: 'Módulo 2: The Future', topics: ['will, be going to, present continuous'] }]
  },
  {
    id: 'RX-125',
    name: 'Inglês - Intermediate',
    category: 'ingles',
    imageId: 'course-english-intermediate',
    duration: '50 horas',
    generalObjective: 'Capacitar o aluno a comunicar-se com um grau de espontaneidade e fluência que torna a interação com falantes nativos possível sem grande esforço.',
    whatYouWillLearn: ['Narrar histórias e eventos no passado', 'Expressar opiniões e argumentar', 'Compreender as ideias principais de textos complexos', 'Lidar com a maioria das situações que podem surgir durante uma viagem'],
    modules: [{ title: 'Módulo 1: Narratives', topics: ['Past tenses review'] }, { title: 'Módulo 2: Opinions and Discussions', topics: ['Modal verbs for speculation and deduction'] }]
  },
  {
    id: 'JF-778',
    name: 'Inglês - Upper Intermediate',
    category: 'ingles',
    imageId: 'course-english-upper-intermediate',
    duration: '50 horas',
    generalObjective: 'Desenvolver a capacidade de usar o inglês de forma flexível e eficaz para fins sociais, académicos e profissionais.',
    whatYouWillLearn: ['Compreender uma vasta gama de textos longos e exigentes', 'Expressar-se de forma fluente e espontânea', 'Usar a linguagem de forma flexível para diferentes propósitos', 'Produzir textos claros, bem estruturados e detalhados'],
    modules: [{ title: 'Módulo 1: Complex Structures', topics: ['Conditionals and hypothetical situations'] }, { title: 'Módulo 2: Nuances of Language', topics: ['Phrasal verbs and idioms'] }]
  },
  {
    id: 'WY-697',
    name: 'Inglês - Advanced',
    category: 'ingles',
    imageId: 'course-english-advanced',
    duration: '50 horas',
    generalObjective: 'Levar o aluno a um nível de proficiência que lhe permita compreender praticamente tudo o que ouve ou lê e expressar-se de forma espontânea, muito fluente e precisa.',
    whatYouWillLearn: ['Dominar estruturas gramaticais complexas', 'Utilizar um vasto leque de vocabulário, incluindo expressões idiomáticas', 'Diferenciar subtis matizes de significado', 'Comunicar eficazmente em qualquer situação'],
    modules: [{ title: 'Módulo 1: Advanced Grammar', topics: ['Inversion and cleft sentences'] }, { title: 'Módulo 2: Effective Communication', topics: ['Advanced writing and speaking skills'] }]
  }
];
