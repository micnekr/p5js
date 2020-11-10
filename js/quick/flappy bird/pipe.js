class Pipe {
  constructor(x, w, minGap, maxGap) {
    this.x = x;
    this.w = w;
    this.gap = random(minGap, maxGap);
    this.y1 = random(height - this.gap);
  }

  draw() {
    push();
    fill(150);
    rect(this.x, 0, this.w, this.y1);
    rect(this.x, this.gap + this.y1, this.w, height)
    pop();
  }
}