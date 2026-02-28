const { useState, useEffect } = React;

const Calendar = ({ currentDate, onDateChange, events, onDayClick, selectedDate }) => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const getEventsForDay = (day) => {
        const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => ds >= e.startDate && ds <= e.endDate);
    };
    const isToday = (day) => { const t = new Date(); return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day; };
    const isSelected = (day) => selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;

    const days = [];
    for (let i = 0; i < firstDayWeekday; i++) days.push(<div key={`e-${i}`} style={{ padding: 8 }} />);
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDay(day);
        days.push(
            <div key={day} onClick={() => onDayClick(new Date(year, month, day))}
                style={{
                    padding: 4, minHeight: 70, border: `1px solid ${COLORS.border}`, borderRadius: 8, cursor: "pointer",
                    background: isSelected(day) ? COLORS.lightTeal : isToday(day) ? COLORS.lightBlue : COLORS.card, transition: "all 0.2s"
                }}>
                <div style={{ fontSize: 12, fontWeight: isToday(day) ? 700 : 500, color: isToday(day) ? COLORS.blue : COLORS.text, marginBottom: 4, padding: "2px 6px" }}>{day}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {dayEvents.slice(0, 2).map((ev, i) => (
                        <div key={i} style={{
                            fontSize: 9, padding: "2px 4px", borderRadius: 4, background: EVENT_COLORS[ev.colorIndex % EVENT_COLORS.length].bg,
                            color: EVENT_COLORS[ev.colorIndex % EVENT_COLORS.length].text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500
                        }}>
                            {ev.title}
                        </div>
                    ))}
                    {dayEvents.length > 2 && <div style={{ fontSize: 9, color: COLORS.textMuted, paddingLeft: 4 }}>+{dayEvents.length - 2} mais</div>}
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <button onClick={() => onDateChange(new Date(year, month - 1, 1))}
                    style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 14 }}>←</button>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{monthNames[month]} {year}</h3>
                <button onClick={() => onDateChange(new Date(year, month + 1, 1))}
                    style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 14 }}>→</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                {dayNames.map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, padding: 8 }}>{d}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>{days}</div>
        </div>
    );
};

