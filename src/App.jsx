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

      {/* ANIMACIÓN VICTORIA FULL */}
      {showWin && (
        <div style={styles.winOverlay} onClick={() => setShowWin(false)}>
          <div style={styles.winContent}>
            <h1 style={styles.winTitle}>🎉 BIG WIN 🎉</h1>
            <div style={styles.winAmount}>$25.000</div>
            <div style={styles.winCoins}>🪙🪙🪙🪙🪙</div>
            <small>Toca para continuar</small>
          </div>
        </div>
      )}

      <div style={styles.overlay}>
        {view === "home" && (
          <Home
            playFX={playFX}
            setView={setView}
            triggerWin={() => setShowWin(true)}
          />
        )}

        {view === "casino" && (
          <Panel title="🎰 CASINO" onBack={() => setView("home")}>
            Slots premium · Casino en vivo · Pagos rápidos
          </Panel>
        )}

        {view === "register" && (
          <Register playFX={playFX} onBack={() => setView("home")} />
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
function Home({ playFX, setView, triggerWin }) {
  const [players, setPlayers] = useState(142);
  const [jackpot, setJackpot] = useState(1534200);
  const [win, setWin] = useState("");
  const [withdraw, setWithdraw] = useState("");

  const games = ["Sweet Bonanza", "Gates of Olympus", "Ocean Slots", "777 Deluxe"];
  const names = ["Juan", "Carlos", "Pedro", "Luis", "Miguel"];

  useEffect(() => {
    setInterval(() => {
      setPlayers(v => v + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);

    setInterval(() => {
      setJackpot(v => v + Math.floor(Math.random() * 500));
    }, 2000);

    setInterval(() => {
      const msg = `${names[Math.floor(Math.random() * names.length)]} ganó $${(
        Math.random() * 90000 + 10000
      ).toFixed(0)} en ${games[Math.floor(Math.random() * games.length)]}`;
      setWin(msg);
    }, 5000);

    setInterval(() => {
      const msg = `💸 ${
        names[Math.floor(Math.random() * names.length)]
      } retiró $${(Math.random() * 500 + 50).toFixed(0)}`;
      setWithdraw(msg);
    }, 6500);
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.title}>OCEAN CASINO</h1>
      <h2 style={styles.subtitle}>Play · Win · Enjoy</h2>

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
        <button
          style={styles.primaryBtn}
          onClick={() => {
            playFX();
            triggerWin();
            setTimeout(() => setView("casino"), 1200);
          }}
        >
          ENTRAR AL CASINO
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => {
            playFX();
            setView("register");
          }}
        >
          REGÍSTRATE
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => {
            playFX();
            setView("bonus");
          }}
        >
          🎁 BONO $10.000
        </button>
      </div>

      {/* BARRA CONFIANZA */}
      <div style={styles.trustBar}>
        <span>🔒 SSL</span>
        <span>🎰 Curacao</span>
        <span>🏛 MGA</span>
        <span>🔞 18+</span>
      </div>

      {/* TICKERS */}
      {win && <div style={styles.winTicker}>🏆 {win}</div>}
      {withdraw && <div style={styles.withdrawTicker}>{withdraw}</div>}
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

      <button style={styles.primaryBtn} onClick={playFX}>
        Crear cuenta
      </button>

      <button style={styles.backBtn} onClick={onBack}>
        ⬅ Volver
      </button>
    </div>
  );
}

/* ================= PANEL ================= */
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

  topBar: { position: "absolute", top: 12, right: 12, display: "flex", gap: 8, zIndex: 20 },
  topBtn: { padding: "8px 12px", borderRadius: 10, border: "none", fontWeight: 600 },

  home: { textAlign: "center", paddingTop: "14vh", fontFamily: "Inter" },
  title: { fontFamily: "Cinzel", fontSize: 40 },
  subtitle: { fontFamily: "Cinzel", fontSize: 20, opacity: 0.9 },

  jackpotBox: {
    position: "relative",
    marginTop: 18,
    padding: "18px 28px 36px",
    border: "3px solid red",
    borderRadius: 22,
    background: "rgba(0,0,0,0.55)",
    boxShadow: "0 0 25px rgba(255,0,0,0.9)",
    animation: "jackpotGlow 2s infinite"
  },

  jackpotLabel: { fontSize: 16 },
  jackpotAmount: { fontSize: 34, fontWeight: 800 },

  coinsWrapper: {
    position: "absolute",
    bottom: -24,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 10
  },

  coin: {
    fontSize: 22,
    animation: "coinFloat 2.5s infinite ease-in-out"
  },

  players: { marginTop: 10, fontSize: 16 },

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
    fontSize: 18,
    fontWeight: 700,
    background: "#00FFD1",
    border: "none"
  },

  secondaryBtn: {
    width: 300,
    padding: 16,
    borderRadius: 20,
    fontSize: 16,
    background: "#fff",
    border: "none"
  },

  trustBar: {
    marginTop: 18,
    display: "flex",
    justifyContent: "center",
    gap: 14,
    fontSize: 13,
    opacity: 0.9
  },

  panel: {
    margin: "18vh auto",
    width: "90%",
    maxWidth: 420,
    background: "rgba(0,0,0,0.75)",
    padding: 24,
    borderRadius: 22,
    textAlign: "center"
  },

  panelTitle: { fontFamily: "Cinzel", fontSize: 26 },
  panelText: { marginTop: 12, fontSize: 16 },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    border: "none"
  },

  backBtn: {
    marginTop: 16,
    padding: 12,
    borderRadius: 14,
    border: "none"
  },

  winTicker: {
    position: "fixed",
    bottom: 90,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    padding: "10px 18px",
    borderRadius: 20,
    fontSize: 14
  },

  withdrawTicker: {
    position: "fixed",
    bottom: 50,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(20,20,20,0.8)",
    padding: "8px 16px",
    borderRadius: 18,
    fontSize: 13
  },

  winOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },

  winContent: {
    textAlign: "center",
    color: "gold",
    fontFamily: "Cinzel",
    animation: "jackpotGlow 1.5s infinite"
  },

  winTitle: { fontSize: 42 },
  winAmount: { fontSize: 48, margin: "12px 0" },
  winCoins: { fontSize: 32 }
};
