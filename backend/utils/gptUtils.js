import dotenv from "dotenv";
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

const MODEL_QUEUE = (process.env.GPT_MODELS || "mistralai/mistral-7b-instruct")
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

export const extractUrls = (text) =>
  [...text.matchAll(/https?:\/\/\S+/g)].map((m) => m[0]);

export const askGPT = async ({ prompt }) => {
  let lastError;

  for (const model of MODEL_QUEUE) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": FRONTEND_URL,
          "X-Title": "KnowMyRights",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim();

      if (!text) throw new Error("No valid response from GPT");

      return {
        text,
        urls: extractUrls(text),
        modelUsed: model,
      };
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`All GPT models failed. Last error: ${lastError?.message}`);
};
