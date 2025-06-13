const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  // Keyword-to-file mapping
  const keywordMap = {
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
    "napoleon": ["/film_napoleon.txt"]
  };

  // Flat matching — no scoring, just gather files
  let matchedFiles = [];
  for (const keyword in keywordMap) {
    if (prompt.includes(keyword)) {
      matchedFiles.push(...keywordMap[keyword]);
    }
  }

  // Remove duplicates
  matchedFiles = [...new Set(matchedFiles)];

  // Fallback to all files if no match
  if (matchedFiles.length === 0) {
    matchedFiles = [
      "/film_rope.txt",
      "/film_baron-munchausen.txt",
      "/film_napoleon.txt",
      "/film_cathy-come-home.txt",
      "/film_kes.txt"
    ];
  }

  // Create response block
  const block = document.createElement("div");
  block.className = "response-block";

  const header = document.createElement("h3");
  header.textContent = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  block.appendChild(header);

  const body = document.createElement("div");
  body.id = "thinking-text";
  body.textContent = "Matt is thinking";
  const dotSpan = document.createElement("span");
  dotSpan.className = "dots";
  dotSpan.innerHTML = "<span>.</span><span>.</span><span>.</span>";
  body.appendChild(dotSpan);
  block.appendChild(body);

  // Insert block at the top
  if (responseContainer.firstChild) {
    responseContainer.insertBefore(block, responseContainer.firstChild);
  } else {
    responseContainer.appendChild(block);
  }

  // Animate dots manually
  let dotCount = 0;
  const thinkingInterval = setInterval(() => {
    const dots = ".".repeat(dotCount % 4);
    body.childNodes[0].textContent = "Matt is thinking" + dots;
    dotCount++;
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

    // Pull the first matching source URL from frontmatter
    const url = extractFirstSourceUrl(archiveTexts);
    if (url) {
      const link = document.createElement("a");
      link.href = url;
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

// Extract first `source:` URL from any text block
function extractFirstSourceUrl(textBlocks) {
  for (const block of textBlocks) {
    const match = block.match(/source:\s*(https?:\/\/[^\s]+)/i);
    if (match && match[1]) return match[1].trim();
  }
  return null;
}
