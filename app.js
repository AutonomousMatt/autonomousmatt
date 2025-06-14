const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  const keywordMap = {
    "life": ["/story_the-ten-year-cycle.txt"],
    "cycle": ["/story_the-ten-year-cycle.txt"],
    "nbc": ["/story_the-ten-year-cycle.txt"],
    "personal": ["/story_the-ten-year-cycle.txt"],
    "growth": ["/story_the-ten-year-cycle.txt"],
    "decades": ["/story_the-ten-year-cycle.txt"],
    "career": ["/story_the-ten-year-cycle.txt"],
    "family": ["/story_the-ten-year-cycle.txt"],
    "values": ["/story_the-ten-year-cycle.txt"],
    "reflection": ["/story_the-ten-year-cycle.txt"],
    "new york times": ["/story_the-ten-year-cycle.txt"],
    "penn": ["/story_the-ten-year-cycle.txt"],
    "upenn": ["/story_the-ten-year-cycle.txt"],
    "destiny": ["/story_the-ten-year-cycle.txt"],
    "catholic": ["/story_the-ten-year-cycle.txt"],
    "grief": ["/story_when-you-fell-asleep-forever.txt"],
    "loss": ["/story_when-you-fell-asleep-forever.txt"],
    "pet": ["/story_when-you-fell-asleep-forever.txt"],
    "cat": ["/story_when-you-fell-asleep-forever.txt"],
    "tribute": ["/story_when-you-fell-asleep-forever.txt"],
    "remembrance": ["/story_when-you-fell-asleep-forever.txt"],
    "love": ["/story_when-you-fell-asleep-forever.txt"],
    "companionship": ["/story_when-you-fell-asleep-forever.txt"],
    "illness": ["/story_when-you-fell-asleep-forever.txt"],
    "euthanasia": ["/story_when-you-fell-asleep-forever.txt"],
    "vet": ["/story_when-you-fell-asleep-forever.txt"],
    "mourning": ["/story_when-you-fell-asleep-forever.txt"],
    "memory": ["/story_when-you-fell-asleep-forever.txt"],
    "immigration": ["/story_journey-from-there-to-here.txt"],
    "memoir": ["/story_journey-from-there-to-here.txt"],
    "america": ["/story_journey-from-there-to-here.txt"],
    "london": ["/story_journey-from-there-to-here.txt"],
    "philadelphia": ["/story_journey-from-there-to-here.txt"],
    "nyc": ["/story_journey-from-there-to-here.txt"],
    "qvc": ["/story_journey-from-there-to-here.txt"],
    "immigration": ["/story_journey-from-there-to-here.txt"],
    "personal": ["/story_journey-from-there-to-here.txt"],
    "playlist": ["/story_journey-from-there-to-here.txt"],
    "relocation": ["/story_journey-from-there-to-here.txt"],
    "career": ["/story_journey-from-there-to-here.txt"],
    "nostalgia": ["/story_journey-from-there-to-here.txt"],
    "transformation": ["/story_journey-from-there-to-here.txt"],
    "rebirth": ["/story_journey-from-there-to-here.txt"],
    "art": ["/story_life-in-art.txt"],
    "pretension": ["/story_life-in-art.txt"],
    "creative": ["/story_life-in-art.txt"],
    "identity": ["/story_life-in-art.txt"],
    "rejection": ["/story_life-in-art.txt"],
    "authenticity": ["/story_life-in-art.txt"],
    "gallery": ["/story_life-in-art.txt"],
    "purpose": ["/story_life-in-art.txt"],
    "writing": ["/story_life-in-art.txt"],
    "amsterdam": ["/story_life-in-art.txt"],
    "catharsis": ["/story_life-in-art.txt"],
    "career": ["/story_life-in-art.txt"],
    "blue": ["/film_blue.txt"],
    "AIDS": ["/film_blue.txt"],
    "grief": ["/film_blue.txt"],
    "jarman": ["/film_blue.txt"],
    "experimental": ["/film_blue.txt"],
    "memory": ["/film_blue.txt"],
    "london": ["/film_blue.txt"],
    "gay": ["/film_blue.txt"],
    "nostalgia": ["/film_virgin-suicides.txt"],
    "suicide": ["/film_virgin-suicides.txt"],
    "coppola": ["/film_virgin-suicides.txt"],
    "sofia": ["/film_virgin-suicides.txt"],
    "isolation": ["/film_virgin-suicides.txt"],
    "teenage": ["/film_virgin-suicides.txt"],
    "sisters": ["/film_virgin-suicides.txt"],
    "missionary": ["/film_godland.txt"],
    "palmason": ["/film_godland.txt"],
    "religion": ["/film_godland.txt"],
    "iceland": ["/film_godland.txt"],
    "norway": ["/film_godland.txt"],
    "japanese": ["/film_plan-75.txt"],
    "ethics": ["/film_plan-75.txt"],
    "aging": ["/film_plan-75.txt"],
    "euthanasia": ["/film_plan-75.txt"],
    "dystopia": ["/film_plan-75.txt"],
    "justice": ["/film_i-daniel-blake.txt"],
    "daniel": ["/film_i-daniel-blake.txt"],
    "blake": ["/film_i-daniel-blake.txt"],
    "homeless": ["/film_i-daniel-blake.txt"],
    "loach": ["/film_i-daniel-blake.txt", "/film_kes.txt", "/film_cathy-come-home.txt"],
    "austerity": ["/film_i-daniel-blake.txt"],
    "poverty": ["/film_i-daniel-blake.txt"],
    "napoleon": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
    "kubrick": ["/film_kubrick-napoleon.txt"],
    "bondarchuk": ["/film_kubrick-napoleon.txt", "/film_war-and-peace.txt"],
    "unmade": ["/film_kubrick-napoleon.txt"],
    "military": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
    "history": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
    "french": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
    "army": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
    "waterloo": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
    "austerlitz": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
    "rope": ["/film_rope.txt"],
    "gangster": ["/film_long-good-friday.txt"],
    "hoskins": ["/film_long-good-friday.txt"],
    "british": ["/film_long-good-friday.txt"],
    "crime": ["/film_long-good-friday.txt"],
    "criticism": ["/film_rope.txt"],
    "suspense": ["/film_rope.txt"],
    "hitchcock": ["/film_rope.txt"],
    "kes": ["/film_kes.txt"],
    "manchester": ["/film_kes.txt"],
    "school": ["/film_kes.txt"],
    "tragedy": ["/film_kes.txt"],
    "cathy": ["/film_cathy-come-home.txt"],
    "realism": ["/film_cathy-come-home.txt"],
    "peace": ["/film_war-and-peace.txt"],
    "russia": ["/film_war-and-peace.txt"],
    "tolstoy": ["/film_war-and-peace.txt"],
    "epic": ["/film_war-and-peace.txt"],
    "war": ["/film_war-and-peace.txt", "/film_napoleon.txt"]
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
      "/story_journey-from-there-to-here.txt",
      "/story_when-you-fell-asleep-forever.txt",
      "/story_the-ten-year-cycle.txt",
      "/story_life-in-art.txt"
    ];
  }

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
