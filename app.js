// MAITA NOVA IA V1 - APP CORE

const pasos = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "El futuro responde."
];

// Espera entre mensajes
const esperar = ms => new Promise(r => setTimeout(r, ms));

// Función principal (queda disponible para el botón)
window.iniciarIA = async function () {

  const boton = document.getElementById("mainButton");
  const estado = document.getElementById("estado");
  const titulo = document.querySelector("h1");

  if (!boton || !estado) return;

  boton.disabled = true;
  boton.textContent = "Iniciando...";

  for (const paso of pasos) {
    estado.textContent = paso;
    await esperar(700);
  }

  titulo.textContent = "Maita Nova IA";
  estado.textContent = "MaitaCore ACTIVO";
  boton.textContent = "✅ Sistema Activo";
  boton.disabled = false;

  // Si existe el motor de voz, úsalo
  if (typeof hablar === "function") {
    hablar("Operador David autorizado. MaitaCore activo.");
  }
};

// Reloj
function actualizarReloj() {
  const reloj = document.getElementById("clock");
  if (reloj) {
    reloj.textContent = new Date().toLocaleTimeString("es-ES");
  }
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

// Seguridad: vuelve a enlazar el botón al cargar
window.addEventListener("load", () => {
  const boton = document.getElementById("mainButton");
  if (boton) {
    boton.onclick = window.iniciarIA;
  }
});