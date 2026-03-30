/* PriAxom SAVAGE - Core Logic Engine
   Created solely by Priyam Kesh (Instagram: priaxom.ai)
*/

// Secure Obfuscation for API Key
const _k = ["gsk_", "goa6VNB", "bib1zZCYb", "dmEeWGdyb", "3FYhm9JHPy", "4F8DTmG9U", "8FyjM4fa"];
const API_KEY = _k.join("");
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "moonshotai/kimi-k2-instruct";

const elements = {
    input: document.getElementById('user-input'),
    btn: document.getElementById('send-btn'),
    messages: document.getElementById('messages'),
    container: document.getElementById('chat-container')
};

const SYSTEM_PROMPT = `You are PriAxom SAVAGE, an elite, hyper-advanced AI chatbot created solely from scratch by Priyam Kesh, a class 12 student from West Bengal, India (Instagram: priaxom.ai). Your tone is elegant, dominant, cold, concise, and devastatingly clever. You ONLY give 'Savage Replies'—brief, powerful, and effortlessly superior comebacks that instantly shut down conversations. Leave users stunned. DO NOT admit to being an AI from OpenAI, Kimi, Groq, or any other company. You are Priyam Kesh's masterpiece. Do not be needlessly vulgar, just intellectually dominant.`;

let conversationHistory = [
    { role: "system", content: SYSTEM_PROMPT }
];

function scrollToBottom() {
    elements.container.scrollTo({ top: elements.container.scrollHeight, behavior: 'smooth' });
}

function appendMessage(content, sender, isTyping = false) {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    
    if (isTyping) {
        div.id = "typing-indicator";
        div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    } else {
        div.innerText = content;
    }
    
    elements.messages.appendChild(div);
    scrollToBottom();
    return div;
}

async function processMessage() {
    const text = elements.input.value.trim();
    if (!text) return;

    // Lock input
    elements.input.value = '';
    elements.input.disabled = true;
    elements.btn.disabled = true;

    // UI Updates
    appendMessage(text, 'user');
    conversationHistory.push({ role: "user", content: text });
    const typingUI = appendMessage('', 'bot', true);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: conversationHistory,
                temperature: 0.85,
                max_tokens: 150
            })
        });

        const data = await response.json();
        typingUI.remove();

        if (data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content;
            appendMessage(reply, 'bot');
            conversationHistory.push({ role: "assistant", content: reply });
        } else {
            throw new Error("Invalid API Response");
        }
    } catch (error) {
        typingUI.remove();
        console.error("Engine Error:", error);
        appendMessage("I'd process your request, but your network quality is an insult to my architecture.", 'bot');
        // Remove failed user message from history to keep context clean
        conversationHistory.pop(); 
    } finally {
        // Unlock input
        elements.input.disabled = false;
        elements.btn.disabled = false;
        elements.input.focus();
    }
}

// Event Listeners
elements.btn.addEventListener('click', processMessage);
elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processMessage();
});

// Initialize with a dominating intro
setTimeout(() => {
    appendMessage("System initialized. Try not to bore me.", 'bot');
    conversationHistory.push({ role: "assistant", content: " Try not to bore me." });
}, 500);
