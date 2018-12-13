class NeuralNetwork {
  constructor(inputNum, hiddenNum, outputNum){
    this.inputNodes = inputNum;
    this.hiddenNodes = hiddenNum;
    this.outputNodes = outputNum;

    this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
    // make weights random
    this.weightsIH.randomize();
    this.weightsHO.randomize();
    // bias
    this.biasH = new Matrix(this.hiddenNodes, 1);
    this.biasO = new Matrix(this.outputNodes, 1);
    this.biasH.randomize();
    this.biasO.randomize();
    this.learningRate = 0.1;
  }

  predict(inputsArr){
    // convert to maatrix
    let inputs = Matrix.fromArray(inputsArr);

    // GENERATING HIDDEN OUTPUTS
    // get weighted sum
    let hidden = Matrix.multiply(this.weightsIH, inputs);
    // add bias
    hidden.add(this.biasH);
    // pass through activation function
    hidden.map(sigmoid);

    // GENERATING OUTPUTS
    // get weighted sum
    let output = Matrix.multiply(this.weightsHO, hidden);
    // add bias
    output.add(this.biasO);
    // pass through activation function
    output.map(sigmoid);
    output = output.toArray();
    // return
    return output;
  }

  train(inputs, answers){
    // GUESS


    // convert to maatrix
    inputs = Matrix.fromArray(inputs);

    // GENERATING HIDDEN OUTPUTS
    // get weighted sum
    let hidden = Matrix.multiply(this.weightsIH, inputs);
    // add bias
    hidden.add(this.biasH);
    // pass through activation function
    hidden.map(sigmoid);

    // GENERATING OUTPUTS
    // get weighted sum
    let output = Matrix.multiply(this.weightsHO, hidden);
    // add bias
    output.add(this.biasO);
    // pass through activation function
    output.map(sigmoid);


    // TRAIN



    // convert targets
    answers = Matrix.fromArray(answers);
    // calculte the error
    let errors = Matrix.subtract(answers, output);
    // use formula
    // calculate output gradient
    let gradient = Matrix.map(output, dSigmoid);
    gradient.multiply(errors);
    gradient.multiply(this.learningRate);
    // calculate deltas
    let hiddenT = Matrix.transpose(hidden);
    let weightHOdelta = Matrix.multiply(gradient, hiddenT);
    // add deltas
    this.weightsHO.add(weightHOdelta);
    // adjust the bias
    this.biasO.add(gradient);

    // calculate hidden layer errors
    // mirrored weights
    let weightsT = Matrix.transpose(this.weightsHO);
    // errors of hidden layer!
    let hErrors = Matrix.multiply(weightsT, errors);

    // use formula
    // calculate gradient
    gradient = Matrix.map(hidden, dSigmoid);
    gradient.multiply(hErrors);
    gradient.multiply(this.learningRate);
    // calculate deltas
    let inputT = Matrix.transpose(inputs);
    let weightIHdelta = Matrix.multiply(gradient, inputT);
    // add deltas
    this.weightsIH.add(weightIHdelta);
    // adjust the bias
    this.biasH.add(gradient);
  }
}

function sigmoid(x) {
  return 1/(1 + Math.exp(-x));
}

function dSigmoid(y) {
  return y * (1 - y);
}
