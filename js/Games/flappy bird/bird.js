class Bird {
  constructor(jumpForce = 1, x = 100, circleWidth = 30) {
    // physics
    this.y = height / 2;
    this.speed = 0;
    this.acceleration = 0;
    // if need to copy
    this.x = x;
    // width
    this.width = circleWidth;
    // jumpForce
    this.jumpForce = jumpForce;
  }

  jump() {
    this.applyForce(-this.jumpForce);
  }

  gravity(gConst) {
    this.applyForce(gConst);
  }

  applyForce(force) {
    this.acceleration += force;
  }

  draw() {
    fill(150, 100);
    ellipse(this.x, this.y, this.width, this.width);
  }

  update() {
    this.speed += this.acceleration;
    this.y += this.speed;
    this.acceleration = 0;
  }
}
