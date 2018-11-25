function MatingPool() {
  // mating pool for random selecting
  this.matingPool = [];

  // fill mating pool
  this.setup = function(organisms) {
    // clear the matingPool
    this.matingPool = [];
    // itterating through every organism
    for (var i = 0; i < organisms.length; i++) {
      // pushing current organism into mating pool many times
      let numberOfElement = organisms[i].fitness;
      for (var j = 0; j < numberOfElement; j++) {
        this.matingPool.push(organisms[i]);
      }
    }
    return this.matingPool;
  }

  // picking one random DNA according to fitness
  this.pick = function() {
    let randomDna = this.matingPool[floor(random(this.matingPool.length))];
    return randomDna;
  }
}


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
    return this.organisms[indexForPicking];
  }
}
