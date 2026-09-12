const reactor = document.querySelector(".reactor");
const eye = document.querySelector(".eye");

const scan = document.createElement("div");
scan.className = "scan";
reactor.prepend(scan);

document.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  reactor.style.transform = `translate(${x}px, ${y}px)`;

  eye.style.transform =
    `translate(calc(-50% + ${x * 0.45}px), calc(-50% + ${y * 0.45}px))`;
});

function parpadear() {
  eye.animate(
    [
      { transform: eye.style.transform || "translate(-50%,-50%) scaleY(1)" },
      { transform: (eye.style.transform || "translate(-50%,-50%)") + " scaleY(0.1)" },
      { transform: eye.style.transform || "translate(-50%,-50%) scaleY(1)" }
    ],
    {
      duration: 180,
      easing: "ease-in-out"
    }
  );

  const siguiente = 3000 + Math.random() * 4000;
  setTimeout(parpadear, siguiente);
}

setTimeout(parpadear, 2500);

const status = document.createElement("div");
status.className = "status-card";

status.innerHTML = `
<div>⚡ NovaCore <span style="color:#6dff9a;">ONLINE</span></div>
<div>📡 Radar <span style="color:#00d4ff;">ACTIVO</span></div>
<div>🛡️ Seguridad <span style="color:#6dff9a;">OK</span></div>
<div id="fps">⚙️ Sistema ESTABLE</div>
`;

document.body.appendChild(status);

setInterval(() => {
  const t = new Date().toLocaleTimeString("es-ES");
  const reloj = document.getElementById("clock");
  if (reloj) reloj.textContent = t;
}, 1000);

let intensidad = 0;
setInterval(() => {
  intensidad = (intensidad + 1) % 100;
  reactor.style.filter = `drop-shadow(0 0 ${20 + intensidad / 8}px cyan)`;
}, 60);