const { supabase } = require("./_lib/supabase");
const { supabaseToEvent } = require("./_lib/supabase-mappers");
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
                return sendJSON(res, 200, supabaseToEvent(event));
            } else {
                const { data: events, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('start_date', { ascending: true });

                if (error) throw error;
                return sendJSON(res, 200, events.map(supabaseToEvent));
            }
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.title) return sendError(res, 400, "Título é obrigatório");

            // Converter strings vazias em null para campos UUID
            const projectId = data.project_id || data.projectId || null;

            const { data: event, error } = await supabase
                .from('events')
                .insert({
                    title: data.title,
                    start_date: data.start_date || data.startDate,
                    end_date: data.end_date || data.endDate,
                    project_id: projectId || null,
                    color_index: data.color_index ?? data.colorIndex ?? 0,
                    description: data.description || null
                })
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 201, supabaseToEvent(event));
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            if (data.title !== undefined) updateData.title = data.title;
            if (data.description !== undefined) updateData.description = data.description || null;
            if (data.start_date || data.startDate) updateData.start_date = data.start_date || data.startDate;
            if (data.end_date || data.endDate) updateData.end_date = data.end_date || data.endDate;
            if (data.color_index !== undefined || data.colorIndex !== undefined) updateData.color_index = data.color_index ?? data.colorIndex ?? 0;

            // Converter string vazia para null em campos UUID
            if (data.project_id !== undefined || data.projectId !== undefined) {
                const pid = data.project_id || data.projectId;
                updateData.project_id = pid || null;
            }

            const { data: event, error } = await supabase
                .from('events')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, supabaseToEvent(event));
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
