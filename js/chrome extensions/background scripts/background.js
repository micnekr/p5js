//                                variables
chrome.browserAction.onClicked.addListener((tab) => {
  let msg = {
    "action": "clear text"
  }
  console.log(tab.id);
  chrome.tabs.sendMessage(tab.id, msg);
});