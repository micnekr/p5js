//                                variables
let learningRate = 0.2;

let modelFiles = [];
let outP;
let r, g, b;
let training = false;
let guessedLabel;
let trainingLog;
let canvas;
let filesInput = [];
let trainingData = {};
let testingData = {};
let labelList = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish'
]
let nn = tf.sequential();
let h1 = tf.layers.dense({
  inputShape: [3],
  units: 16,
  activation: 'sigmoid'
});
let outputL = tf.layers.dense({
  units: 9,
  activation: 'softmax'
});

function preload() {
  trainingData = loadJSON("formated.json");
}

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  outP = select("#outP");
  let saveButton = select("#saveButton");
  saveButton.mousePressed(saveModel);
  let loadButton = select("#loadButton");
  loadButton.mousePressed(() => {
    if(filesInput[0].files.length == 1 && filesInput[1].files.length == 1){
      tf.loadModel(tf.io.browserFiles([filesInput[0].files[0], filesInput[1].files[0]]))
      .then((model) => {
        console.log("Model loaded");
        nn = model;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });
  let trainButton = select("#trainButton");
  trainButton.mousePressed(() => {
    outP.html("Training...");
    console.log("Training...");
    train().then((r)=>{
      randomColour();
      // console.log(r.history.loss);
    });
  });


  filesInput[0] = document.getElementById('jsonFile');
  filesInput[1] = document.getElementById('binFile');

  nn.add(h1);
  nn.add(outputL);
  nn.compile({
    loss: 'categoricalCrossentropy',
    optimizer: tf.train.adam(learningRate)
  });

  textAlign(CENTER);
  randomColour();
}
let x = 0
function draw() {
  if(training){
    background(255);
    if(trainingLog != undefined){
      outP.html("Training, loss is " + trainingLog);
    }else{
      outP.html("Training...");
    }
    line(x, 100, 0, 100);
    x++;
    if(x>=width){
      x = 0;
    }
  }else{
    background(r, g, b);
    outP.html("The predicted colour name is  " + guessedLabel);
  }
}




async function train() {
  let colours = tf.tensor2d(trainingData.colours);
  let labels = tf.tensor2d(trainingData.labels);
  console.log(tf.memory().numTensors);
  training = true;
  let result = await nn.fit(colours, labels, {
    shuffle:true,
    validationSplit: 0.1,
    epochs:2,
    callbacks:{
      onEpochEnd:(num, log) =>{
        console.log("Loss:" + log.val_loss);
        // console.log(log);
        trainingLog = log.val_loss;
      }
    }
  });
  training = false;
  console.log(tf.memory().numTensors);
  return result;
}

function mousePressed() {
  randomColour();
}

function randomColour() {
  r = random(255);
  g = random(255);
  b = random(255);
  background(r, g, b);
  guessedLabel = guess();
}

function guess() {
  let input = tf.tensor2d([[r/255, g/255, b/255]]);
  let output = nn.predict(input);
  // output.print();
  let results = output.argMax(1);
  let index = results.dataSync()[0];
  // console.log(results);
  input.dispose();
  output.dispose();
  results.dispose();
  return labelList[index];
}

function saveModel() {
  nn.save('downloads://my-model-1');
}
