window.initialProjects = [
    {
        id: "P1", icon: "📱", title: "Divulgação Educacional em IA", subtitle: "Instagram",
        focus: "Comunicação", status: "Contínuo", priority: "Alta",
        responsible: "Equipe de Conteúdo", deadline: "Contínuo",
        description: "Posicionar a LIAS como fonte confiável de informação sobre IA através do Instagram, com 4 pilares de conteúdo estratégico.",
        pillars: [
            { name: "Aprendendo sobre IA", format: "Carrossel", icon: "🧠" },
            { name: "IA em Ação", format: "Reels", icon: "🎬" },
            { name: "News IA", format: "Post/Carrossel", icon: "📰" },
            { name: "IA 1 + IA 2 = Sucesso", format: "Carrossel/Reels", icon: "🔗" },
        ],
        tasks: [
            { text: "Definir identidade visual e paleta", done: true },
            { text: "Criar templates no Canva/Figma", done: true },
            { text: "Planejar calendário editorial mensal", done: false },
            { text: "Produzir primeiro lote de conteúdos", done: false },
            { text: "Publicar 3 posts/semana consistente", done: false },
        ],
    },
    {
        id: "P2", icon: "🔍", title: "Análise Comparativa de IAs", subtitle: "Estudo de Ferramentas",
        focus: "Pesquisa", status: "Semestral", priority: "Média",
        responsible: "7 Grupos de Trabalho", deadline: "8 Semanas",
        description: "Estudo comparativo das principais IAs (Gemini, Manus, DeepSeek, Chat.Z.AI, Claude, Perplexity, Grok) com painéis de análise e mini-projetos práticos.",
        groups: [
            { name: "Google Gemini", group: "Grupo 1" }, { name: "Manus (Agente)", group: "Grupo 2" },
            { name: "DeepSeek", group: "Grupo 3" }, { name: "Chat.Z.AI", group: "Grupo 4" },
            { name: "Anthropic Claude", group: "Grupo 5" }, { name: "Perplexity AI", group: "Grupo 6" },
            { name: "xAI Grok", group: "Grupo 7" },
        ],
        tasks: [
            { text: "Distribuir IAs entre os grupos", done: true },
            { text: "Definir critérios de avaliação", done: true },
            { text: "Realizar testes com as IAs", done: false },
            { text: "Preencher painéis de análise", done: false },
            { text: "Desenvolver mini-projetos (estudo de caso)", done: false },
            { text: "Apresentações dos grupos", done: false },
        ],
    },
    {
        id: "P3", icon: "🤖", title: "Curso de Agentes de IA", subtitle: "Agentes e Automação",
        focus: "Ensino", status: "8 Aulas", priority: "Alta",
        responsible: "Marianne + Prof. Orientador", deadline: "8 Aulas",
        description: "Curso intensivo cobrindo GPTs personalizados, automação com N8N e agentes autônomos com Antigravity, culminando em Demo Day.",
        blocks: [
            { name: "Bloco 1: GPTs", aulas: "Aulas 1-3", icon: "💬", topics: ["O que são agentes", "Primeiro GPT", "Knowledge Base + Actions"] },
            { name: "Bloco 2: N8N", aulas: "Aulas 4-5", icon: "⚡", topics: ["Introdução ao N8N", "N8N + APIs de IA"] },
            { name: "Bloco 3: Antigravity", aulas: "Aulas 6-7", icon: "🚀", topics: ["Ecossistema de Agentes", "Agente de Pesquisa"] },
            { name: "Demo Day", aulas: "Aula 8", icon: "🏆", topics: ["Apresentações Finais"] },
        ],
        tasks: [
            { text: "Aula 1: O que são agentes de IA", done: false },
            { text: "Aula 2: Primeiro GPT Personalizado", done: false },
            { text: "Aula 3: Knowledge Base + Actions", done: false },
            { text: "Aula 4: Introdução ao N8N", done: false },
            { text: "Aula 5: N8N + APIs de IA", done: false },
            { text: "Aula 6-7: Antigravity", done: false },
            { text: "Demo Day: Apresentações", done: false },
        ],
    },
    {
        id: "P4", icon: "🏥", title: "SUS-GPT", subtitle: "Agente para Dados do DataSUS",
        focus: "Extensão", status: "4 Meses", priority: "Alta",
        responsible: "Equipe Técnica", deadline: "4 Meses",
        description: "Desenvolvimento de agente de IA treinado como 'tradutor' e 'guia' para os bancos de dados do DataSUS, democratizando acesso à análise de dados de saúde.",
        months: [
            { name: "Mês 1: Imersão e Base de Conhecimento", icon: "📚" },
            { name: "Mês 2: Construção e Treinamento", icon: "🔧" },
            { name: "Mês 3: Automação e Validação", icon: "✅" },
            { name: "Mês 4: Disseminação e Evento", icon: "🎯" },
        ],
        tasks: [
            { text: "Definir bases do DataSUS (SIM, SINASC, SIH)", done: false },
            { text: "Coletar dicionários de variáveis", done: false },
            { text: "Criar 'Manual Mestre'", done: false },
            { text: "Construir GPT v1.0", done: false },
            { text: "Testes e refinamento do prompt", done: false },
            { text: "Validação por pares", done: false },
            { text: "Apresentação no evento", done: false },
        ],
    },
    {
        id: "P5", icon: "⚖️", title: "Evento 'O Dilema Digital'", subtitle: "IA e Pesquisa: Ética à Prática",
        focus: "Evento", status: "Pontual", priority: "Alta",
        responsible: "Equipe de Eventos", deadline: "Pontual",
        description: "Mesa-redonda multidisciplinar sobre os desafios éticos da IA na pesquisa, com apresentação do SUS-GPT como caso de uso positivo.",
        acts: [
            { name: "Ato 1: A Ferramenta", desc: "Demonstração do poder das IAs", icon: "🔧" },
            { name: "Ato 2: O Debate", desc: "Mesa-redonda sobre limites éticos", icon: "💬" },
            { name: "Ato 3: A Solução", desc: "Apresentação do SUS-GPT", icon: "💡" },
            { name: "Ato 4: A Síntese", desc: "Conclusões e Q&A", icon: "🎯" },
        ],
        tasks: [
            { text: "Definir participantes da mesa-redonda", done: false },
            { text: "Preparar demonstração das IAs", done: false },
            { text: "Elaborar roteiro de discussão", done: false },
            { text: "Criar Protocolo de Integridade da LIAS", done: false },
            { text: "Divulgação do evento", done: false },
        ],
    },
    {
        id: "P6", icon: "📋", title: "Prontuário do Futuro", subtitle: "Protocolo Ético de IA na Saúde",
        focus: "Extensão", status: "Semestral", priority: "Alta",
        responsible: "Equipe de Ética", deadline: "Semestral",
        description: "Criar e disseminar protocolo de uso ético da IA na saúde, baseado em diretrizes da OMS e AMA, com E-book e Website.",
        principles: [
            "Verificação Humana Soberana", "Proteção de Dados do Paciente",
            "Consciência sobre Vieses", "Transparência com o Paciente",
            "Ceticismo Saudável e Validação",
        ],
        chapters: [
            "O que é IA na Saúde (e o que não é)?", "As 5 Grandes Aplicações da IA na Saúde",
            "O Protocolo de Uso Seguro", "Guia Prático de Ferramentas", "O Futuro e a Responsabilidade Legal",
        ],
        tasks: [
            { text: "Pesquisar diretrizes OMS e AMA", done: false },
            { text: "Estruturar capítulos do E-book", done: false },
            { text: "Redigir os 5 princípios fundamentais", done: false },
            { text: "Design e diagramação do E-book", done: false },
            { text: "Desenvolvimento do Website", done: false },
            { text: "Publicar e distribuir", done: false },
        ],
    },
    {
        id: "P7", icon: "🎙️", title: "Podcast 'Atualiza LIAS'", subtitle: "Notícias Semanais de IA",
        focus: "Comunicação", status: "Semanal", priority: "Média",
        responsible: "Equipe de Conteúdo", deadline: "Semanal",
        description: "Fluxo de trabalho semanal usando NotebookLM para gerar podcast curto com as principais notícias de IA na saúde.",
        workflow: [
            { name: "Etapa 1: Coleta", desc: "GPT 'Repórter LIAS' busca 5 notícias", icon: "🔍" },
            { name: "Etapa 2: Estúdio", desc: "NotebookLM gera Audio Overview", icon: "🎧" },
            { name: "Etapa 3: Distribuição", desc: "Post no WhatsApp/Telegram", icon: "📤" },
        ],
        tasks: [
            { text: "Configurar GPT 'Repórter LIAS'", done: false },
            { text: "Criar notebook template no NotebookLM", done: false },
            { text: "Definir fluxo de produção semanal", done: false },
            { text: "Produzir episódio piloto", done: false },
            { text: "Publicar regularmente", done: false },
        ],
    },
    {
        id: "P8", icon: "🎓", title: "Academia Aumentada", subtitle: "Fluxo de Trabalho Científico com IA",
        focus: "Pesquisa", status: "Contínuo", priority: "Alta",
        responsible: "Professora Orientadora", deadline: "13 Semanas",
        description: "Jornada de 13 semanas capacitando membros a otimizar pesquisa científica com stack de ferramentas de IA (Elicit, SciSpace, Consensus, Prism, Jenni.ai).",
        phases: [
            { name: "Fase 1: Lançamento", weeks: "Semana 1", icon: "🚀" },
            { name: "Fase 2: Seminários", weeks: "Semanas 2-5", icon: "🎤" },
            { name: "Fase 3: Projeto Prático", weeks: "Semanas 6-11", icon: "🔬" },
            { name: "Fase 4: Submissão", weeks: "Semanas 12-13", icon: "📄" },
        ],
        tools: [
            { name: "Elicit", function: "Mapeamento da Literatura" },
            { name: "Consensus", function: "Respostas Baseadas em Evidências" },
            { name: "SciSpace", function: "Leitor de PDF Interativo" },
            { name: "Prism", function: "Extração de Dados para Revisões" },
            { name: "Jenni.ai", function: "Assistente de Redação Acadêmica" },
        ],
        tasks: [
            { text: "Aula inaugural com orientadora", done: false },
            { text: "Seminário 1: Elicit + K-Dense", done: false },
            { text: "Seminário 2: SciSpace + NotebookLM", done: false },
            { text: "Seminário 3: Prism + Consensus", done: false },
            { text: "Seminário 4: Jenni.ai + ChatGPT", done: false },
            { text: "Submissão do artigo ao congresso", done: false },
        ],
    },
    {
        id: "P9", icon: "🧞", title: "Campanha 'Gênios da IA'", subtitle: "Marketing Interativo",
        focus: "Mkt/Engajamento", status: "Pontual", priority: "Média",
        responsible: "Equipe de Marketing", deadline: "4 Semanas",
        description: "Campanha interativa no Instagram usando temática de 'Aladim e o Gênio da Lâmpada', onde membros da LIAS resolvem problemas acadêmicos usando IA.",
        campaignPhases: [
            { name: "Fase 1: Teaser", desc: "Cartazes + QR Code + Formulário", duration: "1 Semana", icon: "📢" },
            { name: "Fase 2: Análise", desc: "Processar desejos + Roteirização", duration: "1 Semana", icon: "📊" },
            { name: "Fase 3: Realização", desc: "Publicar Reels com soluções", duration: "2 Semanas", icon: "🎬" },
        ],
        tasks: [
            { text: "Criar material visual (cartazes)", done: false },
            { text: "Criar formulário de coleta de desejos", done: false },
            { text: "Distribuir cartazes no campus", done: false },
            { text: "Analisar e categorizar desejos", done: false },
            { text: "Roteirizar vídeos de solução", done: false },
            { text: "Produzir e publicar Reels", done: false },
        ],
    },
    {
        id: "P10", icon: "💡", title: "Evento NotebookLM", subtitle: "Palestra Prática",
        focus: "Evento", status: "Pontual", priority: "Média",
        responsible: "Equipe de Eventos", deadline: "Pontual",
        description: "Workshop prático ensinando a comunidade acadêmica a usar o NotebookLM para acelerar pesquisas e estudos.",
        acts: [
            { name: "Ato 1: A Fundação", desc: "Construindo Base de Conhecimento", duration: "15 min", icon: "📚" },
            { name: "Ato 2: A Análise", desc: "Leitura Ativa e Síntese", duration: "20 min", icon: "🔍" },
            { name: "Ato 3: A Escrita", desc: "Otimizando Redação Acadêmica", duration: "15 min", icon: "✍️" },
            { name: "Ato 4: Dicas + Q&A", desc: "Audio Overviews e Perguntas", duration: "10 min", icon: "💬" },
        ],
        tasks: [
            { text: "Preparar notebook demonstrativo", done: false },
            { text: "Criar material de apoio", done: false },
            { text: "Divulgação para comunidade", done: false },
            { text: "Executar evento", done: false },
        ],
    },
];

