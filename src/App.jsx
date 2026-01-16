import { useState, useEffect, useRef } from "react";

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("es");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  const playFX = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <div style={styles.app}>
      {/* FUENTES */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* VIDEO FONDO */}
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
          <Home playFX={playFX} setView={setView} />
        )}
        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Slots premium · Casino en vivo · Pagos rápidos
          </Panel>
        )}
        {view === "register" && (
          <Register onBack={() => setView("home")} playFX={playFX} />
        )}
        {view === "bonus" && (
          <Panel title="🎁 BONO $10.000" onBack={() => setView("home")}>
            Bono exclusivo para nuevos jugadores.
          </Panel>
        )}
      </div>
    </div>
  );
}

/* ================= HOME ================= */
function Home({ playFX, setView }) {
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1534200);
  const [win, setWin] = useState("");

  const games = ["Sweet Bonanza", "Gates of Olympus", "777 Deluxe", "Ocean Slots"];
  const names = ["Juan", "Carlos", "Pedro", "Luis", "Miguel"];

  useEffect(() => {
    const p = setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 4000);
    const j = setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 300)), 2000);

    const w = setInterval(() => {
      const msg = `${names[Math.floor(Math.random() * names.length)]} ganó $${(
        Math.random() * 90000 + 10000
      ).toFixed(0)} en ${games[Math.floor(Math.random() * games.length)]}`;
      setWin(msg);
    }, 4500);

    return () => { clearInterval(p); clearInterval(j); clearInterval(w); };
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>ONLINE CASINO</h1>
      <h2 style={styles.subtitle}>It’s time to play</h2>

      {/* JACKPOT */}
      <div style={styles.jackpotBox}>
        💰 JACKPOT <br />
        <span style={styles.jackpotAmount}>
          ${jackpot.toLocaleString("es-CL")}
        </span>
        <div style={styles.coins}>🪙 🪙 🪙</div>
      </div>

      <div style={styles.players}>👥 {players} jugadores conectados</div>

      <div style={styles.buttons}>
        <button style={styles.primaryBtn} onClick={() => { playFX(); setView("casino"); }}>
          ENTRAR AL CASINO
        </button>
        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("register"); }}>
          REGÍSTRATE
        </button>
        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("bonus"); }}>
          🎁 BONO $10.000
        </button>
      </div>

      {/* LIVE WINS */}
      {win && <div style={styles.winTicker}>🏆 {win}</div>}
    </div>
  );
}

/* ================= REGISTRO ================= */
function Register({ onBack, playFX }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Crear cuenta</h2>

      <input placeholder="Usuario" style={styles.input} />
      <input placeholder="Email" style={styles.input} />
      <input type="password" placeholder="Contraseña" style={styles.input} />

      <button style={styles.primaryBtn} onClick={playFX}>
        Crear cuenta
      </button>

      <button style={styles.backBtn} onClick={onBack}>⬅ Volver</button>
    </div>
  );
}

/* ================= PANEL ================= */
function Panel({ title, children, onBack }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      <p style={styles.panelText}>{children}</p>
      <button style={styles.backBtn} onClick={onBack}>⬅ Volver</button>
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
  title: { fontFamily: "Cinzel", fontSize: 40 },
  subtitle: { fontFamily: "Cinzel", fontSize: 20 },

  jackpotBox: {
    marginTop: 18,
    padding: 16,
    border: "3px solid red",
    borderRadius: 18,
    display: "inline-block",
    fontFamily: "Cinzel",
    boxShadow: "0 0 20px red"
  },
  jackpotAmount: { fontSize: 30, fontWeight: 800, color: "#fff" },
  coins: { marginTop: 6, animation: "pulse 2s infinite" },

  players: { marginTop: 10, fontSize: 16 },

  buttons: { marginTop: 30, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },

  primaryBtn: { width: 300, padding: 18, borderRadius: 22, fontSize: 18, fontWeight: 700 },
  secondaryBtn: { width: 300, padding: 16, borderRadius: 20, fontSize: 16 },

  panel: { margin: "18vh auto", width: "90%", maxWidth: 420, background: "rgba(0,0,0,0.75)", padding: 24, borderRadius: 20 },
  panelTitle: { fontFamily: "Cinzel", fontSize: 26 },
  panelText: { marginTop: 12, fontSize: 16 },

  input: { width: "100%", padding: 12, marginTop: 10, borderRadius: 12, border: "none" },
  backBtn: { marginTop: 16, padding: 12, borderRadius: 14, border: "none" },

  winTicker: {
    position: "fixed",
    bottom: 14,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    padding: "10px 18px",
    borderRadius: 20,
    fontSize: 14
  }
};
