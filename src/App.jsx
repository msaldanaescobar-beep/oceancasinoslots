import { useState, useEffect, useRef } from "react";

/* =========================
   CONFIG GLOBAL
========================= */
const BUTTON_SOUND = "/click.mp3"; // sonido botón
const WIN_SOUND = "/win.mp3";       // sonido win
const AUDIO_AMBIENT = "/deep.mp3";

/* =========================
   APP
========================= */
export default function App() {
  const [view, setView] = useState("splash");
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState("es");

  const ambientRef = useRef(null);
  const clickRef = useRef(null);
  const winRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setView("home"), 2200);
  }, []);

  useEffect(() => {
    if (!ambientRef.current) return;
    if (muted) ambientRef.current.pause();
    else {
      ambientRef.current.volume = 0.18;
      ambientRef.current.play().catch(() => {});
    }
  }, [muted]);

  const playClick = () => {
    if (!muted && clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
    navigator.vibrate && navigator.vibrate(30);
  };

  return (
    <div remind-app-installation style={styles.app}>
      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIOS */}
      <audio ref={ambientRef} src={AUDIO_AMBIENT} loop />
      <audio ref={clickRef} src={BUTTON_SOUND} />
      <audio ref={winRef} src={WIN_SOUND} />

      {/* BOTONES TOP */}
      <button style={styles.audioBtn} onClick={() => setMuted(!muted)}>
        {muted ? "🔇" : "🔊"}
      </button>

      <select
        style={styles.langSelect}
        value={lang}
        onChange={e => setLang(e.target.value)}
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>

      {/* OVERLAY */}
      <div style={styles.overlay}>
        {view === "splash" && <Splash />}
        {view === "home" && <Home setView={setView} playClick={playClick} />}
        {view === "casino" && (
          <Casino playClick={playClick} playWin={() => winRef.current?.play()} />
        )}
      </div>
    </div>
  );
}

/* =========================
   SPLASH SCREEN
========================= */
function Splash() {
  return (
    <div style={styles.splash}>
      <div style={styles.logo777}>777</div>
      <p style={{ color: "#00FFD1" }}>Cargando casino...</p>
    </div>
  );
}

/* =========================
   HOME
========================= */
function Home({ setView, playClick }) {
  const [players, setPlayers] = useState(138);

  useEffect(() => {
    const i = setInterval(
      () => setPlayers(p => p + Math.floor(Math.random() * 3)),
      3000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <div style={styles.centerGroup}>
      <p style={styles.hero}>🎰 Juega gratis · Bono sin depósito</p>
      <p style={styles.players}>👥 {players} jugadores conectados</p>

      <button
        style={styles.hotspot}
        onClick={() => {
          playClick();
          setView("casino");
        }}
      >
        ENTRAR AL CASINO
      </button>

      <button style={styles.hotspot} onClick={playClick}>
        REGÍSTRATE
      </button>

      <button style={styles.hotspot} onClick={playClick}>
        🎁 BONO $10.000
      </button>

      <FakeWinsTicker />
    </div>
  );
}

/* =========================
   CASINO
========================= */
function Casino({ playClick, playWin }) {
  const [jackpot, setJackpot] = useState(1843200);
  const [coins, setCoins] = useState(false);

  useEffect(() => {
    const i = setInterval(
      () => setJackpot(j => j + Math.floor(Math.random() * 250)),
      1200
    );
    return () => clearInterval(i);
  }, []);

  const win = () => {
    playClick();
    playWin();
    setCoins(true);
    setTimeout(() => setCoins(false), 1600);
  };

  return (
    <div style={styles.floatBox}>
      <h2>🎰 Casino</h2>
      <p style={styles.jackpot}>
        💰 JACKPOT ${jackpot.toLocaleString("es-CL")}
      </p>

      <button style={styles.button} onClick={win}>
        GIRAR SLOT
      </button>

      {coins && <Coins />}
    </div>
  );
}

/* =========================
   COMPONENTES EXTRA
========================= */

function FakeWinsTicker() {
  const wins = [
    "Carlos ganó $85.000",
    "María ganó $120.000",
    "Luis ganó $40.000",
    "Ana ganó $200.000"
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % wins.length), 2600);
    return () => clearInterval(t);
  }, []);

  return <div style={styles.ticker}>🏆 {wins[i]}</div>;
}

function Coins() {
  return (
    <div style={styles.coins}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={styles.coin}>🪙</span>
      ))}
    </div>
  );
}

/* =========================
   ESTILOS
========================= */
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
    background: "rgba(0,0,0,.45)"
  },

  audioBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 10,
    fontSize: 20,
    background: "rgba(0,0,0,.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: 10
  },

  langSelect: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 10
  },

  splash: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  logo777: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFD700",
    textShadow: "0 0 30px #FFD700"
  },

  centerGroup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 16
  },

  hero: { color: "#fff", fontSize: 20 },
  players: { color: "#00FFD1" },

  hotspot: {
    padding: "18px 34px",
    borderRadius: 18,
    background: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    border: "none"
  },

  ticker: {
    marginTop: 18,
    color: "#FFD700",
    fontSize: 14
  },

  floatBox: {
    margin: "22vh auto",
    maxWidth: 360,
    background: "rgba(0,0,0,.5)",
    padding: 22,
    borderRadius: 18,
    textAlign: "center",
    color: "#fff"
  },

  button: {
    width: "100%",
    padding: 16,
    marginTop: 14,
    borderRadius: 14,
    background: "#00FFD1",
    border: "none",
    fontWeight: "bold"
  },

  jackpot: {
    color: "#FFD700",
    fontSize: 18
  },

  coins: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none"
  },

  coin: {
    position: "absolute",
    animation: "coin 1.5s ease-out forwards"
  }
};

/* =========================
   ANIMACIONES
========================= */
const style = document.createElement("style");
style.innerHTML = `
@keyframes coin {
  from { transform: translateY(0) scale(1); opacity: 1; }
  to { transform: translateY(-120px) scale(.5); opacity: 0; }
}
`;
document.head.appendChild(style);
