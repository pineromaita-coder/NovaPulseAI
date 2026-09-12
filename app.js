// MAITA NOVA IA - FIX BOTÓN

const mensajes = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "El futuro responde."
];

function esperar(ms){
  return new Promise(r => setTimeout(r, ms));
}

// La hacemos global para el botón del HTML
window.iniciarIA = async function(){

  const boton = document.getElementById("mainButton");
  const estado = document.querySelector("main p");

  boton.disabled = true;

  for(const texto of mensajes){
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

// Reloj
function actualizarReloj(){
  const reloj = document.getElementById("clock");
  if(reloj){
    reloj.textContent = new Date().toLocaleTimeString("es-ES");
  }
}

actualizarReloj();
setInterval(actualizarReloj,1000);