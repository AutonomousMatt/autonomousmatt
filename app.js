const history = [];

async function ask() {
  const promptInput = document.getElementById("prompt");
  const prompt = promptInput.value.trim().toLowerCase();
  const responseContainer = document.getElementById("response-container");
  promptInput.value = "";

  if (!prompt) return;

const keywordMap = {
  // === FILM: Blue ===
  "aids": ["/film_blue.txt"],
  "hiv": ["/film_blue.txt"],
  "immunodeficiency": ["/film_blue.txt"],
  "plague": ["/film_blue.txt"],
  "crisis": ["/film_blue.txt"],
  "pandemic": ["/film_blue.txt"],
  "queer": ["/film_blue.txt", "/film_rope.txt"],
  "lgbt": ["/film_blue.txt"],
  "gay": ["/film_blue.txt"],
  "homosexuality": ["/film_blue.txt"],
  "derek jarman": ["/film_blue.txt"],
  "jarman": ["/film_blue.txt"],
  "avant-garde": ["/film_blue.txt"],
  "experimental": ["/film_blue.txt"],
  "minimalist": ["/film_blue.txt"],
  "monologue": ["/film_blue.txt"],
  "voiceover": ["/film_blue.txt"],
  "narration": ["/film_blue.txt"],
  "diary": ["/film_blue.txt"],
  "memoir": ["/film_blue.txt"],
  "autobiographical": ["/film_blue.txt"],
  "illness": ["/film_blue.txt"],
  "sickness": ["/film_blue.txt"],
  "decline": ["/film_blue.txt"],
  "mortality": ["/film_blue.txt"],
  "dying": ["/film_blue.txt"],
  "death": ["/film_blue.txt"],
  "blindness": ["/film_blue.txt"],
  "vision loss": ["/film_blue.txt"],
  "sight": ["/film_blue.txt"],
  "color": ["/film_blue.txt"],
  "blue": ["/film_blue.txt"],
  "monochrome": ["/film_blue.txt"],
  "silence": ["/film_blue.txt"],
  "soundscape": ["/film_blue.txt"],
  "sound design": ["/film_blue.txt"],
  "audio cinema": ["/film_blue.txt"],
  "soundtrack": ["/film_blue.txt"],
  "film without images": ["/film_blue.txt"],
  "visual absence": ["/film_blue.txt"],
  "aesthetic radicalism": ["/film_blue.txt"],
  "elegy": ["/film_blue.txt"],
  "poetry": ["/film_blue.txt"],
  "spoken word": ["/film_blue.txt"],
  "grief": ["/film_blue.txt"],
  "memory": ["/film_blue.txt"],
  "epitaph": ["/film_blue.txt"],
  "existential": ["/film_blue.txt"],
  "melancholy": ["/film_blue.txt"],
  "british cinema": ["/film_blue.txt"],
  "90s cinema": ["/film_blue.txt"],
  "postmodern film": ["/film_blue.txt"],
  "aids activism": ["/film_blue.txt"],
  "silence = death": ["/film_blue.txt"],
  "act up": ["/film_blue.txt"],
  "art and activism": ["/film_blue.txt"],
  "queer cinema": ["/film_blue.txt"],


  // === FILM: Plan 75 ===
  "japanese": ["/film_plan-75.txt"],
  "japan": ["/film_plan-75.txt"],
  "ethics": ["/film_plan-75.txt"],
  "aging": ["/film_plan-75.txt"],
  "euthanasia": ["/film_plan-75.txt"],
  "elderly": ["/film_plan-75.txt"],
  "death policy": ["/film_plan-75.txt"],
  "retirement": ["/film_plan-75.txt"],
  "dystopia": ["/film_plan-75.txt"],

  // === FILM: The Virgin Suicides ===
  "nostalgia": ["/film_virgin-suicides.txt"],
  "melancholy": ["/film_virgin-suicides.txt"],
  "suicide": ["/film_virgin-suicides.txt"],
  "coppola": ["/film_virgin-suicides.txt"],
  "sofia": ["/film_virgin-suicides.txt"],
  "sofia coppola": ["/film_virgin-suicides.txt"],
  "isolation": ["/film_virgin-suicides.txt"],
  "loneliness": ["/film_virgin-suicides.txt"],
  "teenage": ["/film_virgin-suicides.txt"],
  "girlhood": ["/film_virgin-suicides.txt"],
  "sisters": ["/film_virgin-suicides.txt"],
  "tragedy": ["/film_virgin-suicides.txt"],
  "memory": ["/film_virgin-suicides.txt"],
  "suburbia": ["/film_virgin-suicides.txt"],

    // === FILM: Fizcarraldo ===
  "opera": ["/film_fitzcarraldo.txt"],
  "herzog": ["/film_fitzcarraldo.txt"],
    "rainforest": ["/film_fitzcarraldo.txt"],
    "kinski": ["/film_fitzcarraldo.txt"],
    "german": ["/film_fitzcarraldo.txt"],
    "caruso": ["/film_fitzcarraldo.txt"],
    "jungle": ["/film_fitzcarraldo.txt"],
    "ambition": ["/film_fitzcarraldo.txt"],
    "realism": ["/film_fitzcarraldo.txt"],
    "effort": ["/film_fitzcarraldo.txt"],
    "fitzcarraldo": ["/film_fitzcarraldo.txt"],

  // === FILM: Godland ===
  "missionary": ["/film_godland.txt"],
  "palmason": ["/film_godland.txt"],
  "religion": ["/film_godland.txt"],
  "iceland": ["/film_godland.txt"],
  "norway": ["/film_godland.txt"],
  "landscape": ["/film_godland.txt"],

  // === FILM: I, Daniel Blake ===
  "justice": ["/film_i-daniel-blake.txt"],
  "daniel": ["/film_i-daniel-blake.txt"],
  "blake": ["/film_i-daniel-blake.txt"],
  "homeless": ["/film_i-daniel-blake.txt"],
  "loach": ["/film_i-daniel-blake.txt", "/film_kes.txt", "/film_cathy-come-home.txt"],
  "austerity": ["/film_i-daniel-blake.txt"],
  "poverty": ["/film_i-daniel-blake.txt"],
  "bureaucracy": ["/film_i-daniel-blake.txt"],
  "benefits": ["/film_i-daniel-blake.txt"],

  // === FILM: Legacy of Zulu Dawn ===
  "zulu": ["/film_legacy-of-zulu-dawn.txt"],
  "british empire": ["/film_legacy-of-zulu-dawn.txt"],
  "1879": ["/film_legacy-of-zulu-dawn.txt"],
  "battle": ["/film_legacy-of-zulu-dawn.txt"],
  "rorkes drift": ["/film_legacy-of-zulu-dawn.txt"],
  "isandlwana": ["/film_legacy-of-zulu-dawn.txt"],
  "pyrrhic": ["/film_legacy-of-zulu-dawn.txt"],
  "south africa": ["/film_legacy-of-zulu-dawn.txt"],
  "victorian": ["/film_legacy-of-zulu-dawn.txt"],
  "anglo-zulu war": ["/film_legacy-of-zulu-dawn.txt"],

  // === FILM: Kubrick Napoleon / Napoleon / War & Peace ===
  "napoleon": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "kubrick": ["/film_kubrick-napoleon.txt"],
  "unmade": ["/film_kubrick-napoleon.txt"],
  "military": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "history": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "french": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "army": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "waterloo": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt", "/film_war-and-peace.txt"],
  "austerlitz": ["/film_kubrick-napoleon.txt", "/film_napoleon.txt"],
  "bondarchuk": ["/film_kubrick-napoleon.txt", "/film_war-and-peace.txt"],
  "russia": ["/film_war-and-peace.txt"],
  "peace": ["/film_war-and-peace.txt"],
  "tolstoy": ["/film_war-and-peace.txt"],
  "epic": ["/film_war-and-peace.txt"],
  "war": ["/film_napoleon.txt", "/film_war-and-peace.txt", "/film_legacy-of-zulu-dawn.txt"],

  // === FILM: Rope ===
  "rope": ["/film_rope.txt"],
  "hitchcock": ["/film_rope.txt"],
  "suspense": ["/film_rope.txt"],
  "criticism": ["/film_rope.txt"],

    // === FILM: EastEnders ===
  "london": ["/tv_eastenders.txt"],
    "eastenders": ["/tv_eastenders.txt"],
    "east end": ["/tv_eastenders.txt"],
  "soap": ["/tv_eastenders.txt"],
  "soap opera": ["/tv_eastenders.txt"],
  "bbc": ["/tv_eastenders.txt"],
  "british": ["/tv_eastenders.txt"],
  "drama": ["/tv_eastenders.txt"],
  "serial": ["/tv_eastenders.txt"],
  "walford": ["/tv_eastenders.txt"],
  "britbox": ["/tv_eastenders.txt"],
  "streaming": ["/tv_eastenders.txt"],
  "community": ["/tv_eastenders.txt"],
  "pub": ["/tv_eastenders.txt"],
  "market": ["/tv_eastenders.txt"],
  "family": ["/tv_eastenders.txt"],
  "victoria": ["/tv_eastenders.txt"],
  "culture": ["/tv_eastenders.txt"],

  // === FILM: Long Good Friday ===
  "gangster": ["/film_long-good-friday.txt"],
  "hoskins": ["/film_long-good-friday.txt"],
  "british crime": ["/film_long-good-friday.txt"],
  "crime": ["/film_long-good-friday.txt"],

    // === FILM: Barry Lyndon ===
  "kubrick": ["/film_barry-lyndon.txt"],
    "bullingdon": ["/film_barry-lyndon.txt"],
    "duel": ["/film_barry-lyndon.txt"],
    "period drama": ["/film_barry-lyndon.txt"],
    "historical": ["/film_barry-lyndon.txt"],
    "lighting": ["/film_barry-lyndon.txt"],
    "emotional abuse": ["/film_barry-lyndon.txt"],
    "irish": ["/film_barry-lyndon.txt"],
    "1970s": ["/film_barry-lyndon.txt"],
    "classic cinema": ["/film_barry-lyndon.txt"],
    "barry lyndon": ["/film_barry-lyndon.txt"],
  "thackeray": ["/film_barry-lyndon.txt"],

  // === FILM: Kes & Cathy Come Home ===
  "kes": ["/film_kes.txt"],
  "tragedy": ["/film_kes.txt"],
  "school": ["/film_kes.txt"],
  "manchester": ["/film_kes.txt"],
  "cathy": ["/film_cathy-come-home.txt"],
  "realism": ["/film_cathy-come-home.txt"],

    // === FILM: Seeing and Saw ===
  "horror": ["/film_seeing-and-saw.txt"],
  "gore": ["/film_seeing-and-saw.txt"],
  "filmgoing": ["/film_seeing-and-saw.txt"],
  "saw": ["/film_seeing-and-saw.txt"],
  "creativity": ["/film_seeing-and-saw.txt"],
  "indie film": ["/film_seeing-and-saw.txt"],
  "moviegoing": ["/film_seeing-and-saw.txt"],
  "terror": ["/film_seeing-and-saw.txt"],
  "violence": ["/film_seeing-and-saw.txt"],
  "jigsaw": ["/film_seeing-and-saw.txt"],
  "trap": ["/film_seeing-and-saw.txt"],


  // === FILM: Baron Munchausen ===
  "python": ["/film_baron-munchausen.txt"],
  "gilliam": ["/film_baron-munchausen.txt"],
  "fantasy": ["/film_baron-munchausen.txt"],
  "monty": ["/film_baron-munchausen.txt"],
  "munchausen": ["/film_baron-munchausen.txt"],
  "comedy": ["/film_baron-munchausen.txt"],

    // === FILM: The Orchestra ===
  "Rybczynski": ["/film_the-orchestra.txt"],
  "Zbigniew": ["/film_the-orchestra.txt"],
  "classical": ["/film_the-orchestra.txt"],
  "orchestra": ["/film_the-orchestra.txt"],
  "experimental": ["/film_the-orchestra.txt"],
  "russia": ["/film_the-orchestra.txt"],
  "history": ["/film_the-orchestra.txt"],
  "video": ["/film_the-orchestra.txt"],
  "short film": ["/film_the-orchestra.txt"],
  "louvre": ["/film_the-orchestra.txt"],
  "conductor": ["/film_the-orchestra.txt"],

  // === ESSAY: How To Never Look Back ===
  "emigration": ["/story_how-to-never-look-back.txt"],
  "immigration": ["/story_how-to-never-look-back.txt"],
  "airport": ["/story_how-to-never-look-back.txt"],
  "identity": ["/story_how-to-never-look-back.txt"],
  "courage": ["/story_how-to-never-look-back.txt"],
  "america": ["/story_how-to-never-look-back.txt"],
  "career change": ["/story_how-to-never-look-back.txt"],
  "regret": ["/story_how-to-never-look-back.txt"],
  "nostalgia": ["/story_how-to-never-look-back.txt"],

  // === ESSAY: Life in Art ===
  "art": ["/story_life-in-art.txt"],
  "pretension": ["/story_life-in-art.txt"],
  "creative": ["/story_life-in-art.txt"],
  "rejection": ["/story_life-in-art.txt"],
  "authenticity": ["/story_life-in-art.txt"],
  "gallery": ["/story_life-in-art.txt"],
  "purpose": ["/story_life-in-art.txt"],
  "writing": ["/story_life-in-art.txt"],
  "amsterdam": ["/story_life-in-art.txt"],
  "catharsis": ["/story_life-in-art.txt"],

  // === ESSAY: When You Fell Asleep Forever ===
  "cat": ["/story_when-you-fell-asleep-forever.txt"],
  "companionship": ["/story_when-you-fell-asleep-forever.txt"],
  "grief": ["/story_when-you-fell-asleep-forever.txt"],
  "mourning": ["/story_when-you-fell-asleep-forever.txt"],
  "pet": ["/story_when-you-fell-asleep-forever.txt"],
  "remembrance": ["/story_when-you-fell-asleep-forever.txt"],
  "tribute": ["/story_when-you-fell-asleep-forever.txt"],
  "loss": ["/story_when-you-fell-asleep-forever.txt"],
  "love": ["/story_when-you-fell-asleep-forever.txt"],
  "illness": ["/story_when-you-fell-asleep-forever.txt"],
  "euthanasia": ["/story_when-you-fell-asleep-forever.txt"],
  "memory": ["/story_when-you-fell-asleep-forever.txt"],
  "vet": ["/story_when-you-fell-asleep-forever.txt"],

  // === ESSAY: Twenty Things in Twenty Years ===
  "career": ["/story_twenty-things-in-twenty-years.txt"],
  "growth": ["/story_twenty-things-in-twenty-years.txt"],
  "hard work": ["/story_twenty-things-in-twenty-years.txt"],
  "leadership": ["/story_twenty-things-in-twenty-years.txt"],
  "reflection": ["/story_twenty-things-in-twenty-years.txt"],
  "resilience": ["/story_twenty-things-in-twenty-years.txt"],
  "marriage": ["/story_twenty-things-in-twenty-years.txt"],
  "dog": ["/story_twenty-things-in-twenty-years.txt"],
  "emotional intelligence": ["/story_twenty-things-in-twenty-years.txt"],
  "lessons": ["/story_twenty-things-in-twenty-years.txt"],

  // === ESSAY: Freedom of the Worst Day of Your Life ===
  "cancer": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "fired": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "healing": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "perspective": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "resilience": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "optimism": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "mental health": ["/story_freedom-of-the-worst-day-of-your-life.txt"],
  "work": ["/story_freedom-of-the-worst-day-of-your-life.txt"],

  // === ESSAY: The Ten-Year Cycle ===
  "cycle": ["/story_the-ten-year-cycle.txt"],
  "decades": ["/story_the-ten-year-cycle.txt"],
  "nbc": ["/story_the-ten-year-cycle.txt"],
  "upenn": ["/story_the-ten-year-cycle.txt"],
  "values": ["/story_the-ten-year-cycle.txt"],
  "life": ["/story_the-ten-year-cycle.txt"],
  "personal": ["/story_the-ten-year-cycle.txt"],
  "catholic": ["/story_the-ten-year-cycle.txt"],
  "new york times": ["/story_the-ten-year-cycle.txt"],
  "penn": ["/story_the-ten-year-cycle.txt"],

    // === STORY: The Boy With The Dip ===
  "fable": ["/story_the-boy-with-the-dip.txt"],
  "shark": ["/story_the-boy-with-the-dip.txt"],
  "mortality": ["/story_the-boy-with-the-dip.txt"],
  "poetic fiction": ["/story_the-boy-with-the-dip.txt"],
  "obscurity": ["/story_the-boy-with-the-dip.txt"],
  "myth": ["/story_the-boy-with-the-dip.txt"],
  "aftermath": ["/story_the-boy-with-the-dip.txt"],
  "memory": ["/story_the-boy-with-the-dip.txt"],
  "beach": ["/story_the-boy-with-the-dip.txt"],
  "surrealism": ["/story_the-boy-with-the-dip.txt"],
  "heroism": ["/story_the-boy-with-the-dip.txt"],

      // === STORY: Eyes Up ===
  "rumination": ["/story_eyes-up.txt"],
  "grief": ["/story_eyes-up.txt"],
  "memory": ["/story_eyes-up.txt"],
  "loss": ["/story_eyes-up.txt"],
  "walking": ["/story_eyes-up.txt"],
  "solitude": ["/story_eyes-up.txt"],
  "anxiety": ["/story_eyes-up.txt"],
  "nostalgia": ["/story_eyes-up.txt"],
  "relfection": ["/story_eyes-up.txt"],
  "new york": ["/story_eyes-up.txt"],
  "estrangement": ["/story_eyes-up.txt"],

        // === GAMING: Quake 2 Tournament Review ===
  "quake": ["/gaming_fragging-the-competition.txt"],
  "quakeadelica": ["/gaming_fragging-the-competition.txt"],
  "jo guest": ["/gaming_fragging-the-competition.txt"],
  "first person": ["/gaming_fragging-the-competition.txt"],
  "thresh": ["/gaming_fragging-the-competition.txt"],
  "tournament": ["/gaming_fragging-the-competition.txt"],
  "esports": ["/gaming_fragging-the-competition.txt"],
  "ministry of sound": ["/gaming_fragging-the-competition.txt"],
  "review": ["/gaming_fragging-the-competition.txt"],
  "gaming": ["/gaming_fragging-the-competition.txt"],
  "videogame": ["/gaming_fragging-the-competition.txt"],

    // === ESSAY: Cancer Survival ===
  "cancer": ["/story_on-surviving-why-im-still-here.txt"],
  "hospital": ["/story_on-surviving-why-im-still-here.txt"],
  "life cycle": ["/story_on-surviving-why-im-still-here.txt"],
  "resilience": ["/story_on-surviving-why-im-still-here.txt"],
  "grit": ["/story_on-surviving-why-im-still-here.txt"],
  "diagnosis": ["/story_on-surviving-why-im-still-here.txt"],
  "kindness": ["/story_on-surviving-why-im-still-here.txt"],
  "recovery": ["/story_on-surviving-why-im-still-here.txt"],

  // === PRODUCT ESSAYS ===
  "product": ["/story_how-to-be-a-great-product-manager.txt", "/story_twenty-things-in-twenty-years.txt"],
  "product manager": ["/story_how-to-be-a-great-product-manager.txt"],
  "jira": ["/story_how-to-be-a-great-product-manager.txt"],
  "confluence": ["/story_how-to-be-a-great-product-manager.txt"],
  "atlassian": ["/story_how-to-be-a-great-product-manager.txt"],
  "analytics": ["/story_how-to-be-a-great-product-manager.txt"],
  "metrics": ["/story_how-to-be-a-great-product-manager.txt"],
  "collaboration": ["/story_how-to-be-a-great-product-manager.txt"],
  "communication": ["/story_how-to-be-a-great-product-manager.txt"],
  "leadership": ["/story_how-to-be-a-great-product-manager.txt"],
  "team": ["/story_how-to-be-a-great-product-manager.txt"],
  "kindness": ["/story_how-to-be-a-great-product-manager.txt"],
  "grit": ["/story_how-to-be-a-great-product-manager.txt"],
  "listen": ["/story_how-to-be-a-great-product-manager.txt"],
  "stakeholder": ["/story_how-to-be-a-great-product-manager.txt"],
  "user": ["/story_how-to-be-a-great-product-manager.txt"],

  // === VIDEOGAME ESSAYS ===
  
  "destiny": ["/talk_destiny-habituation-tactics.txt", "/story_twenty-things-in-twenty-years.txt"],
  "gaming": ["/talk_destiny-habituation-tactics.txt"],
  "videogame": ["/talk_destiny-habituation-tactics.txt"],
  "habit": ["/talk_destiny-habituation-tactics.txt"],
  "tactics": ["/talk_destiny-habituation-tactics.txt"],
  "rewards": ["/talk_destiny-habituation-tactics.txt"],
  "mechanics": ["/talk_destiny-habituation-tactics.txt"],
  "onboarding": ["/talk_destiny-habituation-tactics.txt"],
  "psychology": ["/talk_destiny-habituation-tactics.txt"],
  "interactive": ["/talk_destiny-habituation-tactics.txt"],
  "community": ["/talk_destiny-habituation-tactics.txt"],
  "real estate": ["/talk_destiny-habituation-tactics.txt"],
  "sunk cost": ["/talk_destiny-habituation-tactics.txt"]
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
      "/film_fitzcarraldo.txt",
      "/film_long-good-friday.txt",
      "/film_virgin-suicides.txt",
      "/film_kubrick-napoleon.txt",
      "/film_barry-lyndon.txt",
      "/film_kes.txt",
      "/film_seeing-and-saw.txt",
      "/film_legacy-of-zulu-dawn.txt",
      "/film_the-orchestra.txt",
      "/gaming_fragging-the-competition.txt",
      "/story_journey-from-there-to-here.txt",
      "/story_when-you-fell-asleep-forever.txt",
      "/story_the-ten-year-cycle.txt",
      "/story_freedom-of-the-worst-day-of-your-life.txt",
      "/story_when-work-stops-being-the-work.txt",
      "/story_twenty-things-in-twenty-years.txt",
      "/story_how-to-be-a-great-product-manager.txt",
      "/story_life-in-art.txt",
      "/story_eyes-up.txt",
      "/story_how-to-never-look-back.txt",
      "/story_the-boy-with-the-dip.txt",
      "/story_on-surviving-why-im-still-here.txt",
      "/tv_eastenders.txt",
      "/talk_destiny-habituation-tactics.txt"
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
      link.textContent = "Learn more in the full article";
      link.style.display = "block";
      link.style.marginTop = "10px";
      link.style.fontSize = "14px";
      link.style.fontWeight = "600";
      link.style.color = "#fff";
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
