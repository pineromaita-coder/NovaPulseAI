// MAITA NOVA IA - Sprint 2
const reactor = document.querySelector(".reactor");
const eye = document.querySelector(".eye");

const scan = document.createElement("div");
scan.className = "scan";
reactor.prepend(scan);

// El ojo sigue el dedo
document.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 24;
  const y = (e.clientY / window.innerHeight - 0.5) * 24;

  reactor.style.transform = `translate(${x*0.2}px, ${y*0.2}px)`;

  eye.style.transform =
    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// Parpadeo natural
function parpadear(){
  eye.animate(
    [
      { transform: eye.style.transform || "translate(-50%,-50%) scaleY(1)" },
      { transform: (eye.style.transform || "translate(-50%,-50%)") + " scaleY(.08)" },
      { transform: eye.style.transform || "translate(-50%,-50%) scaleY(1)" }
    ],
    {
      duration:180,
      easing:"ease-in-out"
    }
  );

  setTimeout(parpadear,3000+Math.random()*4000);
}

setTimeout(parpadear,2500);

// Pulso del reactor
let brillo = 0;

setInterval(()=>{

  brillo += .08;

  reactor.style.filter =
    `drop-shadow(0 0 ${24+Math.sin(brillo)*10}px cyan)`;

},30);

// Panel de estado
const status = document.createElement("div");
status.className="status-card";

status.innerHTML=`
<div>⚡ MaitaCore ONLINE</div>
<div>📡 Radar ACTIVO</div>
<div>🛡 Seguridad ESTABLE</div>
`;

document.body.appendChild(status);