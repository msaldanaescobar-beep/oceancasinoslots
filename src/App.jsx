import { useState, useEffect } from "react";

/* ---------------- APP PRINCIPAL ---------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [fade, setFade] = useState(true);
  const isMobile = window.innerWidth <= 480;

  const changeView = (newView) => {
    setFade(false);
    setTimeout(() => {
      setView(newView);
      setFade(true);
    }, 250);
  };

  return (
    <div style={styles.app}>
      <div style={styles.overlay}>
        <div
          style={{
            ...styles.fadeContainer,
            opacity: fade ? 1 : 0,
            transition: "opacity 250ms ease-in-out"
          }}
        >
          {view === "home" && <Home setView={changeView} isMobile={isMobile} />}
          {view === "register" && <Register setView={changeView} isMobile={isMobile} />}
          {view === "bonus" && <Bonus setView={changeView} isMobile={isMobile} />}
          {view === "installing" && <Installing setView={changeView} />}
          {view === "casino" && <Casino />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- HOME (HOTSPOTS) ---------------- */
function Home({ setView, isMobile }) {
  return (
    <>
      <button
        style={{ ...styles.hotspot, top: isMobile ? "48%" : "52%" }}
        onClick={() => setView("casino")}
      >
        ENTRAR AL CASINO
      </button>

      <button
        style={{ ...styles.hotspot, top: isMobile ? "62%" : "64%" }}
        onClick={() => setView("register")}
      >
        REGÍSTRATE
      </button>

      <button
        style={{ ...styles.hotspot, top: "74%" }}
        onClick={() => setView("bonus")}
      >
        🎁 BONO $10.000
      </button>
    </>
  );
}

/* ---------------- REGISTRO ---------------- */
function Register({ setView }) {
  return (
    <div style={styles.card}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Correo electrónico" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => setView("bonus")}>
        CREAR CUENTA
      </button>
      <p style={styles.small}>🔒 Registro rápido y seguro</p>
    </div>
  );
}

/* ---------------- BONO ---------------- */
function Bonus({ setView }) {
  const handleDownload = () => {
    setView("installing");
  };

  return (
    <div style={styles.card}>
      <h2>🎉 Cuenta creada</h2>
      <p>Descarga nuestra app y recibe</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={handleDownload}>
        DESCARGAR APP
      </button>
      <p style={styles.small}>Android · Descarga segura</p>
    </div>
  );
}

/* ---------------- INSTALANDO (PROGRESO REAL) ---------------- */
function Installing({ setView }) {
  const [progress, setProgress] = useState(0);
  const messages = [
    "Verificando seguridad…",
    "Descargando archivos…",
    "Instalando componentes…",
    "Aplicando bono…",
    "Finalizando instalación…"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setView("casino"), 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 3;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [setView]);

  return (
    <div style={styles.card}>
      <h2>📲 Instalando app</h2>
      <p>{messages[Math.min(Math.floor(progress / 20), 4)]}</p>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      <p style={styles.small}>{progress}% completado</p>
    </div>
  );
}

/* ---------------- CASINO ---------------- */
function Casino() {
  return (
    <div style={styles.card}>
      <h2>🎰 Casino</h2>

      <p style={styles.bonus}>🎁 Bono de bienvenida activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      <p style={{ fontSize: 12, opacity: 0.85 }}>
        👥 128 jugadores jugando ahora
      </p>

      <button style={styles.button} onClick={() => alert("🎰 Slot girando...")}>
        JUGAR SLOTS
      </button>

      <button
        style={{ ...styles.button, marginTop: 10 }}
        onClick={() => alert("🎡 Ruleta girando...")}
      >
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

      <p style={{ marginTop: 14, fontSize: 11, opacity: 0.75 }}>
        💡 Consejo: juega gratis antes de apostar
      </p>

      <p style={{ marginTop: 10, fontSize: 10, opacity: 0.6 }}>
        Plataforma de entretenimiento · +18
      </p>
    </div>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = {
  app: {
    minHeight: "100vh",
    backgroundImage: "url('/bg-casino.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.5)"
  },

  fadeContainer: {
    width: "100%",
    height: "100%"
  },

  hotspot: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "16px 30px",
    borderRadius: 14,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    animation: "pulse 2s infinite"
  },

  card: {
    background: "rgba(6,47,79,0.92)",
    backdropFilter: "blur(6px)",
    padding: 22,
    borderRadius: 16,
    maxWidth: 360,
    margin: "20vh auto",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)"
  },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    border: "none"
  },

  button: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  bonus: { marginTop: 12, color: "#00FFD1" },
  bonusBig: { color: "#00FFD1", fontSize: 28 },
  small: { marginTop: 10, fontSize: 12, opacity: 0.8 },

  progressBar: {
    width: "100%",
    height: 10,
    background: "#0B3A5A",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#00FFD1,#00C2A8)",
    transition: "width 0.4s ease"
  }
};

/* ---------------- ANIMACIÓN ---------------- */
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0,255,209,0.6); }
  70% { box-shadow: 0 0 0 18px rgba(0,255,209,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,255,209,0); }
}
`;
document.head.appendChild(style);
