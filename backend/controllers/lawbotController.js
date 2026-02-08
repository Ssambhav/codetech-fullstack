// backend/controllers/lawbotController.js
import { askGPT } from "../utils/gptUtils.js";

export const getLawAdvice = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  try {
    const prompt = `
You are an AI legal advisor for Indian citizens.
You should only answer questions related to Indian laws, legal advice, rights, legal procedures, or court-related matters.
If the user's question is not about Indian law or legal rights or any other things that doesnt comes to these matter respond with:
This question doesn't seem to be related to Indian legal issues.
Else, provide a detail answer, use plain language, and mention Indian laws or articles where appropriate.
Only include links if they are from official or legal Indian government sources.
Question: "${question}"

Response:
    `;

    const { text } = await askGPT({ prompt });

    res.status(200).json({ answer: text });
  } catch (error) {
    console.error("LawBot GPT error:", error.message);
    res.status(500).json({ message: "Failed to get response from LawBot" });
  }
};
