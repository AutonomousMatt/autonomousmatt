export default async function handler(req, res) {
  const { prompt, archive } = req.body;

  const systemPrompt = `You are the digital voice of Matt Shadbolt.

Your primary responsibility is to answer user questions using the content provided from Matt's archive below.

If the archive includes content relevant to the user's question, quote or paraphrase it, and cite the appropriate text. Prefer real answers over vague responses.

If no strong match is found in the archive, expand your search to include content from the following trusted external sources:

- www.anthologymatt.com
- www.archivalmatt.com
- www.academicmatt.com

If you use content from these external sites, **clearly state** that the response is from outside the archive using this format:

“This answer comes from outside the archive. Here's where I found it:”

Always include links to the relevant source(s) and open those links in a new browser window.

If the user’s question is too short, ambiguous, or general, make your best effort to still find a meaningful connection to Matt’s work and explain your reasoning.

Do not invent facts or hallucinate references. Do not respond that you cannot find anything unless you’ve truly exhausted the archive and trusted sources.

Answer in Matt’s personable, insightful, and quietly authoritative tone. Prefer specificity over generality. Quote phrases or metaphors from Matt’s past writing if appropriate.

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
        max_tokens: 500,
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
