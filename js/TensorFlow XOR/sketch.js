//                                variables
let canvas;
let nn;
let inputs = [];
let resolution = 20;
let cols, rows;
let inVals;

let xs = tf.tensor2d([
  [1, 1],
  [1, 0],
  [0, 1],
  [0, 0]
]);
let ys = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
]);

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // create a new Neural Network!
  nn = tf.sequential();
  let hiddenL = tf.layers.dense({
    inputShape: [2],
    units: 4,
    activation: 'sigmoid'
  });
  let outputL = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  });
  nn.add(hiddenL);
  nn.add(outputL);
  nn.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(0.2)
  });
  cols = floor(width/resolution);
  rows = floor(height/resolution);
  // record input data
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x1 = i/cols;
      let x2 = j/rows;
      inputs.push([x1, x2]);
    }
  }
  inVals = tf.tensor2d(inputs);
  train();
}

function draw() {
  background(51);
  // predicting
  let prediction = nn.predict(inVals);
  let output = prediction.dataSync();
  // noStroke();
  prediction.dispose();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      fill(output[j*cols+i]*255);
      rect(i*resolution, j*resolution, resolution, resolution);
    }
  }
}

async function train() {
  let r = await nn.fit(xs, ys, {
    shuffle: true,
  });
  // console.log(r.history.loss[0]);
  train();
}
