//                                variables
let canvas;
let gridObj;
let grid;
let button;
let simulate = false;
let drawColour = 1;
let drawPaused = false;
//                                 settings
let ruleB = [3];
let ruleS = [2, 3];
let cols = 50;
let rows = 50;
let randomFillProb = 0;
let speed = 0;


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // button
  button = select("#on/off");
  button.mousePressed(switchSim);
  // new Grid
  gridObj = new Grid(cols, rows);
  // grid = gridObj.cells;
  gridObj.draw();
}

function draw() {
  if(simulate && !drawPaused){
    background(255);
    gridObj.lifeStep();
  }
  if(mouseIsPressed){
    frameRate(60);
    drawPaused = true;
    let coord = gridObj.mouseCoordinates();
    if(coord != -1){
      let selected = gridObj.cells[coord[0]][coord[1]];
      selected.state = drawColour;
      gridObj.draw();
    }
  }else{
    drawPaused = false;
    if(speed != 0){
      frameRate(speed);
    }
  }
}

function switchSim() {
  if(simulate){
    gridObj.draw();
    button.html("Start");
  }else{
    button.html("Stop");
  }
  simulate = !simulate;
}

function keyPressed() {
  drawColour = 1-drawColour;
}
