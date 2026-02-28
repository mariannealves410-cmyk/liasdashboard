// api/auth-login.js
const { supabase } = require("./_lib/supabase");
const { verifyPassword, generateToken, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== "POST") return sendError(res, 405, "Método não permitido");

    try {
        const { email, password } = req.body || {};
        if (!email || !password) return sendError(res, 400, "Email e senha são obrigatórios");

        // 1. Tentar buscar o usuário no Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (user) {
            const valid = await verifyPassword(password, user.password_hash);
            if (valid) {
                const token = generateToken({
                    userId: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role || "Membro"
                });
                return sendJSON(res, 200, {
                    success: true,
                    token,
                    name: user.name,
                    email: user.email,
                    role: user.role || "Membro"
                });
            }
            // Se for admin e senha errada, bloqueia
            if (email === "admin@lias.com") {
                return sendError(res, 401, "Senha de administrador incorreta.");
            }
        }

        // 2. Fallback para senha de Membro (se não for admin cadastrado)
        if (password === "membro2026") {
            const token = generateToken({
                userId: email, // ID virtual
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
