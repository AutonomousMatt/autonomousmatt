async function ask() {
  const prompt = document.getElementById("prompt").value;
  const responseEl = document.getElementById("response");
  responseEl.textContent = "Thinking...";

  try {
    const res = await fetch("/rope.txt");
    console.log("Fetch status:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch rope.txt");
    }

    const archiveText = await res.text();
    console.log("Archive contents:", archiveText.slice(0, 100));

    const gptRes = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, archive: archiveText })
    });

    const json = await gptRes.json();
    responseEl.textContent = json.text?.trim() || "I need more to go on...";
  } catch (err) {
    responseEl.textContent = "Error loading archive content.";
    console.error("Fetch error:", err);
  }
}
