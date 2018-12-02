function Grid(cols, rows) {
  // cells array
  this.cells = new Array(cols);
  this.cols = cols;
  this.rows = rows;
  // make a 2D array
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i] = new Array(rows);
  }
  // fill with spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.cells[i][j] = new Spot(i, j, this);
    }
  }
  // setup all spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.cells[i][j].setup();
    }
  }
  // find width and height of a cell
  this.w = (width)/this.cols;
  this.h = (height)/this.rows;

  this.draw = function () {
    push();
    stroke(100);
    strokeWeight(0.5);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.cells[i][j].draw();
      }
    }
    pop();
  }

  this.calcCells = function () {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.cells[i][j].decide();
      }
    }
  }

  this.cellsApply = function () {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        this.cells[i][j].applyState();
      }
    }
  }

  this.lifeStep = function () {
    this.calcCells();
    this.cellsApply();
    this.draw();
  }

  this.mouseCoordinates = function () {
    let xCoordinate = floor(mouseX/this.w);
    let yCoordinate = floor(mouseY/this.h);
    if(this.cells[xCoordinate] == undefined || this.cells[0][yCoordinate] == undefined){
      return -1;
    }
    return [xCoordinate, yCoordinate];
  }
}
