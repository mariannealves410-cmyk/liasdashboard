// Projects Page - Dashboard view with full CRUD

const ProjectFormModal = ({ isOpen, onClose, onSave, editProject }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [icon, setIcon] = useState("📋");
    const [description, setDescription] = useState("");
    const [focus, setFocus] = useState("Comunicação");
    const [status, setStatus] = useState("Planejamento");
    const [priority, setPriority] = useState("Normal");
    const [responsible, setResponsible] = useState("");
    const [deadline, setDeadline] = useState("");

    const projectIcons = ["📱", "🔍", "🤖", "🏥", "⚖️", "📋", "🎙️", "🎓", "🧞", "💡", "📊", "🎯", "🔬", "💻", "🌐", "📝"];
    const focusOptions = Object.keys(FOCUS_COLORS);
    const statusOptions = Object.keys(STATUS_COLORS);
    const priorityOptions = Object.keys(PRIORITY_COLORS);

    useEffect(() => {
        if (editProject) {
            setTitle(editProject.title); setSubtitle(editProject.subtitle || "");
            setIcon(editProject.icon); setDescription(editProject.description || "");
            setFocus(editProject.focus); setStatus(editProject.status);
            setPriority(editProject.priority); setResponsible(editProject.responsible || "");
            setDeadline(editProject.deadline || "");
        } else {
            setTitle(""); setSubtitle(""); setIcon("📋"); setDescription("");
            setFocus("Comunicação"); setStatus("Planejamento"); setPriority("Normal");
            setResponsible(""); setDeadline("");
        }
    }, [editProject, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault(); if (!title.trim()) return;
        const data = {
            ...(editProject || {}),
            id: editProject?.id || `P${Date.now()}`,
            title: title.trim(), subtitle: subtitle.trim(), icon, description: description.trim(),
            focus, status, priority, responsible: responsible.trim(), deadline: deadline.trim(),
            tasks: editProject?.tasks || [],
        };
        // preserve any special fields from the original project
        if (editProject) {
            ["pillars", "groups", "blocks", "months", "acts", "workflow", "phases", "tools", "principles", "chapters", "campaignPhases"].forEach(k => {
                if (editProject[k]) data[k] = editProject[k];
            });
        }
        onSave(data);
        onClose();
    };

    if (!isOpen) return null;

    const inputStyle = { width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" };
    const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, width: 540, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{editProject ? "Editar Projeto" : "Novo Projeto"}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Ícone</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {projectIcons.map((ic, i) => (
                                <div key={i} onClick={() => setIcon(ic)} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", background: icon === ic ? COLORS.lightTeal : COLORS.bg, border: icon === ic ? `2px solid ${COLORS.teal}` : `1px solid ${COLORS.border}` }}>{ic}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Título *</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Nome do projeto" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Subtítulo</label>
                        <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Breve descrição" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Descrição</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição detalhada do projeto..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                        <div>
                            <label style={labelStyle}>Foco</label>
                            <select value={focus} onChange={e => setFocus(e.target.value)} style={{ ...inputStyle, background: COLORS.card }}>
                                {focusOptions.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} style={{ ...inputStyle, background: COLORS.card }}>
                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Prioridade</label>
                            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ ...inputStyle, background: COLORS.card }}>
                                {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                        <div>
                            <label style={labelStyle}>Responsável</label>
                            <input type="text" value={responsible} onChange={e => setResponsible(e.target.value)} placeholder="Ex: Equipe Técnica" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Prazo</label>
                            <input type="text" value={deadline} onChange={e => setDeadline(e.target.value)} placeholder="Ex: 4 Meses" style={inputStyle} />
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: COLORS.textMuted }}>Cancelar</button>
                        <button type="submit" style={{ flex: 1, padding: "12px", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "white" }}>{editProject ? "Salvar" : "Criar Projeto"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProjectFullPage = ({ project, onBack, tasks, onToggleTask, onAddTask, onDeleteTask, onEditTask, onEditProject, onDeleteProject }) => {
    const focusColor = FOCUS_COLORS[project.focus] || FOCUS_COLORS["Educação"];
    const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS["Planejamento"];
    const completedTasks = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const [editingTaskIdx, setEditingTaskIdx] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState("");

    const isEditor = authService.getRole() === "Editor";

    const startEditTask = (idx) => { if (isEditor) { setEditingTaskIdx(idx); setEditingTaskText(tasks[idx].text); } };
    const saveEditTask = () => { if (editingTaskText.trim() && editingTaskIdx !== null) { onEditTask(project.id, editingTaskIdx, editingTaskText.trim()); } setEditingTaskIdx(null); setEditingTaskText(""); };
    const cancelEditTask = () => { setEditingTaskIdx(null); setEditingTaskText(""); };

    const sections = [];
    if (project.pillars) sections.push({ title: "📌 Pilares de Conteúdo", items: project.pillars, type: "pillars" });
    if (project.groups) sections.push({ title: "📌 Grupos e IAs", items: project.groups, type: "groups" });
    if (project.blocks) sections.push({ title: "📌 Blocos do Curso", items: project.blocks, type: "blocks" });
    if (project.months) sections.push({ title: "📌 Cronograma Mensal", items: project.months, type: "months" });
    if (project.acts) sections.push({ title: "📌 Estrutura do Evento", items: project.acts, type: "acts" });
    if (project.workflow) sections.push({ title: "📌 Fluxo de Trabalho", items: project.workflow, type: "workflow" });
    if (project.phases) sections.push({ title: "📌 Fases do Programa", items: project.phases, type: "phases" });
    if (project.tools) sections.push({ title: "🛠️ Ferramentas", items: project.tools, type: "tools" });
    if (project.principles) sections.push({ title: "📌 5 Princípios", items: project.principles, type: "principles" });
    if (project.chapters) sections.push({ title: "📖 Capítulos do E-book", items: project.chapters, type: "chapters" });
    if (project.campaignPhases) sections.push({ title: "📌 Fases da Campanha", items: project.campaignPhases, type: "campaignPhases" });

    return (
        <div style={{ animation: "slideIn 0.3s ease" }}>
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: COLORS.textMuted, fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0 }}>← Voltar para o dashboard</button>

            {/* Header Card */}
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, border: `1px solid ${COLORS.border}`, marginBottom: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${focusColor.border}, ${COLORS.teal})` }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, ${focusColor.bg}, ${COLORS.lightTeal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{project.icon}</div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: focusColor.text, marginBottom: 4, letterSpacing: "0.05em" }}>{project.id}</div>
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>{project.title}</h2>
                            <p style={{ fontSize: 14, color: COLORS.textMuted, margin: "4px 0" }}>{project.subtitle}</p>
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                <Badge colors={focusColor}>{project.focus}</Badge>
                                <Badge colors={statusColor}>{project.status}</Badge>
                                <Badge colors={PRIORITY_COLORS[project.priority]}>{project.priority}</Badge>
                            </div>
                        </div>
                    </div>
                    {isEditor && (
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => onEditProject(project)} title="Editar projeto" style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 10, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s" }}>✏️</button>
                            <button onClick={() => { if (confirm("Tem certeza que deseja excluir este projeto?")) { onDeleteProject(project.id); onBack(); } }} title="Excluir projeto" style={{ background: "#FFE8E8", border: `1px solid #FFCACA`, borderRadius: 10, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s" }}>🗑️</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: COLORS.lightTeal, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green }}>{Math.round(progress)}%</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Progresso</div>
                </div>
                <div style={{ background: COLORS.lightBlue, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.blue }}>{completedTasks}/{totalTasks}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Tarefas</div>
                </div>
                <div style={{ background: COLORS.lightGreen, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.green }}>{project.deadline}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Prazo</div>
                </div>
            </div>

            {/* Descrição */}
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>📝 Sobre o Projeto</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.text, margin: 0 }}>{project.description}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12, color: COLORS.textMuted }}>
                    <span>👤 {project.responsible}</span>
                    <span>📅 {project.deadline}</span>
                </div>
            </div>

            {/* Seções especiais */}
            {sections.map((section, si) => (
                <div key={si} style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>{section.title}</h3>
                    {["pillars", "blocks", "months", "phases", "acts", "workflow", "campaignPhases"].includes(section.type) && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {section.items.map((item, i) => (
                                <div key={i} style={{ background: COLORS.bg, borderRadius: 10, padding: 14, border: `1px solid ${COLORS.border}` }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{item.name}</div>
                                    </div>
                                    {item.format && <div style={{ fontSize: 11, color: COLORS.textMuted }}>📎 {item.format}</div>}
                                    {item.desc && <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.desc}</div>}
                                    {item.aulas && <div style={{ fontSize: 11, color: COLORS.textMuted }}>📚 {item.aulas}</div>}
                                    {item.weeks && <div style={{ fontSize: 11, color: COLORS.textMuted }}>📅 {item.weeks}</div>}
                                    {item.duration && <div style={{ fontSize: 11, color: COLORS.textMuted }}>⏱️ {item.duration}</div>}
                                    {item.function && <div style={{ fontSize: 11, color: COLORS.textMuted }}>🔧 {item.function}</div>}
                                    {item.topics && (
                                        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                                            {item.topics.map((t, ti) => <div key={ti} style={{ fontSize: 11, color: COLORS.textMuted, paddingLeft: 4 }}>• {t}</div>)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {section.type === "groups" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {section.items.map((g, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.bg, borderRadius: 10, padding: "12px 16px", border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{g.name}</span>
                                    <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>{g.group}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {section.type === "tools" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {section.items.map((tool, i) => (
                                <div key={i} style={{ background: COLORS.bg, borderRadius: 10, padding: 14, border: `1px solid ${COLORS.border}` }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{tool.name}</div>
                                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>🔧 {tool.function}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {section.type === "principles" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {section.items.map((p, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.bg, borderRadius: 10, padding: "12px 16px", border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, color: "white", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                                    <span style={{ fontSize: 14, color: COLORS.text }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {section.type === "chapters" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {section.items.map((ch, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.bg, borderRadius: 10, padding: "12px 16px", border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`, color: "white", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                                    <span style={{ fontSize: 14, color: COLORS.text }}>{ch}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Tarefas com edição inline */}
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Tarefas ({completedTasks}/{totalTasks})</h3>
                </div>
                <div style={{ marginBottom: 12 }}><ProgressBar value={progress} color={focusColor.border} /></div>
                {tasks.map((task, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                        <div onClick={() => isEditor && onToggleTask(project.id, i)} style={{
                            width: 24, height: 24, borderRadius: 6,
                            border: task.done ? "none" : `2px solid ${COLORS.border}`,
                            background: task.done ? `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: isEditor ? "pointer" : "default", flexShrink: 0
                        }}>
                            {task.done && <svg width="13" height="10" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <div style={{ flex: 1 }}>
                            {editingTaskIdx === i ? (
                                <div style={{ display: "flex", gap: 6 }}>
                                    <input type="text" value={editingTaskText} onChange={e => setEditingTaskText(e.target.value)}
                                        onKeyDown={e => { if (e.key === "Enter") saveEditTask(); else if (e.key === "Escape") cancelEditTask(); }}
                                        autoFocus style={{ flex: 1, padding: "6px 10px", border: `2px solid ${focusColor.border}`, borderRadius: 6, fontSize: 13, outline: "none" }} />
                                    <button onClick={saveEditTask} style={{ padding: "6px 12px", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, border: "none", borderRadius: 6, color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>✓</button>
                                    <button onClick={cancelEditTask} style={{ padding: "6px 10px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 11, cursor: "pointer", color: COLORS.textMuted }}>✕</button>
                                </div>
                            ) : (
                                <div style={{ fontSize: 14, color: task.done ? COLORS.textMuted : COLORS.text, textDecoration: task.done ? "line-through" : "none" }}>{task.text}</div>
                            )}
                        </div>
                        {isEditor && editingTaskIdx !== i && (
                            <div style={{ display: "flex", gap: 4 }}>
                                <button onClick={() => startEditTask(i)} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, opacity: 0.5, padding: "2px 4px" }} title="Editar tarefa">✏️</button>
                                <button onClick={() => onDeleteTask(project.id, i)} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 16, opacity: 0.5, padding: "2px 4px" }} title="Excluir tarefa">×</button>
                            </div>
                        )}
                    </div>
                ))}
                {isEditor && <AddTaskInput onAdd={(text) => onAddTask(project.id, text)} focusColor={focusColor} />}
            </div>
        </div>
    );
};

window.DashboardView = ({ projects, onSelectProject, selectedProject, filterFocus, onSetFilterFocus, onToggleTask, onAddTask, onDeleteTask, onEditTask, onEditProject, onDeleteProject, getProjectProgress }) => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const focuses = ["Todos", ...new Set(projects.map(p => p.focus))];
    const filteredProjects = filterFocus === "Todos" ? projects : projects.filter(p => p.focus === filterFocus);

    const totalTasks = projects.reduce((s, p) => s + p.tasks.length, 0);
    const doneTasks = projects.reduce((s, p) => s + p.tasks.filter(t => t.done).length, 0);
    const avgProgress = projects.length > 0 ? Math.round(projects.reduce((s, p) => s + getProjectProgress(p), 0) / projects.length) : 0;
    const highPriority = projects.filter(p => p.priority === "Alta").length;

    const summaryCards = [
        { label: "Total de Projetos", value: projects.length, icon: "📋", color: COLORS.green, bgColor: COLORS.lightGreen },
        { label: "Tarefas Concluídas", value: `${doneTasks}/${totalTasks}`, icon: "✅", color: COLORS.teal, bgColor: COLORS.lightTeal },
        { label: "Progresso Médio", value: `${avgProgress}%`, icon: "📈", color: COLORS.blue, bgColor: COLORS.lightBlue },
        { label: "Prioridade Alta", value: highPriority, icon: "🔥", color: "#D04040", bgColor: "#FFE8E8" },
        { label: "Membros Ativos", value: 11, icon: "👥", color: COLORS.cyan, bgColor: COLORS.lightCyan },
    ];

    const handleSaveProject = (data) => {
        onEditProject(data);
        setIsProjectModalOpen(false);
        setEditingProject(null);
    };

    const isEditor = authService.getRole() === "Editor";

    const handleOpenEditProject = (project) => {
        setEditingProject(project);
        setIsProjectModalOpen(true);
    };

    if (selectedProject) {
        return (
            <div>
                <ProjectFullPage
                    project={selectedProject}
                    onBack={() => onSelectProject(null)}
                    tasks={selectedProject.tasks}
                    onToggleTask={onToggleTask}
                    onAddTask={onAddTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onEditProject={handleOpenEditProject}
                    onDeleteProject={onDeleteProject}
                />
                <ProjectFormModal isOpen={isProjectModalOpen} onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
                    onSave={handleSaveProject} editProject={editingProject} />
            </div>
        );
    }

    return (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
                {summaryCards.map((card, i) => (
                    <div key={i} style={{
                        background: COLORS.card, borderRadius: 14, padding: "18px 16px", border: `1px solid ${COLORS.border}`,
                        display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s"
                    }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: card.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{card.icon}</div>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.text }}>{card.value}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{card.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 8 }}>
                    {focuses.map(f => {
                        const isActive = filterFocus === f;
                        const fc = f === "Todos" ? { bg: COLORS.bg, text: COLORS.text, border: COLORS.border } : (FOCUS_COLORS[f] || FOCUS_COLORS["Educação"]);
                        return (
                            <button key={f} onClick={() => onSetFilterFocus(f)}
                                style={{
                                    padding: "8px 16px", borderRadius: 20, border: isActive ? `2px solid ${fc.border}` : `1px solid ${COLORS.border}`,
                                    background: isActive ? fc.bg : COLORS.card, color: isActive ? fc.text : COLORS.textMuted,
                                    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                                }}>
                                {f}
                            </button>
                        );
                    })}
                </div>

                {isEditor && (
                    <button onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
                        style={{
                            display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                            border: "none", borderRadius: 10, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer"
                        }}>
                        <span>+</span> Novo Projeto
                    </button>
                )}
            </div>

            {/* Project Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {filteredProjects.map(p => (
                    <ProjectCard key={p.id} project={p} onClick={onSelectProject}
                        isSelected={false} progress={getProjectProgress(p)} />
                ))}
            </div>

            <ProjectFormModal isOpen={isProjectModalOpen} onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
                onSave={handleSaveProject} editProject={editingProject} />
        </div>
    );
};
