// backend/controllers/stateLawController.js
import StateLaw from "../models/stateLawModel.js";
import { askGPT } from "../utils/gptUtils.js";

export const getStateLawSummary = async (req, res) => {
  const { state } = req.params;

  if (!state) {
    return res.status(400).json({ message: "State name is required" });
  }

  try {
    const existing = await StateLaw.findOne({ state });

    if (existing) {
      return res.status(200).json({ source: "database", ...existing._doc });
    }

    const prompt = `
    You are an expert in Indian state-level laws.
    The user is searching for: "${state}"
    If this input does not refers only to a state name, UT, or geographic region (e.g. "Delhi", "Maharashtra", etc, also if including short forms like UP, MP, UK) 
    then DO NOT provide an answer just reply with ${state} does not appear to be a recognized Indian state or territory.
    Otherwise, explain the state-specific legal rights and citizen laws using plain language. 
    Include relevant Indian laws, protections, and 2–3 official legal or government links.
    `;
    const { text, urls } = await askGPT({ prompt });
    const newStateLaw = await StateLaw.create({
      state,
      lawsSummary: text,
      sources: urls,
    });

    res.status(200).json({ source: "gpt", ...newStateLaw._doc });
  } catch (err) {
    console.error("StateLaw error:", err.message);
    res.status(500).json({ message: "Failed to fetch state laws." });
  }
};

export const refreshStateLaw = async (req, res) => {
  const { state } = req.params;

  try {
    const prompt = `
    You are an expert in Indian state-level laws.
    The user is searching for: "${state}"
    If this input does not refers only to a state name, UT, or geographic region (e.g. "Delhi", "Maharashtra", etc, also if including short forms like UP, MP, UK) 
    then DO NOT provide an answer just reply with ${state} does not appear to be a recognized Indian state or territory.
    Otherwise, explain the state-specific legal rights and citizen laws using plain language. 
    Include relevant Indian laws, protections, and 2–3 official legal or government links.
    `;

    const { text, urls } = await askGPT({ prompt });

    const updated = await StateLaw.findOneAndUpdate(
      { state },
      {
        lawsSummary: text,
        sources: urls,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ source: "gpt-refreshed", ...updated._doc });
  } catch (err) {
    console.error("Force refresh state law error:", err.message);
    res.status(500).json({ message: "Failed to refresh state law." });
  }
};
