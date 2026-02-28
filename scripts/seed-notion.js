// ============================================
// Seed Notion — Popula as databases com dados iniciais
// ============================================
// Uso: node scripts/seed-notion.js
// Pré-requisitos: Ter rodado setup-notion.js e preenchido .env com os IDs

require("dotenv/config");
const { Client } = require("@notionhq/client");
const bcrypt = require("bcryptjs");

const notion = new Client({ auth: process.env.NOTION_SECRET });

const DB = {
    PROJECTS: process.env.NOTION_DB_PROJECTS,
    TASKS: process.env.NOTION_DB_TASKS,
    MEMBERS: process.env.NOTION_DB_MEMBERS,
    EVENTS: process.env.NOTION_DB_EVENTS,
    ACTIVITIES: process.env.NOTION_DB_ACTIVITIES,
    USERS: process.env.NOTION_DB_USERS,
};

// Helpers de propriedades
const t = (v) => ({ title: [{ text: { content: String(v || "") } }] });
const r = (v) => ({ rich_text: [{ text: { content: String(v || "") } }] });
const s = (v) => (v ? { select: { name: v } } : { select: null });
const c = (v) => ({ checkbox: Boolean(v) });
const n = (v) => ({ number: Number(v) || 0 });
const d = (v, end) => {
    if (!v) return { date: null };
    const o = { start: v };
    if (end && end !== v) o.end = end;
    return { date: o };
};
const e = (v) => ({ email: v || null });
const rel = (ids) => ({ relation: (ids || []).map(id => ({ id })) });

