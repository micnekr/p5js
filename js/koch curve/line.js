class Line {
  constructor(x1, y1, x2, y2, pLineX = 0, pLineY = width) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.gradient = (y2-y1)/(x2-x1);
    this.start = [x1, y1];
    this.end = [x2, y2];
    this.cord = [this.start, this.end];
    this.pLineX = pLineX;
    this.pLineY = pLineY;
    this.points();
  }

  draw() {
    line(this.start[0], this.start[1], this.end[0], this.end[1]);
  }

  offScreen(){
    let start = this.start;
    let end = this.end;
    return this.offEdge(start) && this.offEdge(end);
  }

  offEdge(point){
    return point[0] < 0 || point[0] > width || point[1] < 0 || point[1] > height;
  }

  subdivide(){
    let next = [];
    for (var i = 0; i < this.divisionPoints.length - 1; i++) {
      let divP = this.divisionPoints;
      next.push(new Line(divP[i][0], divP[i][1], divP[i + 1][0], divP[i + 1][1], this.lineX, this.lineY));
    }
    return next;
  }

  points() {
    this.divisionPoints = [];
    // add first 2 points
    this.divisionPoints[0] = this.start;
    this.divisionPoints[4] = this.end;
    // 1/3 and 2/3 points
    let x1 = this.x1 + (this.x2 - this.x1) / 3;
    let y1 = this.y1 + (this.y2 - this.y1) / 3;
    let x2 = this.x1 + 2 * (this.x2 - this.x1) / 3
    let y2 = this.y1 + 2 * (this.y2 - this.y1) / 3;
    this.divisionPoints[1] = [x1, y1];
    this.divisionPoints[3] = [x2, y2];
    // last point
    // x and y of the midpoint
    let lineX = (this.x1 + this.x2) / 2;
    let lineY = (this.y1 + this.y2) / 2;
    this.lineX = lineX;
    this.lineY = lineY;
    let gradient = -1/this.gradient;
    // line(lineX, lineY, 1000, 1000*gradient+lineY);
    let d = dist(lineX, lineY, this.divisionPoints[3][0], this.divisionPoints[3][1])*sqrt(3);
    x1 = lineX + d*Math.cos(Math.atan(gradient));
    y1 = lineY + d*Math.sin(Math.atan(gradient));
    x2 = lineX - d*Math.cos(Math.atan(gradient));
    y2 = lineY - d*Math.sin(Math.atan(gradient));
    let dist1 = dist(this.pLineX, this.pLineY, x1, y1);
    let dist2 = dist(this.pLineX, this.pLineY, x2, y2);
    if (dist1>dist2) {
      this.divisionPoints[2] = [x1, y1];
      this.lineX -= d*Math.cos(Math.atan(gradient))/2;
      this.lineY -= d*Math.sin(Math.atan(gradient))/2;
    } else {
      this.divisionPoints[2] = [x2, y2];
      this.lineX += d*Math.cos(Math.atan(gradient))/2;
      this.lineY += d*Math.sin(Math.atan(gradient))/2;
    }
  }
}
// r^2 == x^2 + (x*gr+lineY)^2
