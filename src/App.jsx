import { useState, useEffect } from "react";

/* ---------------- APP ---------------- */
export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.app}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* GLOW CENTRAL */}
      <div style={styles.glow777} />

      {/* OVERLAY */}
      <div style={styles.overlay}>
        {view === "home" && <Home setView={setView} />}
        {view === "register" && <Register setView={setView} />}
        {view === "bonus" && <Bonus setView={setView} />}
        {view === "installing" && <Installing setView={setView} />}
        {view === "casino" && <Casino />}
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home({ setView }) {
  return (
    <div style={styles.centerGroup}>
      <p style={styles.tagline}>
        🎰 Juega gratis · Bono sin depósito · Acceso inmediato
      </p>

      <button
        style={styles.hotspotPrimary}
        onClick={() => setView("casino")}
      >
        ENTRAR AL CASINO
      </button>

      <button
        style={styles.hotspot}
        onClick={() => setView("register")}
      >
        REGÍSTRATE
      </button>

      <button
        style={styles.hotspot}
        onClick={() => setView("bonus")}
      >
        🎁 BONO $10.000
      </button>

      <p style={styles.legalMini}>
        +18 · Juego responsable · Plataforma de entretenimiento
      </p>
    </div>
  );
}

/* ---------------- REGISTRO ---------------- */
function Register({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Correo electrónico" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => setView("bonus")}>
        CREAR CUENTA
      </button>
    </div>
  );
}

/* ---------------- BONO ---------------- */
function Bonus({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2>🎉 Cuenta creada</h2>
      <p>Descarga nuestra app y recibe</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={() => setView("installing")}>
        DESCARGAR APP
      </button>
    </div>
  );
}

/* ---------------- INSTALANDO ---------------- */
function Installing({ setView }) {
  useEffect(() => {
    setTimeout(() => setView("casino"), 2500);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2>📲 Instalando app</h2>
      <p>Preparando tu bono...</p>
      <div style={{ marginTop: 16 }}>⏳</div>
    </div>
  );
}

/* ---------------- CASINO ---------------- */
function Casino() {
  return (
    <div style={styles.floatBox}>
      <h2>🎰 Casino</h2>
      <p style={styles.bonus}>🎁 Bono activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      <button style={styles.button}>JUGAR SLOTS</button>
      <button style={{ ...styles.button, marginTop: 10 }}>RULETA</button>

      <button
        style={{
          ...styles.button,
          marginTop: 10,
          background: "#FFD700",
          color: "#04293A"
        }}
        onClick={() => window.open("https://TUCASINOAFILIADO.com", "_blank")}
      >
        JUGAR CON DINERO REAL
      </button>
    </div>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = {
  app: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "#000"
  },

  videoBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  glow777: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    height: 320,
    background:
      "radial-gradient(circle, rgba(0,255,209,0.4), transparent 65%)",
    filter: "blur(30px)",
    animation: "glow 6s infinite"
  },

  /* 🔥 CENTRADO REAL */
  centerGroup: {
    width: "100%",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "0 16px",
    textAlign: "center"
  },

  tagline: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.85,
    marginBottom: 6
  },

  hotspotPrimary: {
    width: "100%",
    padding: "14px",
    borderRadius: 18,
    border: "none",
    background: "#FFFFFF",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    boxShadow: "0 10px 28px rgba(0,0,0,0.6)"
  },

  hotspot: {
    width: "100%",
    padding: "12px",
    borderRadius: 16,
    border: "none",
    background: "#FFFFFF",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.45)"
  },

  legalMini: {
    fontSize: 11,
    opacity: 0.6,
    color: "#fff",
    marginTop: 8
  },

  floatBox: {
    maxWidth: 340,
    padding: 18,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(6px)",
    borderRadius: 16,
    textAlign: "center",
    color: "#fff"
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    border: "none"
  },

  button: {
    width: "100%",
    padding: 13,
    borderRadius: 14,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 15
  },

  bonus: { marginTop: 10, color: "#00FFD1" },
  bonusBig: { color: "#00FFD1", fontSize: 26 }
};

/* ---------------- ANIMACIONES ---------------- */
const style = document.createElement("style");
style.innerHTML = `
@keyframes glow {
  0%,100% { opacity: .6; }
  50% { opacity: 1; }
}
button:active {
  transform: scale(0.97);
}
`;
document.head.appendChild(style);
