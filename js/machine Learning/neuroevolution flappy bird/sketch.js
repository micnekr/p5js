//                                variables
let canvas;
let randomPicker;
let pipes = [];
let birds = [];
let birdsHistory = [];
let slider;
let pipeFrame = 0;
let cycles = 1;

const pipeRate = 70;
const birdsNum = 350;
const mutationRate = 0.1;
const nnConfig = [5, 8, 1];
const birdJump = 15;
const gravity = 1;


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
  // setup
  randomPicker = new poolSelection();
  slider = document.getElementById("myRange");

  // add birds to population
  for (var i = 0; i < birdsNum; i++) {
    bird = new Bird(birdJump, width / 3, width/10);
    birds.push(bird);
  }
}

function draw() {
  for (var cycle = 0; cycle < cycles; cycle++) {
    // PIPES




    // add pipes every pipeRate seconds
    if (pipeFrame % pipeRate == 0) {
      pipes.push(new Pipe(4, 30))
    }

    // foreach pipe
    let nextPipe;
    let pipesToSlice = [];
    for (i = 0; i < pipes.length; i++) {
      let pipe = pipes[i];
      // discard a pipe if out of boundries
      if (pipe.offScreen) {
        pipesToSlice.push(i);
      }else{
        // move and draw
        pipe.update();
        //get the nearest pipe
        if (nextPipe == undefined && birds.length != 0) {
          if (birds[0].x < pipe.x + pipe.width) {
            nextPipe = pipe;
          }
        }
        // check if colliding with any birds
        for (var birdIndex in birds) {
          let bird = birds[birdIndex];
          let touches = pipe.collides(bird);
          if (touches == true) {
            birdsHistory.push(birds.splice(birdIndex, 1)[0]);
          }
        }
      }
    }
    for (var i = 0; i < pipesToSlice.length; i++) {
      pipes.splice(pipesToSlice[i], 1);
    }
    console.log(nextPipe);
    // if no next pipes, create a new
    if (nextPipe == undefined) {
      nextPipe = new Pipe(4, 30, 100, 300);
      pipes.push(nextPipe);
    }
    // BIRDS




    for (var birdIndex in birds) {
      // add gravity, make a descision, apply update
      let bird = birds[birdIndex];
      bird.gravity(gravity);
      bird.decide(nextPipe);
      bird.update();
      // discard if out of boundries
      if (bird.y < 0 || bird.y > height) {
        birdsHistory.push(birds.splice(birdIndex, 1)[0]);
      }
    }
    if (birds.length == 0) {
      nextGen();
      // restart pipes
      pipes = [];
      pipeFrame = 0;
    }
    pipeFrame++;
  }

  // draw

  // erase background
  background(51);
  // draw pipes and birds
  for (var pipe in pipes) {
    pipes[pipe].draw();
  }
  for (var bird in birds) {
    birds[bird].draw();
  }
}

function sliderMoved() {
  cycles = slider.value;
}
