// =========================
// MAITA NOVA IA - MaitaCore
// Sprint 1
// =========================

const mensajes = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Cargando protocolos...",
  "Operador autorizado.",
  "El futuro responde."
];

function esperar(ms){
  return new Promise(r => setTimeout(r, ms));
}

async function iniciarIA(){

  const boton = document.querySelector("button");
  const titulo = document.querySelector("h1");

  boton.disabled = true;
  boton.innerText = "Iniciando...";

  for(const texto of mensajes){

    titulo.innerText = texto;

    if(window.logTerminal){
      logTerminal(texto);
    }

    await esperar(800);
  }

  titulo.innerText = "MAITA NOVA IA";

  boton.innerText = "Sistema Activo";

  if("speechSynthesis" in window){

    const voz = new SpeechSynthesisUtterance(
      "Operador autorizado. MaitaCore activo. El futuro responde."
    );

    voz.lang = "es-ES";
    voz.rate = 0.92;

    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
  }

  boton.disabled = false;
}

function actualizarReloj(){

  const reloj = document.getElementById("clock");

  if(reloj){
    reloj.innerText =
      new Date().toLocaleTimeString("es-ES");
  }

}

setInterval(actualizarReloj,1000);
actualizarReloj();