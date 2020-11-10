//                                variables
let tags = ["p", "h1", "h2", "h3", "link", "a", "b", "span", "li", "dt", "input", "textarea"];
for (let tag of tags) {
  replace(tag, "alice");
}

function replace(tag, replacement = "") {
  let texts = document.getElementsByTagName(tag);
  console.log(texts);
  for (el of texts) {
    el.innerHTML = replacement;
  }
}