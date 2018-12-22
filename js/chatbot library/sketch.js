//                                variables
let chatbot;
let speech;
let speechRec;
let userInputText, output, submit;

function setup() {
  noCanvas();
  speech = new p5.Speech();
  speechRec = new p5.SpeechRec("en - UK", gotSpeech);
  speechRec.start(true, false);
  userInputText = select("#userInputText");
  submit = select("#submit");
  output = select("#output");
  chatbot = new Chatbot();
  chatbot.add("chatbot.txt");
  submit.mousePressed(textChat);
  userInputText.changed(textChat);
}

function chat(input) {
  let reply = chatbot.reply(input);
  console.log(reply);
  output.html(reply);
  // speech.setVoice(random(speech.voices).name);
  speech.setVoice("Google हिन्दी");
  speech.setRate(0.7);
  speech.setPitch(0.7);
  speech.speak(reply);
}

function textChat() {
  let input = userInputText.value();
  chat(input);
}

function gotSpeech() {
  if (speechRec.resultValue) {
    let input = speechRec.resultString;
    chat(input);
  }
}