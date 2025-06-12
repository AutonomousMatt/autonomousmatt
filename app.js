async function ask() {
  const prompt = document.getElementById("prompt").value;
  const responseEl = document.getElementById("response");
  responseEl.textContent = "Thinking...";

  const file = "/rope.txt";

  try {
    const res = await fetch(file);
    const archiveText = await res.text();

    const gptRes = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, archive: archiveText })
    });

    const json = await gptRes.json();
    responseEl.textContent = json.text?.trim() || "I need more to go on...";
  } catch (err) {
    responseEl.textContent = "Error loading archive content.";
    console.error(err);
  }
}
