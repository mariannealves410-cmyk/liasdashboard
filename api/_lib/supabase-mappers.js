// api/_lib/supabase-mappers.js

function supabaseToEvent(e) {
    if (!e) return null;
    return {
        id: e.id,
        title: e.title,
        description: e.description,
        startDate: e.start_date,
        endDate: e.end_date,
        projectId: e.project_id,
        colorIndex: e.color_index,
        created_at: e.created_at
    };
}

function supabaseToProject(p) {
    if (!p) return null;
    return {
        ...p,
        // No frontend, o 'id' que aparece (ex: P1) é o project_id
        // Mas precisamos manter o UUID para operações de update/delete.
        // Vamos manter o id como UUID e o project_id como o código visível.
        tasks: (p.tasks || []).map(supabaseToTask)
    };
}

function supabaseToTask(t) {
    if (!t) return null;
    return {
        id: t.id,
        projectId: t.project_id,
        text: t.text,
        done: t.done,
        orderNum: t.order_num,
        created_at: t.created_at
    };
}

function supabaseToMember(m) {
    if (!m) return null;
    return {
        id: m.id,
        name: m.name,
        icon: m.icon,
        role: m.role,
        projectIds: m.project_ids,
        activities: (m.activities || []).map(supabaseToActivity),
        created_at: m.created_at
    };
}

function supabaseToActivity(a) {
    if (!a) return null;
    return {
        id: a.id,
        text: a.text,
        done: a.done,
        memberId: a.member_id,
        projectId: a.project_id,
        created_at: a.created_at
    };
}

module.exports = {
    supabaseToEvent,
    supabaseToProject,
    supabaseToTask,
    supabaseToMember,
    supabaseToActivity
};
