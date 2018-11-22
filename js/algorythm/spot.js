function Spot(x, y, w, h, grid, wallsAsLine, randomGeneration) {
  //x and y
  this.x = x;
  this.y = y;
  //g, h and f scores
  this.f = 0;
  this.g = 0;
  this.h = 0;
  // is visited by maze
  this.mazeVisited = false;
  // which grid are we using
  this.grid = grid;
  //what is the previous cell
  this.previous;
  // neighbors
  this.neighbors = undefined;
  // walls
  this.walls = [this.top = true, this.right = true, this.bottom = true, this.left = true];
  this.isWall = false;
  // if needed,  generate walls
  if(randomGeneration){
    if (!wallsAsLine) {
      if (random(1) < 0.4) {
        this.isWall = true;
      }
    }else{
      for(k = 0; k < 4; k++){
        if(random(1) < 0.60){
          this.walls[k] = false;
        }
      }
    }
  }
  this.drawCell = function(color, cellStroke, wallsAsLine) {
    // create x and y
    let x = this.x * w;
    let y = this.y * h;
    // array of walls positions
    let walls = [
      [x, y, x + w, y],
      [x + w, y, x + w, y + h],
      [x + w, y + h, x, y + h],
      [x, y + h, x, y]
    ];
    if (wallsAsLine) {
      // if walls as line
      // set stroke
      strokeWeight(1);
      stroke(0);
      // draw walls
      if (this.walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + h);
      }
      if (this.walls[2]) {
        line(x + w, y + h, x, y + h);
      }
      if (this.walls[3]) {
        line(x, y + h, x, y);
      }
    } else {
      // set stroke
      if (cellStroke) {
        stroke(0);
      } else {
        noStroke();
      }
      // if is wall, change color
      if (this.isWall) {
        color = 0;
      }
      // draw
      fill(color);
      rect(x, y, w, h);
    }
  }
  this.maseNeighbor = function() {
    // vertical and horisontal neighbors
    let lineMoves = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];
    // array of neighbors
    let mazeNeighbors = [];
    // choose all unvisited cells posiible
    for (j = 0; j < 4; j++) {
      let neighbor = this.getCell(x + lineMoves[j][0], y + lineMoves[j][1]);
      if (neighbor != null && !neighbor.mazeVisited) {
        mazeNeighbors.push(neighbor);
      }
    }
    // if ther are neighbors
    if(mazeNeighbors.length>0){
      // chose a random neighbor
      let chosen = mazeNeighbors[floor(random(0, mazeNeighbors.length))];
      // choose walls
      let wall;
      if(chosen.x == this.x){
        switch (chosen.y - this.y) {
          case 1:
            wall = 2;
            break;
          case -1:
          wall = 0;
          break;
        }
      }else{
        switch (chosen.x - this.x) {
          case 1:
            wall = 1;
            break;
          case -1:
          wall = 3;
          break;
        }
      }
      // remove walls
      this.walls[wall] = false;
      chosen.walls[(wall+2)%4] = false;
      return chosen;
    }else{
      // if no neighbors, return null
      return null;
    }
  }
  this.getNeighbors = function() {
    // if no neighbors
    if (!this.neighbors) {
      // calculate neighbors
      this.addNeighbors();
    }
    // return the result
    return this.neighbors;
  }
  this.addNeighbors = function() {
    // x and y
    let x = this.x;
    let y = this.y;
    // neighbors array
    this.neighbors = [];
    // moores neighborhoods
    let lineMoves = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];
    let diagonalMoves = [
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1]
    ];
    // make horisontal and vertical neighbors
    if (wallsAsLine) {
      for (j = 0; j < 4; j++) {
        let neighbor = this.getCell(x + lineMoves[j][0], y + lineMoves[j][1]);
        if (neighbor != null && this.walls[j] != true && neighbor.walls[(j + 2) % 4] != true) {
          this.neighbors.push(neighbor);
        }
      }
    } else {
      for (j = 0; j < 4; j++) {
        let neighbor = this.getCell(x + lineMoves[j][0], y + lineMoves[j][1]);
        if (neighbor != null && !neighbor.isWall) {
          this.neighbors.push(neighbor);
        }
      }
    }
    // create diagonal neighbors
    if (diagonal) {
      if (wallsAsLine) {
        for (j = 0; j < 4; j++) {
          let neighbor = this.getCell(x + diagonalMoves[j][0], y + diagonalMoves[j][1]);
          if (neighbor != null && !(this.isCorner(this, neighbor, j)) && !(this.isCorner(neighbor, this, j + 2))) {
            this.neighbors.push(neighbor);
          }
        }
      } else {
        for (j = 0; j < 4; j++) {
          let neighbor = this.getCell(x + diagonalMoves[j][0], y + diagonalMoves[j][1]);
          if (neighbor != null && !neighbor.isWall && !grid[neighbor.x][this.y].isWall && !grid[this.x][neighbor.y].isWall) {
            this.neighbors.push(neighbor);
          }
        }
      }
    }
  }
  this.getCell = function(x, y) {
    // if out of bounds
    if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
      return null;
    } else {
      return this.grid[x][y];
    }
  }
  this.thisOrNeighbor = function(cell1, cell2, wall) {
    return cell1.walls[wall % 4] || cell2.walls[(wall + 2) % 4];
  }//returns statement showing if a wall exists
  this.isCorner = function(cell1, cell2, j) {
    if ((cell2.x - cell1.x) + (cell2.y - cell1.y) == 0) {

    } else {
      return this.thisOrNeighbor(cell1, grid[cell2.x][cell1.y], j) || this.thisOrNeighbor(cell1, grid[cell1.x][cell2.y], j + 1);
    }
    return this.thisOrNeighbor(cell1, grid[cell2.x][cell1.y], j + 1) || this.thisOrNeighbor(cell1, grid[cell1.x][cell2.y], j);
  }// returns if there is a corner
}
