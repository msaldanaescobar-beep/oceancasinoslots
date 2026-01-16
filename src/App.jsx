import { useState, useEffect, useRef } from "react";

/* ================= ANIMACIONES GLOBALES ================= */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes coinFloat {
      0% { transform: translateY(0); opacity: 0.6; }
      50% { transform: translateY(-22px); opacity: 1; }
      100% { transform: translateY(0); opacity: 0.6; }
    }

    @keyframes jackpotGlow {
      0% { box-shadow: 0 0 20px rgba(255,0,0,0.6); }
      50% { box-shadow: 0 0 40px rgba(255,215,0,1); }
      100% { box-shadow: 0 0 20px rgba(255,0,0,0.6); }
    }

    @keyframes headerGlow {
      0% { text-shadow: 0 0 8px gold; }
      50% { text-shadow: 0 0 18px red; }
      100% { text-shadow: 0 0 8px gold; }
    }
  `;
  document.head.appendChild(style);
}

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
    if (navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div style={styles.app}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Inter:wght@400;600;700&display=swap"
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

      {/* HEADER VEGAS */}
      <header style={styles.header}>
        <span style={styles.logo}>OCEAN CASINO</span>
        <div>
          <button style={styles.headerBtn} onClick={() => setLang(lang === "es" ? "en" : "es")}>
            🌐 {lang.toUpperCase()}
          </button>
          <button style={styles.headerBtn} onClick={() => setMuted(!muted)}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      <div style={styles.overlay}>
        {view === "home" && <Home playFX={playFX} setView={setView} />}
        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Slots premium · Casino en vivo · Pagos instantáneos
          </Panel>
        )}
        {view === "register" && <Register onBack={() => setView("home")} playFX={playFX} />}
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
  const [players, setPlayers] = useState(148);
  const [displayJackpot, setDisplayJackpot] = useState(1500000);
  const [targetJackpot, setTargetJackpot] = useState(1500000);
  const [win, setWin] = useState("");

  const games = ["Sweet Bonanza", "Gates of Olympus", "777 Deluxe", "Ocean Slots"];
  const names = ["Juan", "Carlos", "Pedro", "Luis", "Miguel"];

  useEffect(() => {
    setInterval(() => setPlayers(v => Math.max(90, v + (Math.random() > 0.5 ? 1 : -1))), 4000);
    setInterval(() => setTargetJackpot(v => v + Math.floor(Math.random() * 400)), 2000);

    setInterval(() => {
      const msg = `${names[Math.floor(Math.random() * names.length)]} ganó $${(
        Math.random() * 80000 + 12000
      ).toFixed(0)} en ${games[Math.floor(Math.random() * games.length)]}`;
      setWin(msg);
    }, 4500);
  }, []);

  useEffect(() => {
    const smooth = setInterval(() => {
      setDisplayJackpot(v => (v < targetJackpot ? v + 25 : v));
    }, 30);
    return () => clearInterval(smooth);
  }, [targetJackpot]);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>ONLINE CASINO</h1>
      <h2 style={styles.subtitle}>It’s time to play</h2>

      {/* JACKPOT */}
      <div style={styles.jackpotBox}>
        <div style={styles.jackpotLabel}>💰 JACKPOT</div>
        <div style={styles.jackpotAmount}>
          ${displayJackpot.toLocaleString("es-CL")}
        </div>

        <div style={styles.coinsWrapper}>
          <span style={styles.coin}>🪙</span>
          <span style={styles.coin}>🪙</span>
          <span style={styles.coin}>🪙</span>
        </div>
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

      {win && <div style={styles.winTicker}>🏆 {win}</div>}
    </div>
  );
}

/* ================= REGISTRO PREMIUM ================= */
function Register({ onBack, playFX }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Crear cuenta</h2>
      <p style={styles.panelText}>Acceso inmediato · Pagos rápidos · Soporte 24/7</p>

      <input placeholder="Usuario" style={styles.input} />
      <input placeholder="Email" style={styles.input} />
      <input type="password" placeholder="Contraseña" style={styles.input} />

      <button style={styles.primaryBtn} onClick={playFX}>
        Crear cuenta ahora
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
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", color: "#fff" },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "12px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
  },

  logo: {
    fontFamily: "Cinzel",
    fontSize: 22,
    color: "gold",
    animation: "headerGlow 3s infinite"
  },

  headerBtn: { marginLeft: 8, padding: "8px 12px", borderRadius: 10 },

  home: { textAlign: "center", paddingTop: "18vh", fontFamily: "Inter" },
  title: { fontFamily: "Cinzel", fontSize: 42 },
  subtitle: { fontFamily: "Cinzel", fontSize: 22 },

  jackpotBox: {
    marginTop: 20,
    padding: "22px 30px 40px",
    border: "3px solid red",
    borderRadius: 22,
    fontFamily: "Cinzel",
    background: "rgba(0,0,0,0.65)",
    animation: "jackpotGlow 2.5s infinite"
  },

  jackpotLabel: { fontSize: 18, letterSpacing: 2 },
  jackpotAmount: { fontSize: 40, fontWeight: 800 },

  coinsWrapper: {
    marginTop: 14,
    display: "flex",
    justifyContent: "center",
    gap: 12
  },

  coin: { fontSize: 24, animation: "coinFloat 2.8s infinite" },

  players: { marginTop: 10 },
  buttons: { marginTop: 28, display: "flex", flexDirection: "column", gap: 14 },

  primaryBtn: {
    padding: 18,
    borderRadius: 22,
    fontSize: 18,
    background: "linear-gradient(135deg, gold, orange)",
    border: "none"
  },

  secondaryBtn: {
    padding: 16,
    borderRadius: 20,
    background: "#111",
    color: "#fff"
  },

  panel: {
    margin: "20vh auto",
    width: "90%",
    maxWidth: 420,
    background: "rgba(0,0,0,0.85)",
    padding: 26,
    borderRadius: 22
  },

  panelTitle: { fontFamily: "Cinzel", fontSize: 26 },
  panelText: { marginTop: 10 },

  input: { width: "100%", padding: 14, marginTop: 12, borderRadius: 14 },

  backBtn: { marginTop: 18, padding: 12 },

  winTicker: {
    position: "fixed",
    bottom: 14,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    padding: "10px 18px",
    borderRadius: 20
  }
};
