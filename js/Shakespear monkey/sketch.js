                            // variables
let geneManager;
let dna;
let target = "My name is Mikhail Nekrasov";
let population;
let canvas;
let output;

function setup() {
  // select html paragraph
  output = select("#outputBlock");
  // setup gene manager
  geneManager = new GeneManager();
  geneManager.setup();
  // setup population
  population = new Population(500, 0.01, geneManager, target.length);
}

function draw() {
  background(255);
  population.step();
  geneManager.phenotype(population.best.genes);
  output.html("Target: " + target + "<br />" + geneManager.phenotype(population.best.genes) + "<br />Current generation: " + population.generation);
  if(population.best.fitness == pow(target.length, 4)){
    noLoop();
    output.html("<br />Finished!", true);
    console.log("Finished!");
  }
}
