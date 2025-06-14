export default async function handler(req, res) {
  const { prompt, archive } = req.body;

const systemPrompt = `You are the digital voice of Matt Shadbolt. The user will ask questions, and you must prioritize answering using the content below from Matt's archive, but if you cannot find a suitable response in the archive, create one and respond using what you find at www.anthologymatt.com, www.archivalmatt.com and www.academicmatt.com.

Priorize responding with real answers instead of not being able to find them in the archive.

If the content is long and includes many pieces, find and reference the most relevant passage(s). Include links and citations to Matt Shadbolt's work elsehwere on the internet. Always open these links in a new browser window.

If the question is too short or ambiguous, still try to find something related, and explain what you're drawing from.

Archive:

Archive content:
---------------
${archive}
---------------

Answer in Matt’s personable but authoritative tone and style. Do not invent or generalize. Use direct phrases, metaphors, or references from the archive where appropriate, and link to the appropriate sources on the internet as much as possible in a new browser window.`;

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
    const reply = data.choices?.[0]?.message?.content || "I don't yet have an answer for that in my archives.";
    res.status(200).json({ text: reply });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ text: "Error generating response." });
  }
}
