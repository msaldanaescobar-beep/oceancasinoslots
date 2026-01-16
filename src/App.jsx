import { useState, useEffect, useRef } from "react";

/* ---------------- APP ---------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current && muted) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
  };

  return (
    <div style={styles.app} onClick={playSound}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* BOTÓN AUDIO */}
      <button
        style={styles.audioToggle}
        onClick={(e) => {
          e.stopPropagation();
          if (!audioRef.current) return;
          if (muted) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
          setMuted(!muted);
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>

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
  const [players, setPlayers] = useState(142);

  useEffect(() => {
    const i = setInterval(() => {
      setPlayers(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 2500);
    return () => clearInterval(i);
  }, []);

  const vibrate = () => navigator.vibrate?.(20);

  return (
    <div style={styles.centerGroup}>
      <p style={styles.tagline}>
        🎰 Juega gratis · Bono sin depósito · Acceso inmediato
      </p>

      <p style={styles.players}>
        👥 {players} jugadores conectados ahora
      </p>

      <button
        style={styles.hotspotPrimary}
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(i);
          setTimeout(() => setView("casino"), 600);
          return 100;
        }
        return p + 5;
      });
    }, 200);
    return () => clearInterval(i);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2>📲 Instalando app</h2>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <p style={{ marginTop: 10 }}>{progress}%</p>
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
  videoBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" },

  audioToggle: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 5,
    fontSize: 22,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: 10
  },

  centerGroup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    textAlign: "center"
  },

  hotspotPrimary: {
    padding: "16px 28px",
    borderRadius: 18,
    background: "#fff",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 17
  },

  hotspot: {
    padding: "14px 26px",
    borderRadius: 18,
    background: "#fff",
    fontSize: 15
  },

  players: { fontSize: 12, opacity: 0.85 },
  tagline: { fontSize: 13, opacity: 0.9 },

  legalMini: { fontSize: 11, opacity: 0.6, marginTop: 10 },

  floatBox: {
    margin: "22vh auto",
    maxWidth: 360,
    padding: 20,
    borderRadius: 16,
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    textAlign: "center"
  },

  input: { width: "100%", padding: 14, marginBottom: 12, borderRadius: 10 },
  button: { width: "100%", padding: 14, borderRadius: 14, background: "#00FFD1", fontWeight: "bold" },

  bonus: { color: "#00FFD1" },
  bonusBig: { color: "#00FFD1", fontSize: 28 },

  progressBar: {
    width: "100%",
    height: 10,
    background: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background: "#00FFD1",
    transition: "width .3s"
  }
};
