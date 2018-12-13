class Spot {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isApple = false;
  }

  draw(){
    if(this.isApple){
      push();
      fill(255, 0, 0);
      rect(this.x * this.w, this.y*this.h, this.w, this.h);
      pop();
    }else {
      rect(this.x * this.w, this.y*this.h, this.w, this.h);
    }
  }
}

class Grid {
  constructor(rows, cols, w, h = w) {
    this.spots = [];
    this.rows = rows;
    this.cols = cols;
    this.w = w;
    this.h = h;
    // 2d array of spots
    for (var i = 0; i < this.cols; i++) {
      this.spots[i] = [];
    }
    // fill with cells
    this.map((spot, x, y) => {
      let newSpot = new Spot(x, y, w, h);
      return newSpot;
    })
  }

  draw(){
    this.loopThrough((spot, x, y) => {
      spot.draw();
    })
  }

  map(fun) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.spots[i][j] = fun(this.spots[i][j], i, j);
      }
    }
  }

  loopThrough(fun) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        fun(this.spots[i][j], i, j);
      }
    }
  }

  getCell(x, y){
    let neededX = mod(x, this.cols);
    let neededY = mod(y, this.rows);
    return this.spots[neededX][neededY];
  }
}

function mod(a, b) {
  let c = a % b;
  while (c < 0) {
    c += b;
  }
  return c;
}
