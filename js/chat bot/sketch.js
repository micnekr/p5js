//                                 variables
let button;
let input;
let output;
let bot;
let speech;
//                settings
let maxNum = 101;


function setup() {
  // load voice
  speech = new p5.Speech(); // speech synthesis object
  speech.onLoad = voiceReady;
  // no canvas
  noCanvas();
  // set dom elements
  button = select("#submit");
  input = select("#userInputText");
  output = select("#output");
}

function voiceReady() {
  console.log('voice ready');
  speech.setVoice("Google UK English Male");
  // creating a Bot
  bot = new RiveScript();
  bot.loadFile("brain.rive")
    .then(loadedFile)
    .catch(errFile);
}

// when new message avaliable
function chat() {
  let inputText = input.value();
  input.value("");
  bot.reply("local-user", inputText)
    .then(function(reply) {
      output.html("Bot replies: <br />" + reply);
      reply = reply.replace(new RegExp("<br />", 'g'), "");
      reply = reply.replace(new RegExp("-", 'g'), "");
      speech.speak(reply);
      if (reply == "Oh, did I need to pick a random number? Ok, I have picked one between 0 and 100." || reply == "Ok, I have picked a random number between 0 and 100.") {
        randPick();
      }
    })
    .catch(function(err) {
      output.html("There was an error.");
      console.log(err);
    });
}

// called after configuring the bot
function loadedFile() {
  // sorting replies
  bot.sortReplies();
  console.log("Bot loaded successfuly");
  // button pressed listener
  button.mousePressed(chat);
  // enter listener
  input.changed(chat);
}

// called in case of error in bot setup
function errFile(err) {
  console.log(err);
  output.html("Error");
}



// pick a random number
function randPick() {
  let rand = floor(random(maxNum));
  bot.setVariable('r', rand);
}