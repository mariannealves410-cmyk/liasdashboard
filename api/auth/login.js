// POST /api/auth/login
const { queryAll, DB } = require("../_lib/notion");
const { verifyPassword, generateToken, sendJSON, sendError, handleCors } = require("../_lib/auth-utils");
const { notionToUser } = require("../_lib/mappers");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== "POST") return sendError(res, 405, "Método não permitido");

    try {
        const { email, password } = req.body || {};
        if (!email || !password) return sendError(res, 400, "Email e senha são obrigatórios");

        // 1. Verificar Admin
        if (email === "admin@lias.com") {
            const pages = await queryAll(DB.USERS, {
                property: "Email",
                email: { equals: email },
            });

            if (pages.length > 0) {
                const user = notionToUser(pages[0]);
                const valid = await verifyPassword(password, user.passwordHash);
                if (valid) {
                    const token = generateToken({
                        userId: user._notionId,
                        email: user.email,
                        name: user.name,
                        role: "Editor"
                    });
                    return sendJSON(res, 200, {
                        success: true,
                        token,
                        name: user.name,
                        email: user.email,
                        role: "Editor"
                    });
                }
            }
            return sendError(res, 401, "Senha de administrador incorreta.");
        }

        // 2. Verificar Membro (Senha Fixa)
        if (password === "membro2026") {
            const token = generateToken({
                userId: email,
                email: email,
                name: email.split("@")[0],
                role: "Membro"
            });
            return sendJSON(res, 200, {
                success: true,
                token,
                name: email.split("@")[0],
                email: email,
                role: "Membro"
            });
        }

        return sendError(res, 401, "Credenciais inválidas. Membros: use a senha padrão.");

    } catch (err) {
        console.error("Login error:", err);
        sendError(res, 500, "Erro interno do servidor");
    }
};
