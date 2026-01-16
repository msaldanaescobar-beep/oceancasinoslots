import { useState, useEffect, useRef } from "react";

/* ---------------- APP ---------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (muted) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.18; // volumen premium casino
      audioRef.current.play().catch(() => {});
    }
  }, [muted]);

  return (
    <div style={styles.app}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIO AMBIENTE */}
      <audio ref={audioRef} src="/deep.mp3" loop preload="auto" />

      {/* BOTÓN AUDIO */}
      <button style={styles.audioBtn} onClick={() => setMuted(!muted)}>
        {muted ? "🔇" : "🔊"}
      </button>

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
  const [players, setPlayers] = useState(138);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(p => p + Math.floor(Math.random() * 3));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const vibrate = () => navigator.vibrate && navigator.vibrate(35);

  return (
    <div style={styles.centerGroup}>
      <p style={styles.heroText}>
        🎰 Juega gratis · Bono sin depósito · Acceso inmediato
      </p>

      <p style={styles.players}>
        👥 {players} jugadores conectados ahora
      </p>

      <button
        style={styles.hotspot}
        onClick={() => { vibrate(); setView("casino"); }}
      >
        ENTRAR AL CASINO
      </button>

      <button
        style={styles.hotspot}
        onClick={() => { vibrate(); setView("register"); }}
      >
        REGÍSTRATE
      </button>

      <button
        style={styles.hotspot}
        onClick={() => { vibrate(); setView("bonus"); }}
      >
        🎁 BONO $10.000
      </button>

      <p style={styles.footerText}>
        +18 · Juego responsable · Plataforma de entretenimiento
      </p>
    </div>
  );
}

/* ---------------- REGISTRO ---------------- */
function Register({ setView }) {
  return (
    <div style={styles.floatBox}>
      <h2 style={styles.title}>Crear cuenta</h2>
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
      <h2 style={styles.title}>🎉 Cuenta creada</h2>
      <p style={styles.text}>Recibes automáticamente</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={() => setView("installing")}>
        DESCARGAR APP
      </button>
    </div>
  );
}

/* ---------------- INSTALANDO ---------------- */
function Installing({ setView }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setView("casino"), 700);
          return 100;
        }
        return p + Math.floor(Math.random() * 9);
      });
    }, 420);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2 style={styles.title}>📲 Instalando app</h2>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      <p style={styles.text}>{progress}% completado</p>
    </div>
  );
}

/* ---------------- CASINO ---------------- */
function Casino() {
  return (
    <div style={styles.floatBox}>
      <h2 style={styles.title}>🎰 Casino</h2>
      <p style={styles.bonus}>🎁 Bono activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      <button style={styles.button}>JUGAR SLOTS</button>
      <button style={{ ...styles.button, marginTop: 10 }}>RULETA</button>

      <button
        style={{ ...styles.button, marginTop: 10, background: "#FFD700" }}
        onClick={() => window.open("https://TUCASINOAFILIADO.com", "_blank")}
      >
        JUGAR CON DINERO REAL
      </button>
    </div>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },

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
    background: "rgba(0,0,0,0.45)"
  },

  audioBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 5,
    fontSize: 22,
    background: "rgba(0,0,0,0.45)",
    border: "none",
    borderRadius: "50%",
    padding: 10,
    color: "#fff",
    cursor: "pointer"
  },

  glow777: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 300,
    background: "radial-gradient(circle, rgba(0,255,209,0.5), transparent 65%)",
    filter: "blur(30px)"
  },

  centerGroup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  heroText: { color: "#fff", fontSize: 20 },
  players: { color: "#00FFD1", fontSize: 18 },
  footerText: { color: "#bbb", fontSize: 12 },

  hotspot: {
    padding: "18px 36px",
    borderRadius: 18,
    border: "none",
    background: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,.35)",
    cursor: "pointer"
  },

  floatBox: {
    margin: "20vh auto",
    maxWidth: 360,
    textAlign: "center",
    color: "#fff",
    padding: 22,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(8px)",
    borderRadius: 20
  },

  title: { fontSize: 24, marginBottom: 12 },
  text: { fontSize: 16 },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "none",
    fontSize: 16
  },

  button: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    border: "none",
    background: "#00FFD1",
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer"
  },

  bonus: { color: "#00FFD1", fontSize: 16 },
  bonusBig: { color: "#00FFD1", fontSize: 30 },

  progressBar: {
    width: "100%",
    height: 14,
    background: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16
  },

  progressFill: {
    height: "100%",
    background: "#00FFD1",
    transition: "width .4s ease"
  }
};
