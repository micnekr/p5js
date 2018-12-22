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
let order = 2;
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
  txt = txt.split(/\W+/);
  output = select("#output");
  textbox = select("#textbox");
  textbox.input(()=>{
    if(!document.getElementById("full").checked){
      sample = textbox.value().split(/\W+/);
      chain.learn(sample);
      output.html(chain.generate(len));
    }
  })
  sample = textbox.value().split(/\W+/);
  chain.learn(sample);
  output.html(chain.generate(len));
}

function changeSample() {
  if (document.getElementById("full").checked) {
    sample = txt.slice();
  }else{
    sample = textbox.value().split(/\W+/);
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
      let gram = data.slice(i, i+this.order);
      gram = gram.join(" ");
      if(this.ngrams[gram] == undefined){
        this.ngrams[gram] = [];
      }
      this.ngrams[gram].push(data[i+this.order]);
    }
  }

  generate(len){
    let output = "";
    // starting points
    let current = this.data.slice(0, this.order).join(" ");
    output += current;
    for (var i = 0; i < len; i++) {
      let possibilities = this.ngrams[current];
      if(possibilities == undefined){
        break;
      }
      let next = random(possibilities);
      if(next!=undefined){
        output += " " + next;
        output = output.split(/\W+/);
        current = output.slice(output.length-this.order, output.length).join(" ");
        output = output.join(" ");
      }
    }
    return output;
  }
}
