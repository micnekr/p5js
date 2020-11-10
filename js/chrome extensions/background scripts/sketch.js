//                                variables
chrome.runtime.onMessage.addListener(getmsg);


function getmsg(msg, sender, response) {
  if (msg.action == "clear text") {
    let tags = ["p", "h1", "h2", "h3", "link", "a", "b", "span", "li", "dt", "input", "textarea", "img", "table"];
    for (let tag of tags) {
      replace(tag, "alice");
    }
  }
}

function replace(tag, replacement = "") {
  let texts = document.getElementsByTagName(tag);
  for (el of texts) {
    el.innerHTML = replacement;
  }
}