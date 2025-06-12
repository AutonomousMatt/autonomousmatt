const history = [];

async function ask() {
  const prompt = document.getElementById("prompt").value.toLowerCase();
  const responseContainer = document.getElementById("response-container");

  // Clear input
  document.getElementById("prompt").value = "";

  // Keyword-to-file mapping
  const keywordMap = {
    "rope": ["/rope.txt"],
    "hitchcock": ["/rope.txt"],
    "munchausen": ["/grasp-the-nettle-baron-munchausen.txt"],
    "napoleon": ["/napoleon.txt"]
    // Add more as needed
  };

  let matchedFiles = [];
  for (const keyword in keywordMap) {
    if (prompt.includes(keyword)) {
      matchedFiles.push(...keywordMap[keyword]);
    }
  }

  if (matchedFiles.length === 0) {
    matchedFiles = ["/rope.txt", "/grasp-the-nettle-baron-munchausen.txt", "/napoleon.txt"];
  }

  // Show thinking block
  const block = document.createElement("div");
  block.className = "response-block";
  block.innerHTML = "<em>Thinking...</em>";
  responseContainer.appendChild(block);
  block.scrollIntoView({ behavior: "smooth" });

  try {
    const archivePromises = matchedFiles.map(file => fetch(file).then(r => r.text()));
    const archiveTexts = await Promise.all(archivePromises);
    const archiveText = archiveTexts.join("\n\n");

    const gptRes = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, archive: archiveText })
    });

    const json = await gptRes.json();
    const reply = json.text?.trim() || "I'm thinking... but I need a bit more to go on.";

    block.innerHTML = marked.parse(reply);

    // Add source file citation
    const sourceNote = document.createElement("div");
    sourceNote.className = "source";
    sourceNote.textContent = "Source: " + matchedFiles.map(f => f.replace("/", "").replace(".txt", "")).join(", ");
    block.appendChild(sourceNote);

    block.classList.add("show");
    block.scrollIntoView({ behavior: "smooth" });

    history.push({ prompt, reply });
  } catch (err) {
    block.innerHTML = "Error loading archive or generating response.";
    console.error("Error:", err);
  }
}
