//                                variables
let canvas;
let nn;
let trainButton;
let stateText;

let trainingData = [];
let testingData = [];

const len = 784;
const totalDataLen = 5000;
const trainingPercent = 0.8;

const CAT = 0;
const COFFEE = 1;
const CIRCLE = 2;

let cats_data;
let coffee_data;
let circles_data;

let cats = {};
let coffee = {};
let circles = {};

function preload() {
  // cats_data = loadBytes('data/catImages.bin');
  // coffee_data = loadBytes('data/coffeeImages.bin');
  // circles_data = loadBytes('data/circleImages.bin');
  cats_data = loadBytes('data/cat5000.bin');
  coffee_data = loadBytes('data/coffee5000.bin');
  circles_data = loadBytes('data/circle5000.bin');
}

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  // setup dom
  stateText = select("#stateText");
  trainButton = select("#train");
  let clearButton = select("#clearButton");
  clearButton.mousePressed(() => background(255));
  // prepare data
  separateData(cats, cats_data, CAT);
  separateData(coffee, coffee_data, COFFEE);
  separateData(circles, circles_data, CIRCLE);
  // operate data
  // add all training data
  trainingData = trainingData.concat(cats.training);
  trainingData = trainingData.concat(coffee.training);
  trainingData = trainingData.concat(circles.training);

  // add all testing data
  testingData = testingData.concat(cats.testing);
  testingData = testingData.concat(coffee.testing);
  testingData = testingData.concat(circles.testing);

  trainButton.mousePressed(startTraining);
  // create a new Neural Network!
  nn = new NeuralNetwork(len, 64, 3);
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    stroke(0);
    strokeWeight(5);
    line(pmouseX, pmouseY, mouseX, mouseY);
    reduce();
  }
}

function separateData(category, data, label) {
  category.training = [];
  category.testing = [];
  for (var i = 0; i < totalDataLen; i++) {
    let offset = i * len;
    if (i / totalDataLen < trainingPercent) {
      category.training[i] = data.bytes.subarray(offset, offset + len);
      category.training[i].label = label;
    } else {
      category.testing[i - (trainingPercent * totalDataLen)] = data.bytes.subarray(offset, offset + len);
      category.testing[i - (trainingPercent * totalDataLen)].label = label;
    }
  }
  return category;
}

function epoch(trainingData) {
    // randomize data
    shuffle(trainingData, true);
    // foreach data
    for (var i = 0; i < trainingData.length; i++) {
      let data = trainingData[i];
      let label = data.label;
      // map from 0 to 1
      let inputs = Array.from(data).map(x => x / 255);
      // outputs
      let targets = [0, 0, 0];
      targets[label] = 1;
      // train
      nn.train(inputs, targets);
    }
}

function test(testingData) {
  // right guesses
  let right = 0;
  // foreach data
  for (var i = 0; i < testingData.length; i++) {
    let data = testingData[i];
    let label = data.label;
    // map to 0 to 1
    let inputs = Array.from(data).map(x => x / 255);
    // predict
    if (label == classify(inputs)) {
      right++
    }
  }
  let percent = right / testingData.length * 100;
  return percent;
}

function startTraining() {
  // train!
  console.log("Training...");
  document.getElementById("stateText").innerHTML = "Training...";
  epoch(trainingData);
  // test!
  let percentRight = test(testingData);
  console.log("Correct: " + percentRight + "%");
  console.log("Finished training!");
  stateText.html("Finished training!");
}

function reduce() {
  let inputs = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  for (var i = 0; i < len; i++) {
    let brightness = img.pixels[i * 4];
    inputs[i] = 1 - (brightness / 255);
  }
  let result = classify(inputs);
  let guessedLabel;
  switch (result) {
    case CAT:
      guessedLabel = "Cat";
      break;
    case COFFEE:
      guessedLabel = "Coffee cup";
      break;
    case CIRCLE:
      guessedLabel = "Circle";
      break;
  }
  stateText.html("Is it " + guessedLabel + "?");
}

function classify(inputs) {
  let prediction = nn.predict(inputs);
  // find the best probability
  return prediction.indexOf(max(prediction));
}
