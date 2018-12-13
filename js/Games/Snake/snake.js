class Snake {
  constructor(grid, headX, headY, direction = [1, 0]) {
    this.headX = headX;
    this.headY = headY;
    this.direction = direction;
    this.extending = false;
    this.spots = [];// the last element is head, the first is tail
    this.head = grid.spots[headX][headY];
    // add head
    this.spots.push(this.head);
  }

  turn(newDir){
    let current = this.direction;
    if (newDir instanceof Array) {
      // do not allow turning back
      if (newDir[0] + current[0] != 0 || newDir[1] + current[1] != 0) {
        this.direction = newDir;
      }
    } else {
      // if passed a number
      let temp;
      if (newDir%2 == 0) {
        temp = [0, (newDir-1)]
      } else {
        temp = [-(newDir-2), 0];
      }
      // do not allow turning back
      if (temp[0] + current[0] != 0 || temp[1] + current[1] != 0) {
        this.direction = temp;
      }
    }
  }

  move(gameOver){
    // find a head
    let head = this.spots[this.spots.length-1];
    let newHead = grid.getCell(head.x + this.direction[0], head.y + this.direction[1]);
    // do not make it a part, so snake does not stop
    this.head = newHead;
    // check if game is over
    for (let part of this.spots) {
      if(part.x == this.head.x && part.y == this.head.y){
        return gameOver();
      }
    }
    // add the head
    this.spots.push(newHead);
    if(!this.extending){
      this.spots.shift();
    }else{
      this.extending = false;
    }
  }

  extend(){
    this.extending = true;
  }

  draw(){
    for (let spotIndex in this.spots) {
      let spot = this.spots[spotIndex];
      // if is head
      if(spotIndex == this.spots.length-1){
        fill(0, 255, 255);
      }else{
        fill(0, 255, 0);
      }
      spot.draw();
    }
  }
}