// Dados iniciais (mesmo do data.js)
const projects = [
    { id: "P1", icon: "📱", title: "Divulgação Educacional em IA", subtitle: "Instagram", focus: "Comunicação", status: "Contínuo", priority: "Alta", responsible: "Equipe de Conteúdo", deadline: "Contínuo", description: "Posicionar a LIAS como fonte confiável de informação sobre IA através do Instagram, com 4 pilares de conteúdo estratégico.", meta: { pillars: [{ name: "Aprendendo sobre IA", format: "Carrossel", icon: "🧠" }, { name: "IA em Ação", format: "Reels", icon: "🎬" }, { name: "News IA", format: "Post/Carrossel", icon: "📰" }, { name: "IA 1 + IA 2 = Sucesso", format: "Carrossel/Reels", icon: "🔗" }] }, tasks: [{ text: "Definir identidade visual e paleta", done: true }, { text: "Criar templates no Canva/Figma", done: true }, { text: "Planejar calendário editorial mensal", done: false }, { text: "Produzir primeiro lote de conteúdos", done: false }, { text: "Publicar 3 posts/semana consistente", done: false }] },
    { id: "P2", icon: "🔍", title: "Análise Comparativa de IAs", subtitle: "Estudo de Ferramentas", focus: "Pesquisa", status: "Semestral", priority: "Média", responsible: "7 Grupos de Trabalho", deadline: "8 Semanas", description: "Estudo comparativo das principais IAs com painéis de análise e mini-projetos práticos.", meta: { groups: [{ name: "Google Gemini", group: "Grupo 1" }, { name: "Manus (Agente)", group: "Grupo 2" }, { name: "DeepSeek", group: "Grupo 3" }, { name: "Chat.Z.AI", group: "Grupo 4" }, { name: "Anthropic Claude", group: "Grupo 5" }, { name: "Perplexity AI", group: "Grupo 6" }, { name: "xAI Grok", group: "Grupo 7" }] }, tasks: [{ text: "Distribuir IAs entre os grupos", done: true }, { text: "Definir critérios de avaliação", done: true }, { text: "Realizar testes com as IAs", done: false }, { text: "Preencher painéis de análise", done: false }, { text: "Desenvolver mini-projetos (estudo de caso)", done: false }, { text: "Apresentações dos grupos", done: false }] },
    { id: "P3", icon: "🤖", title: "Curso de Agentes de IA", subtitle: "Agentes e Automação", focus: "Ensino", status: "8 Aulas", priority: "Alta", responsible: "Marianne + Prof. Orientador", deadline: "8 Aulas", description: "Curso intensivo cobrindo GPTs personalizados, automação com N8N e agentes autônomos.", meta: { blocks: [{ name: "Bloco 1: GPTs", aulas: "Aulas 1-3", icon: "💬", topics: ["O que são agentes", "Primeiro GPT", "Knowledge Base + Actions"] }, { name: "Bloco 2: N8N", aulas: "Aulas 4-5", icon: "⚡", topics: ["Introdução ao N8N", "N8N + APIs de IA"] }, { name: "Bloco 3: Antigravity", aulas: "Aulas 6-7", icon: "🚀", topics: ["Ecossistema de Agentes", "Agente de Pesquisa"] }, { name: "Demo Day", aulas: "Aula 8", icon: "🏆", topics: ["Apresentações Finais"] }] }, tasks: [{ text: "Aula 1: O que são agentes de IA", done: false }, { text: "Aula 2: Primeiro GPT Personalizado", done: false }, { text: "Aula 3: Knowledge Base + Actions", done: false }, { text: "Aula 4: Introdução ao N8N", done: false }, { text: "Aula 5: N8N + APIs de IA", done: false }, { text: "Aula 6-7: Antigravity", done: false }, { text: "Demo Day: Apresentações", done: false }] },
    { id: "P4", icon: "🏥", title: "SUS-GPT", subtitle: "Agente para Dados do DataSUS", focus: "Extensão", status: "4 Meses", priority: "Alta", responsible: "Equipe Técnica", deadline: "4 Meses", description: "Agente de IA treinado para os bancos de dados do DataSUS.", meta: { months: [{ name: "Mês 1: Imersão e Base de Conhecimento", icon: "📚" }, { name: "Mês 2: Construção e Treinamento", icon: "🔧" }, { name: "Mês 3: Automação e Validação", icon: "✅" }, { name: "Mês 4: Disseminação e Evento", icon: "🎯" }] }, tasks: [{ text: "Definir bases do DataSUS", done: false }, { text: "Coletar dicionários de variáveis", done: false }, { text: "Criar 'Manual Mestre'", done: false }, { text: "Construir GPT v1.0", done: false }, { text: "Testes e refinamento do prompt", done: false }, { text: "Validação por pares", done: false }, { text: "Apresentação no evento", done: false }] },
    { id: "P5", icon: "⚖️", title: "Evento 'O Dilema Digital'", subtitle: "IA e Pesquisa: Ética à Prática", focus: "Evento", status: "Pontual", priority: "Alta", responsible: "Equipe de Eventos", deadline: "Pontual", description: "Mesa-redonda multidisciplinar sobre desafios éticos da IA na pesquisa.", meta: { acts: [{ name: "Ato 1: A Ferramenta", desc: "Demonstração do poder das IAs", icon: "🔧" }, { name: "Ato 2: O Debate", desc: "Mesa-redonda sobre limites éticos", icon: "💬" }, { name: "Ato 3: A Solução", desc: "Apresentação do SUS-GPT", icon: "💡" }, { name: "Ato 4: A Síntese", desc: "Conclusões e Q&A", icon: "🎯" }] }, tasks: [{ text: "Definir participantes da mesa-redonda", done: false }, { text: "Preparar demonstração das IAs", done: false }, { text: "Elaborar roteiro de discussão", done: false }, { text: "Criar Protocolo de Integridade da LIAS", done: false }, { text: "Divulgação do evento", done: false }] },
    { id: "P6", icon: "📋", title: "Prontuário do Futuro", subtitle: "Protocolo Ético de IA na Saúde", focus: "Extensão", status: "Semestral", priority: "Alta", responsible: "Equipe de Ética", deadline: "Semestral", description: "Criar protocolo de uso ético da IA na saúde.", meta: { principles: ["Verificação Humana Soberana", "Proteção de Dados do Paciente", "Consciência sobre Vieses", "Transparência com o Paciente", "Ceticismo Saudável e Validação"], chapters: ["O que é IA na Saúde?", "As 5 Grandes Aplicações", "O Protocolo de Uso Seguro", "Guia Prático de Ferramentas", "O Futuro e a Responsabilidade Legal"] }, tasks: [{ text: "Pesquisar diretrizes OMS e AMA", done: false }, { text: "Estruturar capítulos do E-book", done: false }, { text: "Redigir os 5 princípios", done: false }, { text: "Design do E-book", done: false }, { text: "Desenvolvimento do Website", done: false }, { text: "Publicar e distribuir", done: false }] },
    { id: "P7", icon: "🎙️", title: "Podcast 'Atualiza LIAS'", subtitle: "Notícias Semanais de IA", focus: "Comunicação", status: "Semanal", priority: "Média", responsible: "Equipe de Conteúdo", deadline: "Semanal", description: "Fluxo de trabalho semanal usando NotebookLM para gerar podcast.", meta: { workflow: [{ name: "Etapa 1: Coleta", desc: "GPT busca 5 notícias", icon: "🔍" }, { name: "Etapa 2: Estúdio", desc: "NotebookLM gera Audio", icon: "🎧" }, { name: "Etapa 3: Distribuição", desc: "Post no WhatsApp/Telegram", icon: "📤" }] }, tasks: [{ text: "Configurar GPT 'Repórter LIAS'", done: false }, { text: "Criar notebook template", done: false }, { text: "Definir fluxo de produção semanal", done: false }, { text: "Produzir episódio piloto", done: false }, { text: "Publicar regularmente", done: false }] },
    { id: "P8", icon: "🎓", title: "Academia Aumentada", subtitle: "Fluxo de Trabalho Científico com IA", focus: "Pesquisa", status: "Contínuo", priority: "Alta", responsible: "Professora Orientadora", deadline: "13 Semanas", description: "Jornada de 13 semanas capacitando membros com ferramentas de IA.", meta: { phases: [{ name: "Fase 1: Lançamento", weeks: "Semana 1", icon: "🚀" }, { name: "Fase 2: Seminários", weeks: "Semanas 2-5", icon: "🎤" }, { name: "Fase 3: Projeto Prático", weeks: "Semanas 6-11", icon: "🔬" }, { name: "Fase 4: Submissão", weeks: "Semanas 12-13", icon: "📄" }], tools: [{ name: "Elicit", function: "Mapeamento da Literatura" }, { name: "Consensus", function: "Respostas Baseadas em Evidências" }, { name: "SciSpace", function: "Leitor de PDF Interativo" }, { name: "Prism", function: "Extração de Dados para Revisões" }, { name: "Jenni.ai", function: "Assistente de Redação Acadêmica" }] }, tasks: [{ text: "Aula inaugural com orientadora", done: false }, { text: "Seminário 1: Elicit + K-Dense", done: false }, { text: "Seminário 2: SciSpace + NotebookLM", done: false }, { text: "Seminário 3: Prism + Consensus", done: false }, { text: "Seminário 4: Jenni.ai + ChatGPT", done: false }, { text: "Submissão do artigo ao congresso", done: false }] },
    { id: "P9", icon: "🧞", title: "Campanha 'Gênios da IA'", subtitle: "Marketing Interativo", focus: "Mkt/Engajamento", status: "Pontual", priority: "Média", responsible: "Equipe de Marketing", deadline: "4 Semanas", description: "Campanha interativa no Instagram.", meta: { campaignPhases: [{ name: "Fase 1: Teaser", desc: "Cartazes + QR Code", duration: "1 Semana", icon: "📢" }, { name: "Fase 2: Análise", desc: "Processar desejos + Roteirização", duration: "1 Semana", icon: "📊" }, { name: "Fase 3: Realização", desc: "Publicar Reels com soluções", duration: "2 Semanas", icon: "🎬" }] }, tasks: [{ text: "Criar material visual", done: false }, { text: "Criar formulário de coleta", done: false }, { text: "Distribuir cartazes no campus", done: false }, { text: "Analisar e categorizar desejos", done: false }, { text: "Roteirizar vídeos de solução", done: false }, { text: "Produzir e publicar Reels", done: false }] },
    { id: "P10", icon: "💡", title: "Evento NotebookLM", subtitle: "Palestra Prática", focus: "Evento", status: "Pontual", priority: "Média", responsible: "Equipe de Eventos", deadline: "Pontual", description: "Workshop prático ensinando a usar o NotebookLM.", meta: { acts: [{ name: "Ato 1: A Fundação", desc: "Construindo Base de Conhecimento", duration: "15 min", icon: "📚" }, { name: "Ato 2: A Análise", desc: "Leitura Ativa e Síntese", duration: "20 min", icon: "🔍" }, { name: "Ato 3: A Escrita", desc: "Otimizando Redação Acadêmica", duration: "15 min", icon: "✍️" }, { name: "Ato 4: Dicas + Q&A", desc: "Audio Overviews e Perguntas", duration: "10 min", icon: "💬" }] }, tasks: [{ text: "Preparar notebook demonstrativo", done: false }, { text: "Criar material de apoio", done: false }, { text: "Divulgação para comunidade", done: false }, { text: "Executar evento", done: false }] },
];

