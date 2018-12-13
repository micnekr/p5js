function Perceptron(inputNum, useBias = true) {
  // INPUTS

  // inputs weights array
  this.weights = [];
  // set bias
  this.useBias = useBias;
  // set inputNum
  this.inputNum = inputNum
  // change input number if biased
  if(this.useBias){
    this.inputNum++;
  }


  // SETUP

  this.setup = function (learningRate = 0.005) {
    // save the learning rate
    this.learningRate = learningRate;
    // assign random values to all weights
    for (var i = 0; i < this.inputNum; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  // GUESS
  this.guess = function (inputs, weights) {
    // if incorrect number of values, warn
    if(inputs.length != this.inputNum){
      noLoop();
      console.error("Incorrect numer of inputs");
    }
    // get a weighted sum
    let sum = this.calcSum(inputs, this.weights);
    // activation  function
    let output = activationFunction(sum);
    return output;
  }

  // TRAIN
  this.train = function (inputs, target) {
    // if we use bias, include it
    if(this.useBias){
      inputs[inputs.length] = 1;
    }
    // calculate an error
    let guess = this.guess(inputs);
    let error = target - guess;
     // change the weights
     for (weight = 0; weight < this.weights.length; weight++) {
       this.weights[weight] += error * inputs[weight] * this.learningRate;
     }
     return error == 0;
  }

  // get guessed solution for y = ax + b
  this.guessY = function (x) {
    let w0 = this.weights[0];
    let w1 = this.weights[1];
    let w2 = this.weights[2];
    return -(w2/w1) - (w0/w1) * x;
  }

  // compute weighted sum
  this.calcSum = function (inputs, weights) {
    let sum = 0;
    for (var i = 0; i < weights.length; i++) {
      // multiply by weight
      sum += inputs[i] * weights[i];
    }
    return sum;
  }
}


function activationFunction(sum) {
  if(sum < 0){
    return -1;
  }else{
    return 1;
  }
}
