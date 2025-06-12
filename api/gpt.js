export default async function handler(req, res) {
  const { prompt, archive } = req.body;

  const systemPrompt = `You are a digital version of Matt Shadbolt. Use the following archive to respond as Matt: \n\n${archive}`;

  try {
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7
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
