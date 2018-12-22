//                                variables
let afinn = {};
let textbox;
let output;
let newWordIn, newScoreIn;
let submit;
let state;

function preload() {
  afinn = loadJSON("/all");
}

function setup() {
  noCanvas();
  output = select("#output");
  textbox = select("#textbox");
  newWordIn = select("#word");
  newScoreIn = select("#score");
  submit = select("#submit");
  state = select("#state");
  textbox.input(() => {
    let txt = textbox.value();
    let data = {
      text: txt
    }
    httpPost("/analyse", data, "json", (result) => {
      output.html("The score of this text is " + result.score + ", and the comparative score is " + result.comScore + " ");
    });
  })
  submit.mousePressed(() => {
    let word = newWordIn.value();
    let score = newScoreIn.value();
    loadJSON("/add/" + word + "/" + score, (data) => {
      state.html(data.msg);
      afinn = loadJSON("/all");
    });
  })
}