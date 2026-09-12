const reactor = document.querySelector(".reactor");
const eye = document.querySelector(".eye");

const scan = document.createElement("div");
scan.className = "scan";
reactor.prepend(scan);

document.addEventListener("pointermove", e => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 20;

  reactor.style.transform = `translate(${x}px, ${y}px)`;
  eye.style.transform =
    `translate(calc(-50% + ${x/2}px), calc(-50% + ${y/2}px))`;
});

const status = document.createElement("div");
status.className = "status-card";
status.innerHTML = `
<div>⚡ NovaCore: ONLINE</div>
<div>📡 Radar: ACTIVO</div>
<div>🔐 Seguridad: OK</div>`;
document.body.appendChild(status);