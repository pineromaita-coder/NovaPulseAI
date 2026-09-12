// MAITA NOVA IA - FIX DEFINITIVO

const mensajes = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "El futuro responde."
];

const esperar = ms => new Promise(r => setTimeout(r, ms));

window.iniciarIA = async function () {

  const boton = document.getElementById("mainButton");
  const estado = document.querySelector(".hud p");

  if (!boton || !estado) return;

  boton.disabled = true;

  for (const texto of mensajes) {
    estado.textContent = texto;
    await esperar(700);
  }

  estado.textContent = "MaitaCore ACTIVO";
  boton.textContent = "✅ Sistema Activo";
  boton.disabled = false;

  if (typeof hablar === "function") {
    hablar("Operador David autorizado. MaitaCore activo.");
  }
};

// Asegura que el botón funcione incluso en Telegram
window.addEventListener("load", () => {
  const boton = document.getElementById("mainButton");
  if (boton) boton.onclick = window.iniciarIA;
});

// Reloj
function reloj() {
  const r = document.getElementById("clock");
  if (r) r.textContent = new Date().toLocaleTimeString("es-ES");
}

reloj();
setInterval(reloj, 1000);