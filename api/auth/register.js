// POST /api/auth/register
const { queryAll, createPage, DB } = require("../_lib/notion");
const { hashPassword, sendJSON, sendError, handleCors } = require("../_lib/auth-utils");
const { userToNotion } = require("../_lib/mappers");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== "POST") return sendError(res, 405, "Método não permitido");

    try {
        const { name, email, password } = req.body || {};
        if (!name || !email || !password) {
            return sendError(res, 400, "Nome, email e senha são obrigatórios");
        }
        if (password.length < 8) {
            return sendError(res, 400, "A senha deve ter no mínimo 8 caracteres");
        }

        // Verificar se email já existe
        const existing = await queryAll(DB.USERS, {
            property: "Email",
            email: { equals: email },
        });

        if (existing.length > 0) {
            return sendError(res, 409, "Este email já está cadastrado");
        }

        // Criar usuário com senha hasheada
        const passwordHash = await hashPassword(password);
        await createPage(DB.USERS, userToNotion({
            name,
            email,
            passwordHash,
            createdAt: new Date().toISOString().split("T")[0],
        }));

        sendJSON(res, 201, { success: true, message: "Conta criada com sucesso" });
    } catch (err) {
        console.error("Register error detailed:", err);
        // Se o erro for do Notion API, tentar extrair mensagem
        const msg = err.body ? JSON.parse(err.body).message : err.message;
        sendError(res, 500, "Erro ao criar conta: " + msg);
    }
};
