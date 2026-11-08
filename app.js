
// ==================================================
// MAITA NOVA IA - MAITACORE V8
// MAITA COIN + METAMASK + WALLET
// ==================================================

const estado = document.getElementById("estado");
const boton = document.getElementById("mainButton");
const reloj = document.getElementById("clock");

// DIRECCION DEL CONTRATO MAITA COIN
const MAITA_TOKEN_ADDRESS =
  "0x5269E2fDCC1C1fCac4535e735EB9fFF02c4E130E";

// BNB SMART CHAIN TESTNET
const CHAIN_ID = "0x61";

const RPC_URL =
  "https://data-seed-prebsc-1-s1.bnbchain.org:8545";

const EXPLORER =
  "https://testnet.bscscan.com";

const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)"
];

const pasos = [
  "Inicializando MaitaCore...",
  "Escaneando sistema...",
  "Conectando mercado...",
  "Operador autorizado.",
  "MaitaCore ACTIVO"
];

let proveedor = null;
let cuentaActual = null;
let contrato = null;

// ==================================================
// CARGAR ETHERS
// ==================================================

async function cargarEthers() {
  if (window.ethers) return true;

  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.umd.min.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.head.appendChild(script);
  });
}

// ==================================================
// RELOJ
// ==================================================

function actualizarReloj() {
  if (reloj) {
    reloj.textContent =
      new Date().toLocaleTimeString("es-ES");
  }
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

// ==================================================
// ACTIVAR MAITACORE
// ==================================================

window.iniciarIA = async function () {
  if (!boton || !estado) return;

  boton.disabled = true;
  boton.textContent = "Iniciando...";

  for (const paso of pasos) {
    estado.textContent = paso;
    await new Promise(r => setTimeout(r, 700));
  }

  boton.textContent = "✅ Sistema Activo";
  boton.disabled = false;

  if (window.hablar) {
    window.hablar(
      "Operador autorizado. MaitaCore activo."
    );
  }
};

// ==================================================
// CREAR PANEL WALLET
// ==================================================

function crearWalletPanel() {
  if (document.getElementById("maitaWalletPanel")) {
    return;
  }

  const panel = document.createElement("section");

  panel.id = "maitaWalletPanel";

  panel.style.cssText = `
    background: #071522;
    border: 1px solid #00d4ff;
    border-radius: 16px;
    padding: 20px;
    margin: 20px 10px;
    color: white;
    font-family: Arial, sans-serif;
    box-shadow: 0 0 15px rgba(0,212,255,.15);
  `;

  panel.innerHTML = `
    <h2 style="color:#00d4ff;margin-top:0">
      MAITA WALLET
    </h2>

    <p id="maitaConnection">
      Wallet desconectada
    </p>

    <p id="maitaAddress"
       style="font-size:12px;word-break:break-all">
      Dirección: --
    </p>

    <div style="
      background:#102536;
      padding:15px;
      border-radius:12px;
      margin:15px 0">

      <small>Tu saldo MAITA</small>

      <h2 id="maitaBalance"
          style="color:#00d4ff;margin:8px 0">
        0 MAITA
      </h2>

      <small id="maitaNetwork">
        BNB Testnet
      </small>
    </div>

    <p id="maitaSupply">
      Suministro total: pendiente
    </p>

    <button id="maitaConnectButton"
      style="
        width:100%;
        padding:14px;
        background:#00d4ff;
        color:#00111c;
        border:0;
        border-radius:10px;
        font-weight:bold;
        font-size:15px;
        margin-bottom:10px">
      Conectar MetaMask
    </button>

    <button id="maitaRefreshButton"
      style="
        width:100%;
        padding:14px;
        background:#102536;
        color:white;
        border:1px solid #00d4ff;
        border-radius:10px;
        font-weight:bold">
      Actualizar saldo
    </button>

    <p style="
      color:#8ba9bb;
      font-size:11px;
      margin-bottom:0">
      MAITA está funcionando en BNB Smart Chain Testnet.
      No representa dinero real.
    </p>
  `;

  const referencia =
    document.getElementById("mainButton") ||
    document.getElementById("estado");

  if (referencia && referencia.parentNode) {
    referencia.parentNode.insertBefore(
      panel,
      referencia.nextSibling
    );
  } else {
    document.body.appendChild(panel);
  }

  document.getElementById(
    "maitaConnectButton"
  ).addEventListener("click", conectarMaita);

  document.getElementById(
    "maitaRefreshButton"
  ).addEventListener("click", consultarSaldo);
}

// ==================================================
// CONECTAR METAMASK
// ==================================================

async function conectarMaita() {
  const mensaje =
    document.getElementById("maitaConnection");

  try {
    if (!window.ethereum) {
      mensaje.textContent =
        "MetaMask no está disponible en este navegador.";

      return;
    }

    const cargado = await cargarEthers();

    if (!cargado || !window.ethers) {
      mensaje.textContent =
        "No se pudo cargar la biblioteca de conexión.";

      return;
    }

    mensaje.textContent =
      "Solicitando conexión con MetaMask...";

    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const red = await window.ethereum.request({
      method: "eth_chainId"
    });

    if (red !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID }]
        });
      } catch (error) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: CHAIN_ID,
              chainName: "BNB Smart Chain Testnet",
              nativeCurrency: {
                name: "tBNB",
                symbol: "tBNB",
                decimals: 18
              },
              rpcUrls: [RPC_URL],
              blockExplorerUrls: [EXPLORER]
            }]
          });
        } else {
          throw error;
        }
      }
    }

    proveedor =
      new window.ethers.BrowserProvider(
        window.ethereum
      );

    const signer = await proveedor.getSigner();

    cuentaActual = await signer.getAddress();

    contrato = new window.ethers.Contract(
      MAITA_TOKEN_ADDRESS,
      ABI,
      proveedor
    );

    document.getElementById(
      "maitaAddress"
    ).textContent = "Dirección: " + cuentaActual;

    document.getElementById(
      "maitaConnection"
    ).textContent = "🟢 MetaMask conectado";

    mensaje.textContent =
      "Wallet conectada correctamente.";

    await consultarSaldo();

  } catch (error) {
    console.error(error);

    mensaje.textContent =
      "Error de conexión: " +
      (error.shortMessage || error.message);
  }
}

