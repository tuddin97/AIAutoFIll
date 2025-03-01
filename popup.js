document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveButton = document.getElementById("saveKey");
  
    // Load saved API key (if exists)
    chrome.storage.sync.get("apiKey", (data) => {
      if (data.apiKey) {
        apiKeyInput.value = data.apiKey;
      }
    });
  
    // Save API key securely in Chrome Storage
    saveButton.addEventListener("click", () => {
      const apiKey = apiKeyInput.value.trim();
      if (apiKey.startsWith("sk-")) { // Simple validation
        chrome.storage.sync.set({ apiKey }, () => {
          alert("API Key saved successfully!");
        });
      } else {
        alert("Invalid API Key format.");
      }
    });
  });
  