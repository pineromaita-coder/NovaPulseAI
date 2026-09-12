const terminal = document.createElement("div");
terminal.id = "terminal";

terminal.innerHTML = `
<div id="term-header">NovaTerminal</div>
<div id="term-body"></div>
`;

document.body.appendChild(terminal);

const body = document.getElementById("term-body");

function log(text){
  const p = document.createElement("div");
  p.textContent = text;
  body.appendChild(p);
  body.scrollTop = body.scrollHeight;
}

log("Sistema iniciado.");
log("NovaCore conectado.");
log("Radar activo.");

window.logTerminal = log;