// ============================================
// Mappers — Notion Page ↔ Objetos do Domínio
// ============================================
// Converte entre o formato de propriedades do Notion
// e os objetos usados pelo frontend.

// --- Helpers para extrair valores de propriedades Notion ---

function getTitle(props, key) {
    const p = props[key];
    if (!p || p.type !== "title" || !p.title.length) return "";
    return p.title.map(t => t.plain_text).join("");
}

function getRichText(props, key) {
    const p = props[key];
    if (!p || p.type !== "rich_text" || !p.rich_text.length) return "";
    return p.rich_text.map(t => t.plain_text).join("");
}

function getSelect(props, key) {
    const p = props[key];
    if (!p || p.type !== "select" || !p.select) return "";
    return p.select.name;
}

function getCheckbox(props, key) {
    const p = props[key];
    if (!p || p.type !== "checkbox") return false;
    return p.checkbox;
}

function getNumber(props, key) {
    const p = props[key];
    if (!p || p.type !== "number") return 0;
    return p.number || 0;
}

function getDate(props, key) {
    const p = props[key];
    if (!p || p.type !== "date" || !p.date) return null;
    return p.date.start || null;
}

function getDateEnd(props, key) {
    const p = props[key];
    if (!p || p.type !== "date" || !p.date) return null;
    return p.date.end || p.date.start || null;
}

function getEmail(props, key) {
    const p = props[key];
    if (!p || p.type !== "email") return "";
    return p.email || "";
}

function getRelationIds(props, key) {
    const p = props[key];
    if (!p || p.type !== "relation") return [];
    return p.relation.map(r => r.id);
}

// --- Helpers para montar propriedades Notion ---

function toTitle(value) {
    return { title: [{ text: { content: String(value || "") } }] };
}

function toRichText(value) {
    return { rich_text: [{ text: { content: String(value || "") } }] };
}

function toSelect(value) {
    if (!value) return { select: null };
    return { select: { name: String(value) } };
}

function toCheckbox(value) {
    return { checkbox: Boolean(value) };
}

function toNumber(value) {
    return { number: Number(value) || 0 };
}

function toDate(start, end) {
    if (!start) return { date: null };
    const d = { start };
    if (end && end !== start) d.end = end;
    return { date: d };
}

function toEmail(value) {
    return { email: value || null };
}

function toRelation(ids) {
    return { relation: (ids || []).map(id => ({ id })) };
}

// ============================================
// PROJETO
// ============================================

function notionToProject(page) {
    const p = page.properties;
    let metadados = {};
    try {
        const raw = getRichText(p, "Metadados");
        if (raw) metadados = JSON.parse(raw);
    } catch { }

    return {
        _notionId: page.id,
        id: getRichText(p, "ID Projeto") || page.id.slice(0, 4),
        icon: getRichText(p, "Icone") || "📁",
        title: getTitle(p, "Titulo"),
        subtitle: getRichText(p, "Subtitulo"),
        focus: getSelect(p, "Foco"),
        status: getSelect(p, "Status"),
        priority: getSelect(p, "Prioridade"),
        responsible: getRichText(p, "Responsavel"),
        deadline: getRichText(p, "Prazo"),
        description: getRichText(p, "Descricao"),
        // Dados extras armazenados como JSON
        pillars: metadados.pillars || undefined,
        groups: metadados.groups || undefined,
        blocks: metadados.blocks || undefined,
        months: metadados.months || undefined,
        acts: metadados.acts || undefined,
        principles: metadados.principles || undefined,
        chapters: metadados.chapters || undefined,
        workflow: metadados.workflow || undefined,
        phases: metadados.phases || undefined,
        tools: metadados.tools || undefined,
        campaignPhases: metadados.campaignPhases || undefined,
    };
}

function projectToNotion(data) {
    // Metadados extras como JSON
    const metadados = {};
    const extraKeys = [
        "pillars", "groups", "blocks", "months", "acts",
        "principles", "chapters", "workflow", "phases", "tools", "campaignPhases"
    ];
    for (const k of extraKeys) {
        if (data[k]) metadados[k] = data[k];
    }

    return {
        "Titulo": toTitle(data.title),
        "ID Projeto": toRichText(data.id),
        "Icone": toRichText(data.icon),
        "Subtitulo": toRichText(data.subtitle),
        "Foco": toSelect(data.focus),
        "Status": toSelect(data.status),
        "Prioridade": toSelect(data.priority),
        "Responsavel": toRichText(data.responsible),
        "Prazo": toRichText(data.deadline),
        "Descricao": toRichText(data.description),
        "Metadados": toRichText(Object.keys(metadados).length ? JSON.stringify(metadados) : ""),
    };
}

