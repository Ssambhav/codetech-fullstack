import Right from "../models/rightsModel.js";
import { askGPT } from "../utils/gptUtils.js";

// Get rights summary for a category
export const getRightsByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category)
    return res.status(400).json({ message: "Category is required" });

  const normalized = category.toLowerCase().trim();

  try {
    const existing = await Right.findOne({ category: normalized });
    if (existing)
      return res.status(200).json({ source: "database", ...existing._doc });

    const prompt = `
You are a legal assistant for Indian citizens.

The user has asked for legal rights related to the category: "${category}".

If this input refers only to a state name, UT, or geographic region (e.g. "Delhi", "Maharashtra", etc), DO NOT provide a rights summary.
Instead, respond with exactly this message:
[INVALID_CATEGORY: REGION_QUERY]

If the category is empty, irrelevant, or unclear, respond with:
[INVALID_CATEGORY: UNKNOWN_TOPIC]

Otherwise, explain the key legal rights using plain language. Include relevant Indian laws, protections, and 2–3 official legal or government links.
    `.trim();

    const { text, urls } = await askGPT({ prompt });

    if (text.includes("[INVALID_CATEGORY: REGION_QUERY]")) {
      return res.status(200).json({
        source: "invalid",
        summary: `ℹ️ "${category}" appears to be a region. Please use the State Laws section instead.`,
        sources: [],
        category,
      });
    }

    if (text.includes("[INVALID_CATEGORY: UNKNOWN_TOPIC]")) {
      return res.status(200).json({
        source: "invalid",
        summary: `⚠️ The topic "${category}" could not be matched to a legal rights category. Try rephrasing or use LawBot for general legal questions.`,
        sources: [],
        category,
      });
    }

    const newRight = await Right.create({
      category: normalized,
      summary: text,
      sources: urls,
    });

    res.status(200).json({ source: "gpt", ...newRight._doc });
  } catch (err) {
    console.error("Rights Error:", err.message);
    res.status(500).json({ message: "Failed to fetch or generate rights." });
  }
};

export const refreshRightByCategory = async (req, res) => {
  const { category } = req.params;
  const normalized = category?.toLowerCase().trim();

  try {
    const prompt = `
You are a legal assistant for Indian citizens.

The user is refreshing legal rights information for: "${category}".

If this input refers only to a state name, UT, or geographic region (e.g. "Delhi", "Maharashtra", etc), DO NOT provide a rights summary.
Instead, respond with exactly this message:
[INVALID_CATEGORY: REGION_QUERY]

If the category is empty, irrelevant, or unclear, respond with:
[INVALID_CATEGORY: UNKNOWN_TOPIC]

Otherwise, explain the key legal rights using plain language. Include relevant Indian laws, protections, and 2–3 official legal or government links.
    `.trim();

    const { text, urls } = await askGPT({ prompt });

    if (text.includes("[INVALID_CATEGORY: REGION_QUERY]")) {
      return res.status(400).json({
        message: `ℹ️ "${category}" appears to be a region. Please refresh via the State Laws section instead.`,
      });
    }

    if (text.includes("[INVALID_CATEGORY: UNKNOWN_TOPIC]")) {
      return res.status(400).json({
        message: `⚠️ The topic "${category}" is not valid for legal rights. Try a different category.`,
      });
    }

    const updated = await Right.findOneAndUpdate(
      { category: normalized },
      { summary: text, sources: urls, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ source: "gpt-refreshed", ...updated._doc });
  } catch (err) {
    console.error("Force refresh rights error:", err.message);
    res.status(500).json({ message: "Failed to refresh rights data." });
  }
};
