const panel = document.createElement("div");
panel.id = "chat-panel";

panel.innerHTML = `
<div id="chat-header">🤖 NovaPulse</div>

<div id="chat-body">
  <div class="msg ia">NovaCore listo. ¿En qué puedo ayudarte?</div>
</div>

<div id="chat-input">
  <input id="msg" placeholder="Escribe un comando...">
  <button id="send">➤</button>
</div>
`;

document.body.appendChild(panel);

const body = document.getElementById("chat-body");
const input = document.getElementById("msg");

function responder(txt){

const r = txt.toLowerCase();

if(r.includes("btc"))
return "Bitcoin está disponible desde el panel superior.";

if(r.includes("eth"))
return "Ethereum se actualiza automáticamente.";

if(r.includes("bnb"))
return "BNB conectado al mercado.";

if(r.includes("hola"))
return "Hola Operador.";

return "NovaCore procesó tu mensaje.";
}

document.getElementById("send").onclick = () => {

if(!input.value.trim()) return;

body.innerHTML += `<div class="msg yo">${input.value}</div>`;

const texto = input.value;

input.value = "";

setTimeout(()=>{

body.innerHTML +=
`<div class="msg ia">${responder(texto)}</div>`;

body.scrollTop = body.scrollHeight;

},400);

};