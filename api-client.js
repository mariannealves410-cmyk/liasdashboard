// ============================================
// API Client — Camada de fetch para o frontend
// ============================================
// Este módulo substitui o acesso direto a dados hardcoded.
// Todas as chamadas passam pela API serverless → Notion.

window.apiClient = (() => {
    const BASE = "/api";

    // --- Token management ---
    function _getToken() {
        return localStorage.getItem("lias_auth_token") || sessionStorage.getItem("lias_auth_token") || "";
    }

    function _setToken(token, remember) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("lias_auth_token", token);
        localStorage.setItem("lias_auth_type", remember ? "local" : "session");
    }

    function _clearToken() {
        localStorage.removeItem("lias_auth_token");
        localStorage.removeItem("lias_auth_type");
        localStorage.removeItem("lias_auth_email");
        localStorage.removeItem("lias_auth_name");
        sessionStorage.removeItem("lias_auth_token");
        sessionStorage.removeItem("lias_auth_email");
        sessionStorage.removeItem("lias_auth_name");
        sessionStorage.removeItem("lias_auth_storage");
    }

    function _headers() {
        const h = { "Content-Type": "application/json" };
        const token = _getToken();
        if (token) h["Authorization"] = `Bearer ${token}`;
        return h;
    }

    // --- Generic fetch ---
    async function _fetch(path, method = "GET", body = null) {
        const opts = { method, headers: _headers() };
        if (body && method !== "GET") opts.body = JSON.stringify(body);
        const res = await fetch(`${BASE}${path}`, opts);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
        return data;
    }

    // =========================
    // AUTH (com fallback local)
    // =========================
    const LOCAL_CREDENTIALS = {
        admin: { email: "admin@lias.com", password: "lias2026", name: "Admin", role: "Editor" },
        memberPassword: "membro2026"
    };

    function _localLogin(email, password) {
        const admin = LOCAL_CREDENTIALS.admin;
        if (email === admin.email && password === admin.password) {
            return { token: "local_" + Date.now() + "_" + Math.random().toString(36).substr(2), email: admin.email, name: admin.name, role: admin.role };
        }
        if (password === LOCAL_CREDENTIALS.memberPassword) {
            const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            return { token: "local_" + Date.now() + "_" + Math.random().toString(36).substr(2), email, name, role: "Membro" };
        }
        return null;
    }

    async function login(email, password, remember) {
        let data;
        try {
            data = await _fetch("/auth-login", "POST", { email, password });
        } catch (err) {
            // Fallback para autenticação local quando o backend não está disponível
            data = _localLogin(email, password);
            if (!data) throw new Error("Email ou senha incorretos");
        }
        _setToken(data.token, remember);
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("lias_auth_email", data.email);
        storage.setItem("lias_auth_name", data.name);
        storage.setItem("lias_auth_role", data.role);
        if (remember) {
            localStorage.setItem("lias_auth_storage", "local");
        } else {
            sessionStorage.setItem("lias_auth_storage", "session");
        }
        return data;
    }

    async function register(name, email, password) {
        return _fetch("/auth-register", "POST", { name, email, password });
    }

    async function me() {
        return _fetch("/auth-me");
    }

    function logout() {
        _clearToken();
        localStorage.removeItem("lias_auth_role");
        sessionStorage.removeItem("lias_auth_role");
    }

    function isAuthenticated() {
        return !!_getToken();
    }

    function getEmail() {
        return localStorage.getItem("lias_auth_email") || sessionStorage.getItem("lias_auth_email") || "";
    }

    function getName() {
        return localStorage.getItem("lias_auth_name") || sessionStorage.getItem("lias_auth_name") || "";
    }

    function getRole() {
        return localStorage.getItem("lias_auth_role") || sessionStorage.getItem("lias_auth_role") || "Membro";
    }

    // =========================
    // PROJETOS
    // =========================
    async function getProjects() {
        return _fetch("/projects");
    }

    async function getProject(id) {
        return _fetch(`/projects?id=${id}`);
    }

    async function createProject(data) {
        return _fetch("/projects", "POST", data);
    }

    async function updateProject(id, data) {
        return _fetch(`/projects?id=${id}`, "PUT", data);
    }

    async function deleteProject(id) {
        return _fetch(`/projects?id=${id}`, "DELETE");
    }

    // =========================
    // TAREFAS
    // =========================
    async function getTasks(projectId) {
        const query = projectId ? `?projectId=${projectId}` : "";
        return _fetch(`/tasks${query}`);
    }

    async function createTask(data) {
        return _fetch("/tasks", "POST", data);
    }

    async function updateTask(id, data) {
        return _fetch(`/tasks?id=${id}`, "PUT", data);
    }

    async function deleteTask(id) {
        return _fetch(`/tasks?id=${id}`, "DELETE");
    }

    // =========================
    // MEMBROS
    // =========================
    async function getMembers() {
        return _fetch("/members");
    }

    async function getMember(id) {
        return _fetch(`/members?id=${id}`);
    }

    async function createMember(data) {
        return _fetch("/members", "POST", data);
    }

    async function updateMember(id, data) {
        return _fetch(`/members?id=${id}`, "PUT", data);
    }

    async function deleteMember(id) {
        return _fetch(`/members?id=${id}`, "DELETE");
    }

    // =========================
    // EVENTOS
    // =========================
    async function getEvents() {
        return _fetch("/events");
    }

    async function createEvent(data) {
        return _fetch("/events", "POST", data);
    }

    async function updateEvent(id, data) {
        return _fetch(`/events?id=${id}`, "PUT", data);
    }

    async function deleteEvent(id) {
        return _fetch(`/events?id=${id}`, "DELETE");
    }

    // =========================
    // ATIVIDADES
    // =========================
    async function getActivities(memberId) {
        const query = memberId ? `?memberId=${memberId}` : "";
        return _fetch(`/activities${query}`);
    }

    async function createActivity(data) {
        return _fetch("/activities", "POST", data);
    }

    async function updateActivity(id, data) {
        return _fetch(`/activities?id=${id}`, "PUT", data);
    }

    async function deleteActivity(id) {
        return _fetch(`/activities?id=${id}`, "DELETE");
    }

    // =========================
    // Exportar API pública
    // =========================
    return {
        // Auth
        login, register, me, logout, isAuthenticated, getEmail, getName, getRole,
        // Projetos
        getProjects, getProject, createProject, updateProject, deleteProject,
        // Tarefas
        getTasks, createTask, updateTask, deleteTask,
        // Membros
        getMembers, getMember, createMember, updateMember, deleteMember,
        // Eventos
        getEvents, createEvent, updateEvent, deleteEvent,
        // Atividades
        getActivities, createActivity, updateActivity, deleteActivity,
    };
})();

// Compatibilidade com o authService existente
window.authService = {
    login: (email, password, remember) => apiClient.login(email, password, remember),
    register: (name, email, password) => apiClient.register(name, email, password),
    logout: () => apiClient.logout(),
    isAuthenticated: () => apiClient.isAuthenticated(),
    getEmail: () => apiClient.getEmail(),
    getName: () => apiClient.getName(),
    getRole: () => apiClient.getRole(),
};
