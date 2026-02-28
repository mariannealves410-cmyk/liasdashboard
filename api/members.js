// api/members.js
const { supabase } = require("./_lib/supabase");
const { requireAuth, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    const user = requireAuth(req, res);
    if (!user) return;

    try {
        const { id } = req.query; // UUID do membro

        if (req.method === "GET") {
            if (id) {
                const { data: member, error } = await supabase
                    .from('members')
                    .select('*, activities(*)')
                    .eq('id', id)
                    .single();

                if (error || !member) return sendError(res, 404, "Membro não encontrado");
                return sendJSON(res, 200, member);
            } else {
                const { data: members, error } = await supabase
                    .from('members')
                    .select('*, activities(*)');

                if (error) throw error;
                return sendJSON(res, 200, members);
            }
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.name) return sendError(res, 400, "Nome é obrigatório");

            const { data: member, error } = await supabase
                .from('members')
                .insert({
                    name: data.name,
                    icon: data.icon || '👤',
                    role: data.role || 'Membro',
                    project_ids: data.project_ids || data.projectIds || []
                })
                .select()
                .single();

            if (error) throw error;
            member.activities = [];
            return sendJSON(res, 201, member);
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            if (data.name !== undefined) updateData.name = data.name;
            if (data.icon !== undefined) updateData.icon = data.icon;
            if (data.role !== undefined) updateData.role = data.role;
            if (data.project_ids !== undefined || data.projectIds !== undefined) {
                updateData.project_ids = data.project_ids || data.projectIds;
            }

            const { data: member, error } = await supabase
                .from('members')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, member);
        }

        if (req.method === "DELETE") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const { error } = await supabase.from('members').delete().eq('id', id);
            if (error) throw error;
            return sendJSON(res, 200, { success: true });
        }

        sendError(res, 405, "Método não permitido");

    } catch (err) {
        console.error("Members API Error:", err);
        sendError(res, 500, err.message);
    }
};
