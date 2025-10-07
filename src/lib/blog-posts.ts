
export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorAvatarId: string;
  imageId: string;
  excerpt: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 'lideranca-remota-desafios-e-solucoes',
    title: 'Liderança Remota: Desafios e Soluções para um Novo Mundo',
    category: 'Gestão e Liderança',
    date: '2024-07-28',
    author: 'Ana Silva',
    authorAvatarId: 'avatar-1',
    imageId: 'blog-leadership',
    excerpt: 'Gerir equipas à distância tornou-se a norma. Explore connosco os principais desafios da liderança remota e descubra estratégias eficazes para manter a sua equipa motivada e produtiva.',
    content: `
A transição para o trabalho remoto trouxe consigo uma série de desafios para os líderes de equipa. A comunicação, a cultura da empresa e a monitorização do desempenho precisam de ser repensadas.

### Principais Desafios:

1.  **Comunicação:** A falta de interações presenciais pode levar a mal-entendidos e a um sentimento de isolamento.
2.  **Cultura Organizacional:** Manter uma cultura de empresa forte e coesa é mais difícil quando os colaboradores não partilham o mesmo espaço físico.
3.  **Bem-estar dos Colaboradores:** O equilíbrio entre a vida profissional e pessoal pode ser um grande desafio, levando ao burnout.

### Soluções e Estratégias:

*   **Comunicação Clara e Frequente:** Implemente reuniões diárias curtas (daily stand-ups) e sessões de one-on-one semanais. Utilize ferramentas de comunicação como o Slack ou o Microsoft Teams de forma eficaz.
*   **Foco nos Resultados:** Mude a mentalidade de "horas trabalhadas" para "resultados entregues". Defina metas claras e mensuráveis (KPIs) para cada membro da equipa.
*   **Promover a Cultura:** Organize eventos sociais virtuais, como happy hours ou jogos online. Crie canais de comunicação informais para conversas não relacionadas com o trabalho.
*   **Apoiar o Bem-estar:** Incentive pausas regulares, defina horários de trabalho claros e ofereça apoio à saúde mental.
    `
  },
  {
    id: 'o-futuro-da-ia-no-recrutamento',
    title: 'O Futuro da Inteligência Artificial no Recrutamento',
    category: 'Recursos Humanos',
    date: '2024-07-25',
    author: 'Carlos Martins',
    authorAvatarId: 'avatar-2',
    imageId: 'blog-ai-recruitment',
    excerpt: 'A Inteligência Artificial está a revolucionar a forma como as empresas encontram talentos. Desde a triagem de currículos à análise preditiva, a IA promete um recrutamento mais rápido e justo.',
    content: `
A Inteligência Artificial (IA) já não é uma promessa distante, mas sim uma realidade presente em muitos departamentos de Recursos Humanos. As suas aplicações no recrutamento são vastas e transformadoras.

### Como a IA está a Mudar o Recrutamento:

*   **Triagem Automatizada:** Ferramentas de IA podem analisar milhares de currículos em minutos, identificando os candidatos que melhor correspondem aos requisitos da vaga com base em competências e experiência.
*   **Análise Preditiva:** Algoritmos podem analisar os perfis dos melhores colaboradores de uma empresa e identificar traços semelhantes em novos candidatos, prevendo o seu potencial sucesso.
*   **Chatbots de Recrutamento:** Chatbots podem interagir com os candidatos 24/7, respondendo a perguntas frequentes, agendando entrevistas e mantendo-os informados sobre o estado da sua candidatura.
*   **Entrevistas em Vídeo Analisadas por IA:** Algumas plataformas utilizam IA para analisar as expressões faciais, o tom de voz e as palavras-chave utilizadas pelos candidatos durante as entrevistas em vídeo, fornecendo insights adicionais aos recrutadores.

Apesar dos benefícios, é crucial garantir que os algoritmos sejam justos e não perpetuem preconceitos existentes. A supervisão humana continua a ser fundamental para um processo de recrutamento ético e eficaz.
    `
  },
  {
    id: '5-soft-skills-essenciais-para-2025',
    title: '5 Soft Skills Essenciais para o Mercado de Trabalho em 2025',
    category: 'Desenvolvimento Pessoal',
    date: '2024-07-22',
    author: 'Beatriz Costa',
    authorAvatarId: 'avatar-3',
    imageId: 'blog-soft-skills',
    excerpt: 'As competências técnicas são importantes, mas as soft skills são o que o diferencia. Descubra quais as 5 competências comportamentais mais valorizadas pelos empregadores.',
    content: `
Num mundo cada vez mais automatizado, as competências humanas, ou soft skills, tornam-se o grande diferencial competitivo para qualquer profissional. Estas são as 5 que você deve priorizar:

1.  **Pensamento Crítico e Resolução de Problemas:** A capacidade de analisar informações complexas, identificar problemas e desenvolver soluções criativas é fundamental.
2.  **Inteligência Emocional:** Compreender e gerir as suas próprias emoções, bem como reconhecer e influenciar as emoções dos outros, é crucial para a liderança e o trabalho em equipa.
3.  **Criatividade e Inovação:** As máquinas podem executar tarefas, mas a criatividade para inovar e pensar "fora da caixa" continua a ser uma capacidade unicamente humana.
4.  **Adaptabilidade e Flexibilidade:** O mercado de trabalho está em constante mudança. A capacidade de se adaptar rapidamente a novas tecnologias, processos e ambientes é mais importante do que nunca.
5.  **Comunicação e Colaboração:** Saber comunicar as suas ideias de forma clara e trabalhar eficazmente em equipas, sejam elas presenciais ou remotas, é a base de qualquer organização de sucesso.
    `
  },
  {
    id: 'guia-completo-para-uma-entrevista-de-emprego-de-sucesso',
    title: 'Guia Completo para uma Entrevista de Emprego de Sucesso',
    category: 'Carreira',
    date: '2024-07-18',
    author: 'Diogo Ferreira',
    authorAvatarId: 'avatar-4',
    imageId: 'blog-interview',
    excerpt: 'Uma entrevista de emprego pode ser intimidante, mas a preparação é a chave para o sucesso. Siga o nosso guia passo a passo para se destacar e conquistar a vaga dos seus sonhos.',
    content: `
A entrevista é a sua oportunidade de brilhar. Siga estes passos para garantir que está preparado.

### Antes da Entrevista:

*   **Pesquise a Empresa:** Conheça a missão, os valores, os produtos e as notícias recentes da empresa.
*   **Analise a Descrição da Vaga:** Entenda exatamente o que a empresa procura e prepare exemplos concretos de como a sua experiência se alinha com cada requisito.
*   **Prepare as Suas Respostas:** Utilize a técnica STAR (Situação, Tarefa, Ação, Resultado) para estruturar as suas respostas a perguntas comportamentais.
*   **Prepare as Suas Perguntas:** Tenha pelo menos 3 perguntas inteligentes para fazer ao entrevistador. Isto demonstra o seu interesse e iniciativa.

### Durante a Entrevista:

*   **Linguagem Corporal:** Mantenha o contacto visual, uma postura aberta e um aperto de mão firme (se for presencial).
*   **Comunique com Clareza:** Fale de forma clara e concisa. Evite divagar.
*   **Seja Autêntico:** Mostre a sua personalidade e entusiasmo pela vaga.

### Depois da Entrevista:

*   **Envie um Email de Agradecimento:** Dentro de 24 horas, envie um email personalizado agradecendo ao entrevistador pelo seu tempo e reforçando o seu interesse na vaga.
    `
  }
];
