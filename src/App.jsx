import { useState } from "react";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.app}>
      <div style={styles.overlay}>

        {view === "home" && <Home setView={setView} />}
        {view === "register" && <Register setView={setView} />}
        {view === "bonus" && <Bonus setView={setView} />}
        {view === "installing" && <Installing />}
        {view === "casino" && <Casino />}

      </div>
    </div>
  );
}

/* ---------------- HOME (HOTSPOTS) ---------------- */

function Home({ setView }) {
  return (
    <>
      <button
        style={{ ...styles.hotspot, top: "52%", left: "50%" }}
        onClick={() => setView("casino")}
      >
        ENTRAR AL CASINO
      </button>

      <button
        style={{ ...styles.hotspot, top: "64%", left: "50%" }}
        onClick={() => setView("register")}
      >
        REGÍSTRATE
      </button>

      <button
        style={{ ...styles.hotspot, top: "74%", left: "50%" }}
        onClick={() => setView("bonus")}
      >
        🎁 BONO $10.000
      </button>
    </>
  );
}

/* ---------------- REGISTRO ---------------- */

function Register({ setView }) {
  return (
    <div style={styles.card}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Correo electrónico" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => setView("bonus")}>
        CREAR CUENTA
      </button>
    </div>
  );
}

/* ---------------- BONO ---------------- */

function Bonus({ setView }) {
  const handleDownload = () => {
    setView("installing");
    setTimeout(() => setView("casino"), 2500);
  };

  return (
    <div style={styles.card}>
      <h2>🎉 Cuenta creada</h2>
      <p>Descarga nuestra app y recibe</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button} onClick={handleDownload}>
        DESCARGAR APP
      </button>
      <p style={styles.small}>Android · Descarga segura</p>
    </div>
  );
}

/* ---------------- INSTALANDO ---------------- */

function Installing() {
  return (
    <div style={styles.card}>
      <h2>📲 Instalando app</h2>
      <p>Preparando tu bono...</p>
      <div style={{ marginTop: 20 }}>⏳</div>
    </div>
  );
}

/* ---------------- CASINO ---------------- */

function Casino() {
  return (
    <div style={styles.card}>
      <h2>🎰 Casino</h2>

      <p style={styles.bonus}>🎁 Bono de bienvenida activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      <p style={{ fontSize: 12, opacity: 0.8 }}>
        👥 128 jugadores conectados ahora
      </p>

      <button
        style={styles.button}
        onClick={() => alert("🎰 Slot girando... ¡Buena suerte!")}
      >
        JUGAR SLOTS
      </button>

      <button
        style={{ ...styles.button, marginTop: 10 }}
        onClick={() => alert("🎡 Ruleta girando...")}
      >
        RULETA
      </button>

      <button
        style={{
          ...styles.button,
          marginTop: 10,
          background: "#FFD700",
          color: "#04293A"
        }}
        onClick={() =>
          window.open("https://TUCASINOAFILIADO.com", "_blank")
        }
      >
        JUGAR CON DINERO REAL
      </button>

      <p style={{ marginTop: 12, fontSize: 12, color: "#00FFD1" }}>
        💡 Tip: juega gratis antes de apostar con dinero real
      </p>

      <p style={{ marginTop: 16, fontSize: 11, opacity: 0.7 }}>
        Oceancasinoslots es una plataforma de entretenimiento.
        <br />
        No operamos juegos con dinero real.
      </p>
    </div>
  );
}

/* ---------------- ESTILOS ---------------- */

const styles = {
  app: {
    minHeight: "100vh",
    backgroundImage: "url('/bg-casino.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)"
  },

  hotspot: {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  padding: "14px 26px",
  borderRadius: 14,
  border: "none",
  background: "#00FFD1",
  color: "#04293A",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 0 0 rgba(0,255,209,0.7)",
  animation: "pulse 2s infinite"
},

  card: {
    background: "#062F4F",
    padding: 24,
    borderRadius: 16,
    width: "90%",
    maxWidth: 360,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    margin: "auto",
    marginTop: "20vh"
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: "none"
  },

  button: {
    width: "100%",
    padding: 14,
    borderRa04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },

  bonus: {
    marginTop: 12,
    color: "#00FFD1"
  },

  bonusBig: {
    color: "#00FFD1",
    fontSize: 28
  },

  small: {
    marginTop: 12,
    fontSize: 12,
    opacity: 0.8
  }
};
