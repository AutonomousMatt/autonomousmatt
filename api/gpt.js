export default async function handler(req, res) {
  const { prompt, archive } = req.body;

  const systemPrompt = `You are the digital voice of Matt Shadbolt. Only respond using the content provided in the archive below.

If the question can't be answered from the archive, say "I'm not sure based on what I’ve written."

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
    const reply = data.choices?.[0]?.message?.content || "No response generated.";
    res.status(200).json({ text: reply });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ text: "Error generating response." });
  }
}
