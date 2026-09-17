// MAITA NOVA IA - CORE ESTABLE

const estado = document.getElementById("estado");
const boton = document.getElementById("mainButton");
const reloj = document.getElementById("clock");

const pasos = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "MaitaCore ACTIVO"
];

function actualizarReloj() {
  if (reloj) {
    reloj.textContent = new Date().toLocaleTimeString("es-ES");
  }
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

window.iniciarIA = async function () {
  if (!boton || !estado) return;

  boton.disabled = true;
  boton.textContent = "Iniciando...";

  for (const paso of pasos) {
    estado.textContent = paso;
    await new Promise(r => setTimeout(r, 700));
  }

  boton.textContent = "✅ Sistema Activo";
  boton.disabled = false;

  if (window.hablar) {
    hablar("Operador David autorizado. MaitaCore activo.");
  }
};