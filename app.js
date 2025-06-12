async function ask() {
  const prompt = document.getElementById("prompt").value;
  const responseEl = document.getElementById("response");
  responseEl.textContent = "Thinking...";

  const file = "/rope.txt";

  try {
    const res = await fetch(file);
    console.log("Fetch status:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch archive file");
    }

    const archiveText = await res.text();
    console.log("Loaded archive:", archiveText.slice(0, 100));

    // TEMPORARY: Just show archive text directly
    responseEl.textContent = archiveText;
  } catch (err) {
    responseEl.textContent = "Error loading archive content.";
    console.error("Fetch error:", err);
  }
}
