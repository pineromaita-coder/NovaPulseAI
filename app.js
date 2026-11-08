
"use strict";

const MAITA_CONFIG = {
    api: "https://nova-pulse-ai-1--pineromaita.replit.app/chat",
    contract: "0x5269E2fDCC1C1fCac4535e735EB9fFF02c4E130E",
    chainId: "0x61",
    chainName: "BNB Smart Chain Testnet",
    rpc: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    explorer: "https://testnet.bscscan.com",
    symbol: "MAITA",
    decimals: 18
};

const MaitaCore = {
    history: [],

    async send(message) {
        if (!message.trim()) return "Escribe un mensaje.";

        this.history.push({ role: "user", content: message });

        try {
            const response = await fetch(MAITA_CONFIG.api, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    history: this.history.slice(0, -1).slice(-12)
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error");

            const reply = data.reply || "No recibí una respuesta.";
            this.history.push({ role: "assistant", content: reply });
            return reply;
        } catch (error) {
            console.error(error);
            return "MaitaCore no está disponible. Comprueba el servidor.";
        }
    }
};

let maitaAccount = null;

function maitaNavigate(section) {
    document.querySelectorAll("[data-section]").forEach(el => {
        el.hidden = el.dataset.section !== section;
    });

    document.querySelectorAll("[data-nav]").forEach(el => {
        el.classList.toggle("active", el.dataset.nav === section);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function maitaAddMessage(text, type) {
    const chat = document.getElementById("chatMessages");
    if (!chat) return;

    const message = document.createElement("div");
    message.className = "maita-message " + type;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

async function maitaSendMessage() {
    const input = document.getElementById("chatInput");
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    input.value = "";
    maitaAddMessage(message, "user");

    const loading = document.createElement("div");
    loading.className = "maita-message assistant";
    loading.textContent = "MaitaCore está pensando...";
    loading.id = "maitaLoading";

    document.getElementById("chatMessages")?.appendChild(loading);

    const answer = await MaitaCore.send(message);
    document.getElementById("maitaLoading")?.remove();
    maitaAddMessage(answer, "assistant");
}

function iniciarIA() {
    const status = document.getElementById("coreStatus");
    if (status) status.textContent = "MAITACORE ACTIVO";

    const button = document.getElementById("mainButton");
    if (button) button.textContent = "MAITACORE ACTIVADO";

    maitaSpeak("Operador autorizado. MaitaCore preparado.");
}

function maitaSpeak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
}

async function maitaConnectWallet() {
    const status = document.getElementById("walletStatus");

    if (!window.ethereum) {
        if (status) status.textContent =
            "Abre esta app desde el navegador interno de MetaMask.";
        return;
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        maitaAccount = accounts[0];

        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: MAITA_CONFIG.chainId }]
            });
        } catch (error) {
            if (error.code !== 4902) throw error;

            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: MAITA_CONFIG.chainId,
                    chainName: MAITA_CONFIG.chainName,
                    nativeCurrency: {
                        name: "tBNB",
                        symbol: "tBNB",
                        decimals: 18
                    },
                    rpcUrls: [MAITA_CONFIG.rpc],
                    blockExplorerUrls: [MAITA_CONFIG.explorer]
                }]
            });
        }

        if (status) {
            status.textContent = "Billetera: " +
                maitaAccount.slice(0, 6) + "..." +
                maitaAccount.slice(-4);
        }

        await maitaReadBalance();

    } catch (error) {
        console.error(error);
        if (status) status.textContent =
            "No se pudo conectar: " + error.message;
    }
}

async function maitaReadBalance() {
    const status = document.getElementById("walletStatus");
    if (!maitaAccount) return;

    try {
        const data = "0x70a08231" +
            maitaAccount.slice(2).toLowerCase().padStart(64, "0");

        const result = await window.ethereum.request({
            method: "eth_call",
            params: [{
                to: MAITA_CONFIG.contract,
                data
            }, "latest"]
        });

        const balance = BigInt(result);
        const divisor = 10n ** 18n;
        const whole = balance / divisor;
        const fraction = (balance % divisor).toString()
            .padStart(18, "0").slice(0, 4);

        const display = whole.toString() + "." + fraction;

        let balanceElement = document.getElementById("maitaBalance");
        if (!balanceElement) {
            balanceElement = document.createElement("div");
            balanceElement.id = "maitaBalance";
            balanceElement.className = "wallet-card";
            document.getElementById("walletStatus")
                ?.insertAdjacentElement("afterend", balanceElement);
        }

        balanceElement.textContent = "MAITA: " + display;

        if (status) status.textContent += " | Red de prueba conectada";

    } catch (error) {
        console.error(error);
        if (status) status.textContent =
            "Error consultando MAITA. Verifica la red.";
    }
}

async function maitaImportToken() {
    if (!window.ethereum) {
        alert("Abre la app desde MetaMask.");
        return;
    }

    try {
        const added = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: MAITA_CONFIG.contract,
                    symbol: "MAITA",
                    decimals: 18
                }
            }
        });

        alert(added
            ? "MAITA agregado a tu billetera."
            : "No se agregó el token.");
    } catch (error) {
        alert("No se pudo importar: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-nav]").forEach(button => {
        button.addEventListener("click", () =>
            maitaNavigate(button.dataset.nav)
        );
    });

    document.getElementById("sendButton")
        ?.addEventListener("click", maitaSendMessage);

    document.getElementById("chatInput")
        ?.addEventListener("keydown", event => {
            if (event.key === "Enter") maitaSendMessage();
        });

    document.getElementById("mainButton")
        ?.addEventListener("click", iniciarIA);

    document.getElementById("connectWallet")
        ?.addEventListener("click", maitaConnectWallet);

    const wallet = document.getElementById("walletStatus");
    if (wallet) {
        const importButton = document.createElement("button");
        importButton.textContent = "＋ Agregar MAITA a MetaMask";
        importButton.className = "primary-button";
        importButton.addEventListener("click", maitaImportToken);
        wallet.insertAdjacentElement("afterend", importButton);
    }

    if (window.ethereum) {
        window.ethereum.on("accountsChanged", accounts => {
            maitaAccount = accounts[0] || null;
            if (maitaAccount) maitaReadBalance();
        });
    }
});
