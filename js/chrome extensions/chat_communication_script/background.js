chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request === "opened popup") {
    console.log("Opened popup");
  }
})