//                                variables
let canvas;
let perceptron;
let points = [];
let pointsNum = 500;
let lineSlope;
let lineIntersept;

function setup() {
  lineSlope = random(10, -10);
  lineIntersept = random(1, -1);
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // create n points
  for (var i = 0; i < pointsNum; i++) {
    let point = new Point(lineSlope, lineIntersept);
    points.push(point);
  }
  // create a new perceptron
  perceptron = new Perceptron(2, true);
  perceptron.setup(0.004);
}

function draw() {
  background(51);
  for (var i = 0; i < points.length; i++) {
    points[i].draw();
  }
  for (var i = 0; i < points.length; i++) {
    let inputs = [points[i].x, points[i].y];
    let right = perceptron.train(inputs, points[i].label);
    if (right) {
      fill(0, 255, 0);
    }else{
      fill(255, 0, 0);
    }
    ellipse(points[i].px, points[i].py, 8, 8);
  }
  push();
  stroke(0, 0, 255);
  line(pixelX(-1), pixelY(f(-1, lineSlope, lineIntersept)), pixelX(1), pixelY(f(1, lineSlope, lineIntersept)));
  stroke(0, 255, 255);
  line(pixelX(-1), pixelY(perceptron.guessY(-1)), pixelX(1), pixelY(perceptron.guessY(1)));
  pop();
}
