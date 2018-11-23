function Population(populationNumber, mutatonRate, geneCreator, genesAmount) {
  // empty organisms list
  this.organisms = [];
  // next generation array
  this.nextGen = [];
  // best organism
  this.best;
  // random picking agorythm
  this.randomAlg = new poolSelection();
  // fill organism array with new random DNA
  for (var i = 0; i < populationNumber; i++) {
    this.organisms[i] = new DNA(geneCreator, genesAmount);
  }

  // calculate all fitnesses of organisms
  this.calcFitness = function(power = 4) {
    // set the first best value to any of organisms
    this.best = this.organisms[0];
    // loop thrrough all DNA and calculate their fitness
    for (var i = 0; i < this.organisms.length; i++) {
      this.organisms[i].calcFitness(power);
      // if the record is broken, update the best DNA value
      if (this.organisms[i].fitness > this.best.fitness) {
        this.best = this.organisms[i];
      }
    }
    return this.best;
  }


  // make new generation
  this.crossover = function(mRate = mutatonRate) {
    // clear nextGen array
    this.nextGen = [];
    // repeat until the nextgen is full
    for (var i = 0; i < populationNumber; i++) {
      // pick two random parents
      let p1 = this.randomAlg.pick();
      let p2 = this.randomAlg.pick();
      // make a child
      this.nextGen[i] = p1.crossover(p2);
      this.nextGen[i].mutate(mRate);
    }
    return this.nextGen;
  }

  // make one cycle
  this.step = function() {
    // calculate all fitnesses
    this.calcFitness();
    // setup random picking algorythm
    this.randomAlg.setup(this.organisms);
    // crossover
    this.crossover();
    // update generations
    this.organisms = this.nextGen.slice();
    // return current generation
    return this.organisms;
  }
}






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
