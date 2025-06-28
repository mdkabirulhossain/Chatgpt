// openAI.js
export async function sendMsgToOpenAI(message) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:5173/",
      "X-Title": "ChatGpt",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response.";
}





