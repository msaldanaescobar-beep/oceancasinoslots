import { useState, useEffect, useRef } from "react";

/* ================= ANIMACIÓN MONEDAS ================= */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes coinFloat {
      0% { transform: translateY(0); opacity: 0.7; }
      50% { transform: translateY(-14px); opacity: 1; }
      100% { transform: translateY(0); opacity: 0.7; }
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
        {view === "home" && <Home playFX={playFX} setView={setView} />}
        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Slots premium · Casino en vivo · Pagos rápidos
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
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1534200);
  const [win, setWin] = useState("");

  const games = ["Sweet Bonanza", "Gates of Olympus", "777 Deluxe", "Ocean Slots"];
  const names = ["Juan", "Carlos", "Pedro", "Luis", "Miguel"];

  useEffect(() => {
    const p = setInterval(
      () => setPlayers(v => Math.max(80, v + (Math.random() > 0.5 ? 1 : -1))),
      4000
    );

    const j = setInterval(
      () => setJackpot(v => v + Math.floor(Math.random() * 300)),
      2000
    );

    const w = setInterval(() => {
      const msg = `${names[Math.floor(Math.random() * names.length)]} ganó $${(
        Math.random() * 90000 + 10000
      ).toFixed(0)} en ${games[Math.floor(Math.random() * games.length)]}`;
      setWin(msg);
    }, 4500);

    return () => {
      clearInterval(p);
      clearInterval(j);
      clearInterval(w);
    };
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>ONLINE CASINO</h1>
      <h2 style={styles.subtitle}>It’s time to play</h2>

      {/* JACKPOT */}
      <div style={styles.jackpotBox}>
        <div style={styles.jackpotLabel}>💰 JACKPOT</div>
        <div style={styles.jackpotAmount}>
          ${jackpot.toLocaleString("es-CL")}
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
    position: "relative",
    marginTop: 18,
    padding: "18px 26px 30px",
    border: "3px solid red",
    borderRadius: 20,
    display: "inline-block",
    fontFamily: "Cinzel",
    boxShadow: "0 0 25px rgba(255,0,0,0.9)",
    background: "rgba(0,0,0,0.6)",
  },

  jackpotLabel: {
    fontSize: 18,
    letterSpacing: 2,
    color: "#fff",
    WebkitTextStroke: "1px red",
  },

  jackpotAmount: {
    fontSize: 38,
    fontWeight: 800,
    marginTop: 6,
    color: "#fff",
    textShadow: "0 0 12px red",
  },

  coinsWrapper: {
    position: "absolute",
    bottom: -14,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 10,
  },

  coin: {
    fontSize: 22,
    animation: "coinFloat 2.5s infinite ease-in-out",
  },

  players: { marginTop: 10, fontSize: 16 },

  buttons: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
  },

  primaryBtn: {
    width: 300,
    padding: 18,
    borderRadius: 22,
    fontSize: 18,
    fontWeight: 700,
    background: "linear-gradient(135deg, gold, orange)",
    border: "none",
  },

  secondaryBtn: {
    width: 300,
    padding: 16,
    borderRadius: 20,
    fontSize: 16,
    background: "#111",
    color: "#fff",
    border: "1px solid #444",
  },

  panel: {
    margin: "18vh auto",
    width: "90%",
    maxWidth: 420,
    background: "rgba(0,0,0,0.8)",
    padding: 24,
    borderRadius: 20,
  },

  panelTitle: { fontFamily: "Cinzel", fontSize: 26 },
  panelText: { marginTop: 12, fontSize: 16 },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    border: "none",
  },

  backBtn: {
    marginTop: 16,
    padding: 12,
    borderRadius: 14,
    border: "none",
  },

  winTicker: {
    position: "fixed",
    bottom: 14,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    padding: "10px 18px",
    borderRadius: 20,
    fontSize: 14,
  },
};
