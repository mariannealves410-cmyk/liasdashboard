// scripts/migrate-users-role.js
// Adiciona a propriedade 'Cargo' na database de Usuários e define admin como Editor

require("dotenv/config");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_SECRET });
const USERS_DB_ID = process.env.NOTION_DB_USERS;

async function migrate() {
    console.log("🚀 Iniciando migração de schema da Database de Usuários...");

    if (!USERS_DB_ID) {
        console.error("❌ NOTION_DB_USERS não definido no .env");
        process.exit(1);
    }

    try {
        // 1. Atualizar schema da database para incluir 'Cargo'
        console.log("🛠️ Adicionando propriedade 'Cargo'...");
        await notion.databases.update({
            database_id: USERS_DB_ID,
            properties: {
                "Cargo": {
                    select: {
                        options: [
                            { name: "Editor", color: "red" },
                            { name: "Membro", color: "blue" },
                        ],
                    },
                },
            },
        });
        console.log("✅ Propriedade 'Cargo' adicionada com sucesso.");

        // 2. Buscar usuário Admin e atualizar para 'Editor'
        console.log("🔍 Buscando usuário admin...");
        const response = await notion.databases.query({
            database_id: USERS_DB_ID,
            filter: {
                property: "Email",
                email: { equals: "admin@lias.com" },
            },
        });

        if (response.results.length > 0) {
            const adminPage = response.results[0];
            console.log(`👤 Admin encontrado (${adminPage.id}). Atualizando para Editor...`);
            await notion.pages.update({
                page_id: adminPage.id,
                properties: {
                    "Cargo": { select: { name: "Editor" } },
                },
            });
            console.log("✅ Admin atualizado com privilégios de Editor.");
        } else {
            console.log("⚠️ Usuário admin@lias.com não encontrado. Pulei etapa.");
        }

        // 3. Atualizar outros usuários para 'Membro' (se houver)
        // Opcional para agora, pois só temos o admin no seed oficial.

        console.log("\n🎉 Migração concluída com sucesso!");

    } catch (error) {
        console.error("❌ Erro na migração:", error.message);
        if (error.body) console.error(JSON.stringify(error.body, null, 2));
    }
}

migrate();
