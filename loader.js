// MAITA NOVA IA V3 - Loader Cinemático

const loader=document.createElement("div");
loader.id="maitaLoader";

loader.innerHTML=`
<div class="loader-box">

<div class="loader-reactor">
<div class="lr1"></div>
<div class="lr2"></div>
<div class="lcore"></div>
</div>

<h2>MAITA NOVA IA</h2>

<p id="loaderText">
Inicializando MaitaCore...
</p>

<div class="progress">
<div class="fill"></div>
</div>

</div>
`;

document.body.appendChild(loader);

const pasos=[
"Inicializando MaitaCore...",
"Escaneando sistema...",
"Conectando mercado...",
"Operador autorizado."
];

let i=0;

const txt=document.getElementById("loaderText");

const cambio=setInterval(()=>{
i++;
if(i<pasos.length) txt.textContent=pasos[i];
},600);

setTimeout(()=>{
clearInterval(cambio);
loader.classList.add("hide");
setTimeout(()=>loader.remove(),500);
},2500);

const css=document.createElement("style");

css.textContent=`
#maitaLoader{
position:fixed;
inset:0;
background:radial-gradient(circle,#07131d,#01040a);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
transition:.5s;
}

#maitaLoader.hide{
opacity:0;
}

.loader-box{
width:90%;
max-width:320px;
text-align:center;
}

.loader-reactor{
position:relative;
width:150px;
height:150px;
margin:auto;
}

.lcore{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
width:70px;
height:70px;
border-radius:50%;
background:radial-gradient(circle,#9efcff,#00d4ff,#004b9f);
box-shadow:0 0 35px cyan;
animation:pulse 2s infinite;
}

.lr1,.lr2{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
border-radius:50%;
}

.lr1{
width:110px;
height:110px;
border:2px solid rgba(0,212,255,.5);
animation:spin 4s linear infinite;
}

.lr2{
width:150px;
height:150px;
border:2px dashed rgba(0,212,255,.25);
animation:spinR 6s linear infinite;
}

.progress{
margin-top:20px;
height:8px;
background:#0b2233;
border-radius:8px;
overflow:hidden;
}

.fill{
height:100%;
background:linear-gradient(90deg,#00d4ff,#74f7ff);
animation:load 2.5s linear forwards;
}

@keyframes load{
from{width:0;}
to{width:100%;}
}

@keyframes spin{
to{transform:translate(-50%,-50%) rotate(360deg);}
}

@keyframes spinR{
to{transform:translate(-50%,-50%) rotate(-360deg);}
}
`;

document.head.appendChild(css);