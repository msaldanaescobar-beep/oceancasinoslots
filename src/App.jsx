import { useState } from "react";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.app}>
      {view === "home" && <Home setView={setView} />}
      {view === "register" && <Register setView={setView} />}
      {view === "bonus" && <Bonus setView={setView} />}
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
  return (
    <div style={styles.card}>
      <h2>🎉 Cuenta creada</h2>
      <p>Descarga nuestra app y recibe</p>
      <h3 style={styles.bonusBig}>$10.000 CLP</h3>
      <button style={styles.button}>
        DESCARGAR APP
      </button>
      <p style={styles.small}>Disponible para Android</p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #041B2D, #0A3D62)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "Arial, sans-serif"
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

