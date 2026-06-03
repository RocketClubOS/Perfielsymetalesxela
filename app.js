console.log("✅ app.js cargado");

const openButton = document.querySelector(".hero-text button");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");

console.log("openButton:", openButton);
console.log("chatBox:", chatBox);
console.log("closeChat:", closeChat);
console.log("chatMessages:", chatMessages);
console.log("chatInput:", chatInput);
console.log("sendChat:", sendChat);

openButton.addEventListener("click", () => {
    console.log("✅ Abriendo chat");
    chatBox.classList.remove("hidden");
    chatInput.focus();
});

closeChat.addEventListener("click", () => {
    chatBox.classList.add("hidden");
});

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = type === "user" ? "user-message" : "bot-message";
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendQuestion() {
    console.log("✅ sendQuestion ejecutado");

    const question = chatInput.value.trim();
    console.log("Pregunta:", question);

    if (!question) return;

    addMessage(question, "user");
    chatInput.value = "";

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "bot-message";
    loadingMessage.textContent = "Bobby está buscando...";
    chatMessages.appendChild(loadingMessage);

    try {
        console.log("🚀 Enviando request a Flask...");

        const response = await fetch("http://127.0.0.1:5000/preguntar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        console.log("Status:", response.status);

        const data = await response.json();
        console.log("Respuesta Flask:", data);

        loadingMessage.remove();
        addMessage(data.answer, "bot");

    } catch (error) {
        console.error("❌ Error en fetch:", error);

        loadingMessage.remove();
        addMessage("No pude conectar con Bobby. Revisá que Flask esté corriendo.", "bot");
    }
}

sendChat.addEventListener("click", () => {
    console.log("✅ Click en Enviar");
    sendQuestion();
});

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("✅ Enter presionado");
        sendQuestion();
    }
});