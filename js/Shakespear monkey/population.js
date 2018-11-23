function Population(populationNumber, mutatonRate, geneCreator, genesAmount) {
  // empty organisms list
  this.organisms = [];
  // next generation array
  this.nextGen = [];
  // mating pool for random selecting
  this.matingPool = [];
  // best organism
  this.best;
  // fill organism array with new random DNA
  for (var i = 0; i < populationNumber; i++) {
    this.organisms[i] = new DNA(geneCreator, genesAmount);
  }

  // calculate all fitnesses of organisms
  this.calcFitness = function (power = 4) {
    // set the first best value to any of organisms
    this.best = this.organisms[0];
    // loop thrrough all DNA and calculate their fitness
    for (var i = 0; i < this.organisms.length; i++) {
      this.organisms[i].calcFitness(power);
      // if the record is broken, update the best DNA value
      if(this.organisms[i].fitness > this.best.fitness){
        this.best = this.organisms[i];
      }
    }
    return this.best;
  }

  // fill mating pool
  this.matingPoolFill = function () {
      // clear the matingPool
      this.matingPool = [];
      // itterating through every organism
      for (var i = 0; i < this.organisms.length; i++) {
        // pushing current organism into mating pool many times
        let numberOfElement = this.organisms[i].fitness;
        for (var j = 0; j < numberOfElement; j++) {
          this.matingPool.push(this.organisms[i]);
        }
      }
      return this.matingPool;
    }

  // picking one random DNA according to fitness
  this.matingPoolPick = function () {
    let randomDna = this.matingPool[floor(random(this.matingPool.length))];
    return randomDna;
  }

  // make new generation
  this.crossover = function (mRate = mutatonRate) {
    // clear nextGen array
    this.nextGen = [];
    // repeat until the nextgen is full
    for (var i = 0; i < populationNumber; i++) {
      // pick two random parents
      let p1 = this.matingPoolPick();
      let p2 = this.matingPoolPick();
      // make a child
      this.nextGen[i] = p1.crossover(p2);
      this.nextGen[i].mutate(mRate);
    }
    return this.nextGen;
  }

  // make one cycle
  this.step = function () {
    // calculate all fitnesses
    this.calcFitness();
    // create mating pool
    this.matingPoolFill();
    // crossover
    this.crossover();
    // update generations
    this.organisms = this.nextGen.slice();
    // return current generation
    return this.organisms;
  }
}
