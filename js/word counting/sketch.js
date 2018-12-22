//                                variables
let txt;
let textbox;
let output;
let frequency = {};
let keys = [];
let maxNum = 300;
let currentText;
let texts = [
  "texts/Jekyll-Hyde.txt",
  "texts/dracula.txt",
  "texts/pic-dor-gray.txt",
  "texts/sherlock-holmes.txt",
  "texts/frankenstein.txt"
];

function preload() {
  currentText = 1;
  txt = loadStrings(texts[0], nextText);
}

function nextText() {
  if(currentText<texts.length){
    currentText++;
    txt.push(loadStrings(texts[currentText-1], nextText));
  }
}

function setup() {
  noCanvas();
  // join the text
  txt = txt.join("\n");
  textbox = select("#textbox");
  output = select("#output");
  textbox.input(analyseUser);
}

function analyse(data) {
  let words = data.split(/\W+/);
  frequency = {};
  keys = [];
  console.log("Starting analysing...");
  for (word of words) {
    if (!(/\d+/.test(word)||word=="")) {
      word = word.toLowerCase();
      if (frequency[word] == undefined) {
        frequency[word] = 1;
        keys.push(word);
      } else {
        frequency[word]++;
      }
    }
  }
  keys.sort((a, b)=>{
    return frequency[b] - frequency[a];
  })
  console.log("Analysing finished!");
  return frequency;
}

function analyseFull() {
  let checkBox = document.getElementById("full");
  if (checkBox.checked == true) {
    let data = txt;
    output.html("");
    analyse(data);
    let num = min(maxNum, keys.length);
    for (var i = 0; i < num; i++) {
      let word = keys[i];
      output.html(word + " " + frequency[word] + "<br/>", true);
    }
  }
}

function analyseUser() {
  if(document.getElementById("full").checked == false){
    let data = textbox.value();
    output.html("");
    analyse(data);
    let num = min(maxNum, keys.length);
    for (var i = 0; i < num; i++) {
      let word = keys[i];
      output.html(word + " " + frequency[word] + "<br/>", true);
    }
  }
}
