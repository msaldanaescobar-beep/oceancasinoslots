import { useState, useEffect, useRef } from "react";

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("es");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
    if (navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div style={styles.app}>
      {/* FUENTES */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* VIDEO */}
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIO */}
      <audio ref={audioRef} loop muted={muted}>
        <source src="/deep.mp3" type="audio/mpeg" />
      </audio>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.topBtn} onClick={() => setLang(lang === "es" ? "en" : "es")}>
          🌐 {lang.toUpperCase()}
        </button>
        <button style={styles.topBtn} onClick={() => setMuted(!muted)}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div style={styles.overlay}>
        {view === "home" && (
          <Home playSound={playSound} setView={setView} />
        )}

        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Juegos en vivo, slots premium y jackpots progresivos.
          </Panel>
        )}

        {view === "register" && (
          <Panel title="📝 REGISTRO" onBack={() => setView("home")}>
            Registro rápido · Sin verificación · Acceso inmediato.
          </Panel>
        )}

        {view === "bonus" && (
          <Panel title="🎁 BONO $10.000" onBack={() => setView("home")}>
            Bono promocional exclusivo para nuevos jugadores.
          </Panel>
        )}
      </div>
    </div>
  );
}

/* ================= HOME ================= */
function Home({ playSound, setView }) {
  const [players, setPlayers] = useState(148);
  const [jackpot, setJackpot] = useState(1532000);

  useEffect(() => {
    const p = setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 4000);
    const j = setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 200)), 2500);
    return () => { clearInterval(p); clearInterval(j); };
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>CASINO ONLINE</h1>
      <h2 style={styles.subtitle}>Es hora de jugar</h2>

      <div style={styles.jackpot}>
        💰 JACKPOT: ${jackpot.toLocaleString("es-CL")}
      </div>

      <div style={styles.players}>
        👥 {players} jugadores conectados
      </div>

      <div style={styles.buttons}>
        <button style={styles.primaryBtn} onClick={() => { playSound(); setView("casino"); }}>
          ENTRAR AL CASINO
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playSound(); setView("register"); }}>
          REGÍSTRATE
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playSound(); setView("bonus"); }}>
          🎁 BONO $10.000
        </button>
      </div>
    </div>
  );
}

/* ================= PANEL REUTILIZABLE ================= */
function Panel({ title, children, onBack }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      <p style={styles.panelText}>{children}</p>

      <button style={styles.backBtn} onClick={onBack}>
        ⬅ Volver
      </button>
    </div>
  );
}

/* ================= ESTILOS ================= */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  video: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", color: "#fff" },

  topBar: { position: "absolute", top: 12, right: 12, display: "flex", gap: 8, zIndex: 10 },
  topBtn: { padding: "8px 12px", borderRadius: 10, border: "none", fontWeight: 600 },

  home: { textAlign: "center", paddingTop: "14vh", fontFamily: "Inter" },
  title: { fontFamily: "Cinzel", fontSize: 38 },
  subtitle: { fontFamily: "Cinzel", fontSize: 20, opacity: 0.9 },

  jackpot: { marginTop: 16, fontSize: 22, color: "#00FFD1", fontWeight: 700 },
  players: { marginTop: 6, fontSize: 16, opacity: 0.85 },

  buttons: { marginTop: 30, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },

  primaryBtn: {
    width: 300, padding: 18, borderRadius: 22,
    fontSize: 18, fontWeight: 700, border: "none"
  },
  secondaryBtn: {
    width: 300, padding: 16, borderRadius: 20,
    fontSize: 16, fontWeight: 600, border: "none"
  },

  panel: {
    margin: "20vh auto",
    width: "90%",
    maxWidth: 420,
    background: "rgba(0,0,0,0.75)",
    padding: 24,
    borderRadius: 20,
    textAlign: "center"
  },
  panelTitle: { fontFamily: "Cinzel", fontSize: 24 },
  panelText: { marginTop: 12, fontSize: 16, opacity: 0.9 },
  backBtn: { marginTop: 20, padding: 12, borderRadius: 14, border: "none" }
};