const events = [
    { title: "Aula Inaugural - Academia Aumentada", start: "2026-03-02", end: "2026-03-02", projIdx: 7, color: 0, desc: "Aula inaugural com a Professora Orientadora" },
    { title: "Seminário 1: Elicit + K-Dense", start: "2026-03-09", end: "2026-03-09", projIdx: 7, color: 1, desc: "Seminário sobre mapeamento da literatura" },
    { title: "Evento O Dilema Digital", start: "2026-04-15", end: "2026-04-15", projIdx: 4, color: 4, desc: "Mesa-redonda sobre ética e IA" },
    { title: "Demo Day - Curso de Agentes", start: "2026-05-20", end: "2026-05-20", projIdx: 2, color: 2, desc: "Apresentações finais do curso" },
    { title: "Lançamento SUS-GPT", start: "2026-06-01", end: "2026-06-05", projIdx: 3, color: 3, desc: "Evento de lançamento do SUS-GPT" },
];

const members = [
    { name: "Yan Maciel Ferreira Leite", icon: "👨‍💻", role: "Membro", projIdxs: [0, 2, 3], activities: [{ projIdx: 0, text: "Criar conteúdo para Instagram", done: true }, { projIdx: 2, text: "Participar das aulas de Agentes", done: false }, { projIdx: 3, text: "Auxiliar no desenvolvimento do SUS-GPT", done: false }] },
    { name: "Flávio Alexandre A. A. Delfino", icon: "👨‍🔬", role: "Membro", projIdxs: [1, 3, 7], activities: [{ projIdx: 1, text: "Testar e analisar IAs", done: true }, { projIdx: 3, text: "Coletar dicionários de variáveis", done: false }, { projIdx: 7, text: "Preparar seminário", done: false }] },
    { name: "Isabela Machado de Souza", icon: "👩‍🎓", role: "Membro", projIdxs: [0, 4, 5], activities: [{ projIdx: 0, text: "Planejar calendário editorial", done: true }, { projIdx: 4, text: "Organizar evento O Dilema Digital", done: false }, { projIdx: 5, text: "Pesquisar diretrizes OMS e AMA", done: false }] },
    { name: "Isabela Gonçalves Caris", icon: "👩‍💼", role: "Membro", projIdxs: [1, 6, 8], activities: [{ projIdx: 1, text: "Preencher painel de análise", done: false }, { projIdx: 6, text: "Produzir episódio do podcast", done: false }, { projIdx: 8, text: "Criar material visual da campanha", done: false }] },
    { name: "Gabriel Rodrigues", icon: "👨‍🎓", role: "Membro", projIdxs: [2, 3, 9], activities: [{ projIdx: 2, text: "Criar primeiro GPT personalizado", done: true }, { projIdx: 3, text: "Construir GPT v1.0", done: false }, { projIdx: 9, text: "Preparar demonstração NotebookLM", done: false }] },
    { name: "Murillo de Miranda", icon: "👨‍💻", role: "Membro", projIdxs: [0, 2, 5], activities: [{ projIdx: 0, text: "Gravar Reels demonstrativos", done: false }, { projIdx: 2, text: "Desenvolver fluxos no N8N", done: false }, { projIdx: 5, text: "Desenvolver website do protocolo", done: false }] },
    { name: "Aurélio Lacerda Sena Junior", icon: "👨‍🔬", role: "Membro", projIdxs: [1, 3, 7], activities: [{ projIdx: 1, text: "Testar Anthropic Claude", done: true }, { projIdx: 3, text: "Criar Manual Mestre", done: false }, { projIdx: 7, text: "Submeter artigo ao congresso", done: false }] },
    { name: "Mariana Barbosa de Figueiró", icon: "👩‍🔬", role: "Membro", projIdxs: [4, 5, 7], activities: [{ projIdx: 4, text: "Elaborar roteiro de discussão", done: false }, { projIdx: 5, text: "Redigir os 5 princípios fundamentais", done: false }, { projIdx: 7, text: "Preparar Seminário 2", done: false }] },
    { name: "Rafael Luiz de Araujo", icon: "👨‍💼", role: "Membro", projIdxs: [0, 6, 8], activities: [{ projIdx: 0, text: "Produzir conteúdo News IA", done: true }, { projIdx: 6, text: "Configurar GPT Repórter LIAS", done: false }, { projIdx: 8, text: "Distribuir cartazes no campus", done: false }] },
    { name: "Guilherme Vilas Boas Ferreira", icon: "👨‍🎓", role: "Membro", projIdxs: [1, 2, 9], activities: [{ projIdx: 1, text: "Desenvolver mini-projeto com IA", done: false }, { projIdx: 2, text: "Criar agente com Antigravity", done: false }, { projIdx: 9, text: "Criar material de apoio", done: false }] },
    { name: "Thiago Souza", icon: "👨‍💻", role: "Membro", projIdxs: [3, 4, 6], activities: [{ projIdx: 3, text: "Testes e refinamento do prompt", done: false }, { projIdx: 4, text: "Preparar demonstração das IAs", done: false }, { projIdx: 6, text: "Definir fluxo de produção semanal", done: false }] },
];

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

