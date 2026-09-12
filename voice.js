// MAITA NOVA IA - Voice Engine

let vozLista = null;

function cargarVoz() {
  const voces = speechSynthesis.getVoices();

  vozLista =
    voces.find(v => v.lang.startsWith("es")) ||
    voces.find(v => v.lang.startsWith("pt")) ||
    voces[0];
}

if ("speechSynthesis" in window) {
  cargarVoz();
  speechSynthesis.onvoiceschanged = cargarVoz;
}

function hablar(texto) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const mensaje = new SpeechSynthesisUtterance(texto);

  if (vozLista) mensaje.voice = vozLista;

  mensaje.lang = vozLista?.lang || "es-ES";
  mensaje.rate = 0.92;
  mensaje.pitch = 0.9;

  speechSynthesis.speak(mensaje);
}