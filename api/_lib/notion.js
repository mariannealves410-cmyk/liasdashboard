// ============================================
// Notion Client — Wrapper do SDK
// ============================================
// Este módulo NÃO é exposto como rota (pasta _lib).
// O NOTION_SECRET vive apenas no servidor.

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_SECRET });

// IDs das databases (variáveis de ambiente)
const DB = {
    PROJECTS: process.env.NOTION_DB_PROJECTS,
    TASKS: process.env.NOTION_DB_TASKS,
    MEMBERS: process.env.NOTION_DB_MEMBERS,
    EVENTS: process.env.NOTION_DB_EVENTS,
    ACTIVITIES: process.env.NOTION_DB_ACTIVITIES,
    USERS: process.env.NOTION_DB_USERS,
};

// --- Helpers genéricos ---

/**
 * Consulta todas as páginas de uma database com paginação automática.
 * @param {string} databaseId - ID da database Notion
 * @param {object} [filter] - Filtro Notion (opcional)
 * @param {object[]} [sorts] - Ordenação Notion (opcional)
 * @returns {Promise<object[]>} Array de páginas
 */
async function queryAll(databaseId, filter, sorts) {
    const pages = [];
    let cursor;
    do {
        const res = await notion.databases.query({
            database_id: databaseId,
            filter: filter || undefined,
            sorts: sorts || undefined,
            start_cursor: cursor || undefined,
            page_size: 100,
        });
        pages.push(...res.results);
        cursor = res.has_more ? res.next_cursor : null;
    } while (cursor);
    return pages;
}

/**
 * Cria uma página em uma database.
 */
async function createPage(databaseId, properties) {
    return notion.pages.create({
        parent: { database_id: databaseId },
        properties,
    });
}

/**
 * Atualiza propriedades de uma página.
 */
async function updatePage(pageId, properties) {
    return notion.pages.update({
        page_id: pageId,
        properties,
    });
}

/**
 * "Deleta" uma página (move para lixeira).
 */
async function deletePage(pageId) {
    return notion.pages.update({
        page_id: pageId,
        archived: true,
    });
}

/**
 * Busca uma página pelo ID.
 */
async function getPage(pageId) {
    return notion.pages.retrieve({ page_id: pageId });
}

module.exports = {
    notion,
    DB,
    queryAll,
    createPage,
    updatePage,
    deletePage,
    getPage,
};
