// number of rows and columns
let cols = 25;
let rows = 25;

// canvas variable
let canvas;
// log
let messageP;
let grid;
// start and end
let start, end;
// width and height
let w, h;
//objects
let pathfinding;
let backtracker;
// settings
let diagonal = true;
let onlyPath = false; // show only path
let pathAsLine = true;
let wallsAsLine = true;
let randomGeneration = false;
function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // setup text display
  messageP = select("#message");
  messageP.html("Calculating...");
  // setup of height of cells
  w = smallestDimension / cols;
  h = smallestDimension / rows;
  // setup the grid
  grid = gridSetup(cols, rows, w, h, wallsAsLine, randomGeneration);
  // set the start and the end of route
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  //make maze algorythm
  backtracker = new mazeCreator(grid);
  backtracker.setTask(start);
  //make A* algorythm
  pathfinding = new aStar(grid, w, h);
  pathfinding.SetTask(start, end, diagonal, solution, noSolution);
}

function draw() {
  background(255);
  pathfinding.draw();
  if (!backtracker.ready) {
     // display text
    messageP.html("Building maze...");
     // make a step of maze generting
    backtracker.backtrackerStep();
     // visualise grid, visited cells and current
    backtracker.draw();
  } else {
    // display text
    messageP.html("Solving maze...");
    // make a step of pathfinding and draw
    pathfinding.aStarStep(onlyPath, pathAsLine, 1);
  }
  drawGrid();
}


function drawGrid() {
  // loops through all cells and draw them
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j].drawCell(255, false, wallsAsLine);
    }
  }
}

function drawCells(arr, color, stroke, wallsAsLine) {
  // loop through all cells in array
  for (i = 0; i < arr.length; i++) {
    arr[i].drawCell(color, stroke, wallsAsLine);
  }
}

function removeFromArray(arr, elt) {
  // loop through all population of array from the end
  for (i = arr.length - 1; i >= 0; i--) {
    // if is the right element, break to optim
    if (arr[i] == elt) {
      arr.splice(i, 1);
      break;
    }
  }
}

function moveBetweenArrays(arr1, arr2, elt) {
  removeFromArray(arr1, elt);
  arr2.push(elt);
}

function noSolution() {
  console.log("No solution");
  messageP.html("No solution");
  noLoop();
}

function solution() {
  console.log("Finished");
  messageP.html("Finished");
  noLoop();
}
