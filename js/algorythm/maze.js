function mazeCreator(grid) {
  this.current;
  this.ready = true;
  this.stack = [];
  this.visitedCells = 0;
  this.setTask = function(start) {
    // set ready variable to false(task has started)
    this.current = start;
    // mark it as visited
    start.mazeVisited = true;

    this.ready = false;
    //empty the stack
    this.stack = [];
    // set visited cells to 0
    this.visitedCells = 0;
  }
  this.backtrackerStep = function() {
    this.algorythm();
    this.draw();
  }
  this.backtrackerResult = function() {
    while(!backtracker.ready){
      this.algorythm();
    }
  }
  this.draw = function(){
    // loop through all cells and draw visited by mase
    for (i = 0; i < cols; i++) {
      for (j = 0; j < rows; j++) {
        if (grid[i][j].mazeVisited) {
          grid[i][j].drawCell(color(255, 0, 255, ), false, false);
        }
      }
    }
    // draw current
    this.current.drawCell(color(0, 255, 0), false, false);
  }
  this.algorythm = function() {
    // if there are cells left
    if (this.visitedCells < grid[0].length * grid.length - 1) {
      // Step 1
      // choose random neighbor and remove the walls
      let next = this.current.maseNeighbor();
      // if there are neighbors
      if (next) {
        // add a visited cell
        this.visitedCells++;
        // Step 2
        // push current to stack
        this.stack.push(this.current);
        // Step 4
        //set current to next
        this.current = next;
        this.current.mazeVisited = true;
        // else if there are elements in stack
      } else if (this.stack.length > 0) {
        // get the last element from stack and delete interval
        //also, set current to this value
        this.current = this.stack.pop();
      }
      // if finished
    } else {
      // set ready variable to true
      this.ready = true;
    }
  }
}
