//                                variables
let canvas;
let bird;
let pipe;


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");

  bird = new Bird(100, 100, 10);
  pipe = new Pipe(100, 10, 100, 100, 200);
}

function draw() {
  background(255);
  bird.applyGravity();
  bird.applyForces();
  // check if bird is colliding with boundries
  if (bird.y <= bird.r || bird.y >= height - bird.r) {
    noLoop();
    if (bird.y <= bird.r) {
      bird.y = bird.r;
    } else {
      bird.y = height - bird.r;
    }
  }
  bird.draw();
  pipe.draw();
}

function keyPressed() {
  bird.jump();
}