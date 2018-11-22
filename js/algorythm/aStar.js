function aStar(grid, w, h) {
  // set constant variables
  this.grid = grid;
  this.openSet = [];
  this.closedSet = [];
  this.path = [];
  this.w = w;
  this.h = h;
  // stop task
  this.searching = false;
  this.SetTask = function(start, end, allowDiagonals, sol, noSol) {
    // set start and end
    this.start = start;
    this.end = end;
    // set callbacks
    this.sol = sol;
    this.noSol = noSol;
    //empty openSet, closedSet, path
    this.openSet = [];
    this.closedSet = [];
    this.path = [];
    // set diagonals boolean
    this.allowDiagonals = allowDiagonals;
    // make start and end not walls
    start.isWall = false;
    end.isWall = false;
    // put start to openSet
    this.openSet.push(start);
    // start task
    this.searching = true;
  }
  this.aStarStep = function(onlyPath, pathAsLine) {
    let result = this.algorythm();
    this.draw(onlyPath, pathAsLine);
    return result;
  }
  this.aStarResult = function() {
    let result = 0;
    while(result == 0){
      result = this.algorythm(false);
    }
    return result;
  }
  this.calcPath = function(current) {
    // new array
    let path = [];
    let temp = current;
    // push previous in array until there is no previous left
    while (temp) {
      path.push(temp);
      temp = temp.previous;
    }
    return path;
  }
  this.Heuristic = function(a, b, multiplier = 0) {
    // heuristic
    let d;
    // choose right heuristic and apply it
    if (this.allowDiagonals) {
      // pythagorian distance
      d = dist(a.x, a.y, b.x, b.y);
    } else {
      // manhatton distance
      d = abs(a.x - b.x) + abs(a.y - b.y);
    }
    return d*multiplier;
  }
  this.algorythm = function(showCalc = true, heuristic = 1) {
    // if openset is not empty
    if (this.openSet.length > 0) {
      // this.searching for lowest f
      let lowerIndex = 0;
      for (i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[lowerIndex].f) {
          lowerIndex = i;
        }
      }
      let current = this.openSet[lowerIndex];
      // move current cell into closed set
      moveBetweenArrays(this.openSet, this.closedSet, current);
      // stop if reached the end
      if (current == this.end) {
        // stop task
        this.searching = false;
        // calculate path
        this.path = this.calcPath(current);
        // callback
        this.sol();
        // return result
        return this.path;
      }
      //foreach neighbor
      let neighbors = current.getNeighbors();
      for (i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        //if was not evaluated
        if (!this.closedSet.includes(neighbor)) {
          // update tempG
          let tempG = current.g + 1;
          // is not new path
          let isNewPath = false;
          // if is already in openSet
          if (this.openSet.includes(neighbor)) {
            // check if it is a more efficient way
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              isNewPath = true;
            }
          } else {
            // is new cell in openset
            // set g
            neighbor.g = tempG;
            // if not in openSet, add it
            this.openSet.push(neighbor);
            // is new path
            isNewPath = true;
          }
          // if was not evaluated before, set h, f and previous
          if (isNewPath) {
            neighbor.h = this.Heuristic(neighbor, this.end, heuristic);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
      // if need results
      if(showCalc){
        this.path = this.calcPath(current);
      }
      // return 0 if not finished
      return 0;
    } else {
      // no solution
      // stop searching
      this.searching = false;
      // empty the path
      this.path = [];
      // no solution callback
      this.noSol();
      return null;
    }
  }
  this.draw = function(onlyPath = true, pathAsLine = true) {
    // draw openSet and closedSet
    if (!onlyPath) {
      // openSet cells
      this.drawCells(this.openSet, color(0, 255, 0), false, false);
      // closedSet cells
      this.drawCells(this.closedSet, color(255, 0, 0), false, false);
    }
    // if path is line, draw line. if path is not a line, drawCell
    if (pathAsLine) {
      noFill(); // shape is recognised as shape, but not as line
      stroke(255, 0, 200);
      strokeWeight((this.w + this.h) / 4);
      // remember vertices
      beginShape();
      for (i = 0; i < this.path.length; i++) {
        vertex(this.path[i].x * this.w + this.w / 2, this.path[i].y * this.h + this.h / 2);
      }
      endShape();
    } else {
      this.drawCells(this.path, color(255, 0, 200), false, false);
    }
  }
  this.drawCells = function(arr, color, stroke, wallsAsLine) {
    // loop through all cells in array
    for (i = 0; i < arr.length; i++) {
      arr[i].drawCell(color, stroke, wallsAsLine);
    }
  }
}
