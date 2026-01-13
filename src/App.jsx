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
    <div style={styles.card}>
      <h1 style={styles.title}>🌊 Oceancasinoslots</h1>
      <p style={styles.subtitle}>Casino & Slots Online</p>
      <button style={styles.button} onClick={() => setView("register")}>
        REGÍSTRATE Y JUEGA
      </button>
      <p style={styles.bonus}>🎁 Bono de bienvenida $10.000 CLP</p>
    </div>
  );
}

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

function Bonus({ setView }) {
  const handleDownload = () => {
    setView("installing");
    setTimeout(() => {
      setView("casino");
    }, 2500);
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

function Installing() {
  return (
    <div style={styles.card}>
      <h2>📲 Instalando app</h2>
      <p>Preparando tu bono...</p>
      <div style={{ marginTop: 20 }}>⏳</div>
    </div>
  );
}

function Casino() {
  return (
    <div style={styles.card}>
      <h2>🎰 Casino</h2>

      {/* Bono reforzado */}
      <p style={styles.bonus}>🎁 Bono de Bienvenida Activo</p>
      <h3 style={styles.bonusBig}>$10.000 CLP GRATIS</h3>

      {/* Simulación de actividad */}
      <p style={{ fontSize: 12, opacity: 0.8 }}>
        👥 128 jugadores conectados ahora
      </p>

      {/* Botón Slots con feedback */}
      <button
        style={styles.button}
        onClick={() => alert("🎰 Slot girando... ¡Buena suerte!")}
      >
        JUGAR SLOTS
      </button>

      {/* Botón Ruleta con feedback */}
      <button
        style={{ ...styles.button, marginTop: 10 }}
        onClick={() => alert("🎡 Ruleta girando...")}
      >
        RULETA
      </button>

      {/* Botón afiliado (por ahora puede quedar con placeholder) */}
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

      {/* Tip psicológico */}
      <p style={{ marginTop: 12, fontSize: 12, color: "#00FFD1" }}>
        💡 Tip: juega primero gratis y luego decide si quieres jugar con dinero real
      </p>

      {/* Aviso legal mínimo */}
      <p style={{ marginTop: 16, fontSize: 11, opacity: 0.7 }}>
        Oceancasinoslots es una plataforma de entretenimiento.
        <br />
        No operamos juegos con dinero real.
        <br />
        Los enlaces externos dirigen a plataformas de terceros con licencia.
      </p>
    </div>
  );
}


const styles = {
  app: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('/bg-casino.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
},

  card: {
    background: "#062F4F",
    padding: 24,
    borderRadius: 16,
    width: "90%",
    maxWidth: 360,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },
  title: {
    marginBottom: 8
  },
  subtitle: {
    marginBottom: 16,
    opacity: 0.9
  },
  bonus: {
    marginTop: 16,
    color: "#00FFD1"
  },
  bonusBig: {
    color: "#00FFD1",
    fontSize: 28
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
    borderRadius: 10,
    border: "none",
    background: "#00FFD1",
    color: "#04293A",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
  },
  small: {
    marginTop: 12,
    fontSize: 12,
    opacity: 0.8
  }
};

