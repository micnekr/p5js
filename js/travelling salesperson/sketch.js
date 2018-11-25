let salesperson;
let pathsProgressOutput;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 200, windowHeight - 200);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // make a new travelling salesperson solver
  salesperson = new salesPerson(width, height);
  salesperson.Setup(6);
  // select output text
  pathsProgressOutput = select("#pathsOutput");
}

function draw() {
  if(!salesperson.ready){
    // clear the background
    background(255);
    salesperson.bruteForceStep();
    pathsProgressOutput.html("Checked " + Math.round(salesperson.pathsChecked/salesperson.pathsNum*10000)/100 + "% of all possible paths.<br /> Best distance so far: " + salesperson.recordDist + ".");
  }else{
    pathsProgressOutput.html("Finished! The best distance is :" + salesperson.recordDist + ".");
  }
}
