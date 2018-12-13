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
    this.symbols.push(String.fromCharCode(32));
  }

  // generating random symbols
  this.generate = function () {
    // random of the list
    return this.symbols[floor(random(this.symbols.length))];
  }

  // phenotype
  this.phenotype = function (inputGenes) {
    this.text = "Best: " + inputGenes.join("");
    return this.text;
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
