// api/activities.js
const { supabase } = require("./_lib/supabase");
const { supabaseToActivity } = require("./_lib/supabase-mappers");
const { requireAuth, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    const user = requireAuth(req, res);
    if (!user) return;

    try {
        const { id } = req.query; // UUID da atividade

        if (req.method === "GET") {
            const { memberId } = req.query;
            let query = supabase.from('activities').select('*');
            if (memberId) query = query.eq('member_id', memberId);

            const { data: activities, error } = await query;
            if (error) throw error;
            return sendJSON(res, 200, activities.map(supabaseToActivity));
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.text) return sendError(res, 400, "Texto é obrigatório");

            const { data: activity, error } = await supabase
                .from('activities')
                .insert({
                    member_id: data.member_id || data.memberId,
                    project_id: data.project_id || data.projectId,
                    text: data.text,
                    done: data.done || false
                })
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 201, supabaseToActivity(activity));
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            if (data.text !== undefined) updateData.text = data.text;
            if (data.done !== undefined) updateData.done = data.done;
            if (data.project_id !== undefined || data.projectId !== undefined) {
                updateData.project_id = data.project_id || data.projectId;
            }
            if (data.member_id !== undefined || data.memberId !== undefined) {
                updateData.member_id = data.member_id || data.memberId;
            }

            const { data: activity, error } = await supabase
                .from('activities')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, supabaseToActivity(activity));
        }

        if (req.method === "DELETE") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const { error } = await supabase.from('activities').delete().eq('id', id);
            if (error) throw error;
            return sendJSON(res, 200, { success: true });
        }

        sendError(res, 405, "Método não permitido");

    } catch (err) {
        console.error("Activities API Error:", err);
        sendError(res, 500, err.message);
    }
};
