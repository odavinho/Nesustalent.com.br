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
    category: 'dev-pessoal', 
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
    category: 'dev-pessoal', 
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
    category: 'dev-pessoal', 
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
    category: 'dev-pessoal', 
    imageId: 'course-performance', 
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
    imageId: 'course-oil-rig-safety',
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
    modules: [{ title: 'Módulo 1: RH Estratégico', topics: ['O papel do RH estratégico', 'Diagnóstico organizacional'] }, { title: 'Módulo 2: Gestão por Competências', topics: ['Mapeamento de competências', 'Avaliação de desempenho']}]
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
    imageId: 'course-team-management',
    duration: '28 horas',
    generalObjective: 'Aprofundar as competências de liderança para a gestão eficaz de equipas, focando na delegação, motivação e desenvolvimento de pessoas.',
    whatYouWillLearn: ['Delegar tarefas de forma eficaz.', 'Dar feedback construtivo e motivador.', 'Gerir o desempenho da equipa.', 'Promover um ambiente de colaboração.'],
    modules: [{ title: 'Módulo 1: Liderança Situacional', topics: ['Diagnóstico da maturidade da equipa', 'Adaptação do estilo de liderança'] }, { title: 'Módulo 2: Ferramentas de Gestão', topics: ['Definição de metas OKR', 'Condução de one-on-ones'] }]
  },
  {
    id: 'NG-302',
    name: 'Finanças para não Financeiros',
    category: 'financas-admin',
    imageId: 'course-finance-non-finance',
    duration: '20 horas',
    generalObjective: 'Dotar profissionais de áreas não-financeiras com os conhecimentos essenciais para compreenderem a linguagem financeira e participarem em decisões de negócio.',
    whatYouWillLearn: ['Ler e interpretar demonstrações financeiras.', 'Compreender os principais indicadores de performance (KPIs).', 'Participar na elaboração de orçamentos.', 'Analisar a viabilidade de pequenos projetos.'],
    modules: [{ title: 'Módulo 1: Contabilidade Básica', topics: ['Ativo, Passivo, Capital Próprio', 'Receitas e Despesas'] }, { title: 'Módulo 2: Análise Financeira', topics: ['Rácios de rentabilidade', 'Análise do ponto de equilíbrio'] }]
  },
  {
    id: 'FI-696',
    name: 'Gestão Documental e Arquivo',
    category: 'financas-admin',
    imageId: 'course-document-management',
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
    imageId: 'course-procurement',
    duration: '22 horas',
    generalObjective: 'Desenvolver competências para a gestão estratégica do processo de compras, desde a seleção de fornecedores até à negociação e gestão de contratos.',
    whatYouWillLearn: ['Realizar a qualificação e avaliação de fornecedores.', 'Conduzir processos de negociação eficazes.', 'Gerir contratos e SLAs (Service Level Agreements).', 'Implementar estratégias de redução de custos (Strategic Sourcing).'],
    modules: [{ title: 'Módulo 1: O Processo de Compras', topics: ['Requisição, cotação, ordem de compra', 'E-procurement'] }, { title: 'Módulo 2: Negociação em Compras', topics: ['Técnicas de negociação', 'Gestão de relacionamento com fornecedores'] }]
  },
  {
    id: 'MB-161',
    name: 'Microsoft Excel Aplicado às Compras',
    category: 'financas-admin',
    imageId: 'course-excel-purchasing',
    duration: '20 horas',
    generalObjective: 'Capacitar profissionais da área de compras a utilizar o Microsoft Excel como uma ferramenta poderosa para análise de dados, criação de dashboards e otimização de processos.',
    whatYouWillLearn: ['Criar tabelas dinâmicas para analisar dados de compras.', 'Utilizar funções avançadas (PROCV, SOMASES) para criar relatórios.', 'Desenvolver dashboards de KPIs de compras.', 'Automatizar tarefas com macros simples.'],
    modules: [{ title: 'Módulo 1: Análise de Dados', topics: ['Tabelas dinâmicas', 'Filtros avançados'] }, { title: 'Módulo 2: Dashboards', topics: ['Criação de gráficos', 'Formatação condicional'] }]
  },
  {
    id: 'XZ-173',
    name: 'Gestão de Recursos Minerais',
    category: 'minerios-petroleo',
    imageId: 'course-mineral-resources',
    duration: '35 horas',
    generalObjective: 'Fornecer uma visão abrangente sobre a gestão de projetos de exploração e explotação de recursos minerais, abordando aspetos técnicos, económicos e ambientais.',
    whatYouWillLearn: ['Compreender o ciclo de vida de um projeto mineiro.', 'Analisar a viabilidade económica de jazigos minerais.', 'Conhecer as principais técnicas de extração.', 'Aplicar princípios de gestão ambiental e responsabilidade social.'],
    modules: [{ title: 'Módulo 1: Exploração Mineral', topics: ['Geologia e prospeção', 'Avaliação de depósitos'] }, { title: 'Módulo 2: Explotação e Processamento', topics: ['Métodos de lavra', 'Britagem e moagem'] }]
  },
  {
    id: 'XX-168',
    name: 'Gestão de Reservatórios de Petróleo e Gás',
    category: 'minerios-petroleo',
    imageId: 'course-oil-reservoir',
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
    imageId: 'course-financial-analysis',
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
    imageId: 'course-workplace-safety',
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
    imageId: 'course-english-beginner',
    duration: '50 horas',
    generalObjective: 'Introduzir o aluno à língua inglesa, desenvolvendo competências básicas de compreensão e expressão oral e escrita para situações do dia-a-dia.',
    whatYouWillLearn: ['Apresentar-se e falar sobre si.', 'Compreender e usar expressões familiares e quotidianas.', 'Interagir de forma simples.', 'Construir frases básicas sobre necessidades imediatas.'],
    modules: [{ title: 'Módulo 1: Greetings and Introductions', topics: ['The verb "to be"', 'Alphabet and numbers'] }, { title: 'Módulo 2: My World', topics: ['Family and professions', 'Simple present tense'] }]
  }
];
