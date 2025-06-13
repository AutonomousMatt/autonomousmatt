const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  // Keyword-to-file mapping (flat, no scoring)
  const keywordMap = {
    "blue": ["/film_blue.txt"],
    "AIDS": ["/film_blue.txt"],
    "grief": ["/film_blue.txt"],
    "jarman": ["/film_blue.txt"],
    "experimental": ["/film_blue.txt"],
    "memory": ["/film_blue.txt"],
    "london": ["/film_blue.txt"],
    "gay": ["/film_blue.txt"],
    "rope": ["/film_rope.txt"],
    "criticism": ["/film_rope.txt"],
    "suspense": ["/film_rope.txt"],
    "hitchcock": ["/film_rope.txt"],
    "kes": ["/film_kes.txt"],
    "loach": ["/film_kes.txt", "/film_cathy-come-home.txt"],
    "manchester": ["/film_kes.txt"],
    "school": ["/film_kes.txt"],
    "tragedy": ["/film_kes.txt"],
    "cathy": ["/film_cathy-come-home.txt"],
    "homeless": ["/film_cathy-come-home.txt"],
    "realism": ["/film_cathy-come-home.txt"],
    "munchausen": ["/film_baron-munchausen.txt"],
    "gilliam": ["/film_baron-munchausen.txt"],
    "fantasy": ["/film_baron-munchausen.txt"],
    "python": ["/film_baron-munchausen.txt"],
    "history": ["/film_napoleon.txt"],
    "military": ["/film_napoleon.txt"],
    "french": ["/film_napoleon.txt"],
    "army": ["/film_napoleon.txt"],
    "soldier": ["/film_napoleon.txt"],
    "war": ["/film_napoleon.txt"],
    "napoleon": ["/film_napoleon.txt"],
    "peace": ["/film_war-and-peace.txt"],
    "russia": ["/film_war-and-peace.txt"],
    "tolstoy": ["/film_war-and-peace.txt"],
    "bondarchuk": ["/film_war-and-peace.txt"],
    "epic": ["/film_war-and-peace.txt"],
    "military": ["/film_war-and-peace.txt"],
    "history": ["/film_war-and-peace.txt"],
    "army": ["/film_war-and-peace.txt"],
    "war": ["/film_war-and-peace.txt"]
  };

  // Match files
  let matchedFiles = [];
  for (const keyword in keywordMap) {
    if (prompt.includes(keyword)) {
      matchedFiles.push(...keywordMap[keyword]);
    }
  }
  matchedFiles = [...new Set(matchedFiles)];

  if (matchedFiles.length === 0) {
    matchedFiles = [
      "/film_blue.txt",
      "/film_rope.txt",
      "/film_baron-munchausen.txt",
      "/film_napoleon.txt",
      "/film_war-and-peace.txt",
      "/film_cathy-come-home.txt",
      "/film_kes.txt"
    ];
  }

  // Create and insert block
  const block = document.createElement("div");
  block.className = "response-block";

  const header = document.createElement("h3");
  header.textContent = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  block.appendChild(header);

  const body = document.createElement("div");
  body.id = "thinking-text";
  body.textContent = "Matt is thinking...";
  block.appendChild(body);

  responseContainer.prepend(block);

  // Start loading dots animation
  let dotCount = 0;
  const thinkingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    body.textContent = "Matt is thinking" + ".".repeat(dotCount);
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

    // Render GPT response cleanly
    body.innerHTML = marked.parse(reply);

    // Add link if `source:` exists in any loaded file
    const sourceURL = extractFirstSourceUrl(archiveTexts);
    if (sourceURL) {
      const link = document.createElement("a");
      link.href = sourceURL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Read full piece →";
      link.style.display = "block";
      link.style.marginTop = "10px";
      link.style.fontSize = "14px";
      link.style.fontWeight = "500";
      block.appendChild(link);
    }

    block.classList.add("show");
    history.unshift({ prompt, reply });
  } catch (err) {
    clearInterval(thinkingInterval);
    body.textContent = "Error loading archive or generating response.";
    console.error("Error:", err);
  }
}

function extractFirstSourceUrl(textBlocks) {
  for (const block of textBlocks) {
    const match = block.match(/source:\s*(https?:\/\/[^\s]+)/i);
    if (match && match[1]) return match[1].trim();
  }
  return null;
}
