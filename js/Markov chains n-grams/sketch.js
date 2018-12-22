//                                variables
let output;
let textbox;
let currentText;
let txt;
let texts = [
  // "texts/Jekyll-Hyde.txt",
  // "texts/dracula.txt",
  // "texts/pic-dor-gray.txt",
  // "texts/sherlock-holmes.txt",
  // "texts/frankenstein.txt",
  "texts/tom-sawyer.txt"
];
let samlpe;
let chain;

// settings
let order = 7;
let len = 500;

function preload() {
  currentText = 1;
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
  chain = new Markov(order);
  txt = txt.join("\n");
  output = select("#output");
  textbox = select("#textbox");
  textbox.input(()=>{
    if(!document.getElementById("full").checked){
      sample = textbox.value();
      chain.learn(sample);
      output.html(chain.generate(len));
    }
  })
  sample = textbox.value();
  chain.learn(sample);
  output.html(chain.generate(len));
}

function changeSample() {
  if (document.getElementById("full").checked) {
    sample = txt.slice();
  }else{
    sample = textbox.value();
  }
  chain.learn(sample);
  output.html(chain.generate(len));
}





class Markov {
  constructor(order) {
    this.order = order;
    this.ngrams = [];
    this.data;
  }

  learn(data){
    this.data = data;
    this.ngrams = {};
    for (var i = 0; i < data.length-this.order+1; i++) {
      let gram = data.substring(i, i+this.order);
      if(this.ngrams[gram] == undefined){
        this.ngrams[gram] = [];
      }
      this.ngrams[gram].push(data.charAt(i+this.order));
    }
  }

  generate(len){
    let output = "";
    // starting points
    let current = this.data.substring(0, this.order);
    output += current
    for (var i = 0; i < len; i++) {
      let possibilities = this.ngrams[current];
      if(possibilities == undefined){
        break;
      }
      let next = random(possibilities);
      output += next;
      current = output.substring(output.length-this.order, output.length);
    }
    return output;
  }
}
