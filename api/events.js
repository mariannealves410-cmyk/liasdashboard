// api/events.js
const { supabase } = require("./_lib/supabase");
const { requireAuth, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    const user = requireAuth(req, res);
    if (!user) return;

    try {
        const { id } = req.query; // UUID do evento

        if (req.method === "GET") {
            if (id) {
                const { data: event, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error || !event) return sendError(res, 404, "Evento não encontrado");
                return sendJSON(res, 200, event);
            } else {
                const { data: events, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('start_date', { ascending: true });

                if (error) throw error;
                return sendJSON(res, 200, events);
            }
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.title) return sendError(res, 400, "Título é obrigatório");

            const { data: event, error } = await supabase
                .from('events')
                .insert({
                    title: data.title,
                    start_date: data.start_date || data.startDate,
                    end_date: data.end_date || data.endDate,
                    project_id: data.project_id || data.projectId,
                    color_index: data.color_index || data.colorIndex || 0,
                    description: data.description
                })
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 201, event);
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            const keys = ["title", "start_date", "startDate", "end_date", "endDate", "project_id", "projectId", "color_index", "colorIndex", "description"];
            keys.forEach(k => { if (data[k] !== undefined) updateData[k] = data[k]; });

            // Normalizar campos date/color
            if (updateData.startDate) { updateData.start_date = updateData.startDate; delete updateData.startDate; }
            if (updateData.endDate) { updateData.end_date = updateData.endDate; delete updateData.endDate; }
            if (updateData.projectId) { updateData.project_id = updateData.projectId; delete updateData.projectId; }
            if (updateData.colorIndex) { updateData.color_index = updateData.colorIndex; delete updateData.colorIndex; }

            const { data: event, error } = await supabase
                .from('events')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, event);
        }

        if (req.method === "DELETE") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const { error } = await supabase.from('events').delete().eq('id', id);
            if (error) throw error;
            return sendJSON(res, 200, { success: true });
        }

        sendError(res, 405, "Método não permitido");

    } catch (err) {
        console.error("Events API Error:", err);
        sendError(res, 500, err.message);
    }
};
