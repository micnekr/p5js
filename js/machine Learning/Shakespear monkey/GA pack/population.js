function Population(populationNumber, mutatonRate, geneCreator, genesAmount, randomGenerator = "pool selection") {
  // empty organisms list
  this.organisms = [];
  // next generation array
  this.nextGen = [];
  // best organism
  this.best;
  // generation count
  this.generation = 0;
  // random picking agorythm
  if(randomGenerator == "pool selection"){
    this.randomAlg = new poolSelection();
  }else if(randomGenerator == "mating pool"){
    this.randomAlg = new MatingPool();
  }
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
    // increase generation value
    this.generation++;
    // return current generation
    return this.organisms;
  }
}
