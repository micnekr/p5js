function Spot(x, y, w, h = w, grid) {
  this.opened = false;
  this.isMine = false;
  this.marked = false;
  this.minesAround = 0;

  // find neighbours
  this.findN = function() {
    this.minesAround = 0;
    for (var n = -1; n <= 1; n++) {
      for (var m = -1; m <= 1; m++) {
        if (grid.isCell(x + n, m + y)) {
          if (grid.vals[x + n][y + m].isMine) {
            this.minesAround++;
          }
        }
      }
    }
  }

  // draw
  this.draw = function() {
    if (this.opened) {
      fill(255);
      rect(x * w, y * h, w, h);
      if(this.minesAround != 0 && !this.isMine){
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.minesAround, x * w + (w / 2), y * h + (h / 2));
      }
      if(this.isMine){
        fill(51);
        ellipse(x*w+w/2, y*h+h/2, w*0.9, h*0.9);
      }
    }else{
      fill(51);
      rect(x * w, y * h, w, h);
      if(this.marked){
        fill(51, 0, 0);
        ellipse(x*w+w/2, y*h+h/2, w*0.9, h*0.9);
      }
    }
  }

  // open cell
  this.open = function () {
    if(!this.opened){
      openedNum++;
    }
    this.opened = true;
    this.marked = false;
    if(this.minesAround == 0){
      for (var n = -1; n <= 1; n++) {
        for (var m = -1; m <= 1; m++) {
          if (grid.isCell(x + n, m + y)) {
            if(!grid.vals[x+n][y+m].opened){
              grid.vals[x+n][y+m].open();
            }
          }
        }
      }
    }
  }

  // mark a cell
  this.mark = function () {
    if(!this.opened){
      this.marked = !this.marked;
    }
  }
}


function Grid(cols, rows, cellW, cellH) {
  this.vals = [];

  // make a new array
  for (var i = 0; i < cols; i++) {
    this.vals[i] = new Array();
  }

  // fill the array
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.vals[i][j] = new Spot(i, j, cellW, cellH, this);
    }
  }

  // check if there is a cell with coordinates
  this.isCell = function(x, y) {
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      return true;
    } else {
      return false
    }
  }

  // calculate all neighbours
  this.getNeighbours = function() {
    // calc neighbours
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.vals[i][j].findN();
      }
    }
  }

  // draw cells
  this.draw = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.vals[i][j].draw();
      }
    }
  }

  // get cell by screen coordinates
  this.getCell = function(x, y) {
    let coordX = floor(x / cellW);
    let coordY = floor(y / cellH);
    if (this.isCell(coordX, coordY)) {
      return this.vals[coordX][coordY];
    }else{
      return undefined;
    }
  }

  // open all cells
  this.open = function () {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.vals[i][j].opened = true;
      }
    }
  }
}
