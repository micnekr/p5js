function Pipe(speed, pWidth, minGap = 200, maxGap = 400) {
  this.x = width;
  this.width = pWidth;
  this.offScreen = false;
  this.gapY = random(0, height - maxGap);
  this.gapH = random(minGap, maxGap);
  this.passed = false;

  this.update = function () {
    this.x -= speed;
    if(this.x + pWidth <= 0){
      this.offScreen = true;
    }
  }

  this.draw = function () {
    fill(255);
    rect(this.x, 0, pWidth, this.gapY);
    rect(this.x, this.gapY + this.gapH, pWidth, height);
  }

  this.collides = function (obj) {
    let width = obj.width/2;
    if(obj.x + width >= this.x && obj.x - width <= this.x + pWidth){
      if(obj.y + width > this.gapH + this.gapY || obj.y - width < this.gapY){
        return true;
      }else{
        if(!this.passed){
          this.passed = true;
          return false;
        }
      }
    }
  }
}
