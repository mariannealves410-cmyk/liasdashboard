// api/auth-register.js
const { supabase } = require("./_lib/supabase");
const { hashPassword, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

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

        // 1. Verificar se email já existe no Supabase
        const { data: existing, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existing) {
            return sendError(res, 409, "Este email já está cadastrado");
        }

        // 2. Criar usuário com senha hasheada no Supabase
        const passwordHash = await hashPassword(password);
        const { error: insertError } = await supabase
            .from('users')
            .insert({
                name,
                email,
                password_hash: passwordHash,
                role: 'Membro', // Papel padrão para novos registros
                created_at: new Date().toISOString()
            });

        if (insertError) throw insertError;

        sendJSON(res, 201, { success: true, message: "Conta criada com sucesso" });
    } catch (err) {
        console.error("Register error detailed:", err);
        sendError(res, 500, "Erro ao criar conta: " + err.message);
    }
};
