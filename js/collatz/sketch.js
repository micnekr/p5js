//                                variables
let canvas;
let max = 100000;
let current = 1;
let speed = 200;
let nums = {};


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");
}

function draw() {
  for (var i = 0; i < speed; i++) {
    if (max < current) {
      current = 1;
      nums = {};
      background(255);
      return
    }
    iterations = addNumber(current, nums);
    point(map(current, 0, max, 0, width), map(iterations, 0, 400, height, 0))
    current++;
  }
}

function addNumber(num, previous) {
  previous = previous || {}
  if (previous[num]) {
    return previous[num]
  }
  if (num == 1) {
    return 0
  }

  let iterations = 0
  if (num % 2 == 0) {
    iterations = addNumber(num / 2, previous) + 1
  } else {
    iterations = addNumber((3 * num + 1) / 2, previous) + 2
  }
  previous[num] = iterations
  return iterations
}