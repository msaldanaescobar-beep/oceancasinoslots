import { useState, useEffect, useRef } from "react";

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("es");
  const [muted, setMuted] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const audioRef = useRef(null);

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
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop muted={muted}>
        <source src="/deep.mp3" type="audio/mpeg" />
      </audio>

      <div style={styles.topBar}>
        <button style={styles.topBtn} onClick={() => setLang(lang === "es" ? "en" : "es")}>
          🌐 {lang.toUpperCase()}
        </button>
        <button style={styles.topBtn} onClick={() => setMuted(!muted)}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {showWin && (
        <div style={styles.winOverlay} onClick={() => setShowWin(false)}>
          <div style={styles.winContent}>
            <h1 style={styles.winTitle}>BIG WIN</h1>
            <div style={styles.winAmount}>$25.000</div>
            <div style={styles.winCoins}>🪙🪙🪙🪙🪙</div>
            <small>Toca para continuar</small>
          </div>
        </div>
      )}

      <CoinRain active={showWin} />

      <div style={styles.overlay}>
        {view === "home" && (
          <Home playFX={playFX} setView={setView} triggerWin={() => setShowWin(true)} />
        )}
        {view === "register" && <Register playFX={playFX} onBack={() => setView("home")} />}
        {view === "casino" && <Panel title="CASINO" onBack={() => setView("home")} />}
        {view === "bonus" && <Panel title="BONO $10.000" onBack={() => setView("home")} />}
      </div>
    </div>
  );
}

function Home({ playFX, setView, triggerWin }) {
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1534200);
  const [win, setWin] = useState("");

  const games = ["Sweet Bonanza", "Gates of Olympus", "Ocean Slots"];
  const names = ["Juan", "Carlos", "Pedro", "Luis", "Miguel"];

  useEffect(() => {
    setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 4000);
    setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 400)), 1800);
    setInterval(() => {
      setWin(
        `${names[Math.floor(Math.random() * names.length)]} ganó $${(
          Math.random() * 80000 + 10000
        ).toFixed(0)} en ${games[Math.floor(Math.random() * games.length)]}`
      );
    }, 4500);
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>OCEAN CASINO</h1>
      <h2 style={styles.subtitle}>Vegas Style Online Casino</h2>

      <div style={styles.jackpotBox}>
        <div style={styles.jackpotLabel}>JACKPOT</div>
        <div style={styles.jackpotAmount}>${jackpot.toLocaleString("es-CL")}</div>
        <div style={styles.jackpotCoins}>🪙 🪙 🪙</div>
      </div>

      <div style={styles.players}>👥 {players} jugadores conectados</div>

      <div style={styles.buttons}>
        <button
          style={styles.primaryBtn}
          onClick={() => {
            playFX();
            triggerWin();
            setTimeout(() => setView("casino"), 1000);
          }}
        >
          ENTRAR AL CASINO
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("register"); }}>
          REGÍSTRATE
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playFX(); setView("bonus"); }}>
          🎁 BONO $10.000
        </button>
      </div>

      <div style={styles.trustBar}>
        🔒 SSL · 🎰 Curacao · 🏛 MGA · 🔞 18+
      </div>

      {win && <div style={styles.winTicker}>🏆 {win}</div>}
    </div>
  );
}

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

function Panel({ title, onBack }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      <button style={styles.backBtn} onClick={onBack}>⬅ Volver</button>
    </div>
  );
}

function CoinRain({ active }) {
  if (!active) return null;
  return <div style={styles.coinLayer}>🪙🪙🪙🪙🪙</div>;
}

const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  video: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", color: "#fff" },

  topBar: { position: "absolute", top: 12, right: 12, display: "flex", gap: 8, zIndex: 50 },
  topBtn: { padding: "8px 12px", borderRadius: 10, border: "none", fontWeight: 600 },

  home: { textAlign: "center", paddingTop: "14vh", fontFamily: "Inter" },

  title: {
    fontFamily: "Cinzel",
    fontSize: 50,
    color: "#FFD700",
    textShadow: "0 0 20px rgba(255,215,0,0.9)"
  },

  subtitle: { fontFamily: "Cinzel", fontSize: 22, marginBottom: 16 },

  jackpotBox: {
    border: "3px solid red",
    borderRadius: 22,
    padding: "16px 26px",
    display: "inline-block",
    boxShadow: "0 0 30px rgba(255,0,0,0.8)",
    background: "rgba(0,0,0,0.65)"
  },

  jackpotLabel: { fontFamily: "Cinzel", fontSize: 18, letterSpacing: 2 },
  jackpotAmount: {
    fontFamily: "Cinzel",
    fontSize: 42,
    fontWeight: 900,
    color: "#FFD700",
    textShadow: "0 0 18px gold"
  },
  jackpotCoins: { marginTop: 6, fontSize: 22 },

  players: { marginTop: 12 },

  buttons: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center"
  },

  primaryBtn: {
    width: 320,
    padding: 18,
    borderRadius: 26,
    fontSize: 20,
    fontFamily: "Cinzel",
    background: "linear-gradient(#FFD700,#FFB700)",
    border: "2px solid red",
    fontWeight: 800
  },

  secondaryBtn: {
    width: 320,
    padding: 16,
    borderRadius: 24,
    fontFamily: "Cinzel",
    background: "rgba(0,0,0,0.85)",
    color: "#FFD700",
    border: "2px solid #FFD700"
  },

  trustBar: { marginTop: 18, fontSize: 13 },

  winTicker: {
    position: "fixed",
    top: 90,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    padding: "10px 18px",
    borderRadius: 20,
    fontFamily: "Cinzel",
    fontSize: 14,
    zIndex: 40
  },

  panel: {
    margin: "20vh auto",
    maxWidth: 420,
    background: "rgba(0,0,0,0.8)",
    padding: 24,
    borderRadius: 20,
    textAlign: "center"
  },

  panelTitle: { fontFamily: "Cinzel", fontSize: 28 },
  input: { width: "100%", padding: 12, marginTop: 10, borderRadius: 12 },
  backBtn: { marginTop: 16 },

  winOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  winContent: { textAlign: "center", fontFamily: "Cinzel", color: "gold" },
  winTitle: { fontSize: 42 },
  winAmount: { fontSize: 48 },
  winCoins: { fontSize: 32 },

  coinLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    fontSize: 30,
    textAlign: "center"
  }
};
