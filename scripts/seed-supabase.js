// scripts/seed-supabase.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Mock window for data.js
global.window = {};
require('../data.js');

const { initialProjects, initialEvents, initialMembers } = global.window;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
    console.log("Iniciando seed no Supabase...");

    // Limpar dados existentes (opcional, cuidado!)
    // const { error: deleteError } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 1. Inserir Projetos
    console.log(`Inserindo ${initialProjects.length} projetos...`);
    for (const p of initialProjects) {
        const { data: project, error } = await supabase.from('projects').insert({
            project_id: p.id,
            icon: p.icon,
            title: p.title,
            subtitle: p.subtitle,
            focus: p.focus,
            status: p.status,
            priority: p.priority,
            responsible: p.responsible,
            deadline: p.deadline,
            description: p.description,
            metadata: {
                pillars: p.pillars,
                groups: p.groups,
                blocks: p.blocks,
                months: p.months,
                acts: p.acts,
                principles: p.principles,
                chapters: p.chapters,
                workflow: p.workflow,
                phases: p.phases,
                tools: p.tools,
                campaignPhases: p.campaignPhases
            }
        }).select().single();

        if (error) {
            console.error(`Erro ao inserir projeto ${p.title}:`, error);
            continue;
        }

        // 2. Inserir Tarefas do Projeto
        if (p.tasks && p.tasks.length > 0) {
            const tasksToInsert = p.tasks.map((t, idx) => ({
                project_id: project.id,
                text: t.text,
                done: t.done,
                order_num: idx
            }));
            const { error: taskError } = await supabase.from('tasks').insert(tasksToInsert);
            if (taskError) console.error(`Erro ao inserir tarefas de ${p.title}:`, taskError);
        }
    }

    // 3. Inserir Membros
    console.log(`Inserindo ${initialMembers.length} membros...`);
    const projectMap = {}; // Busca IDs reais do Supabase pelo project_id (ex: P1)
    const { data: allProjects } = await supabase.from('projects').select('id, project_id');
    allProjects.forEach(p => projectMap[p.project_id] = p.id);

    for (const m of initialMembers) {
        const memberProjectIds = m.projectIds ? m.projectIds.map(pid => projectMap[pid]).filter(id => !!id) : [];
        const { data: member, error } = await supabase.from('members').insert({
            name: m.name,
            icon: m.icon,
            role: m.role,
            project_ids: memberProjectIds
        }).select().single();

        if (error) {
            console.error(`Erro ao inserir membro ${m.name}:`, error);
            continue;
        }

        // 4. Inserir Atividades do Membro
        if (m.activities && m.activities.length > 0) {
            const activitiesToInsert = m.activities.map(a => ({
                text: a.text,
                done: a.done,
                member_id: member.id,
                project_id: projectMap[a.projectId] || null
            }));
            const { error: actError } = await supabase.from('activities').insert(activitiesToInsert);
            if (actError) console.error(`Erro ao inserir atividades de ${m.name}:`, actError);
        }
    }

    // 5. Inserir Eventos
    console.log(`Inserindo ${initialEvents.length} eventos...`);
    for (const e of initialEvents) {
        const { error } = await supabase.from('events').insert({
            title: e.title,
            start_date: e.startDate,
            end_date: e.endDate,
            project_id: projectMap[e.projectId] || null,
            color_index: e.colorIndex,
            description: e.description
        });
        if (error) console.error(`Erro ao inserir evento ${e.title}:`, error);
    }

    // 6. Inserir Usuário Admin Padrão
    console.log("Inserindo usuário admin...");
    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash('lias2026', 10);
    const { error: userError } = await supabase.from('users').insert({
        name: 'Admin',
        email: 'admin@lias.com',
        password_hash: passwordHash,
        role: 'Editor'
    });
    if (userError && userError.code !== '23505') console.error("Erro ao inserir admin:", userError);

    console.log("Seed concluído com sucesso!");
}

seed().catch(err => {
    console.error("Erro fatal no seed:", err);
    process.exit(1);
});
