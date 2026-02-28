const { useState, useEffect } = React;

const MemberFormModal = ({ isOpen, onClose, onSave, projects, editMember }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("Membro");
    const [icon, setIcon] = useState("👤");
    const [projectIds, setProjectIds] = useState([]);

    useEffect(() => {
        if (editMember) { setName(editMember.name); setRole(editMember.role); setIcon(editMember.icon); setProjectIds(editMember.projectIds || []); }
        else { setName(""); setRole("Membro"); setIcon("👤"); setProjectIds([]); }
    }, [editMember, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault(); if (!name.trim()) return;
        onSave({ id: editMember?.id || Date.now(), name: name.trim(), role, icon, projectIds, activities: editMember?.activities || [] });
        onClose();
    };

    const toggleProject = (pid) => setProjectIds(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);

    if (!isOpen) return null;
    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, width: 480, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{editMember ? "Editar Membro" : "Novo Membro"}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Nome *</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Nome completo"
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" }} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Cargo</label>
                        <select value={role} onChange={e => setRole(e.target.value)}
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none", background: COLORS.card }}>
                            <option value="Membro">Membro</option>
                            <option value="Coordenador">Coordenador</option>
                            <option value="Líder">Líder</option>
                            <option value="Orientador">Orientador</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Avatar</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {MEMBER_ICONS.map((ic, i) => (
                                <div key={i} onClick={() => setIcon(ic)} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", background: icon === ic ? COLORS.lightTeal : COLORS.bg, border: icon === ic ? `2px solid ${COLORS.teal}` : `1px solid ${COLORS.border}` }}>{ic}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Projetos</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {projects.map(p => (
                                <div key={p.id} onClick={() => toggleProject(p.id)} style={{
                                    padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                                    background: projectIds.includes(p.id) ? COLORS.lightTeal : COLORS.bg,
                                    border: projectIds.includes(p.id) ? `2px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                                    color: projectIds.includes(p.id) ? COLORS.teal : COLORS.textMuted
                                }}>{p.icon} {p.id}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: COLORS.textMuted }}>Cancelar</button>
                        <button type="submit" style={{ flex: 1, padding: "12px", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "white" }}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ActivityFormModal = ({ isOpen, onClose, onSave, member, projects, editActivity }) => {
    const [text, setText] = useState("");
    const [projectId, setProjectId] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (editActivity) { setText(editActivity.text); setProjectId(editActivity.projectId || ""); }
            else { setText(""); setProjectId(member?.projectIds?.[0] || ""); }
        }
    }, [isOpen, editActivity]);

    const handleSubmit = (e) => {
        e.preventDefault(); if (!text.trim()) return;
        if (editActivity) {
            onSave(member.id, { ...editActivity, text: text.trim(), projectId });
        } else {
            onSave(member.id, { id: Date.now(), text: text.trim(), projectId, done: false });
        }
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, width: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{editActivity ? "Editar Atividade" : "Nova Atividade"}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Atividade *</label>
                        <input type="text" value={text} onChange={e => setText(e.target.value)} required placeholder="Descrição da atividade" autoFocus
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" }} />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Projeto</label>
                        <select value={projectId} onChange={e => setProjectId(e.target.value)}
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none", background: COLORS.card }}>
                            <option value="">Sem vínculo</option>
                            {projects.filter(p => member?.projectIds?.includes(p.id)).map(p => <option key={p.id} value={p.id}>{p.icon} {p.id} - {p.title}</option>)}
                        </select>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: COLORS.textMuted }}>Cancelar</button>
                        <button type="submit" style={{ flex: 1, padding: "12px", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "white" }}>{editActivity ? "Salvar" : "Adicionar"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MemberCard = ({ member, projects, onClick }) => {
    const doneAct = member.activities.filter(a => a.done).length;
    const totalAct = member.activities.length;
    const prog = totalAct > 0 ? (doneAct / totalAct) * 100 : 0;

    return (
        <div onClick={() => onClick(member)} style={{
            background: COLORS.card, borderRadius: 14, padding: 20, cursor: "pointer",
            border: `1px solid ${COLORS.border}`, transition: "all 0.25s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.lightTeal}, ${COLORS.lightBlue})`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
                }}>{member.icon}</div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>{member.role}</div>
                </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {member.projectIds.map(pid => {
                    const p = projects.find(pp => pp.id === pid);
                    return p ? <span key={pid} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 12, background: COLORS.bg, color: COLORS.textMuted, border: `1px solid ${COLORS.border}` }}>{p.icon} {pid}</span> : null;
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>Atividades</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.teal }}>{doneAct}/{totalAct}</span>
            </div>
            <ProgressBar value={prog} />
        </div>
    );
};

const MemberFullPage = ({ member, projects, onBack, onToggleActivity, onAddActivity, onDeleteActivity, onEditActivity, onEditMember, onDeleteMember }) => {
    const doneAct = member.activities.filter(a => a.done).length;
    const totalAct = member.activities.length;
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const isEditor = authService.getRole() === "Editor";

    const handleSaveActivity = (mid, actData) => {
        if (editingActivity) {
            onEditActivity(mid, actData);
        } else {
            onAddActivity(mid, actData);
        }
        setEditingActivity(null);
    };

    return (
        <div style={{ animation: "slideIn 0.3s ease" }}>
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: COLORS.textMuted, fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0 }}>← Voltar para a equipe</button>

            {/* Header com botões editar/excluir */}
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, border: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, ${COLORS.lightTeal}, ${COLORS.lightBlue})`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36
                        }}>{member.icon}</div>
                        <div>
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>{member.name}</h2>
                            <p style={{ fontSize: 14, color: COLORS.textMuted, margin: "4px 0" }}>{member.role}</p>
                            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                                {member.projectIds.map(pid => {
                                    const p = projects.find(pp => pp.id === pid);
                                    const fc = FOCUS_COLORS[p?.focus] || FOCUS_COLORS["Educação"];
                                    return p ? <Badge key={pid} colors={fc}>{p.icon} {pid}</Badge> : null;
                                })}
                            </div>
                        </div>
                    </div>
                    {isEditor && (
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => onEditMember(member)} title="Editar membro" style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 10, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s" }}>✏️</button>
                            <button onClick={() => { if (confirm("Tem certeza que deseja excluir este membro?")) { onDeleteMember(member.id); onBack(); } }} title="Excluir membro" style={{ background: "#FFE8E8", border: `1px solid #FFCACA`, borderRadius: 10, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s" }}>🗑️</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: COLORS.lightTeal, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green }}>{member.projectIds.length}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Projetos</div>
                </div>
                <div style={{ background: COLORS.lightBlue, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.blue }}>{doneAct}/{totalAct}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Atividades</div>
                </div>
                <div style={{ background: COLORS.lightGreen, borderRadius: 12, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green }}>{totalAct > 0 ? Math.round((doneAct / totalAct) * 100) : 0}%</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Progresso</div>
                </div>
            </div>

            {/* Atividades com edição */}
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Atividades ({doneAct}/{totalAct})</h3>
                    {isEditor && (
                        <button onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                                border: "none", borderRadius: 8, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer"
                            }}>
                            <span>+</span> Nova Atividade
                        </button>
                    )}
                </div>
                <div style={{ marginBottom: 12 }}><ProgressBar value={totalAct > 0 ? (doneAct / totalAct) * 100 : 0} /></div>
                {member.activities.map((act, i) => {
                    const p = projects.find(pp => pp.id === act.projectId);
                    return (
                        <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                            <div onClick={() => onToggleActivity(member.id, act.id)} style={{
                                width: 24, height: 24, borderRadius: 6,
                                border: act.done ? "none" : `2px solid ${COLORS.border}`,
                                background: act.done ? `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0
                            }}>
                                {act.done && <svg width="13" height="10" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, color: act.done ? COLORS.textMuted : COLORS.text, textDecoration: act.done ? "line-through" : "none" }}>{act.text}</div>
                                {p && <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{p.icon} {p.id} - {p.title}</div>}
                            </div>
                            <div style={{ display: "flex", gap: 4 }}>
                                {isEditor && <button onClick={() => { setEditingActivity(act); setIsActivityModalOpen(true); }} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, opacity: 0.5, padding: "2px 4px" }} title="Editar atividade">✏️</button>}
                                {isEditor && <button onClick={() => onDeleteActivity(member.id, act.id)} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 16, opacity: 0.5, padding: "2px 4px" }} title="Excluir atividade">×</button>}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ActivityFormModal isOpen={isActivityModalOpen} onClose={() => { setIsActivityModalOpen(false); setEditingActivity(null); }}
                onSave={handleSaveActivity} member={member} projects={projects} editActivity={editingActivity} />
        </div>
    );
};

window.TeamsView = ({ projects, members, onToggleActivity, onAddMember, onEditMember, onDeleteMember, onAddActivity, onDeleteActivity, onEditActivity }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const isEditor = authService.getRole() === "Editor";

    const currentMember = members.find(m => m.id === selectedMember);

    const handleEditMember = (member) => {
        setEditingMember(member);
        setIsMemberModalOpen(true);
    };

    const handleSaveMember = (data) => {
        if (editingMember) { onEditMember(data); } else { onAddMember(data); }
        setIsMemberModalOpen(false);
        setEditingMember(null);
    };

    if (currentMember) {
        return (
            <div>
                <MemberFullPage member={currentMember} projects={projects} onBack={() => setSelectedMember(null)}
                    onToggleActivity={onToggleActivity}
                    onAddActivity={onAddActivity}
                    onDeleteActivity={onDeleteActivity}
                    onEditActivity={onEditActivity}
                    onEditMember={handleEditMember}
                    onDeleteMember={onDeleteMember}
                />
                <MemberFormModal isOpen={isMemberModalOpen} onClose={() => { setIsMemberModalOpen(false); setEditingMember(null); }}
                    onSave={handleSaveMember} projects={projects} editMember={editingMember} />
            </div>
        );
    }

    return (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0 }}>Equipe LIAS</h2>
                    <p style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{members.length} membros ativos</p>
                </div>
                {isEditor && (
                    <button onClick={() => { setEditingMember(null); setIsMemberModalOpen(true); }}
                        style={{
                            display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                            border: "none", borderRadius: 10, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer"
                        }}>
                        <span>+</span> Novo Membro
                    </button>
                )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {members.map(m => <MemberCard key={m.id} member={m} projects={projects} onClick={(m) => setSelectedMember(m.id)} />)}
            </div>
            <MemberFormModal isOpen={isMemberModalOpen} onClose={() => { setIsMemberModalOpen(false); setEditingMember(null); }}
                onSave={handleSaveMember} projects={projects} editMember={editingMember} />
        </div>
    );
};
