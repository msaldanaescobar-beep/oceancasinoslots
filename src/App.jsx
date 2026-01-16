import { useState, useEffect, useRef } from "react";

/* ================= APP ================= */
export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("es");
  const [muted, setMuted] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const audioRef = useRef(null);

  /* SERVICE WORKER (PWA) */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  const playFX = () => {
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

      {/* OVERLAY */}
      <div style={styles.overlay}>
        {view === "home" && (
          <Home playFX={playFX} setView={setView} triggerWin={() => setShowWin(true)} />
        )}

        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Slots premium · Casino en vivo · Pagos rápidos
          </Panel>
        )}

        {view === "register" && <Register playFX={playFX} onBack={() => setView("home")} />}

        {view === "bonus" && (
          <Panel title="🎁 BONO $10.000" onBack={() => setView("home")}>
            Bono exclusivo para nuevos jugadores.
          </Panel>
        )}
      </div>

      {/* MONEDAS FÍSICAS */}
      <CoinRain active={showWin || view === "home"} />
    </div>
  );
}

/* ================= HOME ================= */
function Home({ playFX, setView, triggerWin }) {
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1534200);
  const [win, setWin] = useState("");
  const [withdraw, setWithdraw] = useState("");

  useEffect(() => {
    const p = setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 4000);
    const j = setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 500)), 2000);
    return () => {
      clearInterval(p);
      clearInterval(j);
    };
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>OCEAN CASINO</h1>
      <h2 style={styles.subtitle}>Play · Win · Enjoy</h2>

      <div style={styles.jackpotBox}>
        <div style={styles.jackpotLabel}>💰 JACKPOT</div>
        <div style={styles.jackpotAmount}>${jackpot.toLocaleString()}</div>
      </div>

      <div style={styles.players}>👥 {players} jugadores conectados</div>

      <div style={styles.buttons}>
        <button style={styles.primaryBtn} onClick={() => { playFX(); triggerWin(); }}>
          ENTRAR AL CASINO
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("register"); }}>
          REGÍSTRATE
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("bonus"); }}>
          🎁 BONO $10.000
        </button>
      </div>
    </div>
  );
}

/* ================= REGISTRO ================= */
function Register({ playFX, onBack }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Crear cuenta</h2>
      <input style={styles.input} placeholder="Usuario" />
      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.primaryBtn} onClick={playFX}>Crear cuenta</button>
      <button style={styles.backBtn} onClick={onBack}>⬅ Volver</button>
    </div>
  );
}

/* ================= PANEL ================= */
function Panel({ title, children, onBack }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      <p>{children}</p>
      <button style={styles.backBtn} onClick={onBack}>⬅ Volver</button>
    </div>
  );
}

/* ================= MONEDAS ================= */
function CoinRain({ active }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (!active) return;
    const spawn = () =>
      setCoins(c =>
        [...c, { id: Math.random(), x: Math.random() * window.innerWidth, y: -20 }]
      );

    const i = setInterval(spawn, 300);
    return () => clearInterval(i);
  }, [active]);

  return (
    <div style={styles.coinLayer}>
      {coins.map(c => (
        <div key={c.id} style={{ ...styles.coinPhysic, left: c.x, top: c.y }}>🪙</div>
      ))}
    </div>
  );
}

/* ================= ESTILOS ================= */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  video: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", color: "#fff" },

  topBar: { position: "absolute", top: 12, right: 12, display: "flex", gap: 8, zIndex: 20 },
  topBtn: { padding: "8px 12px", borderRadius: 10, border: "none" },

  home: { textAlign: "center", paddingTop: "14vh", fontFamily: "Inter" },

  title: {
    fontFamily: "Cinzel",
    fontSize: 48,
    color: "#FFD700",
    textShadow: "0 0 20px gold"
  },

  subtitle: { fontSize: 22 },

  jackpotBox: { marginTop: 20 },
  jackpotLabel: { fontSize: 18 },
  jackpotAmount: { fontSize: 42, fontWeight: 800 },

  players: { marginTop: 12 },

  buttons: { marginTop: 20, display: "flex", flexDirection: "column", gap: 12 },

  primaryBtn: { padding: 18, borderRadius: 20, fontSize: 18 },
  secondaryBtn: { padding: 16, borderRadius: 18 },

  panel: { margin: "15vh auto", padding: 24, background: "rgba(0,0,0,0.8)" },
  panelTitle: { fontSize: 26 },

  input: { width: "100%", padding: 12, marginTop: 10 },
  backBtn: { marginTop: 14 },

  coinLayer: { position: "fixed", inset: 0, pointerEvents: "none" },
  coinPhysic: { position: "absolute", fontSize: 26 }

};
