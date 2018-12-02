//                                variables
let canvas;
let points = [];
let a = 1;
let b = 0;
let xScale = 100;
let yScale = 100;
let reliable = false;
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
  let y2 = a * xScale + b;
  stroke(255, 0, 0);
  line(0, toGraphY(y1), toGraphX(xScale), toGraphY(y2));
}

function toGraphX(x) {
  return map(x, 0, xScale, 0, width);
}

function toGraphY(y) {
  return map(y, 0, yScale, height, 0);
}

function linearRegression() {
  // calculate mean x and y
  let xMean = 0;
  let yMean = 0;
  for (var i = 0; i < points.length; i++) {
    xMean += points[i].x;
    yMean += points[i].y;
  }
  xMean /= points.length;
  yMean /= points.length;
  // use formula
  let sum1 = 0;
  let sum2 = 0;
  for (var i = 0; i < points.length; i++) {
    sum1 += (points[i].x - xMean) * (points[i].y - yMean);
    sum2 += (points[i].x - xMean) * (points[i].x - xMean);
  }
  if (sum2 != 0) {
    reliable = true;
    a = sum1 / sum2;
    b = yMean - a * xMean;
  } else {
    reliable = false;
  }
}

function newPoint(xVal, yVal) {
  output.html("");
  let x = map(xVal, 0, width, 0, xScale);
  let y = map(yVal, 0, height, yScale, 0);
  let point = {
    x,
    y
  };
  points.push(point);
  linearRegression();
}

function inputPlot() {
  let str = input.value();
  let nums = str.match(r);
  let testFor = str.match(testVal);
  if (nums != null) {
    newPoint(toGraphX(nums[1]), toGraphY(nums[2]));
  }else if(testFor != null){
    if(reliable){
      if(testFor[2] == "x"){
        output.html(testFor[1] * a + b);
      }else{
        output.html((testFor[1] - b)/a);
      }
    }else{
      output.html("Please, add more data on the graph");
    }
  }
}
