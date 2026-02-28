// Login & Register Page - Glassmorphism Premium

window.LoginPage = ({ onLoginSuccess }) => {
    const [mode, setMode] = useState("login"); // "login" ou "register"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const clearErrors = () => { setError(""); setSuccess(""); setFieldErrors({}); };

    const switchMode = (newMode) => {
        setMode(newMode); clearErrors();
        setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
        setShowPassword(false);
    };

    const handleLogin = (e) => {
        e.preventDefault(); clearErrors();
        let errs = {};
        if (!email.trim() || !validateEmail(email)) errs.email = "Insira um email válido";
        if (!password) errs.password = "Insira sua senha";
        if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

        setLoading(true);
        authService.login(email, password, remember)
            .then(() => onLoginSuccess())
            .catch((err) => { setError(err.message); setLoading(false); });
    };

    // Estilos
    const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 8, letterSpacing: "0.04em" };
    const inputStyle = {
        width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14, outline: "none", boxSizing: "border-box",
        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "white",
        transition: "all 0.25s ease", backdropFilter: "blur(4px)"
    };
    const focusColor = "rgba(0,200,150,0.5)";
    const errStyle = { fontSize: 11, color: "#FF6B6B", marginTop: 5, minHeight: 14 };
    const inputWrap = { marginBottom: 16 };

    const renderInput = (label, icon, type, value, onChange, placeholder, fieldKey, extra) => (
        <div style={inputWrap}>
            <label style={labelStyle}>{icon} {label}</label>
            <div style={{ position: "relative" }}>
                <input type={type} value={value} onChange={e => { onChange(e.target.value); setFieldErrors(f => ({ ...f, [fieldKey]: "" })); }}
                    disabled={loading} placeholder={placeholder}
                    onFocus={e => e.target.style.borderColor = focusColor}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.18)"}
                    style={{ ...inputStyle, paddingRight: extra ? 50 : 16, borderColor: fieldErrors[fieldKey] ? "rgba(255,80,80,0.6)" : "rgba(255,255,255,0.18)" }} />
                {extra}
            </div>
            <div style={errStyle}>{fieldErrors[fieldKey]}</div>
        </div>
    );

    const passwordToggle = (
        <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex="-1"
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 16, padding: 4 }}>
            {showPassword ? "🙈" : "👁️"}
        </button>
    );

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(135deg, #0B1A2E 0%, #0D3B66 30%, #127475 60%, #0B8457 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", overflow: "hidden"
        }}>
            {/* Blobs */}
            <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,150,0.25), transparent 70%)", top: -80, left: -100, filter: "blur(60px)", animation: "blobFloat 8s ease-in-out infinite alternate" }} />
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,100,200,0.2), transparent 70%)", bottom: -120, right: -120, filter: "blur(60px)", animation: "blobFloat 10s ease-in-out infinite alternate-reverse" }} />
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,180,0.15), transparent 70%)", top: "40%", left: "60%", filter: "blur(50px)", animation: "blobFloat 6s ease-in-out infinite alternate" }} />

            {/* Card Glassmorphism */}
            <div key={mode} style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderRadius: 24, border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                padding: "36px 36px 32px", width: 420, maxWidth: "90vw", maxHeight: "92vh", overflowY: "auto",
                animation: "loginCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative", zIndex: 10
            }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{
                        width: 100, height: 100, margin: "0 auto 14px",
                        borderRadius: 20, overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,180,130,0.3), 0 2px 8px rgba(0,0,0,0.2)"
                    }}>
                        <img src="lias-logo-original.jpg" alt="LIAS Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h1 style={{ fontSize: 21, fontWeight: 800, color: "white", margin: "0 0 5px", letterSpacing: "0.02em" }}>
                        Acessar Dashboard LIAS
                    </h1>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                        Entre com suas credenciais para continuar
                    </p>
                </div>

                {/* Mensagens */}
                {error && (
                    <div style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fadeIn 0.3s ease" }}>
                        <span style={{ fontSize: 16 }}>⚠️</span>
                        <span style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 500 }}>{error}</span>
                    </div>
                )}
                {success && (
                    <div style={{ background: "rgba(0,200,150,0.15)", border: "1px solid rgba(0,200,150,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fadeIn 0.3s ease" }}>
                        <span style={{ fontSize: 16 }}>✅</span>
                        <span style={{ fontSize: 13, color: "#00C896", fontWeight: 500 }}>{success}</span>
                    </div>
                )}

                {/* Formulário LOGIN */}
                {mode === "login" && (
                    <form onSubmit={handleLogin}>
                        {renderInput("Email", "📧", "email", email, setEmail, "admin@lias.com", "email")}
                        {renderInput("Senha", "🔒", showPassword ? "text" : "password", password, setPassword, "••••••••", "password", passwordToggle)}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                                <div onClick={() => !loading && setRemember(!remember)} style={{
                                    width: 20, height: 20, borderRadius: 6,
                                    border: remember ? "none" : "2px solid rgba(255,255,255,0.25)",
                                    background: remember ? "linear-gradient(135deg, #0B8457, #127475)" : "rgba(255,255,255,0.06)",
                                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", flexShrink: 0
                                }}>
                                    {remember && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                </div>
                                Manter conectado
                            </label>
                            <button type="button" onClick={() => alert("Funcionalidade em desenvolvimento.")}
                                style={{ background: "none", border: "none", color: "rgba(0,200,150,0.7)", fontSize: 12, cursor: "pointer", fontWeight: 500, padding: 0 }}>
                                Esqueci minha senha
                            </button>
                        </div>

                        <button type="submit" disabled={loading}
                            style={{
                                width: "100%", padding: "15px", borderRadius: 14, border: "none",
                                background: loading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #0B8457, #127475, #0D3B66)",
                                color: "white", fontSize: 15, fontWeight: 700, cursor: loading ? "wait" : "pointer",
                                transition: "all 0.3s ease", boxShadow: loading ? "none" : "0 4px 24px rgba(0,180,130,0.35)"
                            }}>
                            {loading ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                                    <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                                    Autenticando...
                                </div>
                            ) : "Entrar"}
                        </button>

                        <div style={{ textAlign: "center", marginTop: 20 }}>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Dica de Acesso:</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Membros: use a senha <strong>membro2026</strong></div>
                        </div>
                    </form>
                )}

                {/* Rodapé */}
                <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                    LIAS • Liga de Inteligência Artificial na Saúde • 2026
                </div>
            </div>

            {/* CSS Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loginCardIn {
                    from { opacity: 0; transform: translateY(30px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes blobFloat {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(30px, -20px) scale(1.1); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input::placeholder { color: rgba(255,255,255,0.3); }
                input:disabled { opacity: 0.5; cursor: not-allowed; }
            `}} />
        </div>
    );
};
