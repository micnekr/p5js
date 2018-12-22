//                                variables
let express = require("express");
let app = express();
let fs = require("fs");
let bodyParser = require('body-parser');
let afinn = JSON.parse(fs.readFileSync("AFINN.json"));

console.log("starting server...");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

// show index.html
let server = app.listen(2500, () => {
  console.log("Listening...");
  app.use(express.static("public"));
});

// handle requests

app.get("/word/:word", (request, response) => {
  let data = request.params;
  let word = data.word;
  let score = afinn[word];
  let reply;
  if (score == null) {
    reply = {
      "state": "not found",
      "word": word
    }
  } else {
    reply = {
      "state": "found",
      "word": word,
      "score": Number(score)
    }
  }
  response.send(reply);
})

app.get("/all", (request, response) => {
  response.send(afinn);
})

app.get("/add/:word/:score?", (request, response) => {
  let data = request.params;
  let word = data.word;
  let score = data.score;
  let reply;
  if (score == null) {
    reply = {
      "word": word,
      "score": score,
      "msg": "Score should be included"
    }
  } else if (afinn[word] != null) {
    reply = {
      "word": word,
      "score": score,
      "msg": "The word was already included"
    }
  } else if (Math.abs(Number(score)) > 5) {
    reply = {
      "word": word,
      "score": score,
      "msg": "Score should be between -5 and 5"
    }
  } else if (isNaN(score)) {
    reply = {
      "word": word,
      "score": score,
      "msg": "Score should be a number"
    }
  } else {
    afinn[word] = score;
    let data = JSON.stringify(afinn, null, 2);
    fs.writeFile("AFINN.json", data, () => {
      console.log("AFINN files updated");
    });
    reply = {
      "word": word,
      "score": score,
      "msg": "Success!"
    }
  }
  response.send(reply);
})

app.post("/analyse", (request, response) => {
  let data = request.body;
  let text = data.text;
  let scores = analyseAFINN(data.text, afinn);
  response.send({
    msg: "Success",
    score: scores[0],
    comScore: scores[1],
    words: scores[2]
  });
})

function analyseAFINN(text, afinn) {
  let score = 0;
  let words = text.split(/\W+/);
  let meaningful = [];
  for (word of words) {
    word = word.toLowerCase();
    if (afinn[word] != undefined) {
      score += Number(afinn[word]);
      meaningful.push(word);
      // console.log(word);
    }
  }
  let comparative = score / words.length;
  return [score, comparative, meaningful];
}