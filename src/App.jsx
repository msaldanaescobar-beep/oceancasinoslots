import { useState } from "react";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.app}>
      {view === "home" && <Home setView={setView} />}
      {view === "register" && <Register setView={setView} />}
      {view === "bonus" && <Bonus setView={setView} />}
      {view === "installing" && <Installing />}
      {view === "casino" && <Casino />}
    </div>
  );
}

function Home({ setView }) {
  return (
    <div style={styles.background}>
      <img
        src="/bg-casino.png"
        alt="Oceancasinoslots"
        style={styles.bgImage}
      />

      {/* HOTSPOT REGISTRO */}
      <div
        style={styles.hotspotRegister}
        onClick={() => setView("register")}
      />

      {/* HOTSPOT BONO */}
      <div
        style={styles.hotspotBonus}
        onClick={() => setView("bonus")}
      />
    </div>
  );
}

function Register({ setView }) {
  return (
    <div style={styles.overlay}>
      <h2>Crear cuenta</h2>
      <input style={styles.input} placeholder="Correo electrónico" />
      <input style={styles.input} type="password" placeholder="Contraseña" />
      <button style={styles.button} onClick={() => setView("bonus")}>
        CONTINUAR
      </button>
    </div>
  );
}

function Bonus({ setView }) {
  const handleDownload = () => {
    setView("installing");
    setTimeout(() => setView("casino"), 2500);
  };

  return (
    <div style={styles.overlay}>
      <h2>🎁 Bono activado</h2>
      <h1 style={{ color: "#00FFD1" }}>$10.000 CLP</h1>
      <button style={styles.button} onClick={handleDownload}>
        DESCARGAR APP
      </button>
    </div>
  );
}

function Installing() {
  return (
    <div style={styles.overlay}>
      <h2>📲 Instalando</h2>
      <p>Preparando tu bono...</p>
      <div style={{ fontSize: 32 }}>⏳</div>
    </div>
  );
}

function Casino() {
  return (
    <div style={styles.overlay}>
      <h2>🎰 Casino</h2>

      <button
        style={styles.button}
        onClick={() => alert("🎰 Slot girando...")}
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

      <p style={{ marginTop: 12, fontSize: 11, opacity: 0.7 }}>
        Plataforma de entretenimiento · +18
      </p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#000"
  },

  background: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden"
  },

  bgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  hotspotRegister: {
    position: "absolute",
    top: "40%",
    left: "15%",
    width: "70%",
    height: "20%",
    cursor: "pointer"
  },

  hotspotBonus: {
    position: "absolute",
    bottom: "10%",
    left: "15%",
    width: "70%",
    height: "15%",
    cursor: "pointer"
  },

  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    color: "#fff",
    textAlign: "center"
  },

  input: {
    width: "100%",
    maxWidth: 300,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: "none"
  },

  button: {
    width: "100%",
    maxWidth: 300,
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  }
};
