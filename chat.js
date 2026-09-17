// MAITA NOVA IA V2.2 - Chat MaitaCore

const chatOpen = document.getElementById("chatOpen");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatOpen) {
  chatOpen.addEventListener("click", () => {
    chatPanel.classList.add("show");
  });
}

if (closeChat) {
  closeChat.addEventListener("click", () => {
    chatPanel.classList.remove("show");
  });
}

function agregarMensaje(tipo, texto) {
  const div = document.createElement("div");
  div.className = tipo === "user" ? "user-msg" : "bot-msg";
  div.textContent = texto;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function responder(texto) {
  agregarMensaje("user", texto);
  chatInput.value = "";

  setTimeout(() => {
    const t = texto.toLowerCase();

    if (t.includes("hola")) {
      agregarMensaje("bot", "Hola David. MaitaCore listo para ayudarte.");
    } else if (t.includes("btc")) {
      agregarMensaje("bot", "Consulta el precio de BTC en la pantalla principal.");
    } else if (t.includes("eth")) {
      agregarMensaje("bot", "Ethereum aparece actualizado en Mercado.");
    } else if (t.includes("bnb")) {
      agregarMensaje("bot", "BNB también está disponible en Mercado.");
    } else if (t.includes("hora")) {
      agregarMensaje("bot", new Date().toLocaleTimeString("es-ES"));
    } else {
      agregarMensaje("bot", "MaitaCore está procesando tu solicitud...");
    }
  }, 500);
}

if (sendChat) {
  sendChat.addEventListener("click", () => {
    if (chatInput.value.trim()) responder(chatInput.value);
  });
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && chatInput.value.trim()) {
      responder(chatInput.value);
    }
  });
}