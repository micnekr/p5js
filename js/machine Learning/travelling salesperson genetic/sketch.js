let salespersonGA;
let salesperson;
let pathsProgressOutput;
let cities = [];
let citiesNum = 6;

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
  salespersonGA.Setup(cities, 5);
  salesperson = new salesPerson(height/2);
  salesperson.Setup(cities);
  // select output text
  pathsProgressOutput = select("#pathsOutput");
}

function draw() {
  // clear the background
  background(255);
  if(!salesperson.ready){
    salespersonGA.GAstep();
    salesperson.bruteForceStep();
    let bestDist = min(salesperson.recordDist, salespersonGA.recordDist);
    pathsProgressOutput.html("Checked " + Math.round(salesperson.pathsChecked/salesperson.pathsNum*10000)/100 + "% of all possible paths.<br /> Best distance so far: " + bestDist + ".");
    if(salesperson.recordDist < salespersonGA.recordDist){
      pathsProgressOutput.html("<br /> Lexicographical algorythm is leading!", true);
    }else if(salesperson.recordDist > salespersonGA.recordDist){
      pathsProgressOutput.html("<br /> Genetical algorythm is leading!", true);
    }else{
      pathsProgressOutput.html("<br /> Both algorythms have the same result!", true);
    }
  }else{
    salespersonGA.working = false;
    pathsProgressOutput.html("Finished! The best distance is: " + salesperson.recordDist + ".");
    salespersonGA.draw();
    salesperson.draw();
  }
}