// ============================================
// TAREFA
// ============================================

function notionToTask(page) {
    const p = page.properties;
    return {
        _notionId: page.id,
        text: getTitle(p, "Texto"),
        done: getCheckbox(p, "Concluida"),
        projectId: getRelationIds(p, "Projeto")[0] || null,
        order: getNumber(p, "Ordem"),
    };
}

function taskToNotion(data, projectPageId) {
    const props = {
        "Texto": toTitle(data.text),
        "Concluida": toCheckbox(data.done),
        "Ordem": toNumber(data.order || 0),
    };
    if (projectPageId) {
        props["Projeto"] = toRelation([projectPageId]);
    }
    return props;
}

// ============================================
// MEMBRO
// ============================================

function notionToMember(page) {
    const p = page.properties;
    return {
        _notionId: page.id,
        id: page.id,
        name: getTitle(p, "Nome"),
        icon: getRichText(p, "Icone") || "👤",
        role: getSelect(p, "Cargo") || "Membro",
        projectIds: getRelationIds(p, "Projetos"),
    };
}

function memberToNotion(data) {
    const props = {
        "Nome": toTitle(data.name),
        "Icone": toRichText(data.icon),
        "Cargo": toSelect(data.role),
    };
    if (data.projectIds) {
        props["Projetos"] = toRelation(data.projectIds);
    }
    return props;
}

// ============================================
// EVENTO
// ============================================

function notionToEvent(page) {
    const p = page.properties;
    return {
        _notionId: page.id,
        id: page.id,
        title: getTitle(p, "Titulo"),
        startDate: getDate(p, "Data Inicio"),
        endDate: getDateEnd(p, "Data Fim") || getDate(p, "Data Inicio"),
        projectId: getRelationIds(p, "Projeto")[0] || null,
        colorIndex: getNumber(p, "Cor"),
        description: getRichText(p, "Descricao"),
    };
}

function eventToNotion(data) {
    const props = {
        "Titulo": toTitle(data.title),
        "Data Inicio": toDate(data.startDate),
        "Data Fim": toDate(data.endDate),
        "Cor": toNumber(data.colorIndex || 0),
        "Descricao": toRichText(data.description),
    };
    if (data.projectId) {
        props["Projeto"] = toRelation([data.projectId]);
    }
    return props;
}

// ============================================
// ATIVIDADE
// ============================================

function notionToActivity(page) {
    const p = page.properties;
    return {
        _notionId: page.id,
        id: page.id,
        text: getTitle(p, "Texto"),
        done: getCheckbox(p, "Concluida"),
        memberId: getRelationIds(p, "Membro")[0] || null,
        projectId: getRelationIds(p, "Projeto")[0] || null,
    };
}

function activityToNotion(data) {
    const props = {
        "Texto": toTitle(data.text),
        "Concluida": toCheckbox(data.done),
    };
    if (data.memberId) props["Membro"] = toRelation([data.memberId]);
    if (data.projectId) props["Projeto"] = toRelation([data.projectId]);
    return props;
}

// ============================================
// USUÁRIO (Auth)
// ============================================

function notionToUser(page) {
    const p = page.properties;
    return {
        _notionId: page.id,
        name: getTitle(p, "Nome"),
        email: getEmail(p, "Email"),
        passwordHash: getRichText(p, "Senha Hash"),
        createdAt: getDate(p, "Criado Em"),
    };
}

function userToNotion(data) {
    return {
        "Nome": toTitle(data.name),
        "Email": toEmail(data.email),
        "Senha Hash": toRichText(data.passwordHash),
        "Criado Em": toDate(data.createdAt || new Date().toISOString().split("T")[0]),
    };
}

module.exports = {
    // Projeto
    notionToProject,
    projectToNotion,
    // Tarefa
    notionToTask,
    taskToNotion,
    // Membro
    notionToMember,
    memberToNotion,
    // Evento
    notionToEvent,
    eventToNotion,
    // Atividade
    notionToActivity,
    activityToNotion,
    // Usuário
    notionToUser,
    userToNotion,
    // Helpers
    getTitle,
    getRichText,
    getSelect,
    getCheckbox,
    getNumber,
    getDate,
    getEmail,
    getRelationIds,
    toTitle,
    toRichText,
    toSelect,
    toCheckbox,
    toNumber,
    toDate,
    toEmail,
    toRelation,
};
