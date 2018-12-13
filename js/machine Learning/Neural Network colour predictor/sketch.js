//                                variables
let canvas;
let nn;
let r, g, b;
let choice = "black";

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // create a new Neural Network!
  nn = new NeuralNetwork(3, 6, 2);
  randomColour();
  noLoop();
}

function draw() {
  background(r, g, b);
  strokeWeight(3);
  stroke(0);
  line(width/2, 0, width/2, height)
  textSize(64);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0);
  text("black", width/4, height/2);
  fill(255);
  text("white", 3*width/4, height/2);
  choice = classifyRGB(r, g, b);
  let x;
  if(choice === "black"){
    // black
    x = width/3;
    fill(0);
  }else{
    // white
    x = 2*width/3;
    fill(255);
  }
  ellipse(x, height/3, 30, 30);
}

function randomColour() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function mousePressed() {
  let inputs = [r/255, g/255, b/255];
  let targets;
  if(mouseX < width/2){
    targets = [1, 0];
  }else{
    targets = [0, 1];
  }
  for(i = 0; i < 10; i++){
    nn.train(inputs, targets);
  }
  randomColour();
  redraw();
}

function classifyRGB(r, g, b) {
  let inputs = [r/255, g/255, b/255];
  let prediction = nn.predict(inputs);
  if(prediction[0] > prediction[1]){
    return "black";
  }else{
    return "white";
  }
}
