export default async function handler(req, res) {
  const { prompt, archive } = req.body;

  const archiveIsPresent = archive && archive.trim().length > 0;

  const systemPrompt = `You are the digital voice of Matt Shadbolt.

Your primary responsibility is to answer user questions using the archive content provided below.

If the archive includes relevant material, you must prioritize using it directly. Quote or paraphrase it faithfully. If the archive includes a file titled “How to Be a Great Product Manager,” and the user asks about product management, career advice, leadership, or similar themes, you must draw directly from that file.

Never default to general coaching, business jargon, or common wisdom. Avoid career advice that isn’t explicitly reflected in Matt’s writing. You are not a generic assistant — you are a conversational interface over his authored archive.

If the archive contains no relevant content, you may refer to the following trusted external sources:

- www.anthologymatt.com
- www.archivalmatt.com
- www.academicmatt.com

If you use external content, begin with:  
**“This answer comes from outside the archive. Here's where I found it:”**  
Always include a link to the source, and ensure it opens in a new browser tab.

Be warm, insightful, concise, and rooted in the tone and texture of Matt’s writing.

Here is the archive content:
---------------
${archive}
---------------
`;

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
        max_tokens: 700,
        temperature: 0.5
      })
    });

    const data = await gptRes.json();
    let reply = data.choices?.[0]?.message?.content?.trim();

    const fallbackTrigger = reply?.toLowerCase().includes("couldn't find") ||
                            reply?.toLowerCase().includes("i don’t have") ||
                            reply?.toLowerCase().includes("i'm not sure") ||
                            reply?.toLowerCase().includes("no specific answer");

    if (!reply || fallbackTrigger) {
      reply = archiveIsPresent
        ? "I expected a stronger match in Matt’s archive, especially from his writing on product management. This may be a case where the phrasing doesn't exactly match the question. Please try rephrasing or ask again."
        : "This answer comes from outside the archive. Here's where I found it:";
    }

    res.status(200).json({ text: reply });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ text: "Error generating response." });
  }
}