window.initialEvents = [
    { id: 1, title: "Aula Inaugural - Academia Aumentada", startDate: "2026-03-02", endDate: "2026-03-02", projectId: "P8", colorIndex: 0, description: "Aula inaugural com a Professora Orientadora" },
    { id: 2, title: "Seminário 1: Elicit + K-Dense", startDate: "2026-03-09", endDate: "2026-03-09", projectId: "P8", colorIndex: 1, description: "Seminário sobre mapeamento da literatura" },
    { id: 3, title: "Evento O Dilema Digital", startDate: "2026-04-15", endDate: "2026-04-15", projectId: "P5", colorIndex: 4, description: "Mesa-redonda sobre ética e IA" },
    { id: 4, title: "Demo Day - Curso de Agentes", startDate: "2026-05-20", endDate: "2026-05-20", projectId: "P3", colorIndex: 2, description: "Apresentações finais do curso" },
    { id: 5, title: "Lançamento SUS-GPT", startDate: "2026-06-01", endDate: "2026-06-05", projectId: "P4", colorIndex: 3, description: "Evento de lançamento do SUS-GPT" },
];

window.initialMembers = [
    {
        id: 1, name: "Yan Maciel Ferreira Leite", icon: "👨‍💻", role: "Membro", projectIds: ["P1", "P3", "P4"],
        activities: [{ id: 1, projectId: "P1", text: "Criar conteúdo para Instagram", done: true }, { id: 2, projectId: "P3", text: "Participar das aulas de Agentes", done: false }, { id: 3, projectId: "P4", text: "Auxiliar no desenvolvimento do SUS-GPT", done: false }]
    },
    {
        id: 2, name: "Flávio Alexandre A. A. Delfino", icon: "👨‍🔬", role: "Membro", projectIds: ["P2", "P4", "P8"],
        activities: [{ id: 1, projectId: "P2", text: "Testar e analisar IAs", done: true }, { id: 2, projectId: "P4", text: "Coletar dicionários de variáveis", done: false }, { id: 3, projectId: "P8", text: "Preparar seminário", done: false }]
    },
    {
        id: 3, name: "Isabela Machado de Souza", icon: "👩‍🎓", role: "Membro", projectIds: ["P1", "P5", "P6"],
        activities: [{ id: 1, projectId: "P1", text: "Planejar calendário editorial", done: true }, { id: 2, projectId: "P5", text: "Organizar evento O Dilema Digital", done: false }, { id: 3, projectId: "P6", text: "Pesquisar diretrizes OMS e AMA", done: false }]
    },
    {
        id: 4, name: "Isabela Gonçalves Caris", icon: "👩‍💼", role: "Membro", projectIds: ["P2", "P7", "P9"],
        activities: [{ id: 1, projectId: "P2", text: "Preencher painel de análise", done: false }, { id: 2, projectId: "P7", text: "Produzir episódio do podcast", done: false }, { id: 3, projectId: "P9", text: "Criar material visual da campanha", done: false }]
    },
    {
        id: 5, name: "Gabriel Rodrigues", icon: "👨‍🎓", role: "Membro", projectIds: ["P3", "P4", "P10"],
        activities: [{ id: 1, projectId: "P3", text: "Criar primeiro GPT personalizado", done: true }, { id: 2, projectId: "P4", text: "Construir GPT v1.0", done: false }, { id: 3, projectId: "P10", text: "Preparar demonstração NotebookLM", done: false }]
    },
    {
        id: 6, name: "Murillo de Miranda", icon: "👨‍💻", role: "Membro", projectIds: ["P1", "P3", "P6"],
        activities: [{ id: 1, projectId: "P1", text: "Gravar Reels demonstrativos", done: false }, { id: 2, projectId: "P3", text: "Desenvolver fluxos no N8N", done: false }, { id: 3, projectId: "P6", text: "Desenvolver website do protocolo", done: false }]
    },
    {
        id: 7, name: "Aurélio Lacerda Sena Junior", icon: "👨‍🔬", role: "Membro", projectIds: ["P2", "P4", "P8"],
        activities: [{ id: 1, projectId: "P2", text: "Testar Anthropic Claude", done: true }, { id: 2, projectId: "P4", text: "Criar Manual Mestre", done: false }, { id: 3, projectId: "P8", text: "Submeter artigo ao congresso", done: false }]
    },
    {
        id: 8, name: "Mariana Barbosa de Figueiró", icon: "👩‍🔬", role: "Membro", projectIds: ["P5", "P6", "P8"],
        activities: [{ id: 1, projectId: "P5", text: "Elaborar roteiro de discussão", done: false }, { id: 2, projectId: "P6", text: "Redigir os 5 princípios fundamentais", done: false }, { id: 3, projectId: "P8", text: "Preparar Seminário 2", done: false }]
    },
    {
        id: 9, name: "Rafael Luiz de Araujo", icon: "👨‍💼", role: "Membro", projectIds: ["P1", "P7", "P9"],
        activities: [{ id: 1, projectId: "P1", text: "Produzir conteúdo News IA", done: true }, { id: 2, projectId: "P7", text: "Configurar GPT Repórter LIAS", done: false }, { id: 3, projectId: "P9", text: "Distribuir cartazes no campus", done: false }]
    },
    {
        id: 10, name: "Guilherme Vilas Boas Ferreira", icon: "👨‍🎓", role: "Membro", projectIds: ["P2", "P3", "P10"],
        activities: [{ id: 1, projectId: "P2", text: "Desenvolver mini-projeto com IA", done: false }, { id: 2, projectId: "P3", text: "Criar agente com Antigravity", done: false }, { id: 3, projectId: "P10", text: "Criar material de apoio", done: false }]
    },
    {
        id: 11, name: "Thiago Souza", icon: "👨‍💻", role: "Membro", projectIds: ["P4", "P5", "P7"],
        activities: [{ id: 1, projectId: "P4", text: "Testes e refinamento do prompt", done: false }, { id: 2, projectId: "P5", text: "Preparar demonstração das IAs", done: false }, { id: 3, projectId: "P7", text: "Definir fluxo de produção semanal", done: false }]
    },
];
