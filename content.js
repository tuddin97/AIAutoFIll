document.addEventListener("input", async (event) => {
    const target = event.target;
    if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
      const userInput = target.value;
      if (userInput.length > 3) {
        chrome.runtime.sendMessage({ type: "fetchCompletion", text: userInput }, (response) => {
          if (response && response.completion) {
            target.setAttribute("data-suggestion", response.completion);
            showSuggestion(target, response.completion);
          }
        });
      }
    }
  });
  
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if ((target.tagName === "TEXTAREA" || target.tagName === "INPUT") && event.key === "Tab") {
      event.preventDefault();
      const suggestion = target.getAttribute("data-suggestion");
      if (suggestion) {
        target.value += suggestion;
        target.removeAttribute("data-suggestion");
      }
    }
  });
  
  function showSuggestion(input, text) {
    const existing = document.querySelector(".autocomplete-suggestion");
    if (existing) existing.remove();
  
    const span = document.createElement("span");
    span.className = "autocomplete-suggestion";
    span.textContent = text;
    span.style.position = "absolute";
    span.style.left = `${input.offsetLeft + input.offsetWidth}px`;
    span.style.top = `${input.offsetTop}px`;
    span.style.color = "gray";
    document.body.appendChild(span);
  }
  