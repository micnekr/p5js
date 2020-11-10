//                                variables
let canvas;
let balls = [];
const ballsNum = 25;
const maxForce = 10;
const radius = 10;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  for (let i = 0; i < ballsNum; i++) {
    balls[i] = new Ball(random(radius, width - radius), random(radius, height - radius), radius);
    // add a random force
    balls[i].force(random(-maxForce, maxForce), random(-maxForce, maxForce)).update();
  }
}

function draw() {
  background(200);
  for (i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.update();
    bounceOfWalls(ball);
    // bounce of other balls
    for (let j = i + 1; j < balls.length; j++) {
      let ball2 = balls[j];
      ball.collideWithBall(ball2);
      console.log("e")
    }
    ball.draw();
  }
}

function bounceOfWalls(ball) {
  // if over left boundry
  if (ball.x - ball.r <= 0 || ball.x + ball.r >= width) {
    ball.vel[0] *= -1;
  } else if (ball.y - ball.r <= 0 || ball.y + ball.r >= height) {
    ball.vel[1] *= -1;
  }
}