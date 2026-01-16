import { useState, useEffect, useRef } from "react";

/* ================== APP ================== */
export default function App() {
  const [view, setView] = useState("home");
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState("es");
  const audioRef = useRef(null);

  const t = {
    es: {
      enter: "ENTRAR AL CASINO",
      register: "REGÍSTRATE",
      bonus: "🎁 BONO $10.000",
      players: "jugadores conectados",
      claim: "Juega gratis · Bono sin depósito · Acceso inmediato",
      jackpot: "JACKPOT ACTUAL"
    },
    en: {
      enter: "ENTER CASINO",
      register: "REGISTER",
      bonus: "🎁 $10.000 BONUS",
      players: "players online",
      claim: "Play free · No deposit bonus · Instant access",
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
      {/* VIDEO */}
      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/VID-20260114-WA0018.mp4" type="video/mp4" />
      </video>

      {/* AUDIO */}
      <audio ref={audioRef} loop muted={muted}>
        <source src="/deep.mp3" type="audio/mpeg" />
      </audio>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.langBtn} onClick={() => setLang(lang === "es" ? "en" : "es")}>
          🌐 {lang.toUpperCase()}
        </button>
        <button style={styles.langBtn} onClick={() => setMuted(!muted)}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div style={styles.glow777} />

      <div style={styles.overlay}>
        {view === "home" && (
          <Home
            setView={setView}
            t={t[lang]}
            playSound={playSound}
          />
        )}
        {view === "register" && <Register setView={setView} playSound={playSound} />}
        {view === "bonus" && <Bonus setView={setView} playSound={playSound} />}
        {view === "installing" && <Installing setView={setView} />}
        {view === "casino" && <Casino />}
      </div>
    </div>
  );
}

/* ================== HOME ================== */
function Home({ setView, t, playSound }) {
  const [players, setPlayers] = useState(138);
  const [jackpot, setJackpot] = useState(1254300);

  useEffect(() => {
    const p = setInterval(() => setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1)), 3000);
    const j = setInterval(() => setJackpot(v => v + Math.floor(Math.random() * 120)), 2000);
    return () => {
      clearInterval(p);
      clearInterval(j);
    };
  }, []);

  return (
    <div style={styles.home}>
      <h2 style={styles.claim}>{t.claim}</h2>
      <div style={styles.players}>👥 {players} {t.players}</div>

      <div style={styles.jackpot}>
        💰 {t.jackpot}: ${jackpot.toLocaleString("es-CL")}
      </div>

      <div style={styles.centerGroup}>
        <button style={styles.hotspot} onClick={() => { playSound(); setView("casino"); }}>
          {t.enter}
        </button>
        <button style={styles.hotspotAlt} onClick={() => { playSound(); setView("register"); }}>
          {t.register}
        </button>
        <button style={styles.hotspotAlt} onClick={() => { playSound(); setView("bonus"); }}>
          {t.bonus}
        </button>
      </div>
    </div>
  );
}

/* ================== OTRAS VISTAS ================== */
function Register({ setView, playSound }) {
  return (
    <div style={styles.floatBox}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => { playSound(); setView("bonus"); }}>
        CREAR CUENTA
      </button>
    </div>
  );
}

function Bonus({ setView, playSound }) {
  return (
    <div style={styles.floatBox}>
      <h2>🎉 Bono activado</h2>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={() => { playSound(); setView("installing"); }}>
        DESCARGAR APP
      </button>
    </div>
  );
}

function Installing({ setView }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setP(v => {
        if (v >= 100) {
          clearInterval(i);
          setTimeout(() => setView("casino"), 500);
          return 100;
        }
        return v + 10;
      });
    }, 300);
  }, [setView]);

  return (
    <div style={styles.floatBox}>
      <h2>📲 Instalando</h2>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${p}%` }} />
      </div>
      <p>{p}%</p>
    </div>
  );
}

function Casino() {
  return (
    <div style={styles.floatBox}>
      <h2>🎰 Ocean Casino Slots</h2>
      <button style={styles.button}>JUGAR SLOTS</button>
    </div>
  );
}

/* ================== ESTILOS ================== */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  videoBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, zIndex: 2 },
  glow777: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 360, height: 360,
    background: "radial-gradient(circle, rgba(0,255,209,.6), transparent 70%)",
    filter: "blur(50px)", zIndex: 1
  },
  topBar: {
    position: "absolute", top: 12, right: 12, zIndex: 5,
    display: "flex", gap: 8
  },
  langBtn: {
    padding: "8px 12px", borderRadius: 10,
    border: "none", fontSize: 14
  },
  home: { textAlign: "center", color: "#fff", paddingTop: 40 },
  claim: { fontSize: 20, fontWeight: 600 },
  players: { fontSize: 16, marginTop: 6 },
  jackpot: { fontSize: 18, marginTop: 10, color: "#00FFD1" },
  centerGroup: {
    marginTop: "28vh",
    display: "flex", flexDirection: "column",
    gap: 16, alignItems: "center"
  },
  hotspot: {
    width: 280, padding: 18,
    fontSize: 18, borderRadius: 20,
    border: "none", fontWeight: "bold"
  },
  hotspotAlt: {
    width: 280, padding: 16,
    fontSize: 17, borderRadius: 18, border: "none"
  },
  floatBox: {
    margin: "20vh auto", maxWidth: 340,
    padding: 22, background: "rgba(0,0,0,.45)",
    borderRadius: 18, color: "#fff", textAlign: "center"
  },
  input: { width: "100%", padding: 14, marginBottom: 12, borderRadius: 10 },
  button: { width: "100%", padding: 16, borderRadius: 14, fontWeight: "bold" },
  progressBar: { width: "100%", height: 10, background: "#333", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", background: "#00FFD1" },
  bonusBig: { fontSize: 30, color: "#00FFD1" }
};
