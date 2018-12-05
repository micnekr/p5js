//                                variables
let data;
let trainingData = {};
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
let template = [];

function preload() {
  data = loadJSON("colorData.json");
}

function setup() {
  // regroup data
  prepareData();
}

//DATA PREPARATION


function prepareData() {
  for (var i = 0; i < labelList.length; i++) {
    template.push(0);
  }
  trainingData.colours = [];
  trainingData.labels = [];
  for (var i = 0; i < data.entries.length; i++) {
    let colours = [];
    let userData = data.entries[i];
    colours.push(userData.r/255);
    colours.push(userData.g/255);
    colours.push(userData.b/255);
    trainingData.colours.push(colours);
    let index = labelList.indexOf(userData.label);
    let lbl = template.slice();
    lbl[index] = 1;
    trainingData.labels.push(lbl);
  }
  saveJSON(trainingData, "formated.json");
  // console.log(trainingData);
}
