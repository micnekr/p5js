                            // variables
let geneManager;
let dna;
let target = "hello";
let population;


function setup() {
  // setup cancas
  createCanvas(640, 640)
  // setup gene manager
  geneManager = new GeneManager();
  geneManager.setup();
  // setup population
  population = new Population(100, 0.01, geneManager, target.length);
  console.log("Best fitness: " + population.calcFitness().fitness);
  population.matingPoolFill();
  console.log("Picked DNA fitness: " + population.matingPoolPick().fitness);
  console.log("mating pool length: " + population.matingPool.length);
  console.log(population.organisms[0].fitness);
      // dna = new DNA(geneManager, 10);
      // console.log(dna.genes);
      // console.log(geneManager.calcFitness(dna.genes));
}

function draw() {
  background(255);
  population.step();
  text(geneManager.phenotype(population.best.genes), 10, 10);
  if(population.best.fitness == 5){
    noLoop();
    console.log("e");
  }
}
