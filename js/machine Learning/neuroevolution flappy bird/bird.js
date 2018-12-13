class Bird {
  constructor(jumpForce = 1, x=100, circleWidth=30) {
    // physics
    this.y = height / 2;
    this.speed = 0;
    this.acceleration = 0;
    // ga
    this.fitness = 0;
    this.score = 0;
    // if need to copy
    if (jumpForce instanceof Bird) {
      let parent = jumpForce;
      this.x = parent.x;
      // brain
      this.nn = parent.nn.copy();
      // width
      this.width = parent.width;
      // jumpForce
      this.jumpForce = parent.jumpForce;
    }else{
      this.x = x;
      // brain
      this.nn = new NeuralNetwork(nnConfig[0], nnConfig[1], nnConfig[2]);
      // width
      this.width = circleWidth;
      // jumpForce
      this.jumpForce = jumpForce;
    }
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
    this.score += 1;
}

  mutate(mr = 0.1){
    this.nn.mutate(mr);
  }

  decide(nextPipe) {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = nextPipe.x / width;
    inputs[2] = nextPipe.gapY / height;
    inputs[3] = (nextPipe.gapY + nextPipe.gapH) / height;
    inputs[4] = map(this.speed, -5, 5, 0, 1);
    // console.log(inputs);
    let outputs = this.nn.predict(inputs);
    if (outputs[0] > 0.5) {
      this.jump();
      return true;
    } else {
      return false;
    }
  }
}
