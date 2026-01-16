import { useState, useEffect, useRef } from "react";

/* ================== APP ================== */
export default function App() {
  const [view, setView] = useState("home");
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState("es");
  const audioRef = useRef(null);

  const t = {
    es: {
      title: "CASINO ONLINE",
      subtitle: "Es hora de jugar",
      claim: "Juega gratis · Bono sin depósito · Acceso inmediato",
      enter: "ENTRAR AL CASINO",
      register: "REGÍSTRATE",
      bonus: "🎁 BONO $10.000",
      players: "jugadores conectados",
      jackpot: "JACKPOT ACTUAL"
    },
    en: {
      title: "ONLINE CASINO",
      subtitle: "It's time to play",
      claim: "Play free · No deposit bonus · Instant access",
      enter: "ENTER CASINO",
      register: "REGISTER",
      bonus: "🎁 $10.000 BONUS",
      players: "players online",
      jackpot: "CURRENT JACKPOT"
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
    if (navigator.vibrate) navigator.vibrate(30);
  };

  return (
    <div style={styles.app}>
      {/* FUENTES */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* VIDEO FONDO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
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
          <Home
            t={t[lang]}
            playSound={playSound}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}

/* ================== HOME ================== */
function Home({ t, playSound, setView }) {
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1523400);

  useEffect(() => {
    const p = setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 3500);
    const j = setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 150)), 2000);
    return () => { clearInterval(p); clearInterval(j); };
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>{t.title}</h1>
      <h2 style={styles.subtitle}>{t.subtitle}</h2>

      <p style={styles.claim}>{t.claim}</p>

      <div style={styles.jackpot}>
        💰 {t.jackpot}: ${jackpot.toLocaleString("es-CL")}
      </div>

      <div style={styles.players}>
        👥 {players} {t.players}
      </div>

      <div style={styles.buttons}>
        <button style={styles.primaryBtn} onClick={() => { playSound(); setView("casino"); }}>
          {t.enter}
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playSound(); setView("register"); }}>
          {t.register}
        </button>

        <button style={styles.secondaryBtn} onClick={() => { playSound(); setView("bonus"); }}>
          {t.bonus}
        </button>
      </div>

      <p style={styles.responsible}>
        +18 · Juego responsable · Plataforma de entretenimiento
      </p>
    </div>
  );
}

/* ================== ESTILOS ================== */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  videoBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", color: "#fff" },

  topBar: {
    position: "absolute", top: 14, right: 14,
    zIndex: 10, display: "flex", gap: 8
  },
  topBtn: {
    padding: "8px 12px", borderRadius: 10,
    border: "none", fontFamily: "Inter", fontWeight: 600
  },

  home: {
    textAlign: "center",
    paddingTop: "12vh",
    fontFamily: "Inter"
  },

  title: {
    fontFamily: "Cinzel",
    fontSize: 36,
    letterSpacing: 2
  },
  subtitle: {
    fontFamily: "Cinzel",
    fontSize: 20,
    opacity: 0.9
  },
  claim: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 500
  },
  jackpot: {
    marginTop: 18,
    fontSize: 22,
    color: "#00FFD1",
    fontWeight: 700
  },
  players: {
    marginTop: 6,
    fontSize: 16,
    opacity: 0.9
  },

  buttons: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center"
  },

  primaryBtn: {
    width: 300,
    padding: 18,
    borderRadius: 22,
    border: "none",
    fontSize: 18,
    fontWeight: 700,
    background: "#fff",
    color: "#04293A"
  },

  secondaryBtn: {
    width: 300,
    padding: 16,
    borderRadius: 20,
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    background: "rgba(255,255,255,0.9)"
  },

  responsible: {
    marginTop: 30,
    fontSize: 13,
    opacity: 0.75
  }
};
