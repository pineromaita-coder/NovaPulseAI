
/* ==========================================
   MAITA NOVA IA — MAITACORE
   Aplicación principal v1.0
========================================== */

"use strict";

const MAITA_CONFIG = {
    name: "Maita Nova IA",
    core: "MaitaCore",
    api: "https://nova-pulse-ai-1--pineromaita.replit.app/chat"
};

const MaitaCore = {
    history: [],

    async send(message) {
        if (!message.trim()) return "Escribe un mensaje.";

        this.history.push({
            role: "user",
            content: message
        });

        try {
            const response = await fetch(MAITA_CONFIG.api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    history: this.history.slice(-12)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error de conexión");
            }

            const reply = data.reply || "No recibí una respuesta.";

            this.history.push({
                role: "assistant",
                content: reply
            });

            return reply;

        } catch (error) {
            console.error("MaitaCore:", error);
            return "MaitaCore no está disponible en este momento. Comprueba que el servidor esté activo.";
        }
    }
};

/* NAVEGACIÓN */

function maitaNavigate(section) {
    document.querySelectorAll("[data-section]").forEach(element => {
        element.hidden = element.dataset.section !== section;
    });

    document.querySelectorAll("[data-nav]").forEach(element => {
        element.classList.toggle(
            "active",
            element.dataset.nav === section
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* CHAT */

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

    const chat = document.getElementById("chatMessages");
    if (chat) {
        chat.appendChild(loading);
        chat.scrollTop = chat.scrollHeight;
    }

    const answer = await MaitaCore.send(message);

    document.getElementById("maitaLoading")?.remove();
    maitaAddMessage(answer, "assistant");
}

/* ACTIVACIÓN */

function iniciarIA() {
    const status = document.getElementById("coreStatus");

    if (status) {
        status.textContent = "MAITACORE ACTIVO";
    }

    const button = document.getElementById("mainButton");

    if (button) {
        button.textContent = "MAITACORE ACTIVADO";
    }

    maitaSpeak("Operador autorizado. MaitaCore preparado.");
}

/* VOZ */

function maitaSpeak(text) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "es-ES";
    speech.rate = 1;
    speech.pitch = 0.9;

    window.speechSynthesis.speak(speech);
}

/* EVENTOS */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-nav]").forEach(button => {
        button.addEventListener("click", () => {
            maitaNavigate(button.dataset.nav);
        });
    });

    const sendButton = document.getElementById("sendButton");
    const chatInput = document.getElementById("chatInput");

    sendButton?.addEventListener("click", maitaSendMessage);

    chatInput?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            maitaSendMessage();
        }
    });

    document.getElementById("mainButton")
        ?.addEventListener("click", iniciarIA);

    console.log("MAITA NOVA IA — MAITACORE INICIALIZADO");
});
