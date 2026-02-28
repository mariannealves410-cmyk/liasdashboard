const { useState } = React;

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed, projects, getProjectProgress, onLogout }) => {
    const allTasks = projects.reduce((s, p) => s + p.tasks.length, 0);
    const allDone = projects.reduce((s, p) => s + p.tasks.filter(t => t.done).length, 0);
    const overallProgress = allTasks > 0 ? Math.round((allDone / allTasks) * 100) : 0;

    return (
        <div style={{
            width: collapsed ? 68 : 260, background: `linear-gradient(180deg, ${COLORS.darkBlue}, ${COLORS.blue})`,
            display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, overflow: "hidden"
        }}>
            {/* Logo */}
            <div style={{
                padding: collapsed ? "20px 0" : "20px 24px", display: "flex", alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start", gap: 14, borderBottom: "1px solid rgba(255,255,255,0.08)", minHeight: 72
            }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white", flexShrink: 0
                }}>L</div>
                {!collapsed && (
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: 1 }}>LIAS</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: -2 }}>Planejamento 2026</div>
                    </div>
                )}
            </div>

            {/* Toggle */}
            <div style={{ padding: "12px", display: "flex", justifyContent: collapsed ? "center" : "flex-end" }}>
                <button onClick={() => setCollapsed(!collapsed)} style={{
                    background: "rgba(255,255,255,0.08)", border: "none",
                    borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)", fontSize: 14, transition: "all 0.2s"
                }}>
                    {collapsed ? "→" : "←"}
                </button>
            </div>

            {/* Nav Items */}
            <div style={{ flex: 1, padding: collapsed ? "8px" : "8px 14px" }}>
                {SIDEBAR_ITEMS.map(item => {
                    const isActive = activeView === item.id;
                    return (
                        <div key={item.id} onClick={() => setActiveView(item.id)}
                            style={{
                                display: "flex", alignItems: "center", gap: 14,
                                padding: collapsed ? "14px 0" : "12px 16px",
                                justifyContent: collapsed ? "center" : "flex-start",
                                marginBottom: 4, borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                                borderLeft: isActive ? `3px solid ${COLORS.teal}` : "3px solid transparent"
                            }}>
                            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                            {!collapsed && <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "white" : "rgba(255,255,255,0.6)" }}>{item.label}</span>}
                        </div>
                    );
                })}
            </div>

            {/* Progress */}
            {!collapsed && (
                <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Progresso Geral</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.teal }}>{overallProgress}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }}>
                        <div style={{ width: `${overallProgress}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`, transition: "width 0.4s ease" }} />
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{allDone} de {allTasks} tarefas concluídas</div>
                </div>
            )}

            {/* Botão Sair */}
            <div style={{ padding: collapsed ? "12px 8px" : "12px 14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div onClick={onLogout}
                    style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: collapsed ? "12px 0" : "12px 16px",
                        justifyContent: collapsed ? "center" : "flex-start",
                        borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                        background: "rgba(255,80,80,0.08)"
                    }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>🚪</span>
                    {!collapsed && <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,120,120,0.8)" }}>Sair</span>}
                </div>
            </div>
        </div>
    );
};

