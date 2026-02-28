// ============================================
// Setup Notion — Cria as databases necessárias
// ============================================
// Uso: node scripts/setup-notion.js
//
// Pré-requisitos:
// 1. Criar uma Integration no Notion (https://www.notion.so/my-integrations)
// 2. Copiar o Internal Integration Token
// 3. Colocar em .env como NOTION_SECRET
// 4. Criar uma página no Notion e compartilhar com a integration
// 5. Colocar o ID da página como NOTION_PARENT_PAGE_ID no .env
//
// Este script cria 6 databases na página pai.

require("dotenv/config");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_SECRET });
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID;

async function createDatabase(title, icon, properties) {
    const res = await notion.databases.create({
        parent: { type: "page_id", page_id: PARENT_PAGE_ID },
        title: [{ type: "text", text: { content: title } }],
        icon: { type: "emoji", emoji: icon },
        properties,
    });
    console.log(`✅ Database "${title}" criada: ${res.id}`);
    return res.id;
}

async function main() {
    console.log("\n🚀 Criando databases Notion para LIAS Dashboard...\n");

    if (!process.env.NOTION_SECRET) {
        console.error("❌ NOTION_SECRET não encontrado. Crie um arquivo .env");
        process.exit(1);
    }
    if (!PARENT_PAGE_ID) {
        console.error("❌ NOTION_PARENT_PAGE_ID não encontrado. Adicione ao .env");
        process.exit(1);
    }

    const ids = {};

    // 1. Projetos
    ids.PROJECTS = await createDatabase("LIAS - Projetos", "📋", {
        "Titulo": { title: {} },
        "ID Projeto": { rich_text: {} },
        "Icone": { rich_text: {} },
        "Subtitulo": { rich_text: {} },
        "Foco": {
            select: {
                options: [
                    { name: "Comunicação", color: "green" },
                    { name: "Pesquisa", color: "blue" },
                    { name: "Ensino", color: "purple" },
                    { name: "Extensão", color: "orange" },
                    { name: "Evento", color: "pink" },
                    { name: "Mkt/Engajamento", color: "red" },
                    { name: "Pesquisa Aplicada", color: "blue" },
                    { name: "Desenvolvimento", color: "green" },
                    { name: "Ética e Governança", color: "yellow" },
                    { name: "Impacto Social", color: "purple" },
                    { name: "Engajamento", color: "pink" },
                    { name: "Educação", color: "green" },
                ],
            },
        },
        "Status": {
            select: {
                options: [
                    { name: "Planejamento", color: "yellow" },
                    { name: "Em Andamento", color: "green" },
                    { name: "Em Revisão", color: "blue" },
                    { name: "Concluído", color: "green" },
                    { name: "Contínuo", color: "green" },
                    { name: "Semestral", color: "blue" },
                    { name: "Semanal", color: "green" },
                    { name: "Pontual", color: "pink" },
                    { name: "8 Aulas", color: "purple" },
                    { name: "4 Meses", color: "yellow" },
                ],
            },
        },
        "Prioridade": {
            select: {
                options: [
                    { name: "Alta", color: "red" },
                    { name: "Média", color: "yellow" },
                    { name: "Normal", color: "green" },
                ],
            },
        },
        "Responsavel": { rich_text: {} },
        "Prazo": { rich_text: {} },
        "Descricao": { rich_text: {} },
        "Metadados": { rich_text: {} },
    });

    // 2. Tarefas
    ids.TASKS = await createDatabase("LIAS - Tarefas", "✅", {
        "Texto": { title: {} },
        "Concluida": { checkbox: {} },
        "Projeto": { relation: { database_id: ids.PROJECTS, single_property: {} } },
        "Ordem": { number: {} },
    });

    // 3. Membros
    ids.MEMBERS = await createDatabase("LIAS - Membros", "👥", {
        "Nome": { title: {} },
        "Icone": { rich_text: {} },
        "Cargo": {
            select: {
                options: [
                    { name: "Membro", color: "blue" },
                    { name: "Coordenador", color: "green" },
                    { name: "Orientador", color: "purple" },
                ],
            },
        },
        "Projetos": { relation: { database_id: ids.PROJECTS, single_property: {} } },
    });

    // 4. Atividades
    ids.ACTIVITIES = await createDatabase("LIAS - Atividades", "📝", {
        "Texto": { title: {} },
        "Concluida": { checkbox: {} },
        "Membro": { relation: { database_id: ids.MEMBERS, single_property: {} } },
        "Projeto": { relation: { database_id: ids.PROJECTS, single_property: {} } },
    });

    // 5. Eventos
    ids.EVENTS = await createDatabase("LIAS - Eventos", "📅", {
        "Titulo": { title: {} },
        "Data Inicio": { date: {} },
        "Data Fim": { date: {} },
        "Projeto": { relation: { database_id: ids.PROJECTS, single_property: {} } },
        "Cor": { number: {} },
        "Descricao": { rich_text: {} },
    });

    // 6. Usuarios
    ids.USERS = await createDatabase("LIAS - Usuarios", "🔐", {
        "Nome": { title: {} },
        "Email": { email: {} },
        "Senha Hash": { rich_text: {} },
        "Criado Em": { date: {} },
    });

    console.log("\n✅ Todas as databases foram criadas!\n");
    console.log("Adicione os IDs abaixo ao seu .env:\n");
    console.log(`NOTION_DB_PROJECTS=${ids.PROJECTS}`);
    console.log(`NOTION_DB_TASKS=${ids.TASKS}`);
    console.log(`NOTION_DB_MEMBERS=${ids.MEMBERS}`);
    console.log(`NOTION_DB_EVENTS=${ids.EVENTS}`);
    console.log(`NOTION_DB_ACTIVITIES=${ids.ACTIVITIES}`);
    console.log(`NOTION_DB_USERS=${ids.USERS}`);
}

main().catch(err => {
    console.error("❌ Erro:", err.message);
    process.exit(1);
});
