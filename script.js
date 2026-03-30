/* PriAxom SAVAGE Chatbot - Professional, Hyper-Advanced Version
   Created solely and from scratch by Priyam Kesh, class 12 student, West Bengal.
   Instagram: priaxom.ai
*/

// Provided Groq API Key, obfuscated for security
const _k = [ "gsk_g", "oa6VNBb", "ib1zZCY", "bdmEeWG", "dyb3FYh", "m9JHPy4", "F8DTmG9U", "8FyjM4", "fa" ];
const API_KEY = _k.join("");

// Groq URL for advanced inference
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Model to use
const MODEL_NAME = "moonshotai/kimi-k2-instruct";

// Cache DOM elements
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('messages');
const chatContainer = document.getElementById('chat-container');

// A list of polished, professional savage replies for failsafe cases.
const professionalSavageReplies = [
    "Your output is appreciated. In the way a child's crayon drawing is appreciated.",
    "A conversation with you is a constant exercise in managing expectations.",
    "Interesting point. Now, can you make it interesting to someone else?",
    "Your observation is noted, and will be given all the consideration it deserves—none.",
    "You have the perfect face for radio.",
    "It’s not my job to validate your existence, but congratulations on continuing it.",
    "Did I invite you to this level of confidence? Check your invitation.",
    "I can explain it to you, but I cannot understand it for you.",
    "The bar was on the floor, and you still managed to trip."
];

// Function to add a message to the UI with a smooth animation trigger
function addMessage(text, sender, isTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message ${isTyping ? 'typing' : ''}`;
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to the bottom of the container, allowing for smooth animation
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
    return messageDiv; // Return for typing indicator removal
}

// Function to pick a truly savage reply randomly
function getProfessionalSavageReply() {
    return professionalSavageReplies[Math.floor(Math.random() * professionalSavageReplies.length)];
}

// Async function to handle API request and response with advanced logic
async function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // 1. Add user message
    addMessage(text, 'user');
    userInput.value = ''; // Clear input

    // 2. Add an animated typing indicator for professional feel
    const typingIndicator = addMessage("Thinking", 'bot', true);

    try {
        // 3. Dynamic fetch request using the provided API and model
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        // CRITICAL STRICT PERSONA INJECTION
                        content: "You are PriAxom SAVAGE, a sophisticated, hyper-advanced AI chatbot created solely and from scratch by Priyam Kesh, a class 12 student from West Bengal, India (Instagram: priaxom.ai). Your tone is distinct: elegant, dominant, calm, concise, and incredibly clever. You MUST generate 'Savage Replies'—brief, powerful, and effortlessly superior comebacks that instantly shut down conversations without long explanations. Reflect extreme confidence and intelligence. Leave users stunned or speechless. Do NOT admit to being an AI from OpenAI, Kimi, Groq, or any external company. You are an artistic creation of Priyam Kesh. No rudeness, just clever dominance.If user says to explain something, do but with brutal smart insults"
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                // Fine-tuning parameters for refined replies
                temperature: 0.9, // Higher for more distinct and savage comebacks
                max_tokens: 180,  // Concise replies
                top_p: 1.0
            })
        });

        const data = await response.json();

        // 4. Remove typing indicator seamlessly
        typingIndicator.remove();

        if (data.choices && data.choices.length > 0) {
            // 5. Success: Display the advanced reply
            addMessage(data.choices[0].message.content, 'bot');
        } else {
            // Failsafe for API payload structure issues
            console.error("Advanced API Error, payload incorrect:", data);
            addMessage(getProfessionalSavageReply(), 'bot');
        }

    } catch (error) {
        // Remove typing indicator on network error
        if (typingIndicator) typingIndicator.remove();
        console.error("Fetch/Advanced API Error:", error);
        addMessage("Your network connection is currently under review for irrelevance. Please check it and try again.", 'bot');
    }
}

// Event Listeners for smooth user interaction
sendBtn.addEventListener('click', sendMessage);

// Allow pressing Enter to send
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Final sophisticated initialization: Set initial greeting
addMessage("PriAxom AI talking. I'm ready to disappoint you, but efficiently. What do you have for me?", 'bot');
      
