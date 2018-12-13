//                                variables
let canvas;
let nn;
let trainingData = [{
  inputs: [0, 0],
  targets: [0]
}, {
  inputs: [1, 0],
  targets: [1]
}, {
  inputs: [0, 1],
  targets: [1]
}, {
  inputs: [1, 1],
  targets: [0]
}];

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // create a new Neural Network!
  nn = new NeuralNetwork(2, 4, 1);
}

function draw() {
  background(51);
  for (var i = 0; i < 500; i++) {
    let data = random(trainingData);
    nn.train(data.inputs, data.targets);
  }

  let resolution = 10;
  let cols = width/resolution;
  let rows = height/resolution;

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x1 = i/cols;
      let x2 = j/rows;

      let inputs = [x1, x2];
      noStroke();
      fill(nn.predict(inputs) * 255);
      rect(i*resolution, j*resolution, resolution, resolution);
    }
  }
}
