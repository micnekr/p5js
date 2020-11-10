function Ball(x, y, r, m = 1) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.m = m;
  this.vel = [0, 0];
  this.acc = [0, 0];
  this.wasCollidingLastFrame = false;

  this.update = function() {
    this.x += this.vel[0];
    this.y += this.vel[1];

    for (let i = 0; i < 2; i++) {
      this.vel[i] += this.acc[i];
    }

    this.acc = [0, 0];

    return this;
  }

  this.force = function(x, y) {
    let force;
    if (typeof(x) == "object") {
      force = x;
    } else {
      force = [x, y];
    }

    // add each coordiante
    for (let i = 0; i < 2; i++) {
      this.acc[i] += force[i] / this.m;
    }

    return this;
  }

  this.collideWithBall = function(ball) {
    let dist = sqrt(pow(this.x - ball.x, 2) + pow(this.y - ball.y, 2));
    if (dist <= this.r + ball.r) {
      if (this.wasCollidingLastFrame && ball.wasCollidingLastFrame) {
        return;
      }
      this.wasCollidingLastFrame = true;
      ball.wasCollidingLastFrame = true;
      for (var i = 0; i < 2; i++) {
        let v1 = this.vel[i];
        let v2 = ball.vel[i];
        let m1 = this.m;
        let m2 = ball.m;
        ball.vel[i] = v1 * (2 * m1) / (m1 + m2) - v2 * (m1 - m2) / (m1 + m2);
        this.vel[i] = v1 * (m1 - m2) / (m1 + m2) + v2 * (2 * m2) / (m1 + m2);
      }
    } else {
      this.wasCollidingLastFrame = false;
    }
  }

  this.draw = function() {
    push();
    fill(100);
    stroke(0);
    strokeWeight(1);
    // -1 to account for stroke width
    ellipse(this.x, this.y, 2 * this.r - 1, 2 * this.r - 1);
    pop();
  }
}