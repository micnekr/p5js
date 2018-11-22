let salesperson;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // make a new travelling salesperson solver
  salesperson = new salesPerson(width, height);
  salesperson.Setup(5);
}

function draw() {
  if(!salesperson.ready){
    salesperson.bruteForceStep();
  }
}
