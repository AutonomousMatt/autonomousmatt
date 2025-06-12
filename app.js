async function ask() {
  const prompt = document.getElementById("prompt").value.toLowerCase();
  const responseEl = document.getElementById("response");
  responseEl.textContent = "Thinking...";

  // Keyword-to-file mapping
  const keywordMap = {
    "rope": ["/rope.txt"],
    "hitchcock": ["/rope.txt"],
    "munchausen": ["/grasp-the-nettle-baron-munchausen.txt"],
    "napoleon": ["/napoleon.txt"]
    // Add more keyword/file pairs as needed
  };

  // Match prompt to files
  let matchedFiles = [];
  for (const keyword in keywordMap) {
    if (prompt.includes(keyword)) {
      matchedFiles.push(...keywordMap[keyword]);
    }
  }

  // Fallback: use all files if no keyword matched
  if (matchedFiles.length === 0) {
    matchedFiles = [
      "/rope.txt",
      "/grasp-the-nettle-baron-munchausen.txt",
      "/napoleon.txt"
      // Add all your files here
    ];
  }

  try {
    // Fetch and combine archive text
    const archivePromises = matchedFiles.map(file => fetch(file).then(r => r.text()));
    const archiveTexts = await Promise.all(archivePromises);
    const archiveText = archiveTexts.join("\n\n");

    const gptRes = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, archive: archiveText })
    });

    const json = await gptRes.json();
    responseEl.textContent = json.text?.trim() || "I'm thinking... but I need a bit more to go on.";
  } catch (err) {
    responseEl.textContent = "Error loading archive or generating response.";
    console.error("Error:", err);
  }
}
