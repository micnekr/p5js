function Spot(x, y, grid) {
  // neighbours array
  this.neighbours = [];
  this.x = x;
  this.y = y;
  this.state = 0;
  this.nextState;
  this.stateColours = [color(0), color(255)];

  this.setup = function () {
    // random state
    if(random(1) < randomFillProb){
      this.state = 1;
    }
    // fill neighbours array
    for (var n = -1; n <= 1; n++) {
      for (var m = -1; m <= 1; m++) {
        // x and y
        let newX = mod(x+n, grid.cols);
        let newY = mod(y+m, grid.rows);
        //if not itself, add to neighbours
        if(!(newX == this.x && newY == this.y)){
          this.neighbours.push(grid.cells[newX][newY]);
        }
      }
    }
  }

  this.draw = function () {
    fill(this.stateColours[this.state]);
    rect(this.x*grid.w, this.y*grid.h, grid.w, grid.h);
  }

  this.decide = function () {
    // count neighbours
    let num = 0;
    for (var neighbour = 0; neighbour < this.neighbours.length; neighbour++) {
      if(this.neighbours[neighbour].state == 1){
        num++;
      }
    }
    // decide
    this.nextState = this.state;
    if(this.state == 0){
      if(ruleB.indexOf(num) != -1){
        this.nextState = 1;
      }
    }else{
      if(ruleS.indexOf(num) == -1){
        this.nextState = 0;
      }
    }
  }

  this.applyState = function () {
    this.state = this.nextState;
  }
}

function mod(a, b) {
  temp = a % b;
  while(temp < 0){
    temp += b;
  }
  return temp;
}
