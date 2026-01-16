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
      <button style={styles.hotspot} onClick={() => setView("casino")}>
        ENTRAR AL CASINO
      </button>

      <button style={styles.hotspot} onClick={() => setView("register")}>
        REGÍSTRATE
      </button>

      <button style={styles.hotspot} onClick={() => setView("bonus")}>
        🎁 BONO $10.000
      </button>
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

      <button style={{ ...styles.button, marginTop: 10 }}>
        RULETA
      </button>

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
    objectFit: "cover",
    zIndex: 0
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 2
  },

  glow777: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    height: 340,
    background:
      "radial-gradient(circle, rgba(0,255,209,0.45), transparent 65%)",
    filter: "blur(34px)",
    animation: "glow 6s infinite",
    zIndex: 1
  },

  /* HOTSPOTS CENTRADOS (AJUSTADOS) */
  

  hotspot: {
    padding: "14px 30px",
    borderRadius: 16,
    border: "none",
    background: "#FFFFFF",           // 🔹 blanco
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
    animation: "pulse 2.2s infinite"
  },
  centerGroup: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-40%, -40%)", // 👈 ajuste visual SOLO HOME
  display: "flex",
  flexDirection: "column",
  gap: 16,
  zIndex: 3
},

  /* CAJAS TRANSPARENTES */
  centerGroup: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-46%, -50%)", // 👈 ajuste visual SOLO HOME
  display: "flex",
  flexDirection: "column",
  gap: 16,
  zIndex: 3
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
    fontSize: 15,
    cursor: "pointer"
  },

  bonus: { marginTop: 10, color: "#00FFD1" },
  bonusBig: { color: "#00FFD1", fontSize: 26 }
};

/* ---------------- ANIMACIONES ---------------- */
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
  70% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
}
@keyframes glow {
  0%,100% { opacity: .55; }
  50% { opacity: 1; }
}
`;
document.head.appendChild(style);
