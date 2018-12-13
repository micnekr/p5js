//                                variables
let canvas;
let grid;
let cols = 10;
let rows = 10;
let gameState = 0; //0-playing, 1-died, 2-victory
let openedNum = 0;
let minesNum = 25;


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  grid = new Grid(cols, rows, floor(width / cols), floor(height/rows));
  if (cols * rows > minesNum) {
    let currentMinesNum = 0;
    while (currentMinesNum < minesNum) {
      let currentCell = grid.vals[floor(random(cols))][floor(random(rows))];
      if (!currentCell.isMine) {
        currentCell.isMine = true;
        currentMinesNum++;
      }
    }
  } else {
    console.error("number of mines should be less than number of spots");
  }
  grid.getNeighbours();
}

function draw() {
  if (gameState == 0) {
    //draw
    grid.draw();
  } else if (gameState == 1) {
    background(255, 0, 0, 3);
  } else if (gameState == 2) {
    textSize(64);
    textAlign(CENTER);
    fill(0);
    text("Victory!", height / 2, width / 2);
  }
}

function mousePressed() {
  let clickedCell = grid.getCell(mouseX, mouseY);
  if (clickedCell != undefined) {
    if (mouseButton == RIGHT) {
      clickedCell.mark();
    } else if (clickedCell.isMine) {
      clickedCell.opened = true;
      console.log("Game over");
      grid.open();
      grid.draw();
      gameState = 1;
    } else {
      clickedCell.open();
      if (openedNum == cols * rows - minesNum) {
        grid.open();
        console.log("Victory");
        grid.open();
        grid.draw();
        background(255, 150);
        gameState = 2;
      }
    }
  }
}
