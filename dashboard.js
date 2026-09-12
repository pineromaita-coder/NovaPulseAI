const hud = document.querySelector(".hud");

const dashboard = document.createElement("div");
dashboard.className = "dashboard";

dashboard.innerHTML = `
<div class="cards">

  <div class="card">
    <div class="icon">📈</div>
    <div class="title">Mercado</div>
    <div class="subtitle">BTC • ETH • BNB</div>
  </div>

  <div class="card" onclick="document.getElementById('chat-btn').click()">
    <div class="icon">💬</div>
    <div class="title">Chat</div>
    <div class="subtitle">Maita IA</div>
  </div>

  <div class="card">
    <div class="icon">🛡️</div>
    <div class="title">Operador</div>
    <div class="subtitle">Seguro</div>
  </div>

  <div class="card">
    <div class="icon">⚙️</div>
    <div class="title">Ajustes</div>
    <div class="subtitle">Sistema</div>
  </div>

</div>

<button class="action-btn" onclick="iniciarIA()">
  🚀 Activar MaitaCore
</button>
`;

hud.appendChild(dashboard);