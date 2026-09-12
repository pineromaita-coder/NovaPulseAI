const splash=document.createElement("div");

splash.style.position="fixed";
splash.style.inset="0";
splash.style.background="#01040d";
splash.style.display="flex";
splash.style.flexDirection="column";
splash.style.justifyContent="center";
splash.style.alignItems="center";
splash.style.zIndex="9999";

splash.innerHTML=`
<h1 style="color:#00d4ff;
font-family:Arial;
font-size:42px;
text-shadow:0 0 20px cyan;">
NovaPulse
</h1>

<p style="color:#8fdfff;">
Inicializando NovaCore...
</p>
`;

document.body.appendChild(splash);

setTimeout(()=>{
splash.remove();
},1800);