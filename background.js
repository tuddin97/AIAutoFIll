chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "fetchCompletion") {
      chrome.storage.sync.get("apiKey", async (data) => {
        if (!data.apiKey) {
          sendResponse({ error: "API key not set" });
          return;
        }
  
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.apiKey}`
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: message.text,
            max_tokens: 50
          })
        });
  
        const responseData = await response.json();
        sendResponse({ completion: responseData.choices?.[0]?.text?.trim() || "" });
      });
    }
    return true; // Keeps the async response alive
  });
  