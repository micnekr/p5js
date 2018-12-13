//                                variables
let canvas;
let points = [];
let a = 0;
let b = 0;
let xScale = 100;
let yScale = 100;
let reliable = false;
let learningRate = 0.07;
let input;
let output;
let r = /(\d+),\s*(\d+)/;
let testVal = /(\d+)\s?,?\s?([x|y])/;


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  // user input
  input = select("#userInputText");
  input.changed(inputPlot);
  output = select("#output");
}

function mousePressed() {
  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
    newPoint(mouseX, mouseY);
  }
}

function draw() {
  linearRegression();
  background(51);
  // if only one point, algorythm breaks
  if (reliable) {
    drawLine();
  }
  for (var i = 0; i < points.length; i++) {
    let x = toGraphX(points[i].x);
    let y = toGraphY(points[i].y);
    fill(200);
    stroke(0);
    ellipse(x, y, 8, 8);
  }
}

function drawLine() {
  let y1 = b;
  let y2 = a + b;
  stroke(255, 0, 0);
  line(0, toGraphY(y1), toGraphX(1), toGraphY(y2));
}

function toGraphX(x) {
  return map(x, 0, 1, 0, width);
}

function toGraphY(y) {
  return map(y, 0, 1, height, 0);
}

function linearRegression() {
  if(points.length > 1){
    reliable = true;
    for (var i = 0; i < points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;

      let guessY = a*x + b;

      let error = y - guessY;
      error *= learningRate;

      a += error * x;
      b += error;
    }
  }
}

function newPoint(xVal, yVal) {
  output.html("");
  let x = map(xVal, 0, width, 0, 1);
  let y = map(yVal, 0, height, 1, 0);
  let point = {
    x,
    y
  };
  points.push(point);
}

function inputPlot() {
  let str = input.value();
  let nums = str.match(r);
  let testFor = str.match(testVal);
  if (nums != null) {
    newPoint(toGraphX(nums[1]/xScale), toGraphY(nums[2]/yScale));
  }else if(testFor != null){
    if(reliable){
      if(testFor[2] == "x"){
        output.html((testFor[1]/xScale * a + b) * yScale);
      }else{
        output.html(((testFor[1]/yScale - b)/a) * xScale);
      }
    }else{
      output.html("Please, add more data on the graph");
    }
  }
}
