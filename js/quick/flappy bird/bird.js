class Bird {
  constructor(x, y, r, jumpSpeed = 20, gravity = 1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.gravity = -gravity;
    this.vel = 0;
    this.acc = 0;
    this.jumpSpeed = jumpSpeed;
  }

  force(strength) {
    this.acc += strength;
  }

  applyGravity() {
    this.force(this.gravity);
  }

  applyForces() {
    this.y -= this.vel;
    this.vel += this.acc;
    this.acc = 0;
  }

  jump() {
    this.force(this.jumpSpeed);
  }

  draw() {
    push();
    fill(150);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    pop();
  }
}