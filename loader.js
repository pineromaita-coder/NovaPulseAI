// MAITA NOVA IA - Loader Cinemático V1

const splash = document.createElement("div");
splash.id = "maita-loader";

splash.innerHTML = `
<div class="loader-bg"></div>

<div class="loader-center">

  <div class="loader-reactor">
    <div class="loader-ring r1"></div>
    <div class="loader-ring r2"></div>
    <div class="loader-core"></div>
  </div>

  <h1>MAITA NOVA IA</h1>

  <p id="loader-text">Inicializando MaitaCore...</p>

  <div class="loader-bar">
    <div class="loader-fill"></div>
  </div>

</div>
`;

document.body.appendChild(splash);

const mensajes = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "El futuro responde."
];

const texto = splash.querySelector("#loader-text");

let paso = 0;

const intervalo = setInterval(() => {

  paso++;

  if (paso < mensajes.length) {
    texto.textContent = mensajes[paso];
  }

}, 700);

setTimeout(() => {

  clearInterval(intervalo);

  splash.style.opacity = "0";

  setTimeout(() => splash.remove(), 600);

}, 3500);

const estilo = document.createElement("style");

estilo.textContent = `
#maita-loader{
position:fixed;
inset:0;
background:radial-gradient(circle,#041326,#01040d);
display:flex;
justify-content:center;
align-items:center;
z-index:99999;
transition:.6s;
overflow:hidden;
}

.loader-center{
width:100%;
max-width:340px;
padding:24px;
text-align:center;
}

.loader-reactor{
position:relative;
width:150px;
height:150px;
margin:auto;
}

.loader-core{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
width:78px;
height:78px;
border-radius:50%;
background:radial-gradient(circle,#9efcff,#00c8ff,#004d8c);
box-shadow:0 0 35px cyan;
animation:pulse 2s infinite;
}

.loader-ring{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
border-radius:50%;
}

.r1{
width:120px;
height:120px;
border:2px solid rgba(0,255,255,.45);
animation:spin 4s linear infinite;
}

.r2{
width:150px;
height:150px;
border:2px dashed rgba(0,255,255,.25);
animation:spinR 6s linear infinite;
}

.loader-center h1{
margin-top:30px;
color:#00d4ff;
font-size:30px;
text-shadow:0 0 18px cyan;
}

.loader-center p{
margin-top:12px;
color:#8fdfff;
font-size:15px;
min-height:22px;
}

.loader-bar{
margin-top:22px;
height:8px;
border-radius:8px;
background:#0b2433;
overflow:hidden;
}

.loader-fill{
height:100%;
width:100%;
background:linear-gradient(90deg,#00d4ff,#6ffcff);
animation:load 3.5s linear forwards;
}

@keyframes spin{
to{transform:translate(-50%,-50%) rotate(360deg);}
}

@keyframes spinR{
to{transform:translate(-50%,-50%) rotate(-360deg);}
}

@keyframes pulse{
50%{transform:translate(-50%,-50%) scale(1.08);}
}

@keyframes load{
from{width:0;}
to{width:100%;}
}
`;

document.head.appendChild(estilo);