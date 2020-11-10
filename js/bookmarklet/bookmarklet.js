(function() {
  let tags = ["p", "h1", "h2", "h3", "link", "a", "b", "span", "li", "dt"]
  for (let tag of tags) {
    replace(tag, "Alice");
  }
})();

function replace(tag, replacement = "") {
  let texts = document.getElementsByTagName(tag);
  console.log(texts);
  for (el of texts) {
    el.innerHTML = replacement;
  }
}