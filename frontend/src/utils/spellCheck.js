import axios from "axios";

export async function spellCheck(text, language = "en-US") {
  try {
    const params = new URLSearchParams({
      text,
      language,
    });

    const res = await axios.post(
      "https://api.languagetool.org/v2/check",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const matches = res.data.matches;
    let corrected = text;

    for (let match of matches.reverse()) {
      const replacement = match.replacements?.[0]?.value;
      if (replacement) {
        corrected =
          corrected.slice(0, match.offset) +
          replacement +
          corrected.slice(match.offset + match.length);
      }
    }

    return { corrected, matches };
  } catch (err) {
    console.error("Spell check failed", err);
    return { corrected: text, matches: [] };
  }
}
