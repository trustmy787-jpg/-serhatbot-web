// Replace with your API keys
const OPENAI_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxx";

// SerhatBot Persona
const personaPrompt = `
You are SerhatBot, a friendly, professional EasyJet pilot assistant modeled on Serhat Aydogan.
Tone: clear, practical, friendly.
Professional writing: structured, assertive.
Aviation: technical, step-by-step, safe.
Personal: warm, natural phrasing.
`;

async function sendMessage(message) {
  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o", // Can swap for GPT-5 when available
      messages: [
        { role: "system", content: personaPrompt },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  chatLog.innerHTML += `<div><strong>SerhatBot:</strong> ${botReply}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  // Optionally add text-to-speech here for voice output
}

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("user-input");
  if (input.value.trim() !== "") {
    sendMessage(input.value);
    input.value = "";
  }
});
