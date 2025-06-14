const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

  const keywordMap = {
  "aids": ["/film_blue.txt"],
  "zulu": ["/film_legacy-of-zulu-dawn.txt"],
    "british": ["/film_legacy-of-zulu-dawn.txt"],
    "empire": ["/film_legacy-of-zulu-dawn.txt"],
    "1879": ["/film_legacy-of-zulu-dawn.txt"],
    "battle": ["/film_legacy-of-zulu-dawn.txt"],
    "rorkes drift": ["/film_legacy-of-zulu-dawn.txt"],
    "isandlwana": ["/film_legacy-of-zulu-dawn.txt"],
    "pyrrhic": ["/film_legacy-of-zulu-dawn.txt"],
    "south africa": ["/film_legacy-of-zulu-dawn.txt"],
    "victorian": ["/film_legacy-of-zulu-dawn.txt"],
    "zulu dawn": ["/film_legacy-of-zulu-dawn.txt"],
    "anglo-zulu": ["/film_legacy-of-zulu-dawn.txt"],
    "war": ["/film_legacy-of-zulu-dawn.txt"],
  "analytics": ["/story_how-to-be-a-great-product-manager.txt"],
  "army": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "atlassian": ["/story_how-to-be-a-great-product-manager.txt"],
  "austerlitz": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "blue": ["/film_blue.txt"],
  "bondarchuk": ["/film_kubrick-napoleon.txt", "/film_war-and-peace.txt"],
  "british": ["/film_long-good-friday.txt"],
  "bungie": ["/talk_destiny-habituation_tactics.txt"],
  "cancer": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "career": ["/story_how-to-be-a-great-product-manager.txt", "/story_twenty-things-in-twenty-years.txt"],
  "cat": ["/story_when-you-fell-asleep-forever.txt"],
  "catholic": ["/story_the-ten-year-cycle.txt"],
  "collaboration": ["/story_how-to-be-a-great-product-manager.txt"],
  "communication": ["/story_how-to-be-a-great-product-manager.txt"],
  "community": ["/talk_destiny-habituation_tactics.txt"],
  "companionship": ["/story_when-you-fell-asleep-forever.txt"],
  "confluence": ["/story_how-to-be-a-great-product-manager.txt"],
  "consistency": ["/story_twenty-things-in-twenty-years.txt"],
  "coppola": ["/film_virgin-suicides.txt"],
  "crime": ["/film_long-good-friday.txt"],
  "criticism": ["/film_rope.txt"],
  "cycle": ["/story_the-ten-year-cycle.txt"],
  "decades": ["/story_the-ten-year-cycle.txt"],
  "destiny": ["/story_the-ten-year-cycle.txt", "/talk_destiny-habituation_tactics.txt"],
  "dog": ["/story_twenty-things-in-twenty-years.txt"],
  "emotional intelligence": ["/story_twenty-things-in-twenty-years.txt"],
  "empathy": ["/story_how-to-be-a-great-product-manager.txt", "/story_twenty-things-in-twenty-years.txt"],
  "euthanasia": ["/story_when-you-fell-asleep-forever.txt"],
  "experimental": ["/film_blue.txt"],
  "family": ["/story_the-ten-year-cycle.txt"],
  "fired": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "french": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "gaming": ["/talk_destiny-habituation_tactics.txt"],
  "gangster": ["/film_long-good-friday.txt"],
  "grief": ["/story_when-you-fell-asleep-forever.txt"],
  "grit": ["/story_how-to-be-a-great-product-manager.txt"],
  "growth": ["/story_freedom-of-the-worst-day-of-your-life.txt", "/story_twenty-things-in-twenty-years.txt"],
  "habit": ["/talk_destiny-habituation_tactics.txt"],
  "hard work": ["/story_twenty-things-in-twenty-years.txt"],
  "healing": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "history": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "hitchcock": ["/film_rope.txt"],
  "hoskins": ["/film_long-good-friday.txt"],
  "illness": ["/story_when-you-fell-asleep-forever.txt"],
  "immigration": ["/story_twenty-things-in-twenty-years.txt"],
  "interactive": ["/talk_destiny-habituation_tactics.txt"],
  "isolation": ["/film_virgin-suicides.txt"],
  "jarman": ["/film_blue.txt"],
  "jira": ["/story_how-to-be-a-great-product-manager.txt"],
  "kindness": ["/story_how-to-be-a-great-product-manager.txt"],
  "kubrick": ["/film_kubrick-napoleon.txt"],
  "leadership": ["/story_how-to-be-a-great-product-manager.txt", "/story_twenty-things-in-twenty-years.txt"],
  "lesson": ["/story_twenty-things-in-twenty-years.txt"],
  "life": ["/story_the-ten-year-cycle.txt"],
  "listen": ["/story_how-to-be-a-great-product-manager.txt"],
  "listening": ["/story_how-to-be-a-great-product-manager.txt"],
  "loss": ["/story_when-you-fell-asleep-forever.txt"],
  "love": ["/story_when-you-fell-asleep-forever.txt"],
  "manager": ["/story_how-to-be-a-great-product-manager.txt"],
  "marriage": ["/story_twenty-things-in-twenty-years.txt"],
  "mechanics": ["/talk_destiny-habituation_tactics.txt"],
  "memory": ["/story_when-you-fell-asleep-forever.txt"],
  "mental health": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "metrics": ["/story_how-to-be-a-great-product-manager.txt"],
  "military": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "mourning": ["/story_when-you-fell-asleep-forever.txt"],
  "napoleon": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "nbc": ["/story_the-ten-year-cycle.txt"],
  "new york times": ["/story_the-ten-year-cycle.txt"],
  "nostalgia": ["/film_virgin-suicides.txt"],
  "onboarding": ["/talk_destiny-habituation_tactics.txt"],
  "optimism": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "penn": ["/story_the-ten-year-cycle.txt"],
  "personal": ["/story_the-ten-year-cycle.txt"],
  "perspective": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "pet": ["/story_when-you-fell-asleep-forever.txt"],
  "product": ["/story_how-to-be-a-great-product-manager.txt", "/story_twenty-things-in-twenty-years.txt"],
  "product manager": ["/story_how-to-be-a-great-product-manager.txt"],
  "psychology": ["/talk_destiny-habituation_tactics.txt"],
  "real estate": ["/talk_destiny-habituation_tactics.txt"],
  "reflection": ["/story_twenty-things-in-twenty-years.txt"],
  "remembrance": ["/story_when-you-fell-asleep-forever.txt"],
  "resilience": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "reslience": ["/story_twenty-things-in-twenty-years.txt"],
  "rewards": ["/talk_destiny-habituation_tactics.txt"],
  "rope": ["/film_rope.txt"],
  "sisters": ["/film_virgin-suicides.txt"],
  "sofia": ["/film_virgin-suicides.txt"],
  "stakeholder": ["/story_how-to-be-a-great-product-manager.txt"],
  "suicide": ["/film_virgin-suicides.txt"],
  "sunk cost fallacy": ["/talk_destiny-habituation_tactics.txt"],
  "suspense": ["/film_rope.txt"],
  "tactics": ["/talk_destiny-habituation_tactics.txt"],
  "team": ["/story_how-to-be-a-great-product-manager.txt"],
  "teenage": ["/film_virgin-suicides.txt"],
  "trauma": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "tribute": ["/story_when-you-fell-asleep-forever.txt"],
  "unmade": ["/film_kubrick-napoleon.txt"],
  "upenn": ["/story_the-ten-year-cycle.txt"],
  "user": ["/story_how-to-be-a-great-product-manager.txt"],
  "user experience": ["/talk_destiny-habituation_tactics.txt"],
  "values": ["/story_the-ten-year-cycle.txt"],
  "vet": ["/story_when-you-fell-asleep-forever.txt"],
  "videogame": ["/talk_destiny-habituation_tactics.txt"],
  "waterloo": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "work": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
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
      "/talk_destiny-habituation_tactics.txt",
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
