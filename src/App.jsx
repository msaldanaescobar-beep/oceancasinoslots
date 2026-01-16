import { useState, useEffect, useRef } from "react";

/* ================== APP ================== */
export default function App() {
  const [view, setView] = useState("home");
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.volume = 0.35;
  }, []);

  return (
    <div style={styles.app}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIO AMBIENTE */}
      <audio ref={audioRef} autoPlay loop muted={muted}>
        <source src="/deep.mp3" type="audio/mpeg" />
      </audio>

      {/* BOTÓN AUDIO */}
      <button
        onClick={() => setMuted(!muted)}
        style={styles.audioToggle}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* GLOW */}
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

/* ================== HOME ================== */
function Home({ setView }) {
  const [players, setPlayers] = useState(137);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.homeWrapper}>
      {/* TEXTO SUPERIOR */}
      <div style={styles.heroText}>
        🎰 Juega gratis · Bono sin depósito · Acceso inmediato
      </div>

      <div style={styles.players}>
        👥 {players} jugadores conectados ahora
      </div>

      {/* BOTONES */}
      <div style={styles.centerGroup}>
        <button style={styles.hotspot} onClick={() => setView("casino")}>
          ENTRAR AL CASINO
        </button>

        <button style={styles.hotspotAlt} onClick={() => setView("register")}>
          REGÍSTRATE
        </button>

        <button style={styles.hotspotAlt} onClick={() => setView("bonus")}>
          🎁 BONO $10.000
        </button>
      </div>

      <div style={styles.footer}>
        +18 · Juego responsable · Ocean Casino Slots
      </div>
    </div>
  );
}

/* ================== REGISTRO ================== */
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

/* ================== BONUS ================== */
function Bonus({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2>🎉 Cuenta creada</h2>
      <p>Recibiste</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={() => setView("installing")}>
        DESCARGAR APP
      </button>
    </div>
  );
}

/* ================== INSTALANDO ================== */
function Installing({ setView }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(i);
          setTimeout(() => setView("casino"), 600);
          return 100;
        }
        return p + 8;
      });
    }, 250);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2>📲 Instalando app</h2>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <p>{progress}%</p>
    </div>
  );
}

/* ================== CASINO ================== */
function Casino() {
  return (
    <div style={styles.floatBox}>
      <h2>🎰 Bienvenido</h2>
      <p style={styles.bonus}>🎁 Bono activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>

      <button style={styles.button}>🎰 JUGAR SLOTS</button>
      <button style={{ ...styles.button, marginTop: 10 }}>
        🎯 RULETA
      </button>

      <button
        style={{ ...styles.button, marginTop: 10, background: "#FFD700" }}
        onClick={() => window.open("https://TUCASINOAFILIADO.com", "_blank")}
      >
        💰 JUGAR CON DINERO REAL
      </button>
    </div>
  );
}

/* ================== ESTILOS ================== */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },

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
    zIndex: 2
  },

  glow777: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    height: 320,
    background:
      "radial-gradient(circle, rgba(0,255,209,0.6), transparent 70%)",
    filter: "blur(40px)",
    zIndex: 1
  },

  audioToggle: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 4,
    fontSize: 22,
    background: "rgba(0,0,0,.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 44,
    height: 44
  },

  homeWrapper: {
    position: "relative",
    height: "100%",
    textAlign: "center",
    color: "#fff"
  },

  heroText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600"
  },

  players: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.85
  },

  centerGroup: {
    marginTop: "30vh",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center"
  },

  hotspot: {
    width: 260,
    padding: 16,
    fontSize: 18,
    borderRadius: 18,
    border: "none",
    fontWeight: "bold",
    background: "#fff",
    color: "#04293A"
  },

  hotspotAlt: {
    width: 260,
    padding: 14,
    fontSize: 16,
    borderRadius: 16,
    border: "none",
    background: "#ffffffee"
  },

  footer: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    fontSize: 12,
    opacity: 0.7
  },

  floatBox: {
    margin: "20vh auto",
    maxWidth: 340,
    padding: 20,
    textAlign: "center",
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(8px)",
    borderRadius: 18,
    color: "#fff"
  },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    border: "none"
  },

  button: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    fontWeight: "bold",
    background: "#00FFD1"
  },

  progressBar: {
    width: "100%",
    height: 10,
    background: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16
  },

  progressFill: {
    height: "100%",
    background: "#00FFD1"
  },

  bonus: { color: "#00FFD1" },
  bonusBig: { color: "#00FFD1", fontSize: 28 }
};
