import { useState, useEffect } from "react";

/* ================= APP ================= */
export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.app}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY (NO bloquea clicks) */}
      <div style={styles.overlay} />

      {/* CONTENIDO */}
      <div style={styles.content}>
        {view === "home" && <Home setView={setView} />}
        {view === "register" && <Register setView={setView} />}
        {view === "bonus" && <Bonus setView={setView} />}
        {view === "installing" && <Installing setView={setView} />}
        {view === "casino" && <Casino />}
      </div>
    </div>
  );
}

/* ================= HOME ================= */
function Home({ setView }) {
  return (
    <div style={styles.homeGroup}>
      <button style={styles.homeButton} onClick={() => setView("casino")}>
        🎰 Entrar al Casino
      </button>

      <button style={styles.homeButton} onClick={() => setView("register")}>
        📝 Regístrate
      </button>

      <button style={styles.homeButton} onClick={() => setView("bonus")}>
        🎁 Bono $10.000
      </button>
    </div>
  );
}

/* ================= REGISTRO ================= */
function Register({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Correo electrónico" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => setView("bonus")}>
        Crear cuenta
      </button>
    </div>
  );
}

/* ================= BONO ================= */
function Bonus({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2>🎉 Cuenta creada</h2>
      <p>Descarga la app y recibe</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={() => setView("installing")}>
        Descargar app
      </button>
    </div>
  );
}

/* ================= INSTALANDO ================= */
function Installing({ setView }) {
  useEffect(() => {
    setTimeout(() => setView("casino"), 2500);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2>📲 Instalando app</h2>
      <p>Preparando tu bono...</p>
      <div style={{ marginTop: 12 }}>⏳</div>
    </div>
  );
}

/* ================= CASINO ================= */
function Casino() {
  return (
    <div style={styles.floatBox}>
      <h2>🎰 Casino</h2>
      <p style={styles.bonus}>🎁 Bono activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      <button style={styles.button}>Jugar Slots</button>
      <button style={{ ...styles.button, marginTop: 10 }}>Ruleta</button>

      <button
        style={{ ...styles.button, marginTop: 10, background: "#FFD700" }}
        onClick={() => window.open("https://TUCASINOAFILIADO.com", "_blank")}
      >
        Jugar con dinero real
      </button>
    </div>
  );
}

/* ================= ESTILOS ================= */
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
    objectFit: "cover",
    zIndex: 0
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 1,
    pointerEvents: "none"
  },

  content: {
    position: "relative",
    zIndex: 2
  },

  homeGroup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    zIndex: 3
  },

  homeButton: {
    padding: "14px 28px",
    borderRadius: 16,
    border: "none",
    background: "#FFFFFF",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  floatBox: {
    margin: "22vh auto",
    maxWidth: 360,
    padding: 20,
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
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  bonus: { marginTop: 10, color: "#00FFD1" },
  bonusBig: { fontSize: 26, color: "#00FFD1" }
};
