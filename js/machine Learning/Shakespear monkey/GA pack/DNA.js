function DNA(geneCreator, dnaLength, fillWithGenes = true) {
  // array of genes
  this.genes = [];
  // fitness variable
  this.fitness = 0;
  // fill genes array with genes
  if(fillWithGenes){
    for (gene = 0; gene < dnaLength; gene++) {
      this.genes[gene] = geneCreator.generate();
    }
  }

  // crossover function
  this.crossover = function (parent2) {
    // find midpoint
    let midpoint = floor(random(this.genes.length));
    // empty array of child genes
    let childDna = [];
    // add genes of parent2 before midpoint and genes of parent1 after midpoint
    for (var genePos = 0; genePos < this.genes.length; genePos++) {
      if(genePos > midpoint){
        childDna[genePos] = this.genes[genePos];
      }else{
        childDna[genePos] = parent2.genes[genePos];
      }
    }
    // return new child
    let child = new DNA(geneCreator, dnaLength, false);
    child.genes = childDna.slice();
    return child;
  }

  // mutation function
  this.mutate = function (mutRate) {
    for(genePos = 0; genePos < this.genes.length; genePos++){
      if(random(1) < mutRate){
        this.genes[genePos] = geneCreator.generate();
      }
    }
  }

  // calculate and store fitness
  this.calcFitness = function (power = 4) {
    // calculate genes fitness
    this.fitness = geneCreator.calcFitness(this.genes);
    // power the result so more fitness rate increases the chance of being selected even more
    this.fitness = pow(this.fitness, power);
    return this.fitness;
  }
}
