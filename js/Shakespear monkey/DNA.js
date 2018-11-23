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


function GeneManager() {
  // addding characters to chars array
  this.setup = function () {
    // clear array of possible symbols
    this.symbols = [];
    // pick all possible values
    for (ascii = 65; ascii < 91; ascii++) {
      this.symbols.push(String.fromCharCode(ascii));
    }
    for (ascii = 97; ascii < 123; ascii++) {
      this.symbols.push(String.fromCharCode(ascii));
    }
    this.symbols.push(String.fromCharCode(46));
    this.symbols.push(String.fromCharCode(44));
  }

  // generating random symbols
  this.generate = function () {
    // random of the list
    return this.symbols[floor(random(this.symbols.length))];
  }

  // phenotype
  this.phenotype = function (inputGenes) {
    return inputGenes.join("");
  }

  // fitness function
  this.calcFitness = function (inputGenes) {
    // setting score to 0
    let correctNum = 0;
    // looping through all genes and finding number of same genes
    for (var gen = 0; gen < inputGenes.length; gen++) {
      if(inputGenes[gen] == target[gen]){
        correctNum++;
      }
    }
    // return number of correct genes
    return correctNum;
  }
}