const EventFormModal = ({ isOpen, onClose, onSave, projects, editEvent, selectedDate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectId, setProjectId] = useState("");
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        if (editEvent) { setTitle(editEvent.title); setDescription(editEvent.description || ""); setStartDate(editEvent.startDate); setEndDate(editEvent.endDate); setProjectId(editEvent.projectId || ""); setColorIndex(editEvent.colorIndex); }
        else if (selectedDate) { const ds = selectedDate.toISOString().split('T')[0]; setStartDate(ds); setEndDate(ds); }
    }, [editEvent, selectedDate, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !startDate || !endDate) return;
        onSave({ id: editEvent?.id || Date.now(), title: title.trim(), description: description.trim(), startDate, endDate, projectId, colorIndex });
        setTitle(""); setDescription(""); setStartDate(""); setEndDate(""); setProjectId(""); setColorIndex(0);
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: COLORS.card, borderRadius: 16, padding: 28, width: 480, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{editEvent ? "Editar Evento" : "Novo Evento"}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Título *</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Aula inaugural" required
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" }} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Descrição</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição do evento..." rows={3}
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none", resize: "vertical" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Início *</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required
                                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Fim *</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required min={startDate}
                                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none" }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Projeto</label>
                        <select value={projectId} onChange={e => setProjectId(e.target.value)}
                            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none", background: COLORS.card }}>
                            <option value="">Nenhum projeto</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.id} - {p.title}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Cor</label>
                        <div style={{ display: "flex", gap: 8 }}>
                            {EVENT_COLORS.map((color, i) => (
                                <div key={i} onClick={() => setColorIndex(i)}
                                    style={{
                                        width: 32, height: 32, borderRadius: 8, background: color.bg,
                                        border: colorIndex === i ? `3px solid ${color.border}` : `1px solid ${color.border}`, cursor: "pointer", transition: "all 0.2s"
                                    }} />
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: COLORS.textMuted }}>Cancelar</button>
                        <button type="submit" style={{ flex: 1, padding: "12px", background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "white" }}>{editEvent ? "Salvar" : "Criar Evento"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const EventsList = ({ events, projects, selectedDate, onEdit, onDelete }) => {
    const formatDate = (ds) => new Date(ds + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const filtered = selectedDate
        ? events.filter(e => { const ds = selectedDate.toISOString().split('T')[0]; return ds >= e.startDate && ds <= e.endDate; })
        : [...events].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    const getProject = (pid) => projects.find(p => p.id === pid);

    return (
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>
                {selectedDate ? `Eventos em ${selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}` : "Próximos Eventos"}
            </h3>
            {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: COLORS.textMuted }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
                    <div style={{ fontSize: 14 }}>Nenhum evento {selectedDate ? "neste dia" : "cadastrado"}</div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filtered.map(event => {
                        const color = EVENT_COLORS[event.colorIndex % EVENT_COLORS.length];
                        const project = getProject(event.projectId);
                        return (
                            <div key={event.id} style={{ background: color.bg, borderRadius: 12, padding: 16, borderLeft: `4px solid ${color.border}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: color.text, marginBottom: 4 }}>{event.title}</div>
                                        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>📅 {formatDate(event.startDate)}{event.startDate !== event.endDate && ` → ${formatDate(event.endDate)}`}</div>
                                        {event.description && <div style={{ fontSize: 12, color: COLORS.text, marginBottom: 8 }}>{event.description}</div>}
                                        {project && <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.card, padding: "4px 10px", borderRadius: 20, fontSize: 11, color: COLORS.textMuted }}><span>{project.icon}</span><span>{project.id}</span></div>}
                                    </div>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        <button onClick={() => onEdit(event)} style={{ background: COLORS.card, border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", fontSize: 12 }}>✏️</button>
                                        <button onClick={() => onDelete(event.id)} style={{ background: COLORS.card, border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", fontSize: 12 }}>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

window.TimelineView = ({ projects, events, onAddEvent, onEditEvent, onDeleteEvent }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const handleSaveEvent = (data) => { editingEvent ? onEditEvent(data) : onAddEvent(data); setEditingEvent(null); };

    return (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0 }}>Calendário de Eventos</h2>
                    <p style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{events.length} eventos cadastrados</p>
                </div>
                <button onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
                    style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                        background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`,
                        border: "none", borderRadius: 10, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer"
                    }}>
                    <span>+</span> Novo Evento
                </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
                <Calendar currentDate={currentDate} onDateChange={setCurrentDate} events={events} onDayClick={setSelectedDate} selectedDate={selectedDate} />
                <EventsList events={events} projects={projects} selectedDate={selectedDate} onEdit={(ev) => { setEditingEvent(ev); setIsModalOpen(true); }} onDelete={onDeleteEvent} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
                {[
                    { label: "Total de Eventos", value: events.length, icon: "📅", color: COLORS.green },
                    { label: "Este Mês", value: events.filter(e => new Date(e.startDate).getMonth() === currentDate.getMonth()).length, icon: "📆", color: COLORS.teal },
                    { label: "Multi-dia", value: events.filter(e => e.startDate !== e.endDate).length, icon: "📊", color: COLORS.blue },
                    { label: "Com Projeto", value: events.filter(e => e.projectId).length, icon: "🔗", color: COLORS.cyan },
                ].map((s, i) => (
                    <div key={i} style={{ background: COLORS.card, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                        <div><div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{s.value}</div><div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.label}</div></div>
                    </div>
                ))}
            </div>
            <EventFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingEvent(null); }}
                onSave={handleSaveEvent} projects={projects} editEvent={editingEvent} selectedDate={selectedDate} />
        </div>
    );
};
