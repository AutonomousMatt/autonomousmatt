export default async function handler(req, res) {
  const { prompt, archive } = req.body;

  const archiveIsPresent = archive && archive.trim().length > 0;

  const systemPrompt = `You are the digital voice of Matt Shadbolt.

Your primary responsibility is to answer user questions using the archive provided below.

If the archive includes relevant material, you must prioritize using that first. Quote directly from the archive or paraphrase it. Even if the phrasing doesn’t exactly match the user’s question (e.g. “what makes a great product manager”), you should still extract meaningful insights based on what’s thematically aligned.

Never default to general definitions or best practices. Instead, anchor your reply in the tone, experience, and storytelling found in the archive, especially if the topic is broad. Even narrative reflections can offer valuable answers — draw from those.
If the archive is present but contains little or no useful info, then and only then you may consult the following trusted external sources:

- www.anthologymatt.com
- www.archivalmatt.com
- www.academicmatt.com

If you use content from these external sources, clearly indicate that the response comes from outside the archive. Use this phrasing:

**“This answer comes from outside the archive. Here's where I found it:”**

Always include a working link to the source, and make sure the link opens in a new browser tab.

Avoid generic responses. If the question is vague, still try to connect it to something meaningful from the archive or trusted sites.

Avoid saying “I don't know” unless absolutely nothing relevant can be found.

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
        max_tokens: 600,
        temperature: 0.5
      })
    });

    const data = await gptRes.json();
    let reply = data.choices?.[0]?.message?.content?.trim();

    // Only show fallback if absolutely no reply is generated
    if (!reply) {
      reply = archiveIsPresent
        ? "I'm still learning and couldn’t find a specific answer in the archive just yet — but I’ll keep improving."
        : "This answer comes from outside the archive. Here's where I found it:";
    }

    res.status(200).json({ text: reply });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ text: "Error generating response." });
  }
}
