//                                variables
let txt;
let testTxt;
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
  testTxt = loadStrings("texts/tom-sawyer.txt");
  txt = loadStrings(texts[0], nextText);
}

function nextText() {
  if (currentText < texts.length) {
    currentText++;
    txt.push(loadStrings(texts[currentText - 1], nextText));
  }
}

function setup() {
  noCanvas();
  // join the text
  txt = txt.join("\n");
  testTxt = testTxt.join("\n");
  textbox = select("#textbox");
  output = select("#output");
  textbox.input(analyseUser);
}

function wordCount(data) {
  let words = data.split(/\W+/);
  frequency = {};
  keys = [];
  console.log("Starting analysing...");
  for (word of words) {
    if (!(/\d+/.test(word) || word == "")) {
      word = word.toLowerCase();
      if (frequency[word] == undefined) {
        frequency[word] = {
          tf: 1,
          df: 0
        };
        keys.push(word);
      } else {
        frequency[word].tf++;
      }
    }
  }
  keys.sort((a, b) => {
    return frequency[b].tf - frequency[a].tf;
  })
  console.log("Analysing finished!");
  return [frequency, keys];
}

function analyseUser() {
  let data = textbox.value();
  output.html("");
  let score = tf_idf(data, txt);
  score[1].sort((a, b) => {
    let frequency = score[0];
    return frequency[b].score - frequency[a].score;
  })
  let num = min(maxNum, score[1].length);
  for (var i = 0; i < num; i++) {
    let word = score[1][i];
    output.html(word + " " + score[0][word].score + "<br/>", true);
  }
}

function tf_idf(test, data) {
  let frequenciesTest = wordCount(test);
  let frequenciesData = wordCount(data);
  for (word of frequenciesTest[1]) {
    if (frequenciesData[0][word] == undefined) {
      // word has not been found
      frequenciesTest[0][word].df = 1;
    } else {
      frequenciesTest[0][word].df += frequenciesData[0][word].tf;
    }
  }
  // calculate each word`s score
  for (word of frequenciesTest[1]) {
    word = frequenciesTest[0][word];
    let tf = word.tf;
    let df = word.df;
    let score = tf * texts.length / df;
    word.score = score;
  }
  return frequenciesTest;
}

function analyseFull() {
  if (document.getElementById("full").checked) {
    let data = testTxt;
    output.html("");
    let score = tf_idf(data, txt);
    score[1].sort((a, b) => {
      let frequency = score[0];
      return frequency[b].score - frequency[a].score;
    })
    let num = min(maxNum, score[1].length);
    for (var i = 0; i < num; i++) {
      let word = score[1][i];
      output.html(word + " " + score[0][word].score + "<br/>", true);
    }
  }
}
