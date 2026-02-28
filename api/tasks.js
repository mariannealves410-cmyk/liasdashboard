// api/tasks.js
const { supabase } = require("./_lib/supabase");
const { requireAuth, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    const user = requireAuth(req, res);
    if (!user) return;

    try {
        const { id } = req.query; // UUID da tarefa

        if (req.method === "GET") {
            const { projectId } = req.query;
            let query = supabase.from('tasks').select('*');
            if (projectId) query = query.eq('project_id', projectId);

            const { data: tasks, error } = await query.order('order_num', { ascending: true });
            if (error) throw error;
            return sendJSON(res, 200, tasks);
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.text) return sendError(res, 400, "Texto é obrigatório");

            const { data: task, error } = await supabase
                .from('tasks')
                .insert({
                    project_id: data.project_id || data.projectId,
                    text: data.text,
                    done: data.done || false,
                    order_num: data.order_num || 0
                })
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 201, task);
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            if (data.text !== undefined) updateData.text = data.text;
            if (data.done !== undefined) updateData.done = data.done;
            if (data.order_num !== undefined) updateData.order_num = data.order_num;
            if (data.project_id !== undefined || data.projectId !== undefined) {
                updateData.project_id = data.project_id || data.projectId;
            }

            const { data: task, error } = await supabase
                .from('tasks')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, task);
        }

        if (req.method === "DELETE") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
            return sendJSON(res, 200, { success: true });
        }

        sendError(res, 405, "Método não permitido");

    } catch (err) {
        console.error("Tasks API Error:", err);
        sendError(res, 500, err.message);
    }
};
