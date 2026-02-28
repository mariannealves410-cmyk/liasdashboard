const { useState } = React;

window.ProgressBar = ({ value, color = COLORS.teal }) => (
    <div style={{ width: "100%", height: 6, borderRadius: 3, background: COLORS.border }}>
        <div style={{
            width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", borderRadius: 3,
            background: `linear-gradient(90deg, ${COLORS.green}, ${color})`, transition: "width 0.4s ease"
        }} />
    </div>
);

window.Badge = ({ children, colors }) => (
    <span style={{
        display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11,
        fontWeight: 600, letterSpacing: "0.02em", background: colors.bg, color: colors.text,
        border: `1px solid ${colors.border || colors.bg}`
    }}>
        {children}
    </span>
);

window.CheckItem = ({ text, done, onToggle, onDelete }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
        <div onClick={onToggle} style={{
            width: 18, height: 18, borderRadius: 4,
            border: done ? "none" : `2px solid ${COLORS.border}`,
            background: done ? `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "all 0.2s", cursor: "pointer"
        }}>
            {done && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <span onClick={onToggle} style={{
            fontSize: 13, color: done ? COLORS.textMuted : COLORS.text,
            textDecoration: done ? "line-through" : "none", transition: "all 0.2s", flex: 1, cursor: "pointer"
        }}>
            {text}
        </span>
        <button onClick={onDelete} style={{
            background: "none", border: "none", color: COLORS.textMuted,
            cursor: "pointer", padding: "2px 6px", borderRadius: 4, fontSize: 14, opacity: 0.5
        }}
            onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.5}>×</button>
    </div>
);

window.AddTaskInput = ({ onAdd, focusColor }) => {
    const [newTask, setNewTask] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const handleAdd = () => { if (newTask.trim()) { onAdd(newTask.trim()); setNewTask(""); setIsAdding(false); } };
    const handleKeyDown = (e) => { if (e.key === "Enter") handleAdd(); else if (e.key === "Escape") { setNewTask(""); setIsAdding(false); } };

    if (!isAdding) {
        return (
            <button onClick={() => setIsAdding(true)} style={{
                display: "flex", alignItems: "center", gap: 8,
                width: "100%", padding: "10px 12px", marginTop: 8, background: `${focusColor.bg}50`,
                border: `1px dashed ${focusColor.border}50`, borderRadius: 8, color: focusColor.text,
                fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s"
            }}>
                <span style={{ fontSize: 16 }}>+</span> Adicionar nova tarefa
            </button>
        );
    }

    return (
        <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder="Digite a nova tarefa..." autoFocus
                    style={{
                        flex: 1, padding: "10px 12px", border: `2px solid ${focusColor.border}`,
                        borderRadius: 8, fontSize: 13, outline: "none", background: COLORS.card
                    }} />
                <button onClick={handleAdd} style={{
                    padding: "10px 16px",
                    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                    border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer"
                }}>
                    Adicionar
                </button>
                <button onClick={() => { setNewTask(""); setIsAdding(false); }}
                    style={{
                        padding: "10px 12px", background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                        borderRadius: 8, color: COLORS.textMuted, fontSize: 13, cursor: "pointer"
                    }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

window.ProjectCard = ({ project, onClick, isSelected, progress }) => {
    const focusColor = FOCUS_COLORS[project.focus] || FOCUS_COLORS["Educação"];
    const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS["Planejamento"];
    const priorityColor = PRIORITY_COLORS[project.priority];

    return (
        <div onClick={() => onClick(project)}
            style={{
                background: COLORS.card, borderRadius: 14, padding: 20, cursor: "pointer",
                border: isSelected ? `2px solid ${focusColor.border}` : `1px solid ${COLORS.border}`,
                boxShadow: isSelected ? `0 0 0 3px ${focusColor.bg}, 0 4px 20px rgba(0,0,0,0.08)` : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.25s ease", position: "relative", overflow: "hidden"
            }}>
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${focusColor.border}, ${COLORS.teal})`
            }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: `linear-gradient(135deg, ${focusColor.bg}, ${COLORS.lightTeal})`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                    }}>
                        {project.icon}
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: focusColor.text, marginBottom: 2, letterSpacing: "0.05em" }}>{project.id}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, lineHeight: 1.3 }}>{project.title}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{project.subtitle}</div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <Badge colors={focusColor}>{project.focus}</Badge>
                <Badge colors={statusColor}>{project.status}</Badge>
                <Badge colors={priorityColor}>{project.priority}</Badge>
            </div>
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>Progresso</span>
                    <span style={{ fontSize: 11, color: focusColor.text, fontWeight: 700 }}>{Math.round(progress)}%</span>
                </div>
                <ProgressBar value={progress} color={focusColor.border} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, color: COLORS.textMuted }}>
                <span>👤 {project.responsible}</span>
                <span>📅 {project.deadline}</span>
            </div>
        </div>
    );
};

