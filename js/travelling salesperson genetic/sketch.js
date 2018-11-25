let salespersonGA;
let salesperson;
let pathsProgressOutput;
let cities = [];
let citiesNum = 10;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 200, windowHeight - 200);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // fill a cities array
  for (k = 0; k < citiesNum; k++) {
    cities[k] = createVector(random(width), random(height/2));
  }
  // make a new travelling salesperson solver
  salespersonGA = new salesPersonGA();
  salespersonGA.Setup(cities, 300);
  salesperson = new salesPerson(height/2);
  salesperson.Setup(cities);
  // select output text
  pathsProgressOutput = select("#pathsOutput");
}

function draw() {
  // clear the background
  background(255);
  salespersonGA.GAstep();
  if(!salesperson.ready){
    salesperson.bruteForceStep();
    pathsProgressOutput.html("Checked " + Math.round(salesperson.pathsChecked/salesperson.pathsNum*10000)/100 + "% of all possible paths.<br /> Best distance so far: " + salesperson.recordDist + ".");
  }else{
    pathsProgressOutput.html("Finished! The best distance is :" + salesperson.recordDist + ".");
    salesperson.draw();
  }
}
