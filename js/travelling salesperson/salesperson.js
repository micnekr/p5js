function salesPerson(width, height) {
  // points is an array
  this.points = [];
  // make array of lexicographical numbers
  this.order = [];
  // number of completed paths
  this.pathsChecked;
  // setup
  this.Setup = function(numberOfPoints) {
    // make array of lexicographical numbers
    this.order = [];
    // set checked paths variable to 0
    this.pathsChecked = 0;
    // add random points
    for (k = 0; k < numberOfPoints; k++) {
      this.points[k] = createVector(random(width), random(height));
      // add number to lexicographical array
      this.order[k] = k;
    }
    // set record distance and record path to initial values
    this.recordDist = this.distance(this.points);
    this.recordPath = this.points.slice();
    // calculate all possible paths
    this.totalPathsNumber();
    // start the programm
    this.ready = false;
  }
  this.draw = function() {
    // set fill
    fill(0);
    // draw all points
    for (i = 0; i < this.points.length; i++) {
      ellipse(points[i].x, points[i].y, 4, 4);
    }
    // disable fill and set stroke color
    noFill();
    stroke(0);
    if(!this.ready){
      // connect points
      beginShape();
      for (i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y);
      }
      endShape();
    }
    // draw the best attempt
    stroke(255, 0, 0);
    beginShape();
    for (i = 0; i < this.recordPath.length; i++) {
      vertex(this.recordPath[i].x, this.recordPath[i].y);
    }
    endShape();
  }
  this.bruteForceStep = function() {
    this.algorythm();
    // refresh picture
    this.draw();
    // add one to paths counter
    this.pathsChecked++;
  }
  this.bruteForceResult = function() {
    while(!this.ready){
      this.algorythm();
    }
    return this.recordPath;
  }
  this.algorythm = function() {
    // next trial
    let order = this.lexicographic();
    if(order == null){
      this.ready = true;
      return;
    }
    order = order.slice();
    points = [];
    for(j = 0; j < order.length; j++){
      points[j] = this.points[order[j]];
    }
    // calculate total distance
    let d = this.distance(points);
    // if the result is the best
    if (this.recordDist > d) {
      // save the result
      this.recordDist = d;
      console.log("The best so far: " + this.recordDist);
      // copy array, save the best path
      this.recordPath = points.slice();
    }
    return this.recordPath;
  }
  this.lexicographic = function() {
    let largestX = -1;
    for (x = 0; x < this.order.length; x++) {
      if (this.order[x] < this.order[x + 1]) {
        largestX = x;
      }
    }
    if (largestX == -1) {
      console.log("finished");
      return null;
    }
    let largestY = -1;
    for (y = 0; y < this.order.length; y++) {
      if (this.order[largestX] < this.order[y]) {
        largestY = y;
      }
    }
    this.shuffle(this.order, largestX, largestY);
    let endArr = this.order.splice(largestX + 1);
    endArr.reverse();
    this.order = this.order.concat(endArr);
    return this.order;
  }
  this.shuffle = function(arr, a, b) {
    // temporary variable
    let temp = arr[a];
    // swap places
    arr[a] = arr[b];
    arr[b] = temp;
  }
  this.distance = function(arr) {
    let total = 0;
    // summ all distances
    for (i = 0; i < arr.length - 1; i++) {
      total += dist(arr[i].x, arr[i].y, arr[i + 1].x, arr[i + 1].y);
    }
    return total;
  }
  this.totalPathsNumber = function () {
    this.pathsNum = this.factorial(this.points.length)
    return this.pathsNum;
  }
  this.factorial = function (inputNumber) {
    let answer = 1;
    for (var multiple = 2; multiple <= inputNumber; multiple++) {
      answer *= multiple;
    }
    return answer;
  }
}
