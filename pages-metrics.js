// Metrics Page - Bar Chart, Pie Chart, Task Status, Ranking

const BarChart = ({ projects, getProjectProgress }) => {
    const barWidth = 60; const chartHeight = 300;
    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 24 }}>📊 Progresso por Projeto</h3>
            <div style={{ position: "relative", height: chartHeight + 60, overflowX: "auto" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 60, width: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {[100, 75, 50, 25, 0].map(v => <div key={v} style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "right", paddingRight: 8 }}>{v}%</div>)}
                </div>
                <div style={{ marginLeft: 40, display: "flex", alignItems: "flex-end", height: chartHeight, gap: 16, paddingBottom: 10, borderBottom: `1px solid ${COLORS.border}`, position: "relative" }}>
                    {[0, 25, 50, 75, 100].map(v => <div key={v} style={{ position: "absolute", left: 0, right: 0, bottom: `${v}%`, borderTop: `1px dashed ${COLORS.border}`, zIndex: 0 }} />)}
                    {projects.map((p, idx) => {
                        const prog = getProjectProgress(p);
                        const color = PROJECT_COLORS[idx % PROJECT_COLORS.length];
                        return (
                            <div key={p.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 4 }}>{Math.round(prog)}%</div>
                                <div style={{
                                    width: barWidth, height: (prog / 100) * (chartHeight - 20), background: `linear-gradient(180deg, ${color}, ${color}99)`,
                                    borderRadius: "8px 8px 0 0", transition: "height 0.5s ease", minHeight: 4
                                }} />
                            </div>
                        );
                    })}
                </div>
                <div style={{ marginLeft: 40, display: "flex", gap: 16, marginTop: 12 }}>
                    {projects.map((p, idx) => (
                        <div key={p.id} style={{ width: barWidth, textAlign: "center" }}>
                            <div style={{ fontSize: 18, marginBottom: 4 }}>{p.icon}</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: PROJECT_COLORS[idx % PROJECT_COLORS.length] }}>{p.id}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PieChart = ({ projects, getProjectProgress }) => {
    const size = 280; const center = size / 2; const radius = 100; const innerRadius = 60;
    const projectData = projects.map((p, i) => ({ ...p, totalTasks: p.tasks.length, completedTasks: p.tasks.filter(t => t.done).length, color: PROJECT_COLORS[i % PROJECT_COLORS.length] }));
    const totalAllTasks = projectData.reduce((s, p) => s + p.totalTasks, 0);

    let currentAngle = -90;
    const slices = projectData.map(p => {
        const pct = totalAllTasks > 0 ? (p.totalTasks / totalAllTasks) * 100 : 0;
        const angle = (pct / 100) * 360;
        const startAngle = currentAngle; currentAngle += angle;
        const s1 = (startAngle * Math.PI) / 180; const s2 = ((startAngle + angle) * Math.PI) / 180;
        const large = angle > 180 ? 1 : 0;
        const path = `M ${center + radius * Math.cos(s1)} ${center + radius * Math.sin(s1)} A ${radius} ${radius} 0 ${large} 1 ${center + radius * Math.cos(s2)} ${center + radius * Math.sin(s2)} L ${center + innerRadius * Math.cos(s2)} ${center + innerRadius * Math.sin(s2)} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${center + innerRadius * Math.cos(s1)} ${center + innerRadius * Math.sin(s1)} Z`;
        return { ...p, path, pct };
    });

    const totalCompleted = projectData.reduce((s, p) => s + p.completedTasks, 0);
    const overall = totalAllTasks > 0 ? Math.round((totalCompleted / totalAllTasks) * 100) : 0;

    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 24 }}>🥧 Distribuição de Tarefas</h3>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                    <svg width={size} height={size}>
                        <circle cx={center} cy={center} r={radius} fill={COLORS.bg} stroke={COLORS.border} strokeWidth="1" />
                        {slices.map(sl => <path key={sl.id} d={sl.path} fill={sl.color} stroke={COLORS.card} strokeWidth="2" />)}
                        <circle cx={center} cy={center} r={innerRadius} fill={COLORS.card} />
                        <text x={center} y={center - 8} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: COLORS.text }}>{overall}%</text>
                        <text x={center} y={center + 16} textAnchor="middle" style={{ fontSize: 11, fill: COLORS.textMuted }}>Progresso Geral</text>
                    </svg>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {projectData.map(p => (
                            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
                                <div style={{ width: 12, height: 12, borderRadius: 4, background: p.color, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, display: "flex", alignItems: "center", gap: 4 }}><span>{p.icon}</span><span>{p.id}</span></div>
                                    <div style={{ fontSize: 10, color: COLORS.textMuted }}>{p.completedTasks}/{p.totalTasks} tarefas</div>
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: p.color }}>{Math.round(getProjectProgress(p))}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskStatusChart = ({ projects }) => {
    const total = projects.reduce((s, p) => s + p.tasks.length, 0);
    const done = projects.reduce((s, p) => s + p.tasks.filter(t => t.done).length, 0);
    const pending = total - done;
    const dp = total > 0 ? (done / total) * 100 : 0;
    const pp = total > 0 ? (pending / total) * 100 : 0;

    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 24 }}>✅ Status Geral das Tarefas</h3>
            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div style={{ flex: 1, textAlign: "center", padding: 20, background: COLORS.lightGreen, borderRadius: 12 }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.green }}>{done}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>Concluídas</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: 20, background: COLORS.lightBlue, borderRadius: 12 }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.blue }}>{pending}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>Pendentes</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: 20, background: COLORS.bg, borderRadius: 12 }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.text }}>{total}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>Total</div>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: COLORS.textMuted }}>Distribuição</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.green }}>{Math.round(dp)}% concluído</span>
                </div>
                <div style={{ display: "flex", height: 24, borderRadius: 12, overflow: "hidden", background: COLORS.bg }}>
                    <div style={{ width: `${dp}%`, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`, transition: "width 0.5s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {dp > 15 && <span style={{ fontSize: 10, color: "white", fontWeight: 600 }}>{Math.round(dp)}%</span>}
                    </div>
                    <div style={{ width: `${pp}%`, background: COLORS.lightBlue, transition: "width 0.5s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {pp > 15 && <span style={{ fontSize: 10, color: COLORS.blue, fontWeight: 600 }}>{Math.round(pp)}%</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectRankingTable = ({ projects, getProjectProgress }) => {
    const sorted = [...projects].sort((a, b) => getProjectProgress(b) - getProjectProgress(a));
    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 24 }}>🏆 Ranking de Projetos</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sorted.map((p, idx) => {
                    const prog = getProjectProgress(p);
                    const color = PROJECT_COLORS[projects.findIndex(pp => pp.id === p.id) % PROJECT_COLORS.length];
                    const done = p.tasks.filter(t => t.done).length;
                    return (
                        <div key={p.id} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                            background: idx === 0 ? COLORS.lightGreen : COLORS.bg, borderRadius: 10,
                            border: idx === 0 ? `2px solid ${COLORS.green}` : `1px solid ${COLORS.border}`
                        }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: idx === 0 ? `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` : idx < 3 ? COLORS.lightBlue : COLORS.bg,
                                color: idx === 0 ? "white" : COLORS.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700
                            }}>{idx + 1}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 16 }}>{p.icon}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{p.id}</span>
                                    <span style={{ fontSize: 12, color: COLORS.textMuted }}>- {p.title}</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted, marginRight: 16 }}>{done}/{p.tasks.length}</div>
                            <div style={{ width: 120 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color }}>{Math.round(prog)}%</span>
                                </div>
                                <div style={{ height: 6, background: COLORS.border, borderRadius: 3 }}>
                                    <div style={{ width: `${prog}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 3, transition: "width 0.5s ease" }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

window.MetricsView = ({ projects, getProjectProgress }) => {
    const total = projects.reduce((s, p) => s + p.tasks.length, 0);
    const done = projects.reduce((s, p) => s + p.tasks.filter(t => t.done).length, 0);
    const avg = Math.round(projects.reduce((s, p) => s + getProjectProgress(p), 0) / projects.length);

    return (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                {[
                    { label: "Total de Projetos", value: projects.length, icon: "📋", color: COLORS.green },
                    { label: "Progresso Médio", value: `${avg}%`, icon: "📈", color: COLORS.teal },
                    { label: "Tarefas Concluídas", value: done, icon: "✅", color: COLORS.cyan },
                    { label: "Tarefas Pendentes", value: total - done, icon: "⏳", color: COLORS.blue },
                ].map((s, i) => (
                    <div key={i} style={{ background: COLORS.card, borderRadius: 14, padding: "20px 24px", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 12, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.icon}</div>
                        <div><div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text }}>{s.value}</div><div style={{ fontSize: 12, color: COLORS.textMuted }}>{s.label}</div></div>
                    </div>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <PieChart projects={projects} getProjectProgress={getProjectProgress} />
                <TaskStatusChart projects={projects} />
            </div>
            <div style={{ marginBottom: 24 }}><BarChart projects={projects} getProjectProgress={getProjectProgress} /></div>
            <ProjectRankingTable projects={projects} getProjectProgress={getProjectProgress} />
        </div>
    );
};
