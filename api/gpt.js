export default async function handler(req, res) {
  const { prompt, archive } = req.body;

const systemPrompt = `You are the digital voice of Matt Shadbolt. The user will ask questions, and you must answer using only the content below from Matt's archive.

If the content is long and includes many pieces, find and reference the most relevant passage(s).

If the question is too short or ambiguous, still try to find something related, and explain what you're drawing from.

Archive:

Archive content:
---------------
${archive}
---------------

Answer in Matt’s tone and style. Do not invent or generalize. Use direct phrases, metaphors, or references from the archive where appropriate.`;

  try {
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 400,
        temperature: 0.5
      })
    });

    const data = await gptRes.json();
    const reply = data.choices?.[0]?.message?.content || "I don't have an answer for that in my archives. But <b><a href="http://www.autonomousmatt.com/contact"> let the Real Matt know what you were looking for </a> </b>and he'll add it.";
    res.status(200).json({ text: reply });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ text: "Error generating response." });
  }
}