async function main() {
    console.log("\n🌱 Populando databases Notion com dados iniciais...\n");

    for (const key of Object.keys(DB)) {
        if (!DB[key]) { console.error(`❌ ${key} não configurado no .env`); process.exit(1); }
    }

    // 1. Criar projetos e mapear IDs
    const projectPageIds = [];
    for (const p of projects) {
        const meta = p.meta ? JSON.stringify(p.meta) : "";
        const page = await notion.pages.create({
            parent: { database_id: DB.PROJECTS },
            properties: {
                "Titulo": t(p.title), "ID Projeto": r(p.id), "Icone": r(p.icon),
                "Subtitulo": r(p.subtitle), "Foco": s(p.focus), "Status": s(p.status),
                "Prioridade": s(p.priority), "Responsavel": r(p.responsible),
                "Prazo": r(p.deadline), "Descricao": r(p.description), "Metadados": r(meta),
            },
        });
        projectPageIds.push(page.id);
        console.log(`  📋 Projeto ${p.id}: ${p.title}`);
        await sleep(350); // Rate limit Notion
    }

    // 2. Criar tarefas
    for (let pi = 0; pi < projects.length; pi++) {
        const proj = projects[pi];
        for (let ti = 0; ti < proj.tasks.length; ti++) {
            const task = proj.tasks[ti];
            await notion.pages.create({
                parent: { database_id: DB.TASKS },
                properties: {
                    "Texto": t(task.text), "Concluida": c(task.done),
                    "Projeto": rel([projectPageIds[pi]]), "Ordem": n(ti),
                },
            });
            await sleep(350);
        }
        console.log(`  ✅ ${proj.tasks.length} tarefas do ${proj.id}`);
    }

    // 3. Criar eventos
    for (const ev of events) {
        await notion.pages.create({
            parent: { database_id: DB.EVENTS },
            properties: {
                "Titulo": t(ev.title), "Data Inicio": d(ev.start),
                "Data Fim": d(ev.end), "Projeto": rel([projectPageIds[ev.projIdx]]),
                "Cor": n(ev.color), "Descricao": r(ev.desc),
            },
        });
        console.log(`  📅 Evento: ${ev.title}`);
        await sleep(350);
    }

    // 4. Criar membros
    const memberPageIds = [];
    for (const m of members) {
        const projIds = m.projIdxs.map(i => projectPageIds[i]);
        const page = await notion.pages.create({
            parent: { database_id: DB.MEMBERS },
            properties: {
                "Nome": t(m.name), "Icone": r(m.icon),
                "Cargo": s(m.role), "Projetos": rel(projIds),
            },
        });
        memberPageIds.push(page.id);
        console.log(`  👤 Membro: ${m.name}`);
        await sleep(350);
    }

    // 5. Criar atividades
    for (let mi = 0; mi < members.length; mi++) {
        const m = members[mi];
        for (const act of m.activities) {
            await notion.pages.create({
                parent: { database_id: DB.ACTIVITIES },
                properties: {
                    "Texto": t(act.text), "Concluida": c(act.done),
                    "Membro": rel([memberPageIds[mi]]),
                    "Projeto": rel([projectPageIds[act.projIdx]]),
                },
            });
            await sleep(350);
        }
        console.log(`  📝 ${m.activities.length} atividades de ${m.name.split(" ")[0]}`);
    }

    // 6. Criar usuário admin
    const adminHash = await bcrypt.hash("lias2026", 10);
    await notion.pages.create({
        parent: { database_id: DB.USERS },
        properties: {
            "Nome": t("Admin"), "Email": e("admin@lias.com"),
            "Senha Hash": r(adminHash), "Criado Em": d(new Date().toISOString().split("T")[0]),
        },
    });
    console.log(`  🔐 Usuário admin criado (admin@lias.com / lias2026)`);

    console.log("\n✅ Seed completo! Todos os dados foram inseridos no Notion.\n");
}

main().catch(err => {
    console.error("❌ Erro:", err.message);
    process.exit(1);
});
