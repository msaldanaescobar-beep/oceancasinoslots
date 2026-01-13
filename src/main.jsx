import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0,255,209,0.7);
    transform: translate(-50%, -50%) scale(1);
  }
  70% {
    box-shadow: 0 0 0 18px rgba(0,255,209,0);
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0,255,209,0);
    transform: translate(-50%, -50%) scale(1);
  }
}
`;
document.head.appendChild(style);
