// GET /api/auth-me
const { verifyToken, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== "GET") return sendError(res, 405, "Método não permitido");

    try {
        const user = verifyToken(req);
        if (!user) return sendError(res, 401, "Não autorizado");

        sendJSON(res, 200, {
            success: true,
            user: {
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.role || "Membro"
            }
        });
    } catch (err) {
        console.error("Auth Me error:", err);
        sendError(res, 500, "Erro interno do servidor");
    }
};
