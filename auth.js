// Auth Service - MVP sem backend
// Credenciais admin padrão
window.AUTH_CONFIG = {
    ADMIN_EMAIL: "admin@lias.com",
    ADMIN_PASSWORD: "lias2026"
};

window.authService = {
    _getUsers: function () {
        try { return JSON.parse(localStorage.getItem("lias_users") || "[]"); } catch (e) { return []; }
    },
    _saveUsers: function (users) {
        localStorage.setItem("lias_users", JSON.stringify(users));
    },
    register: function (name, email, password) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (!name || !email || !password) {
                    reject({ message: "Preencha todos os campos obrigatórios" }); return;
                }
                if (email === AUTH_CONFIG.ADMIN_EMAIL) {
                    reject({ message: "Este email já está em uso" }); return;
                }
                var users = authService._getUsers();
                if (users.find(function (u) { return u.email === email; })) {
                    reject({ message: "Este email já está cadastrado" }); return;
                }
                users.push({ id: Date.now(), name: name, email: email, password: password, createdAt: new Date().toISOString() });
                authService._saveUsers(users);
                resolve({ success: true });
            }, 600);
        });
    },
    login: function (email, password, remember) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var isAdmin = email === AUTH_CONFIG.ADMIN_EMAIL && password === AUTH_CONFIG.ADMIN_PASSWORD;
                var users = authService._getUsers();
                var user = users.find(function (u) { return u.email === email && u.password === password; });

                if (isAdmin || user) {
                    var token = "lias_auth_" + Date.now() + "_" + Math.random().toString(36).substr(2);
                    var userName = isAdmin ? "Admin" : user.name;
                    var storage = remember ? localStorage : sessionStorage;
                    storage.setItem("lias_auth_token", token);
                    storage.setItem("lias_auth_email", email);
                    storage.setItem("lias_auth_name", userName);
                    storage.setItem("lias_auth_storage", remember ? "local" : "session");
                    localStorage.setItem("lias_auth_type", remember ? "local" : "session");
                    resolve({ success: true, token: token, name: userName });
                } else {
                    reject({ message: "Email ou senha incorretos" });
                }
            }, 800);
        });
    },
    logout: function () {
        localStorage.removeItem("lias_auth_token");
        localStorage.removeItem("lias_auth_email");
        localStorage.removeItem("lias_auth_name");
        localStorage.removeItem("lias_auth_type");
        sessionStorage.removeItem("lias_auth_token");
        sessionStorage.removeItem("lias_auth_email");
        sessionStorage.removeItem("lias_auth_name");
        sessionStorage.removeItem("lias_auth_storage");
    },
    isAuthenticated: function () {
        var authType = localStorage.getItem("lias_auth_type");
        if (authType === "local") {
            return !!localStorage.getItem("lias_auth_token");
        } else {
            return !!sessionStorage.getItem("lias_auth_token");
        }
    },
    getEmail: function () {
        return localStorage.getItem("lias_auth_email") || sessionStorage.getItem("lias_auth_email") || "";
    },
    getName: function () {
        return localStorage.getItem("lias_auth_name") || sessionStorage.getItem("lias_auth_name") || "";
    }
};
