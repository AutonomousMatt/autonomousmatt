const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  const keywordMap = {
    // [INSERT FULL keywordMap CONTENT HERE — OMITTED FOR BREVITY]
  };

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
      "/film_plan-75.txt",
      "/film_godland.txt",
      "/film_long-good-friday.txt",
      "/film_virgin-suicides.txt",
      "/film_kubrick-napoleon.txt",
      "/film_kes.txt",
      "/film_legacy-of-zulu-dawn.txt",
      "/story_journey-from-there-to-here.txt",
      "/story_when-you-fell-asleep-forever.txt",
      "/story_the-ten-year-cycle.txt",
      "/story_freedom-of-the-worst-day-of-your-life.txt",
      "/story_when-work-stops-being-the-work.txt",
      "/story_twenty-things-in-twenty-years.txt",
      "/story_how-to-be-a-great-product-manager.txt",
      "/story_life-in-art.txt",
      "/talk_destiny-habituation-tactics.txt"
    ];
  }

  const block = document.createElement("div");
  block.className = "response-block";

  const header = document.createElement("h3");
  header.textContent = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  block.appendChild(header);

  const body = document.createElement("div");
  body.textContent = "Matt is thinking...";
  block.appendChild(body);

  responseContainer.prepend(block);

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

    const html = marked.parse(reply);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    doc.querySelectorAll("a").forEach(link => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.style.color = "#000";
      link.style.fontWeight = "bold";
      link.style.textDecoration = "underline";
    });

    body.removeAttribute("style");
    body.innerHTML = doc.body.innerHTML;

    const sourceURL = extractFirstSourceUrl(archiveTexts);
    if (sourceURL) {
      const link = document.createElement("a");
      link.href = sourceURL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Read More...";
      link.style.display = "block";
      link.style.marginTop = "10px";
      link.style.fontSize = "14px";
      link.style.fontWeight = "500";
      link.style.textDecoration = "underline";
      link.style.color = "#000";
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
