function salesPersonGA(drawingOffset = 0) {
  // array of points
  this.points = [];
  // population
  this.population = [];
  // their fitnesses
  this.fitnesses = [];
  // set first fitness to 0
  this.recordFitness = 0;
  // best of the generation
  this.thisGenBest;
  // the best distance
  this.recordDist = Infinity;
  // best set of cities
  this.bestRoute;
  // is working
  this.working = false;
  // setup
  this.Setup = function(citiesArr, populationNum) {
    // set checked paths variable to 0
    this.pathsChecked = 0;
    // set point array to cities arr
    this.points = citiesArr.slice();
    // make array of same dna
    let order = [];
    // fill temporary array
    for (k = 0; k < citiesArr.length; k++) {
      order[k] = k;
    }
    // shuffle each dna
    for (k = 0; k < populationNum; k++) {
      this.population[k] = shuffle(order).slice();
    }
    // start the programm
    this.working = true;
  }
  this.draw = function() {
    // set fill to black
    fill(0);
    // draw all points
    for (i = 0; i < this.points.length; i++) {
      ellipse(this.points[i].x, this.points[i].y + drawingOffset, 4, 4);
    }
    if (this.working) {
      // draw best in this generation
      // disable fill and set stroke color
      noFill();
      stroke(0);
      // draw the best attempt
      beginShape();
      for (i = 0; i < this.bestRoute.length; i++) {
        vertex(this.points[this.thisGenBest[i]].x, this.points[this.thisGenBest[i]].y + drawingOffset);
      }
      endShape();
    }
    // draw best ever
    // disable fill and set stroke color
    noFill();
    stroke(255, 0, 0);
    // draw the best attempt
    beginShape();
    for (i = 0; i < this.bestRoute.length; i++) {
      vertex(this.points[this.bestRoute[i]].x, this.points[this.bestRoute[i]].y + drawingOffset);
    }
    endShape();
  }
  // GA
  this.GAstep = function() {
    // calculate all fitnessses
    this.calcFitnesses();
    // setup for random picking
    this.sumFitness();
    // generate new generation
    this.newGeneration();
    // make a new generation
    this.draw();
  }
  this.calcFitnesses = function() {
    let thisGenRecord = 0;
    // calculate all fitnesses
    for (var i = 0; i < this.population.length; i++) {
      // calc fitness
      let d = this.calcFitness(this.points, this.population[i]);
      // if we break the record, update record value
      if (d > this.recordFitness) {
        this.recordFitness = d;
        this.bestRoute = this.population[i];
      }
      if (d > thisGenRecord) {
        this.thisGenBest = this.population[i];
        thisGenRecord = d;
      }
      // save fitness
      this.fitnesses[i] = d;
    }
  }
  this.calcFitness = function(cities, order, power = 2) {
    let total = 0;
    // summ all distances
    for (i = 0; i < cities.length - 1; i++) {
      // dist between city i and the next one
      let cityAindex = order[i];
      let cityA = cities[cityAindex];
      let cityBindex = order[i + 1];
      let cityB = cities[cityBindex];
      total += dist(cityA.x, cityA.y, cityB.x, cityB.y);
    }
    if (total < this.recordDist) {
      this.recordDist = total;
    }
    total = pow(total, power);
    // inverse
    return 100 / total;
  }
  this.sumFitness = function() {
    // set summ equal to 0
    this.fitnessSumm = 0;
    for (var i = 0; i < this.fitnesses.length; i++) {
      this.fitnessSumm += this.fitnesses[i];
    }
    return this.fitnessSumm;
  }
  this.newGeneration = function() {
    let newGeneration = [];
    // generate the exact same amount of routes as were before
    for (var i = 0; i < this.population.length; i++) {
      newGeneration[i] = this.newRoute();
    }
    this.population = newGeneration.slice();
    // console.log(newGeneration);
  }
  this.newRoute = function() {
    // pick a random according to fitnesses
    let tempRoute = this.pickOne();
    // mutate
    let finalRoute = this.mutate(tempRoute);
    return finalRoute;
  }
  this.mutate = function(route, mutationRate) {
    indA = floor(random(route.length));
    indB = floor(random(route.length));
    route = swap(route, indA, indB);
    return route;
  }
  this.pickOne = function() {
    var indexForPicking = 0;
    var r = random(0, this.fitnessSumm);

    while (r > 0) {
      r = r - this.fitnesses[indexForPicking];
      indexForPicking++;
    }
    indexForPicking--;
    return this.population[indexForPicking].slice();
  }
}

// calculations
function totalPathsNumber(pointsNum) {
  let pathsNum = factorial(pointsNum);
  return pathsNum;
}

function factorial(inputNumber) {
  let answer = 1;
  for (var multiple = 2; multiple <= inputNumber; multiple++) {
    answer *= multiple;
  }
  return answer;
}

function swap(arr, indexA, indexB) {
  let tempVal = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = tempVal;
  return arr;
}
