//                                variables
let canvas;
let curve = [];
let nextStep = [];
let cycles = 6;
let fSize;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  strokeWeight(0.5);
  fSize = width;
}

function draw() {
  background(255);
  curve = [];
  curve.push(new Line(0, height / 2, fSize, height / 2));
  for (var i = 0; i < cycles; i++) {
    divide();
    for (var j = curve.length - 1; j > 0; j--) {
      let kochLine = curve[j];
      if (kochLine.offScreen() == true) {
        curve.splice(j, 1);
      }
    }
  }
  stroke(0);
  for (kochLine of curve) {
    kochLine.draw();
  }
  fSize *= 1.01;
  if (curve.length < 1000) {
    cycles++;
  }
}

function divide() {
  nextStep = [];
  for (kochLine of curve) {
    let newLines = kochLine.subdivide();
    nextStep = nextStep.concat(newLines);
  }
  curve = nextStep.slice();
}
