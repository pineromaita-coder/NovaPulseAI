function hablar(texto){

if(!("speechSynthesis" in window)) return;

const voz = new SpeechSynthesisUtterance(texto);

voz.lang="es-ES";
voz.rate=.95;

speechSynthesis.cancel();
speechSynthesis.speak(voz);

}

window.hablar=hablar;