// ==================================================
// CONSULTAR SALDO MAITA
// ==================================================

async function consultarSaldo() {
  const balanceElemento =
    document.getElementById("maitaBalance");

  const supplyElemento =
    document.getElementById("maitaSupply");

  try {
    if (!window.ethereum || !cuentaActual) {
      balanceElemento.textContent =
        "Conecta primero MetaMask";

      return;
    }

    if (!contrato) {
      const cargado = await cargarEthers();

      if (!cargado) throw new Error("Ethers no disponible");

      proveedor =
        new window.ethers.BrowserProvider(
          window.ethereum
        );

      contrato = new window.ethers.Contract(
        MAITA_TOKEN_ADDRESS,
        ABI,
        proveedor
      );
    }

    const red = await proveedor.getNetwork();

    if (Number(red.chainId) !== 97) {
      throw new Error("Selecciona BNB Testnet");
    }

    const [balance, decimales, simbolo, total] =
      await Promise.all([
        contrato.balanceOf(cuentaActual),
        contrato.decimals(),
        contrato.symbol(),
        contrato.totalSupply()
      ]);

    const saldoFormateado =
      window.ethers.formatUnits(balance, decimales);

    const totalFormateado =
      window.ethers.formatUnits(total, decimales);

    balanceElemento.textContent =
      Number(saldoFormateado).toLocaleString(
        "es-ES",
        { maximumFractionDigits: 4 }
      ) + " " + simbolo;

    supplyElemento.textContent =
      "Suministro total: " +
      Number(totalFormateado).toLocaleString("es-ES") +
      " " + simbolo;

    document.getElementById(
      "maitaNetwork"
    ).textContent =
      "🟢 BNB Smart Chain Testnet · Chain 97";

  } catch (error) {
    console.error(error);

    balanceElemento.textContent =
      "No se pudo consultar el saldo";

    supplyElemento.textContent =
      error.shortMessage || error.message;
  }
}

// ==================================================
// DETECTAR CAMBIOS DE CUENTA Y RED
// ==================================================

if (window.ethereum) {
  window.ethereum.on("accountsChanged", (cuentas) => {
    cuentaActual = null;
    contrato = null;

    if (cuentas.length > 0) {
      conectarMaita();
    } else {
      document.getElementById(
        "maitaConnection"
      ).textContent = "Wallet desconectada";
    }
  });

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
}

// ==================================================
// INICIALIZAR PANEL
// ==================================================

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    crearWalletPanel
  );
} else {
  crearWalletPanel();
}

console.log("MAITA NOVA IA - MAITACORE V8 ACTIVO");
console.log("Contrato MAITA:", MAITA_TOKEN_ADDRESS);
