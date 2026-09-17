// MAITA NOVA IA V2.2 - Chat

const chatOpen = document.getElementById("chatOpen");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatOpen) chatOpen.onclick = () => chatPanel.classList.add("show");
if (closeChat) closeChat.onclick = () => chatPanel.classList.remove("show");

function mensaje(tipo, texto) {
  const div = document.createElement("div");
  div.className = tipo === "user" ? "user-msg" : "bot-msg";
  div.textContent = texto;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function responder(texto) {
  mensaje("user", texto);
  chatInput.value = "";

  setTimeout(() => {
    const t = texto.toLowerCase();

    if (t.includes("btc"))
      mensaje("bot", "El precio de Bitcoin está en la pantalla principal.");

    else if (t.includes("eth"))
      mensaje("bot", "Ethereum aparece actualizado en la sección Mercado.");

    else if (t.includes("bnb"))
      mensaje("bot", "BNB también está disponible en la pantalla principal.");

    else if (t.includes("hora"))
      mensaje("bot", new Date().toLocaleTimeString("es-ES"));

    else if (t.includes("hola"))
      mensaje("bot", "Hola David. MaitaCore listo.");

    else
      mensaje("bot", "Procesando solicitud...");
  }, 500);
}

if (sendChat) sendChat.onclick = () => {
  if (chatInput.value.trim()) responder(chatInput.value);
};

if (chatInput) {
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && chatInput.value.trim()) {
      responder(chatInput.value);
    }
  });
}