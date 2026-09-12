// MAITA NOVA IA - Sprint 6

const btn = document.createElement("button");
btn.id = "chat-btn";
btn.innerHTML = "💬";

const panel = document.createElement("div");
panel.id = "chat-panel";

panel.innerHTML = `
<div id="chat-header">
  <span>🤖 Maita Nova IA</span>
  <button id="close-chat">✕</button>
</div>

<div id="chat-body">
  <div class="msg ia">
    Operador David. MaitaCore listo.
  </div>
</div>

<div id="chat-input">
  <input id="textoIA"
         placeholder="Escribe aquí...">
  <button id="enviarIA">➤</button>
</div>
`;

document.body.append(btn, panel);

const body = panel.querySelector("#chat-body");
const input = panel.querySelector("#textoIA");

btn.onclick = () => panel.classList.add("open");
panel.querySelector("#close-chat").onclick = () => panel.classList.remove("open");

const respuestas = {
  btc: "Consultando Bitcoin...",
  eth: "Ethereum conectado.",
  bnb: "BNB disponible.",
  hola: "Hola David. ¿En qué trabajamos hoy?"
};

function escribirIA(texto){

  const msg = document.createElement("div");
  msg.className = "msg ia";
  body.appendChild(msg);

  let i = 0;

  const efecto = setInterval(() => {

    msg.textContent += texto[i];
    i++;

    body.scrollTop = body.scrollHeight;

    if(i >= texto.length){
      clearInterval(efecto);
    }

  },18);

}

function enviar(){

  const texto = input.value.trim();

  if(!texto) return;

  body.innerHTML +=
    `<div class="msg user">${texto}</div>`;

  input.value = "";

  const t = texto.toLowerCase();

  let respuesta =
    respuestas[t] ||
    "MaitaCore está procesando tu solicitud.";

  setTimeout(() => escribirIA(respuesta),400);

}

panel.querySelector("#enviarIA").onclick = enviar;

input.addEventListener("keydown",e=>{
  if(e.key==="Enter") enviar();
});