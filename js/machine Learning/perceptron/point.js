function Point(a, b) {
  // coordinates
  this.x = random(-1,1);
  this.y = random(-1, 1);
  // inputs
  this.inputs = [this.x, this.y];
  // classification
  let lineY = f(this.x, a, b);
  if(lineY < this.y){
    this.label = 1;
  }else{
    this.label = -1;
  }

  // show
  this.draw = function () {
    push();
    stroke(0);
    if(this.label == 1){
      fill(255);
    }else{
      fill(0);
    }
    this.px = pixelX(this.x);
    this.py = pixelY(this.y);
    ellipse(this.px, this.py, 12, 12);
    pop();
  }
}

function pixelX(x) {
  return map(x, -1, 1, 0, width);
}

function pixelY(y) {
  return map(y, -1, 1, height, 0);
}

function f(x, a, b) {
  return a * x + b;
}
