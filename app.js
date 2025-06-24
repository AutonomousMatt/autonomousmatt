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

  // === FILM: Betty Blue ===
  "betty blue": ["/film_betty-blue.txt"],
  "french": ["/film_betty-blue.txt"],
  "mental illness": ["/film_betty-blue.txt"],
  "beatrice dalle": ["/film_betty-blue.txt"],
  "zorg": ["/film_betty-blue.txt"],
  "romance": ["/film_betty-blue.txt"],
  "unstable": ["/film_betty-blue.txt"],
  "emotional": ["/film_betty-blue.txt"],
  "love": ["/film_betty-blue.txt"],
  "tragedy": ["/film_betty-blue.txt"],
  "1980s": ["/film_betty-blue.txt"],
  "intensity": ["/film_betty-blue.txt"],
  
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

    // === FILM: Withnail And Us ===
  "withnail": ["/film_withnail-and-us.txt"],
  "comedy": ["/film_withnail-and-us.txt"],
  "sixties": ["/film_withnail-and-us.txt"],
  "friendship": ["/film_withnail-and-us.txt"],
  "london": ["/film_withnail-and-us.txt"],
  "love": ["/film_withnail-and-us.txt"],
  "departure": ["/film_withnail-and-us.txt"],
  "loss": ["/film_withnail-and-us.txt"],
  "actor": ["/film_withnail-and-us.txt"],
  "countryside": ["/film_withnail-and-us.txt"],
  "alcohol": ["/film_withnail-and-us.txt"],
  "booze": ["/film_withnail-and-us.txt"],


    // === FILM: Detective Blanc Donut Theory ===
  "daniel craig": ["/film_detective-blanc-donut-theory.txt"],
  "whodunnit": ["/film_detective-blanc-donut-theory.txt"],
  "murder": ["/film_detective-blanc-donut-theory.txt"],
  "mystery": ["/film_detective-blanc-donut-theory.txt"],
  "donut": ["/film_detective-blanc-donut-theory.txt"],
  "detective": ["/film_detective-blanc-donut-theory.txt"],
  "blanc": ["/film_detective-blanc-donut-theory.txt"],
  "amazon": ["/film_detective-blanc-donut-theory.txt"],
  "agatha christie": ["/film_detective-blanc-donut-theory.txt"],
  "metafiction": ["/film_detective-blanc-donut-theory.txt"],
  "knives out": ["/film_detective-blanc-donut-theory.txt"],

    // === FILM: What Star Wars Means To Me ===
  "star wars": ["/film_what-star-wars-means-to-me.txt"],
  "george lucas": ["/film_what-star-wars-means-to-me.txt"],
  "fandom": ["/film_what-star-wars-means-to-me.txt"],
  "nostalgia": ["/film_what-star-wars-means-to-me.txt"],
  "toys": ["/film_what-star-wars-means-to-me.txt"],
  "childhood": ["/film_what-star-wars-means-to-me.txt"],
  "collecting": ["/film_what-star-wars-means-to-me.txt"],
  "trading cards": ["/film_what-star-wars-means-to-me.txt"],
  "action figures": ["/film_what-star-wars-means-to-me.txt"],
  "luke skywalker": ["/film_what-star-wars-means-to-me.txt"],
  "darth vader": ["/film_what-star-wars-means-to-me.txt"],
  "han solo": ["/film_what-star-wars-means-to-me.txt"],
  "new hope": ["/film_what-star-wars-means-to-me.txt"],
  "rogue one": ["/film_what-star-wars-means-to-me.txt"],
  "empire": ["/film_what-star-wars-means-to-me.txt"],
  "force": ["/film_what-star-wars-means-to-me.txt"],
  "science fiction": ["/film_what-star-wars-means-to-me.txt"],

      // === FILM: Stalker ===
  "stalker": ["/film_stalker.txt"],
  "russia": ["/film_stalker.txt"],
  "room": ["/film_stalker.txt"],
  "existential": ["/film_stalker.txt"],
  "chernobyl": ["/film_stalker.txt"],
  "russia": ["/film_stalker.txt"],
  "soviet": ["/film_stalker.txt"],
  "cold war": ["/film_stalker.txt"],
  "ambition": ["/film_stalker.txt"],
  "desire": ["/film_stalker.txt"],
  "truth": ["/film_stalker.txt"],
  "tarkovsky": ["/film_stalker.txt"],
  
      // === FILM: Sophies Choice ===
  "sophies choice": ["/film_sophies-choice.txt"],
  "meryl streep": ["/film_sophies-choice.txt"],
  "kevin kline": ["/film_sophies-choice.txt"],
  "consequence": ["/film_sophies-choice.txt"],
  "consequentialism": ["/film_sophies-choice.txt"],
  "choice": ["/film_sophies-choice.txt"],
  "nazi": ["/film_sophies-choice.txt"],
  "concentration camp": ["/film_sophies-choice.txt"],
  "daughter": ["/film_sophies-choice.txt"],
  "moral": ["/film_sophies-choice.txt"],
  "decision": ["/film_sophies-choice.txt"],
  "ethics": ["/film_sophieschoice.txt"],

        // === FILM: Leaving Las Vegas ===
  "las vegas": ["/film_leaving-las-vegas.txt"],
  "nic cage": ["/film_leaving-las-vegas.txt"],
  "strip": ["/film_leaving-las-vegas.txt"],
  "alcohol": ["/film_leaving-las-vegas.txt"],
  "drink": ["/film_leaving-las-vegas.txt"],
  "desert": ["/film_leaving-las-vegas.txt"],
  "gambling": ["/film_leaving-las-vegas.txt"],
  "nevada": ["/film_leaving-las-vegas.txt"],
  "sadness": ["/film_leaving-las-vegas.txt"],
  "suicide": ["/film_leaving-las-vegas.txt"],
  "death": ["/film_leaving-las-vegas.txt"],
  "prostitution": ["/film_leaving-las-vegas.txt"],
  "loneliness": ["/film_leaving-las-vegas.txt"],
  
        // === FILM: Paris Texas ===
  "paris": ["/film_paris-texas.txt"],
  "texas": ["/film_paris-texas.txt"],
  "wim wenders": ["/film_paris-texas.txt"],
  "road movie": ["/film_paris-texas.txt"],
  "desert": ["/film_paris-texas.txt"],
  "dean stockwell": ["/film_paris-texas.txt"],
  "harry dean stanton": ["/film_paris-texas.txt"],
  "ry cooder": ["/film_paris-texas.txt"],
  "nastassja kinski": ["/film_paris-texas.txt"],
  "loneliness": ["/film_paris-texas.txt"],
  "divorce": ["/film_paris-texas.txt"],
  "love": ["/film_paris-texas.txt"],
  "separation": ["/film_paris-texas.txt"],
  
      // === FILM: Nomadland ===
  "nomadland": ["/film_nomadland.txt"],
  "homeless": ["/film_nomadland.txt"],
  "frances mcdormand": ["/film_nomadland.txt"],
  "nomads": ["/film_nomadland.txt"],
  "grief": ["/film_nomadland.txt"],
  "freedom": ["/film_nomadland.txt"],
  "economy": ["/film_nomadland.txt"],
  "collapse": ["/film_nomadland.txt"],
  "open road": ["/film_nomadland.txt"],
  "road movie": ["/film_nomadland.txt"],
  "nevada": ["/film_nomadland.txt"],
  "amazon": ["/film_nomadland.txt"],

      // === FILM: Naked ===
  "naked": ["/film_naked.txt"],
  "thewlis": ["/film_naked.txt"],
  "bleak": ["/film_naked.txt"],
  "nihilism": ["/film_naked.txt"],
  "bar code": ["/film_naked.txt"],
  "violence": ["/film_naked.txt"],
  "class": ["/film_naked.txt"],
  "homeless": ["/film_naked.txt"],
  "abuse": ["/film_naked.txt"],
  "conspiracy": ["/film_naked.txt"],
  "protagonist": ["/film_naked.txt"],
  "london": ["/film_naked.txt"],
  "mike leigh": ["/film_high-naked.txt"],
  
      // === FILM: High Fidelity ===
  "high fidelity": ["/film_high-fidelity.txt"],
  "music": ["/film_high-fidelity.txt"],
  "record store": ["/film_high-fidelity.txt"],
  "vinyl": ["/film_high-fidelity.txt"],
  "john cusack": ["/film_high-fidelity.txt"],
  "jack black": ["/film_high-fidelity.txt"],
  "collection": ["/film_high-fidelity.txt"],
  "chicago": ["/film_high-fidelity.txt"],
  "snob": ["/film_high-fidelity.txt"],
  "love": ["/film_high-fidelity.txt"],
  "breakup": ["/film_high-fidelity.txt"],
  "top 5": ["/film_high-fidelity.txt"],
  "comedy": ["/film_high-fidelity.txt"],

    // === FILM: Dancer In The Dark ===
  "dancer in the dark": ["/film_dancer-in-the-dark.txt"],
  "blind": ["/film_dancer-in-the-dark.txt"],
  "blindness": ["/film_dancer-in-the-dark.txt"],
  "eyesight": ["/film_dancer-in-the-dark.txt"],
  "musical": ["/film_dancer-in-the-dark.txt"],
  "factory": ["/film_dancer-in-the-dark.txt"],
  "lars von trier": ["/film_dancer-in-the-dark.txt"],
  "immigrant": ["/film_dancer-in-the-dark.txt"],
  "imagination": ["/film_dancer-in-the-dark.txt"],
  "tragedy": ["/film_dancer-in-the-dark.txt"],
  "murder": ["/film_dancer-in-the-dark.txt"],
  "hardship": ["/film_dancer-in-the-dark.txt"],
  "bjork": ["/film_dancer-in-the-dark.txt"],
  
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

      // === FILM: Beanpole ===
  "beanpole": ["/film_beanpole.txt"],
  "russia": ["/film_beanpole.txt"],
  "war": ["/film_beanpole.txt"],
  "mental illness": ["/film_beanpole.txt"],
  "Vasilisa Perelygina": ["/film_beanpole.txt"],
  "Viktoria Miroshnichenko": ["/film_beanpole.txt"],
  "Kantemir Balagov": ["/film_beanpole.txt"],
  "second world war": ["/film_beanpole.txt"],
  "world war 2": ["/film_beanpole.txt"],
  "euthanasia": ["/film_beanpole.txt"],
  "soviet union": ["/film_beanpole.txt"],
  "intimacy": ["/film_beanpole.txt"],
  "trauma": ["/film_beanpole.txt"],
  "cold": ["/film_beanpole.txt"],
  "hospital": ["/film_beanpole.txt"],
  "leningrad": ["/film_beanpole.txt"],

        // === FILM: Career Girls ===
  "mike leigh": ["/film_career-girls.txt"],
  "college": ["/film_career-girls.txt"],
  "university": ["/film_career-girls.txt"],
  "kingston": ["/film_career-girls.txt"],
  "friends": ["/film_career-girls.txt"],
  "friendship": ["/film_career-girls.txt"],
  "career": ["/film_career-girls.txt"],
  "girls": ["/film_career-girls.txt"],
  "adulthood": ["/film_career-girls.txt"],
  "british": ["/film_career-girls.txt"],
  "reuniting": ["/film_career-girls.txt"],
  "1990s": ["/film_career-girls.txt"],
  "london": ["/film_career-girls.txt"],
  "mental health": ["/film_career-girls.txt"],
  "nostalgia": ["/film_career-girls.txt"],

      // === TV: Alan Bennett Talking Heads ===
  "alan bennett": ["/tv_alan-bennett-talking-heads.txt"],
   "british": ["/tv_alan-bennett-talking-heads.txt"],
   "pandemic": ["/tv_alan-bennett-talking-heads.txt"],
   "playwright": ["/tv_alan-bennett-talking-heads.txt"],
   "solitude": ["/tv_alan-bennett-talking-heads.txt"],
   "ordinary": ["/tv_alan-bennett-talking-heads.txt"],
   "elderly": ["/tv_alan-bennett-talking-heads.txt"],
   "tension": ["/tv_alan-bennett-talking-heads.txt"],
   "longing": ["/tv_alan-bennett-talking-heads.txt"],
   "grace": ["/tv_alan-bennett-talking-heads.txt"],
  "talking heads": ["/tv_alan-bennett-talking-heads.txt"],
  "monologue": ["/tv_alan-bennett-talking-heads.txt"],

      // === FILM: Fire Walk With Me ===
  "lynch": ["/film_fire-walk-with-me.txt"],
  "david lynch": ["/film_fire-walk-with-me.txt"],
  "twin peaks": ["/film_fire-walk-with-me.txt"],
  "washington": ["/film_fire-walk-with-me.txt"],
  "agent cooper": ["/film_fire-walk-with-me.txt"],
  "bob": ["/film_fire-walk-with-me.txt"],
  "laura palmer": ["/film_fire-walk-with-me.txt"],
  "mystery": ["/film_fire-walk-with-me.txt"],
  "forest": ["/film_fire-walk-with-me.txt"],
  "pink room": ["/film_fire-walk-with-me.txt"],
  "missing pieces": ["/film_fire-walk-with-me.txt"],
  "fire walk with me": ["/film_fire-walk-with-me.txt"],
  "surreal": ["/film_fire-walk-with-me.txt"],
  "lodge": ["/film_fire-walk-with-me.txt"],
  "diner": ["/film_fire-walk-with-me.txt"],
  "black coffee": ["/film_fire-walk-with-me.txt"],
  "kyle maclachlan": ["/film_fire-walk-with-me.txt"],
  "muffin": ["/film_fire-walk-with-me.txt"],
  
      // === FILM: Silence ===
  "silence": ["/film_silence.txt"],
  "garfield": ["/film_silence.txt"],
  "neeson": ["/film_silence.txt"],
  "japan": ["/film_silence.txt"],
  "china": ["/film_silence.txt"],
  "religion": ["/film_silence.txt"],
  "missionary": ["/film_silence.txt"],
  "crucifix": ["/film_silence.txt"],
  "divine": ["/film_silence.txt"],
  "christianity": ["/film_silence.txt"],
  "spiritual": ["/film_silence.txt"],
  "pray": ["/film_silence.txt"],
  "temptation": ["/film_silence.txt"],
  "jesuit": ["/film_silence.txt"],
  "priest": ["/film_silence.txt"],
  "martyr": ["/film_silence.txt"],
  "ritual": ["/film_silence.txt"],
  "absence": ["/film_silence.txt"],
  "faith": ["/film_silence.txt"],
  "shinto": ["/film_silence.txt"],
  "buddhism": ["/film_silence.txt"],
  "scorsese": ["/film_silence.txt"],
  
      // === FILM: My Last Film ===
  "zia anger": ["/film_my-last-film.txt"],
  "indie": ["/film_my-last-film.txt"],
  "independent": ["/film_my-last-film.txt"],
  "short film": ["/film_my-last-film.txt"],
  "arquette": ["/film_my-last-film.txt"],
  "williamsburg": ["/film_my-last-film.txt"],
  "hollywood": ["/film_my-last-film.txt"],
  "catharsis": ["/film_my-last-film.txt"],
  "abuse": ["/film_my-last-film.txt"],
  "integrity": ["/film_my-last-film.txt"],
  "rosanna": ["/film_my-last-film.txt"],
  "my last film": ["/film_my-last-film.txt"],
  
      // === FILM: Joy Division Control ===
  "joy division": ["/film_joy-division-control.txt"],
  "ian curtis": ["/film_joy-division-control.txt"],
  "new order": ["/film_joy-division-control.txt"],
  "salford": ["/film_joy-division-control.txt"],
  "manchester": ["/film_joy-division-control.txt"],
  "sex pistols": ["/film_joy-division-control.txt"],
  "factory": ["/film_joy-division-control.txt"],
  "control": ["/film_joy-division-control.txt"],
  "unknown pleasures": ["/film_joy-division-control.txt"],
  "suicide": ["/film_joy-division-control.txt"],
  "bleak": ["/film_joy-division-control.txt"],
  "black and white": ["/film_joy-division-control.txt"],
  "seventies": ["/film_joy-division-control.txt"],

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

  // === ESSAY: Geek Culture ===
  "geek": ["/essay_geek-culture.txt"],
  "comic book": ["/essay_geek-culture.txt"],
  "comics": ["/essay_geek-culture.txt"],
  "avengers": ["/essay_geek-culture.txt"],
  "star wars": ["/essay_geek-culture.txt"],
  "marvel": ["/essay_geek-culture.txt"],
  "dc": ["/essay_geek-culture.txt"],
  "mcu": ["/essay_geek-culture.txt"],
  "burnout": ["/essay_geek-culture.txt"],
  "overload": ["/essay_geek-culture.txt"],
  "fandom": ["/essay_geek-culture.txt"],
  "streaming": ["/essay_geek-culture.txt"],

    // === ACADEMIC: Bubonic Plague in East Asia ===
  "bubonic": ["/academic_bubonic-plague.txt"],
  "plague": ["/academic_bubonic-plague.txt"],
  "death": ["/academic_bubonic-plague.txt"],
  "china": ["/academic_bubonic-plague.txt"],
  "asia": ["/academic_bubonic-plague.txt"],
  "debt": ["/academic_bubonic-plague.txt"],
  "bondage": ["/academic_bubonic-plague.txt"],
  "slavery": ["/academic_bubonic-plague.txt"],
  "pandemic": ["/academic_bubonic-plague.txt"],
  "servile": ["/academic_bubonic-plague.txt"],
  "black swan": ["/academic_bubonic-plague.txt"],
  "penn": ["/academic_bubonic-plague.txt"],

    // === GAMING: Joel and Ellie Bond ===
  "last of us": ["/gaming_joel-ellie-bond.txt"],
  "joel": ["/gaming_joel-ellie-bond.txt"],
  "ellie": ["/gaming_joel-ellie-bond.txt"],
  "videogame": ["/gaming_joel-ellie-bond.txt"],
  "trauma": ["/gaming_joel-ellie-bond.txt"],
  "daughter": ["/gaming_joel-ellie-bond.txt"],
  "relationship": ["/gaming_joel-ellie-bond.txt"],
  "emotion": ["/gaming_joel-ellie-bond.txt"],
  "clicker": ["/gaming_joel-ellie-bond.txt"],
  "bloater": ["/gaming_joel-ellie-bond.txt"],
  "loss": ["/gaming_joel-ellie-bond.txt"],
  "connection": ["/gaming_joel-ellie-bond.txt"],
  "pedro pascal": ["/gaming_joel-ellie-bond.txt"],

  
    // === GAMING: Eris Morn ===
  "destiny": ["/gaming_eris-morn.txt"],
  "eris": ["/gaming_eris-morn.txt"],
  "hive": ["/gaming_eris-morn.txt"],
  "taken": ["/gaming_eris-morn.txt"],
  "lore": ["/gaming_eris-morn.txt"],
  "videogame": ["/gaming_eris-morn.txt"],
  "bungie": ["/gaming_eris-morn.txt"],
  "oryx": ["/gaming_eris-morn.txt"],
  "dreadnaught": ["/gaming_eris-morn.txt"],
  "blindfold": ["/gaming_eris-morn.txt"],
  "sorrows": ["/gaming_eris-morn.txt"],
  "savathun": ["/gaming_eris-morn.txt"],

  
  
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

      // === STORY: Beware The Owls Herald ===
  "new york": ["/story_beware-the-owls-herald.txt"],
  "james bennett": ["/story_beware-the-owls-herald.txt"],
  "rumination": ["/story_beware-the-owls-herald.txt"],
  "herald square": ["/story_beware-the-owls-herald.txt"],
  "owl": ["/story_beware-the-owls-herald.txt"],
  "mystery": ["/story_beware-the-owls-herald.txt"],
  "occult": ["/story_beware-the-owls-herald.txt"],
  "urban legend": ["/story_beware-the-owls-herald.txt"],
  "ghost": ["/story_beware-the-owls-herald.txt"],
  "history": ["/story_beware-the-owls-herald.txt"],
  "fiction": ["/story_beware-the-owls-herald.txt"],
  "newspaper": ["/story_beware-the-owls-herald.txt"],
  "locked": ["/story_beware-the-owls-herald.txt"],
  "puzzle": ["/story_beware-the-owls-herald.txt"],

       // === STORY: I Remember ===
  "remember": ["/story_i-remember.txt"],
  "memoir": ["/story_i-remember.txt"],
  "memory": ["/story_i-remember.txt"],
  "reflection": ["/story_i-remember.txt"],
  "pain": ["/story_i-remember.txt"],
  "childhood": ["/story_i-remember.txt"],
  "nostalgia": ["/story_i-remember.txt"],
  "identity": ["/story_i-remember.txt"],
  "1970s": ["/story_i-remember.txt"],
  "present": ["/story_i-remember.txt"],
  "poetic prose": ["/story_i-remember.txt"],
  "cultural": ["/story_i-remember.txt"],
  "stories": ["/story_i-remember.txt"],
  "seventies": ["/story_i-remember.txt"],

       // === TV: Twilight Zone ===
  "twilight zone": ["/tv_twilight-zone.txt"],
  "rod serling": ["/tv_twilight-zone.txt"],
  "classic": ["/tv_twilight-zone.txt"],
  "television": ["/tv_twilight-zone.txt"],
  "cbs": ["/tv_twilight-zone.txt"],
  "science fiction": ["/tv_twilight-zone.txt"],
  "mystery": ["/tv_twilight-zone.txt"],
  "black and white": ["/tv_twilight-zone.txt"],
  "surreal": ["/tv_twilight-zone.txt"],
  "weird": ["/tv_twilight-zone.txt"],
  "twist": ["/tv_twilight-zone.txt"],
  "moral": ["/tv_twilight-zone.txt"],
  
       // === STORY: Fumbling From Within ===
  "cleveland": ["/story_fumbling-from-within.txt"],
  "browns": ["/story_fumbling-from-within.txt"],
  "football": ["/story_fumbling-from-within.txt"],
  "playoff": ["/story_fumbling-from-within.txt"],
  "byner": ["/story_fumbling-from-within.txt"],
  "running": ["/story_fumbling-from-within.txt"],
  "goal line": ["/story_fumbling-from-within.txt"],
  "fumble": ["/story_fumbling-from-within.txt"],
  "kosar": ["/story_fumbling-from-within.txt"],
  "resilience": ["/story_fumbling-from-within.txt"],
  "heartbreak": ["/story_fumbling-from-within.txt"],
  "loyalty": ["/story_fumbling-from-within.txt"],
  
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

        // === GAMING: Wrath of the Machine ===
  "destiny": ["/gaming_wrath-of-the-machine.txt"],
  "wrath": ["/gaming_wrath-of-the-machine.txt"],
  "raid": ["/gaming_wrath-of-the-machine.txt"],
  "siva": ["/gaming_wrath-of-the-machine.txt"],
  "splicer": ["/gaming_wrath-of-the-machine.txt"],
  "nanotech": ["/gaming_wrath-of-the-machine.txt"],
  "bioethics": ["/gaming_wrath-of-the-machine.txt"],
  "machine": ["/gaming_wrath-of-the-machine.txt"],
  "videogame": ["/gaming_wrath-of-the-machine.txt"],
  "programmable": ["/gaming_wrath-of-the-machine.txt"],
  "plague": ["/gaming_wrath-of-the-machine.txt"],
  "alchemy": ["/gaming_wrath-of-the-machine.txt"],
  "technology": ["/gaming_wrath-of-the-machine.txt"],

        // === GAMING: Last of Us Trauma Loss ===
  "last of us": ["/gaming_last-of-us-trauma-loss.txt"],
  "trauma": ["/gaming_last-of-us-trauma-loss.txt"],
  "loss": ["/gaming_last-of-us-trauma-loss.txt"],
  "grief": ["/gaming_last-of-us-trauma-loss.txt"],
  "emotion": ["/gaming_last-of-us-trauma-loss.txt"],
  "storytelling": ["/gaming_last-of-us-trauma-loss.txt"],
  "death": ["/gaming_last-of-us-trauma-loss.txt"],
  "heartache": ["/gaming_last-of-us-trauma-loss.txt"],
  "longing": ["/gaming_last-of-us-trauma-loss.txt"],
  "family": ["/gaming_last-of-us-trauma-loss.txt"],
  "impact": ["/gaming_last-of-us-trauma-loss.txt"],
  "suffer": ["/gaming_last-of-us-trauma-loss.txt"],
  "survival": ["/gaming_last-of-us-trauma-loss.txt"],
  "videogame": ["/gaming_last-of-us-trauma-loss.txt"],

        // === STORY: Archive Whisperer Part Two ===
  "archive": ["/story_archive-whisperer-part-two.txt"],
  "secret": ["/story_archive-whisperer-part-two.txt"],
  "occult": ["/story_archive-whisperer-part-two.txt"],
  "manhattan": ["/story_archive-whisperer-part-two.txt"],
  "brooklyn": ["/story_archive-whisperer-part-two.txt"],
  "subway": ["/story_archive-whisperer-part-two.txt"],
  "cryptography": ["/story_archive-whisperer-part-two.txt"],
  "puzzle": ["/story_archive-whisperer-part-two.txt"],
  "symbolism": ["/story_archive-whisperer-part-two.txt"],
  "fiction": ["/story_archive-whisperer-part-two.txt"],
  "numerical": ["/story_archive-whisperer-part-two.txt"],
  "code": ["/story_archive-whisperer-part-two.txt"],
  "whisperer": ["/story_archive-whisperer-part-two.txt"],
  
        // === STORY: Archive Whisperer Part One ===
  "archive": ["/story_archive-whisperer-part-one.txt"],
  "library": ["/story_archive-whisperer-part-one.txt"],
  "borges": ["/story_archive-whisperer-part-one.txt"],
  "new york": ["/story_archive-whisperer-part-one.txt"],
  "urban legend": ["/story_archive-whisperer-part-one.txt"],
  "historical fiction": ["/story_archive-whisperer-part-one.txt"],
  "secret society": ["/story_archive-whisperer-part-one.txt"],
  "henry darger": ["/story_archive-whisperer-part-one.txt"],
  "central park": ["/story_archive-whisperer-part-one.txt"],
  "mystery": ["/story_archive-whisperer-part-one.txt"],
  "myth": ["/story_archive-whisperer-part-one.txt"],
  "ghost": ["/story_archive-whisperer-part-one.txt"],
  "whisperer": ["/story_archive-whisperer-part-one.txt"],

  
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

          // === TV: Only Murders In The Building ===
  "hulu": ["/tv_only-murders-in-the-building.txt"],
  "murder": ["/tv_only-murders-in-the-building.txt"],
  "upper west side": ["/tv_only-murders-in-the-building.txt"],
  "steve martin": ["/tv_only-murders-in-the-building.txt"],
  "selena gomez": ["/tv_only-murders-in-the-building.txt"],
  "martin short": ["/tv_only-murders-in-the-building.txt"],
  "mystery": ["/tv_only-murders-in-the-building.txt"],
  "comedy": ["/tv_only-murders-in-the-building.txt"],
  "manhattan": ["/tv_only-murders-in-the-building.txt"],
  "whodunnit": ["/tv_only-murders-in-the-building.txt"],
  "theater": ["/tv_only-murders-in-the-building.txt"],
  "streaming": ["/tv_only-murders-in-the-building.txt"],

  
          // === GAMING: Destiny Enigmatic Nine ===
  "destiny": ["/gaming_destiny-enigmatic-nine.txt"],
  "bungie": ["/gaming_destiny-enigmatic-nine.txt"],
  "nine": ["/gaming_destiny-enigmatic-nine.txt"],
  "cosmology": ["/gaming_destiny-enigmatic-nine.txt"],
  "lore": ["/gaming_destiny-enigmatic-nine.txt"],
  "creation": ["/gaming_destiny-enigmatic-nine.txt"],
  "egypt": ["/gaming_destiny-enigmatic-nine.txt"],
  "game design": ["/gaming_destiny-enigmatic-nine.txt"],
  "videogame": ["/gaming_destiny-enigmatic-nine.txt"],
  "edge of fate": ["/gaming_destiny-enigmatic-nine.txt"],
  "dlc": ["/gaming_destiny-enigmatic-nine.txt"],
  "seasonal": ["/gaming_destiny-enigmatic-nine.txt"],

          // === STORY: Pierced through the heart ===
  "friends": ["/story_pierced-through-the-heart.txt"],
  "ache": ["/story_pierced-through-the-heart.txt"],
  "estrangement": ["/story_pierced-through-the-heart.txt"],
  "memory": ["/story_pierced-through-the-heart.txt"],
  "nostalgia": ["/story_pierced-through-the-heart.txt"],
  "ruminate": ["/story_pierced-through-the-heart.txt"],
  "distance": ["/story_pierced-through-the-heart.txt"],
  "anxiety": ["/story_pierced-through-the-heart.txt"],
  "relationships": ["/story_pierced-through-the-heart.txt"],
  "childhood": ["/story_pierced-through-the-heart.txt"],
  "scatter": ["/story_pierced-through-the-heart.txt"],
  "reconnect": ["/story_pierced-through-the-heart.txt"],
  "lurking": ["/story_pierced-through-the-heart.txt"],
  "longing": ["/story_pierced-through-the-heart.txt"],
  "missed": ["/story_pierced-through-the-heart.txt"],

  
          // === GAMING: Last of Us Female Characters ===
  "last of us": ["/gaming_last-of-us-female.txt"],
  "ellie": ["/gaming_last-of-us-female.txt"],
  "female": ["/gaming_last-of-us-female.txt"],
  "tess": ["/gaming_last-of-us-female.txt"],
  "marlene": ["/gaming_last-of-us-female.txt"],
  "naughty dog": ["/gaming_last-of-us-female.txt"],
  "gender": ["/gaming_last-of-us-female.txt"],
  "storytelling": ["/gaming_last-of-us-female.txt"],
  "druckman": ["/gaming_last-of-us-female.txt"],
  "representation": ["/gaming_last-of-us-female.txt"],
  "clicker": ["/gaming_last-of-us-female.txt"],
  "heroine": ["/gaming_last-of-us-female.txt"],
  
          // === GAMING: Death Stranding ===
  "kojima": ["/gaming_death-stranding.txt"],
  "death stranding": ["/gaming_death-stranding.txt"],
  "greek mythology": ["/gaming_death-stranding.txt"],
  "stoicism": ["/gaming_death-stranding.txt"],
  "videogame": ["/gaming_death-stranding.txt"],
  "existentialism": ["/gaming_death-stranding.txt"],
  "fate": ["/gaming_death-stranding.txt"],
  "isolation": ["/gaming_death-stranding.txt"],
  "walking": ["/gaming_death-stranding.txt"],
  "repatriation": ["/gaming_death-stranding.txt"],
  "connection": ["/gaming_death-stranding.txt"],
  
          // === GAMING: Live Die Eat Cheat ===
  "gaming": ["/gaming_live-die-eat-cheat.txt"],
  "nintendo": ["/gaming_live-die-eat-cheat.txt"],
  "atari": ["/gaming_live-die-eat-cheat.txt"],
  "spectrum": ["/gaming_live-die-eat-cheat.txt"],
  "arcade": ["/gaming_live-die-eat-cheat.txt"],
  "baudrillard": ["/gaming_live-die-eat-cheat.txt"],
  "myst": ["/gaming_live-die-eat-cheat.txt"],
  "hal 9000": ["/gaming_live-die-eat-cheat.txt"],
  "history": ["/gaming_live-die-eat-cheat.txt"],
  "matthew smith": ["/gaming_live-die-eat-cheat.txt"],
    "mario": ["/gaming_live-die-eat-cheat.txt"],
    "pac man": ["/gaming_live-die-eat-cheat.txt"],
    "frankenstein": ["/gaming_live-die-eat-cheat.txt"],
    "network gaming": ["/gaming_live-die-eat-cheat.txt"],
    "deep blue": ["/gaming_live-die-eat-cheat.txt"],
    "ibm": ["/gaming_live-die-eat-cheat.txt"],
    "virtual reality": ["/gaming_live-die-eat-cheat.txt"],
    "cheat code": ["/gaming_live-die-eat-cheat.txt"],
  "videogame": ["/gaming_live-die-eat-cheat.txt"],

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
      "/film_beanpole.txt",
      "/film_betty-blue.txt",
      "/film_leaving-las-vegas.txt",
      "/film_career-girls.txt",
      "/film_my-last-film.txt",
      "/film_high-fidelity.txt",
      "/film_rope.txt",
      "/film_baron-munchausen.txt",
      "/film_napoleon.txt",
      "/film_war-and-peace.txt",
      "/film_cathy-come-home.txt",
      "/film_plan-75.txt",
      "/film_godland.txt",
      "/film_fitzcarraldo.txt",
      "/film_long-good-friday.txt",
      "/film_stalker.txt",
      "/film_virgin-suicides.txt",
      "/film_naked.txt",
      "/film_kubrick-napoleon.txt",
      "/film_barry-lyndon.txt",
      "/film_kes.txt",
      "/film_detective-blanc-donut-theory.txt",
      "/film_seeing-and-saw.txt",
      "/film_nomadland.txt",
      "/film_paris-texas.txt",
      "/film_fire-walk-with-me.txt",
      "/film_silence.txt",
      "/film_sophies-choice.txt",
      "/film_legacy-of-zulu-dawn.txt",
      "/film_the-orchestra.txt",
      "/film_withnail-and-us.txt",
      "/film_dancer-in-the-dark.txt",
      "/film_joy-division-control.txt",
      "/film_what-star-wars-means-to-me.txt",
      "/academic_bubonic-plague.txt",
      "/essay_geek-culture.txt",
      "/gaming_fragging-the-competition.txt",
      "/gaming_last-of-us-female.txt",
      "/gaming_destiny-enigmatic-nine.txt",
      "/gaming_death-stranding.txt",
      "/gaming_eris-morn.txt",
      "/gaming_last-of-us-trauma-loss.txt",
      "/gaming_wrath-of-the-machine.txt",
      "/gaming_joel-ellie-bond.txt",
      "/gaming_live-die-eat-cheat.txt",
      "/story_beware-the-owls-herald.txt",
      "/story_fumbling-from-within.txt",
      "/story_archive-whisperer-part-one.txt",
      "/story_archive-whisperer-part-two.txt",
      "/story_journey-from-there-to-here.txt",
      "/story_when-you-fell-asleep-forever.txt",
      "/story_the-ten-year-cycle.txt",
      "/story_i-remember.txt",
      "/story_freedom-of-the-worst-day-of-your-life.txt",
      "/story_when-work-stops-being-the-work.txt",
      "/story_twenty-things-in-twenty-years.txt",
      "/story_how-to-be-a-great-product-manager.txt",
      "/story_life-in-art.txt",
      "/story_eyes-up.txt",
      "/story_pierced-through-the-heart.txt",
      "/story_how-to-never-look-back.txt",
      "/story_the-boy-with-the-dip.txt",
      "/story_on-surviving-why-im-still-here.txt",
      "/tv_eastenders.txt",
      "/tv_twilight-zone.txt",
      "/tv_only-murders-in-the-building.txt",
      "/tv_alan-bennett-talking-heads.txt",
      "/talk_destiny-habituation-tactics.txt"
    ];
  }

  
document.getElementById("thinking-indicator").style.display = "block";
// [run your fetch or processing]
document.getElementById("thinking-indicator").style.display = "none";

  
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
