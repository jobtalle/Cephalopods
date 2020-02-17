const Neuron = function(dna) {
    this.decay = dna.decay;
    this.activation = .5;
    this.output = 0;
};

Neuron.prototype.update = function(timeStep) {
    const d = .2;
    let a = this.activation;

    if (a < -d)
        a = a + d;
    else if (a > d)
        a = a - d;
    else
        a = 0;

    this.output = 1 / (1 + Math.exp(-a)); // Logistic function
    // this.output = Math.tanh(a * .1); // Tanh

    // Linear decay
    // if (this.activation > 0) {
    //     if ((this.activation -= this.decay * timeStep) < 0)
    //         this.activation = 0;
    // }
    // else {
    //     if ((this.activation += this.decay * timeStep) > 0)
    //         this.activation = 0;
    // }

    // Quadratic decay
    this.activation /= 1 + this.decay * timeStep;
    // this.activation -= this.activation * Math.min(this.decay * timeStep, 1);
};