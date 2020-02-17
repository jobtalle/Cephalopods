const Neuron = function(dna) {
    this.decay = dna.decay;
    this.activation = .5;
    this.activationPrevious = this.activation;
    this.output = 0;
    this.outputPrevious = this.output;
};

Neuron.prototype.update = function() {
    this.activationPrevious = this.activation;
    this.outputPrevious = this.output;

    const d = .2;
    let a = this.activation;

    if (a < -d)
        a = a + d;
    else if (a > d)
        a = a - d;
    else
        a = 0;

    this.output = 1 / (1 + Math.exp(-a)); // Logistic function

    // Quadratic decay
    this.activation *= this.decay;
};