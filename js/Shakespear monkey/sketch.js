                            // variables
let geneManager;
let dna;
let target = "My name is Mikhail Nekrasov";
let population;
let canvas;

function setup() {
  // smallest of windowWidth and windowHeight
  let smallestDimension = min(windowWidth - 100, windowHeight - 100);
  canvas = createCanvas(smallestDimension+1, smallestDimension+1);
  canvas.parent("canvasContainer");
  // setup gene manager
  geneManager = new GeneManager();
  geneManager.setup();
  // setup population
  population = new Population(500, 0.01, geneManager, target.length);
}

function draw() {
  background(255);
  population.step();
  text(geneManager.phenotype(population.best.genes), 50, 100);
  if(population.best.fitness == target.length){
    noLoop();
    console.log("Finished!");
  }
}