const Header = ({ activeView, userEmail, onLogout }) => {
    const titles = { dashboard: "Dashboard Estratégico", timeline: "Cronograma", teams: "Equipes", metrics: "Métricas" };
    const subtitles = { dashboard: "Visão geral dos projetos da LIAS 2026", timeline: "Calendário de eventos e entregas", teams: "Membros e atividades da equipe", metrics: "Indicadores de desempenho" };
    return (
        <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "20px 32px", background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`
        }}>
            <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: COLORS.text }}>{titles[activeView]}</h1>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.textMuted }}>{subtitles[activeView]}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: COLORS.bg, borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontSize: 14 }}>🔍</span>
                    <span style={{ fontSize: 13, color: COLORS.textMuted }}>Buscar...</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                        display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700
                    }}>
                        {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                    </div>
                    <button onClick={onLogout} title="Sair da conta"
                        style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, color: COLORS.textMuted, fontWeight: 500, transition: "all 0.2s" }}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [activeView, setActiveView] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const [projects, setProjects] = useState([]);
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [filterFocus, setFilterFocus] = useState("Todos");

    const handleLoginSuccess = () => setIsAuthenticated(true);
    const handleLogout = () => { authService.logout(); setIsAuthenticated(false); };

    // Sincronizar dados do banco
    const loadData = async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const [p, e, m] = await Promise.all([
                apiClient.getProjects(),
                apiClient.getEvents(),
                apiClient.getMembers()
            ]);
            setProjects(p);
            setEvents(e);
            setMembers(m);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            // Fallback para dados iniciais se falhar totalmente
            if (projects.length === 0) {
                setProjects(window.initialProjects || []);
                setEvents(window.initialEvents || []);
                setMembers(window.initialMembers || []);
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => { loadData(); }, [isAuthenticated]);

    // Se não autenticado, mostra login
    if (!isAuthenticated) return <LoginPage onLoginSuccess={handleLoginSuccess} />;

    // Se carregando
    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: COLORS.bg, color: COLORS.text }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.teal, marginBottom: 16 }}>LIAS</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted }}>Carregando dados do Supabase...</div>
        </div>
    );

    const getProjectProgress = (p) => { const t = p.tasks.length; return t > 0 ? (p.tasks.filter(t => t.done).length / t) * 100 : 0; };

    // ===== Project CRUD =====
    const editProject = async (data) => {
        try {
            await apiClient.updateProject(data.id, data);
            setProjects(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p));
        } catch (err) { alert("Erro ao salvar projeto: " + err.message); }
    };
    const deleteProject = async (pid) => {
        if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
        try {
            await apiClient.deleteProject(pid);
            setProjects(prev => prev.filter(p => p.id !== pid));
            setSelectedProject(null);
        } catch (err) { alert("Erro ao excluir: " + err.message); }
    };

    // ===== Task CRUD =====
    const toggleTask = async (pid, idx) => {
        const project = projects.find(p => p.id === pid);
        const task = project.tasks[idx];
        try {
            await apiClient.updateTask(task.id, { done: !task.done });
            setProjects(prev => prev.map(p => p.id === pid ? { ...p, tasks: p.tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t) } : p));
        } catch (err) { alert("Erro ao atualizar tarefa: " + err.message); }
    };
    const addTask = async (pid, text) => {
        try {
            const newTask = await apiClient.createTask({ project_id: pid, text, done: false, order_num: 99 });
            setProjects(prev => prev.map(p => p.id === pid ? { ...p, tasks: [...p.tasks, newTask] } : p));
        } catch (err) { alert("Erro ao adicionar tarefa: " + err.message); }
    };
    const deleteTask = async (pid, idx) => {
        const project = projects.find(p => p.id === pid);
        const task = project.tasks[idx];
        try {
            await apiClient.deleteTask(task.id);
            setProjects(prev => prev.map(p => p.id === pid ? { ...p, tasks: p.tasks.filter((_, i) => i !== idx) } : p));
        } catch (err) { alert("Erro ao excluir tarefa: " + err.message); }
    };
    const editTask = async (pid, idx, newText) => {
        const project = projects.find(p => p.id === pid);
        const task = project.tasks[idx];
        try {
            await apiClient.updateTask(task.id, { text: newText });
            setProjects(prev => prev.map(p => p.id === pid ? { ...p, tasks: p.tasks.map((t, i) => i === idx ? { ...t, text: newText } : t) } : p));
        } catch (err) { alert("Erro ao editar tarefa: " + err.message); }
    };

    // ===== Event CRUD =====
    const addEvent = async (ev) => {
        try {
            const newEv = await apiClient.createEvent(ev);
            setEvents(prev => [...prev, newEv]);
        } catch (err) { alert("Erro ao criar evento: " + err.message); }
    };
    const editEvent = async (ev) => {
        try {
            await apiClient.updateEvent(ev.id, ev);
            setEvents(prev => prev.map(e => e.id === ev.id ? ev : e));
        } catch (err) { alert("Erro ao editar evento: " + err.message); }
    };
    const deleteEvent = async (id) => {
        try {
            await apiClient.deleteEvent(id);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) { alert("Erro ao excluir evento: " + err.message); }
    };

    // ===== Member CRUD =====
    const addMember = async (m) => {
        try {
            const newM = await apiClient.createMember(m);
            setMembers(prev => [...prev, newM]);
        } catch (err) { alert("Erro ao adicionar membro: " + err.message); }
    };
    const editMember = async (m) => {
        try {
            await apiClient.updateMember(m.id, m);
            setMembers(prev => prev.map(mm => mm.id === m.id ? m : mm));
        } catch (err) { alert("Erro ao editar membro: " + err.message); }
    };
    const deleteMember = async (id) => {
        try {
            await apiClient.deleteMember(id);
            setMembers(prev => prev.filter(m => m.id !== id));
        } catch (err) { alert("Erro ao excluir membro: " + err.message); }
    };

    // ===== Activity CRUD =====
    const toggleActivity = async (mid, aid) => {
        const member = members.find(m => m.id === mid);
        const act = member.activities.find(a => a.id === aid);
        try {
            await apiClient.updateActivity(aid, { done: !act.done });
            setMembers(prev => prev.map(m => m.id === mid ? { ...m, activities: m.activities.map(a => a.id === aid ? { ...a, done: !a.done } : a) } : m));
        } catch (err) { alert("Erro ao atualizar atividade: " + err.message); }
    };
    const addActivity = async (mid, act) => {
        try {
            const newAct = await apiClient.createActivity({ ...act, member_id: mid });
            setMembers(prev => prev.map(m => m.id === mid ? { ...m, activities: [...m.activities, newAct] } : m));
        } catch (err) { alert("Erro ao adicionar atividade: " + err.message); }
    };
    const deleteActivity = async (mid, aid) => {
        try {
            await apiClient.deleteActivity(aid);
            setMembers(prev => prev.map(m => m.id === mid ? { ...m, activities: m.activities.filter(a => a.id !== aid) } : m));
        } catch (err) { alert("Erro ao excluir atividade: " + err.message); }
    };
    const editActivity = async (mid, act) => {
        try {
            await apiClient.updateActivity(act.id, act);
            setMembers(prev => prev.map(m => m.id === mid ? { ...m, activities: m.activities.map(a => a.id === act.id ? act : a) } : m));
        } catch (err) { alert("Erro ao editar atividade: " + err.message); }
    };

    const currentSelected = selectedProject ? projects.find(p => p.id === selectedProject.id) : null;

    return (
        <React.Fragment>
            <Sidebar activeView={activeView} setActiveView={setActiveView} collapsed={collapsed} setCollapsed={setCollapsed} projects={projects} getProjectProgress={getProjectProgress} onLogout={handleLogout} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <Header activeView={activeView} userEmail={authService.getEmail()} onLogout={handleLogout} />
                <div style={{ flex: 1, overflow: "auto", padding: 24, background: COLORS.bg }}>
                    {activeView === "dashboard" && (
                        <DashboardView projects={projects} onSelectProject={(p) => setSelectedProject(p)}
                            selectedProject={currentSelected} filterFocus={filterFocus} onSetFilterFocus={setFilterFocus}
                            onToggleTask={toggleTask} onAddTask={addTask} onDeleteTask={deleteTask} onEditTask={editTask}
                            onEditProject={editProject} onDeleteProject={deleteProject} getProjectProgress={getProjectProgress} />
                    )}
                    {activeView === "timeline" && (
                        <TimelineView projects={projects} events={events} onAddEvent={addEvent} onEditEvent={editEvent} onDeleteEvent={deleteEvent} />
                    )}
                    {activeView === "teams" && (
                        <TeamsView projects={projects} members={members} onToggleActivity={toggleActivity}
                            onAddMember={addMember} onEditMember={editMember} onDeleteMember={deleteMember}
                            onAddActivity={addActivity} onDeleteActivity={deleteActivity} onEditActivity={editActivity} />
                    )}
                    {activeView === "metrics" && (
                        <MetricsView projects={projects} getProjectProgress={getProjectProgress} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
