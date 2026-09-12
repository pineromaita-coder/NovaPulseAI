// MAITA NOVA IA - App Core V2

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

  const boton = document.getElementById("mainButton");
  const titulo = document.querySelector("h1");
  const estado = document.querySelector("main p");

  boton.disabled = true;
  boton.innerText = "Iniciando...";

  for(const texto of mensajes){
    estado.innerText = texto;
    await esperar(700);
  }

  titulo.innerText = "Maita Nova IA";
  estado.innerText = "MaitaCore ACTIVO";
  boton.innerText = "Sistema Activo";
  boton.disabled = false;

  // Usa el motor de voz de voice.js
  if (typeof hablar === "function") {
    hablar("Operador David autorizado. MaitaCore activo. El futuro responde.");
  }
}

// Reloj
function actualizarReloj(){
  const reloj = document.getElementById("clock");
  if(reloj){
    reloj.innerText = new Date().toLocaleTimeString("es-ES");
  }
}

setInterval(actualizarReloj,1000);
actualizarReloj();