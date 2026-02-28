// ============================================
// Auth Utils — JWT + Bcrypt
// ============================================

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "lias-dashboard-secret-dev";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;

// --- Senhas ---

async function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}

async function verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

// --- JWT ---

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

// --- Middleware de autenticação ---

/**
 * Extrai e valida o token JWT do header Authorization.
 * Retorna o payload decodificado ou null.
 */
function authMiddleware(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization || "";
    if (!authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7);
    return verifyToken(token);
}

// --- Helpers de resposta ---

function sendJSON(res, status, data) {
    res.status(status).json(data);
}

function sendError(res, status, message) {
    res.status(status).json({ error: message });
}

/**
 * Wrapper para handlers que exigem autenticação.
 * Retorna o user ou envia 401 automaticamente.
 */
function requireAuth(req, res) {
    const user = authMiddleware(req);
    if (!user) {
        sendError(res, 401, "Token inválido ou expirado");
        return null;
    }
    return user;
}

/**
 * Handler para CORS preflight (OPTIONS).
 */
function handleCors(req, res) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return true;
    }
    return false;
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    authMiddleware,
    requireAuth,
    sendJSON,
    sendError,
    handleCors,
};
