class AppleManager {
  constructor(grid, snake, applesNum=1, spaceFilled = ()=>{noLoop();console.log("No space left");return;}) {
    this.snake = snake;
    this.grid = grid;
    this.apples = [];
    this.spaceFilledFun = spaceFilled;
    for (var i = 0; i < applesNum; i++) {
      this.apples[i] = this.pickApple();
      // if no space left
      if(this.apples[i] == undefined){return;}
      this.apples[i].isApple = true;
    }
  }

  pickApple(){
    if(grid.rows*grid.cols > snake.spots.length + this.apples.length){
      let tempSpot = this.random();
      while (!(!tempSpot.isApple && !this.snake.spots.includes(tempSpot))) {
        tempSpot = this.random();
      }
      return tempSpot;
    }
    else {
      this.spaceFilledFun();
      return undefined;
    }
  }

  random(){
    return grid.spots[floor(random(grid.cols))][floor(random(grid.rows))]
  }

  update(){
    let head = this.snake.head;
    for (let appleIndex in this.apples) {
      let apple = this.apples[appleIndex];
      if(head.x == apple.x && head.y == apple.y){
        this.apples[appleIndex].isApple = false;
        this.apples[appleIndex] = this.pickApple();
        // if no space left
        if(this.apples[appleIndex] == undefined){return;}
        this.apples[appleIndex].isApple = true;
        this.apples[appleIndex].draw();
        return true;
      }
    }
  }
}
