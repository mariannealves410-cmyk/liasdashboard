// GET /api/auth/me
const { requireAuth, sendJSON, sendError, handleCors } = require("../_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== "GET") return sendError(res, 405, "Método não permitido");

    const user = requireAuth(req, res);
    if (!user) return; // 401 já enviado

    sendJSON(res, 200, {
        userId: user.userId,
        email: user.email,
        name: user.name,
    });
};
