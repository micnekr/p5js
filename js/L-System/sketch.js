//                                variables
let canvas;
let system = new LSystem({
  "F": "FF+[+F-F-F]-[-F+F+F]"
});
const order = 4;
let commands;
let len = 5;
let angleDeg = 25;
let angle;


const funs = {
  "F": () => {
    line(0, 0, 0, -len);
    translate(0, -len);
  },
  "+": () => {
    rotate(angle);
  },
  "-": () => {
    rotate(-angle);
  },
  "[": () => {
    push();
  },
  "]": () => {
    pop();
  }
}


function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension + 1, smallestDimension + 1);
  canvas.parent("canvasContainer");

  angle = radians(angleDeg);

  commands = system.generate("F", order);
}

function draw() {
  background(50);
  stroke(255);
  parse(commands, len);
}

function parse(str, len) {
  resetMatrix();
  translate(width / 2, height);
  for (var i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    funs[ch]();
  }
}