import { useState, useEffect, useRef } from "react";

/* ================= CONFIG ================= */
const TELEGRAM_USER = "Oceancasinoslots";
const TELEGRAM_MSG = encodeURIComponent(
  "Hola, quiero activar el bono VIP de Ocean Casino 🎰"
);

/* ================= APP ================= */
export default function App() {
  const [muted, setMuted] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const audioRef = useRef(null);

  /* SERVICE WORKER */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  /* QUITAR SPLASH */
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      setTimeout(() => {
        splash.style.opacity = "0";
        splash.style.transition = "opacity .6s";
        setTimeout(() => splash.remove(), 600);
      }, 800);
    }
  }, []);

  const playFX = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
    navigator.vibrate?.(40);
  };

  return (
    <div style={styles.app}>
      {/* FUENTES */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&display=swap"
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
        <button style={styles.topBtn} onClick={() => setMuted(!muted)}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* WIN OVERLAY */}
      {showWin && (
        <div style={styles.winOverlay} onClick={() => setShowWin(false)}>
          <div style={styles.winContent}>
            <h1>🎉 BIG WIN 🎉</h1>
            <div style={styles.winAmount}>$25.000</div>
            <small>Toca para continuar</small>
          </div>
        </div>
      )}

      <CoinRain active={showWin} />

      <div style={styles.overlay}>
        <Home playFX={playFX} triggerWin={() => setShowWin(true)} />
      </div>

      <TelegramFloating />
    </div>
  );
}

/* ================= HOME ================= */
function Home({ playFX, triggerWin }) {
  const [jackpot, setJackpot] = useState(1534200);
  const [fakeWin, setFakeWin] = useState("");
  const [seconds, setSeconds] = useState(600);

  const users = [
    ["Matías", "🇨🇱"],
    ["Andrea", "🇲🇽"],
    ["Luis", "🇵🇪"],
    ["Carlos", "🇨🇴"],
    ["Sofía", "🇦🇷"]
  ];

  useEffect(() => {
    setInterval(() => {
      setJackpot(v => v + Math.floor(Math.random() * 500));
    }, 2000);

    setInterval(() => {
      const u = users[Math.floor(Math.random() * users.length)];
      setFakeWin(`${u[1]} ${u[0]} retiró $${(Math.random() * 20000 + 15000).toFixed(0)}`);
    }, 4500);

    setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 600));
    }, 1000);
  }, []);
/* ================= LIVE ACTIVITY BAR ================= */
function LiveActivity() {
  const [msg, setMsg] = useState("");

  const messages = [
    "Jugador de 🇨🇱 retiró $72.000",
    "Nuevo jugador activó bono VIP",
    "Usuario volvió a jugar hace 3 min",
    "Jackpot sigue subiendo 💰",
    "Mesa en vivo con cupos limitados"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsg(messages[Math.floor(Math.random() * messages.length)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!msg) return null;

  return (
    <div style={{
      position: "fixed",
      top: 60,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.75)",
      padding: "8px 18px",
      borderRadius: 20,
      fontSize: 13,
      zIndex: 50
    }}>
      🔴 {msg}
    </div>
  );
}

  return (
    <div style={styles.home}>
      {fakeWin && <div style={styles.fakeWinTop}>🏆 {fakeWin}</div>}

      <h1 style={styles.title}>OCEAN CASINO</h1>
      <h2 style={styles.subtitle}>Estilo Vegas · Pagos Rápidos</h2>

      <div style={styles.jackpotBox}>
        <div style={styles.jackpotLabel}>💰 JACKPOT</div>
        <div style={styles.jackpotAmount}>
          ${jackpot.toLocaleString("es-CL")}
        </div>
      </div>

      <div style={styles.trustCopy}>
        ✔ Pagos reales en minutos<br />
        ✔ Atención directa por Telegram<br />
        ✔ Casinos verificados LATAM
      </div>

      <div style={styles.timer}>
        ⏳ Bono VIP Chile expira en{" "}
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
        {String(seconds % 60).padStart(2, "0")}
      </div>

      <button
        style={styles.primaryBtn}
        onClick={() => {
          playFX();
          triggerWin();
          window.open(
            `https://t.me/${TELEGRAM_USER}?text=${TELEGRAM_MSG}`,
            "_blank"
          );
        }}
      >
        🎰 ACTIVAR BONO VIP AHORA
      </button>

      <small style={styles.small}>
        Cupos limitados · Prioridad Chile
      </small>
    </div>
  );
}

/* ================= TELEGRAM FLOATING ================= */
function TelegramFloating() {
  return (
    <a
      href={`https://t.me/${TELEGRAM_USER}?text=${TELEGRAM_MSG}`}
      target="_blank"
      rel="noreferrer"
      style={styles.telegramBtn}
    >
      💬 Telegram VIP
    </a>
  );
}

/* ================= MONEDAS ================= */
function CoinRain({ active }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (!active) return;

    const createCoin = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -40,
      vy: Math.random() * 2 + 2
    });

    let list = Array.from({ length: 18 }, createCoin);
    setCoins(list);

    let raf;
    const animate = () => {
      list = list.map(c => ({
        ...c,
        y: c.y + c.vy > window.innerHeight ? -40 : c.y + c.vy
      }));
      setCoins([...list]);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div style={styles.coinLayer}>
      {coins.map(c => (
        <div key={c.id} style={{ ...styles.coin, transform: `translate(${c.x}px, ${c.y}px)` }}>
          🪙
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: { minHeight: "100vh", position: "relative", overflow: "hidden" },
  video: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,.55)" },

  topBar: { position: "absolute", top: 12, right: 12, zIndex: 20 },
  topBtn: { padding: 10, borderRadius: 10 },

  home: { textAlign: "center", paddingTop: "14vh", color: "#fff" },

  title: { fontFamily: "Cinzel", fontSize: 48, color: "#FFD700", textShadow: "0 0 20px red" },
  subtitle: { fontFamily: "Playfair Display", fontSize: 20 },

  jackpotBox: {
    border: "2px solid red",
    padding: 20,
    borderRadius: 20,
    margin: "20px auto",
    width: 320,
    background: "rgba(0,0,0,.7)"
  },

  jackpotLabel: { fontFamily: "Cinzel", fontSize: 18 },
  jackpotAmount: { fontFamily: "Cinzel", fontSize: 42, color: "gold" },

  trustCopy: { fontSize: 14, marginTop: 10, lineHeight: 1.5 },

  timer: { marginTop: 14, fontWeight: 700, color: "#ff4d4d" },

  primaryBtn: {
    marginTop: 24,
    padding: "18px 26px",
    borderRadius: 30,
    fontSize: 20,
    fontFamily: "Cinzel",
    background: "linear-gradient(#FFD700,#FFB700)",
    border: "none",
    cursor: "pointer"
  },

  small: { display: "block", marginTop: 6, opacity: .8 },

  fakeWinTop: {
    position: "fixed",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,.7)",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 14
  },

  telegramBtn: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#229ED9",
    color: "#fff",
    padding: "14px 18px",
    borderRadius: 50,
    fontWeight: 700,
    textDecoration: "none",
    zIndex: 999
  },

  coinLayer: { position: "fixed", inset: 0, pointerEvents: "none" },
  coin: { position: "absolute", fontSize: 26 },

  winOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },

  winContent: { color: "gold", fontFamily: "Cinzel", textAlign: "center" },
  winAmount: { fontSize: 46 }
};
