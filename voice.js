// MAITA NOVA IA V1 - Voice Engine

let vozMaita = null;

function cargarVoz() {
  if (!("speechSynthesis" in window)) return;

  const voces = speechSynthesis.getVoices();

  vozMaita =
    voces.find(v => v.lang.startsWith("es")) ||
    voces.find(v => v.lang.startsWith("pt")) ||
    voces[0] || null;
}

if ("speechSynthesis" in window) {
  cargarVoz();
  speechSynthesis.onvoiceschanged = cargarVoz;
}

window.hablar = function(texto) {

  // Si Telegram bloquea la voz, la app sigue funcionando.
  if (!("speechSynthesis" in window)) return;

  try{
    speechSynthesis.cancel();

    const mensaje = new SpeechSynthesisUtterance(texto);

    if(vozMaita) mensaje.voice = vozMaita;

    mensaje.lang = vozMaita?.lang || "es-ES";
    mensaje.rate = 0.90;
    mensaje.pitch = 0.85;
    mensaje.volume = 1;

    speechSynthesis.speak(mensaje);

  }catch(e){
    console.log("Voz no disponible.");
  }
}