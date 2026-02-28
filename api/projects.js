// api/projects.js
const { supabase } = require("./_lib/supabase");
const { requireAuth, sendJSON, sendError, handleCors } = require("./_lib/auth-utils");

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    const user = requireAuth(req, res);
    if (!user) return;

    try {
        const { id } = req.query; // UUID do projeto

        if (req.method === "GET") {
            if (id) {
                // Detalhe do projeto + suas tarefas
                const { data: project, error } = await supabase
                    .from('projects')
                    .select('*, tasks(*)')
                    .eq('id', id)
                    .single();

                if (error || !project) return sendError(res, 404, "Projeto não encontrado");

                // Mapear order_num para manter compatibilidade se necessário
                project.tasks = (project.tasks || []).sort((a, b) => a.order_num - b.order_num);

                return sendJSON(res, 200, project);
            } else {
                // Lista de todos os projetos + todas as tarefas
                const { data: projects, error } = await supabase
                    .from('projects')
                    .select('*, tasks(*)');

                if (error) throw error;

                // Ordenar tarefas dentro de cada projeto
                projects.forEach(p => {
                    p.tasks = (p.tasks || []).sort((a, b) => a.order_num - b.order_num);
                });

                return sendJSON(res, 200, projects);
            }
        }

        if (req.method === "POST") {
            const data = req.body || {};
            if (!data.title) return sendError(res, 400, "Título é obrigatório");

            const insertData = {
                project_id: data.project_id || data.id,
                icon: data.icon,
                title: data.title,
                subtitle: data.subtitle,
                focus: data.focus,
                status: data.status,
                priority: data.priority,
                responsible: data.responsible,
                deadline: data.deadline,
                description: data.description,
                metadata: data.metadata || {}
            };

            const { data: project, error } = await supabase
                .from('projects')
                .insert(insertData)
                .select()
                .single();

            if (error) throw error;
            project.tasks = [];
            return sendJSON(res, 201, project);
        }

        if (req.method === "PUT") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const data = req.body || {};

            const updateData = {};
            const keys = ["icon", "title", "subtitle", "focus", "status", "priority", "responsible", "deadline", "description", "metadata"];
            keys.forEach(k => { if (data[k] !== undefined) updateData[k] = data[k]; });

            const { data: project, error } = await supabase
                .from('projects')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return sendJSON(res, 200, project);
        }

        if (req.method === "DELETE") {
            if (!id) return sendError(res, 400, "ID obrigatório");
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            return sendJSON(res, 200, { success: true });
        }

        sendError(res, 405, "Método não permitido");

    } catch (err) {
        console.error("Projects API Error:", err);
        sendError(res, 500, "Erro interno: " + err.message);
    }
};
