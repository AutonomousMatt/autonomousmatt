const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  // Keyword-to-file mapping
  const keywordMap = {
    "rope": ["/rope.txt"],
    "hitchcock": ["/rope.txt"],
    "film reviews": ["/FilmReviews_01.txt"],
    "munchausen": ["/grasp-the-nettle-baron-munchausen.txt"],
    "napoleon": ["/napoleon.txt"]
    // Add more as needed
  };

  // Score file relevance
  const scores = {};
  for (const keyword in keywordMap) {
    if (prompt.includes(keyword)) {
      keywordMap[keyword].forEach(file => {
        scores[file] = (scores[file] || 0) + 1;
      });
    }
  }

  const rankedFiles = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const matchedFiles = rankedFiles.length > 0
    ? rankedFiles
    : ["/rope.txt", "/FilmReviews_01.txt", "/grasp-the-nettle-baron-munchausen.txt", "/napoleon.txt"];

  // Create response block
  const block = document.createElement("div");
  block.className = "response-block";

  const header = document.createElement("h3");
  header.textContent = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  block.appendChild(header);

  const body = document.createElement("div");
  body.id = "thinking-text";
  block.appendChild(body);

  // Insert block at the top
  if (responseContainer.firstChild) {
    responseContainer.insertBefore(block, responseContainer.firstChild);
  } else {
    responseContainer.appendChild(block);
  }

  // Typewriter-style dot animation
  let dotCount = 0;
  let typingText = "Matt is thinking";
  const thinkingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    body.textContent = typingText + ".".repeat(dotCount);
  }, 400);

  try {
    const archivePromises = matchedFiles.map(file => fetch(file).then(r => r.text()));
    const archiveTexts = await Promise.all(archivePromises);
    const archiveText = archiveTexts.join("\n\n");

    const gptRes = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, archive: archiveText })
    });

    clearInterval(thinkingInterval);

    const json = await gptRes.json();
    const reply = json.text?.trim() || "I'm thinking... but I need a bit more to go on.";
    body.innerHTML = marked.parse(reply);

    const source = document.createElement("div");
    source.className = "source";
    source.textContent = "Source: " + matchedFiles.map(f => f.replace("/", "").replace(".txt", "")).join(", ");
    block.appendChild(source);

    block.classList.add("show");

    history.unshift({ prompt, reply }); // Push to top of history
  } catch (err) {
    clearInterval(thinkingInterval);
    body.textContent = "Error loading archive or generating response.";
    console.error("Error:", err);
  }
}
