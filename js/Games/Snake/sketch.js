//                                variables
let canvas;
let grid;
let snake;
let appleManager;
let score = 0;
const cols = 50;
const rows = 50;
const gameRate = 5;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");

  grid = new Grid(rows, cols, floor(width/cols), floor(height/rows));

  snake = new Snake(grid, 0, 0);

  appleManager = new AppleManager(grid, snake, 2);

  frameRate(gameRate);
}

function draw() {
  background(255);
  fill(51);
  noStroke();
  snake.move(gameOver);
  grid.draw();
  if(appleManager.update() == true){
    snake.extend();
    score++;
  }
  snake.draw();
  textAlign(CENTER, CENTER);
  fill(255);
  text(score, 49*width/50, height/50);
}

function gameOver() {
  return noLoop();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.turn(0);
      break;
    case RIGHT_ARROW:
      snake.turn(1);
      break;
    case DOWN_ARROW:
      snake.turn(2);
      break;
    case LEFT_ARROW:
      snake.turn(3);
      break;
    default:

  }
  return false; // prevent any default behaviour
}
