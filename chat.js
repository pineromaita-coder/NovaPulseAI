const btn=document.createElement("button");
btn.id="chat-btn";
btn.innerHTML="💬";

const panel=document.createElement("div");
panel.id="chat-panel";

panel.innerHTML=`
<div id="chat-header">Maita Nova IA</div>

<div id="chat-body">
<div class="msg ia">Operador David. MaitaCore listo.</div>
</div>

<div id="chat-input">
<input id="textoIA" placeholder="Pregunta lo que quieras...">
<button id="enviarIA">➤</button>
</div>
`;

document.body.append(btn,panel);

btn.onclick=()=>panel.classList.toggle("open");

const body=document.getElementById("chat-body");
const input=document.getElementById("textoIA");

function respuesta(t){

const txt=t.toLowerCase();

if(txt.includes("btc")) return "Consultando Bitcoin...";
if(txt.includes("eth")) return "Ethereum conectado.";
if(txt.includes("bnb")) return "BNB disponible.";
if(txt.includes("hola")) return "Hola David.";

return "MaitaCore está procesando tu solicitud.";
}

function enviar(){

if(!input.value.trim()) return;

body.innerHTML+=`<div class="msg user">${input.value}</div>`;

const texto=input.value;

input.value="";

setTimeout(()=>{

body.innerHTML+=`<div class="msg ia">${respuesta(texto)}</div>`;

body.scrollTop=body.scrollHeight;

},500);

}

document.getElementById("enviarIA").onclick=enviar;

input.addEventListener("keydown",e=>{
if(e.key==="Enter") enviar();
});