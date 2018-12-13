function poolSelection() {
  // summ of all fitnesses
  this.summ = 0;
  // organisms passed
  this.organisms = [];
  // summ probabilities together
  this.setup = function functionName(organisms) {
    // set summ to zero
    this.summ = 0;
    // set this organisms array a value
    this.organisms = organisms.slice();
    // for each organism, add its fitness to summ variable
    for (var organism = 0; organism < this.organisms.length; organism++) {
      organisms[organism].fitness = pow(organisms[organism].score, 4);
      this.summ += this.organisms[organism].fitness;
    }
    return this.summ;
  }

  // pick a random
  this.pick = function() {
    var indexForPicking = 0;
    var r = random(0, this.summ);

    while (r > 0) {
      r = r - this.organisms[indexForPicking].fitness;
      indexForPicking++;
    }
    indexForPicking--;
    // console.log(indexForPicking);
    return this.organisms[indexForPicking];
  }
}



function nextGen() {
  // setup pool selection
  randomPicker.setup(birdsHistory);
  for (var i = 0; i < birdsNum; i++) {
    let parent1 = randomPicker.pick();
    // console.log(parent1.fitness);
    let child = new Bird(parent1);
    child.mutate(mutationRate);
    // console.log(parent1.nn == child.nn);
    birds[i] = child;
  }
  birdsHistory = [];
  console.log("New generation");
}