window.ProjectDetail = ({ project, onClose, tasks, onToggleTask, onAddTask, onDeleteTask }) => {
    const focusColor = FOCUS_COLORS[project.focus] || FOCUS_COLORS["Educação"];
    const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS["Planejamento"];
    const completedTasks = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div style={{
            background: COLORS.card, borderRadius: 16, overflow: "hidden",
            border: `1px solid ${COLORS.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", animation: "slideIn 0.3s ease"
        }}>
            <div style={{
                background: `linear-gradient(135deg, ${focusColor.border}15, ${COLORS.teal}10)`,
                padding: "24px 28px", borderBottom: `1px solid ${COLORS.border}`
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 14,
                            background: `linear-gradient(135deg, ${focusColor.bg}, white)`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}>{project.icon}</div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: focusColor.text, marginBottom: 4, letterSpacing: "0.05em" }}>{project.id}</div>
                            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: COLORS.text }}>{project.title}</h2>
                            <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.textMuted }}>{project.subtitle}</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: "none", border: `1px solid ${COLORS.border}`,
                        borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 16, color: COLORS.textMuted
                    }}>✕</button>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                    <Badge colors={focusColor}>{project.focus}</Badge>
                    <Badge colors={statusColor}>{project.status}</Badge>
                    <Badge colors={PRIORITY_COLORS[project.priority]}>{project.priority}</Badge>
                </div>
            </div>

            <div style={{ padding: "20px 28px", maxHeight: "60vh", overflowY: "auto" }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: "0 0 20px" }}>{project.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                    <div style={{ background: COLORS.lightTeal, borderRadius: 10, padding: 14, textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.green }}>{Math.round(progress)}%</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Progresso</div>
                    </div>
                    <div style={{ background: COLORS.lightBlue, borderRadius: 10, padding: 14, textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.blue }}>{completedTasks}/{totalTasks}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Tarefas</div>
                    </div>
                    <div style={{ background: COLORS.lightGreen, borderRadius: 10, padding: 14, textAlign: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.green }}>{project.deadline}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Prazo</div>
                    </div>
                </div>

                {project.pillars && (
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>📌 Pilares de Conteúdo</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {project.pillars.map((p, i) => (
                                <div key={i} style={{ background: COLORS.bg, borderRadius: 10, padding: 12, border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{p.name}</div>
                                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.format}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {project.groups && (
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>📌 Grupos e IAs</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {project.groups.map((g, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.bg, borderRadius: 8, padding: "8px 14px", border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{g.name}</span>
                                    <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 500 }}>{g.group}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {project.blocks && (
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>📌 Blocos do Curso</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {project.blocks.map((b, i) => (
                                <div key={i} style={{ background: COLORS.bg, borderRadius: 10, padding: 12, border: `1px solid ${COLORS.border}` }}>
                                    <span style={{ fontSize: 18 }}>{b.icon}</span>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{b.name}</div>
                                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{b.aulas}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {project.principles && (
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>📌 5 Princípios</h3>
                        {project.principles.map((p, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.bg, borderRadius: 8, padding: "8px 14px", marginBottom: 6, border: `1px solid ${COLORS.border}` }}>
                                <span style={{ width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ fontSize: 13, color: COLORS.text }}>{p}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>✅ Tarefas ({completedTasks}/{totalTasks})</h3>
                    <div style={{ marginBottom: 12 }}><ProgressBar value={progress} color={focusColor.border} /></div>
                    {tasks.map((task, i) => (
                        <CheckItem key={i} text={task.text} done={task.done}
                            onToggle={() => onToggleTask(project.id, i)} onDelete={() => onDeleteTask(project.id, i)} />
                    ))}
                    <AddTaskInput onAdd={(text) => onAddTask(project.id, text)} focusColor={focusColor} />
                </div>
            </div>
        </div>
    );
};
