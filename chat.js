const chatOpen=document.getElementById("chatOpen");
const chatPanel=document.getElementById("chatPanel");
const closeChat=document.getElementById("closeChat");
const send=document.getElementById("sendChat");
const input=document.getElementById("chatInput");
const msgs=document.getElementById("chatMessages");

chatOpen.onclick=()=>chatPanel.classList.add("show");
closeChat.onclick=()=>chatPanel.classList.remove("show");

function add(tipo,texto){
const d=document.createElement("div");
d.className=tipo=="user"?"user-msg":"bot-msg";
d.textContent=texto;
msgs.appendChild(d);
msgs.scrollTop=msgs.scrollHeight;
}

function responder(t){

add("user",t);

input.value="";

setTimeout(()=>{

const x=t.toLowerCase();

if(x.includes("hola")) add("bot","Hola David. MaitaCore listo.");
else if(x.includes("btc")) add("bot","Consulta BTC en la pantalla principal.");
else if(x.includes("hora")) add("bot",new Date().toLocaleTimeString("es-ES"));
else add("bot","Procesando solicitud...");

},500);

}

send.onclick=()=>{
if(input.value.trim()) responder(input.value);
};

input.onkeydown=e=>{
if(e.key=="Enter") send.click();
};