//                                variables
let txt;
let afinn = {};
let textbox;
let output;

function preload() {
  afinn = loadJSON("AFINN.json");
}

function setup() {
  noCanvas();
  output = select("#output");
  textbox = select("#textbox");
  textbox.input(()=>{
    let scores = analyseAFINN(textbox.value());
    output.html("The score of this text is " + scores[0] + ", and the comparative score is " + scores[1] + " ");
  })
}

function analyseAFINN(text) {
  let score = 0;
  let words = text.split(/\W+/);
  for (word of words) {
    word = word.toLowerCase();
    if(afinn[word] != undefined){
      score += Number(afinn[word]);
      // console.log(word);
    }
  }
  let comparative = score/words.length;
  return [score, comparative];
}
