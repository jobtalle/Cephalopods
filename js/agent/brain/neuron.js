const Neuron = function(dna) {
    this.decay = dna.decay;
    this.activation = 0;
    this.output = 0;
};

Neuron.prototype.update = function(timeStep) {
    this.output = Math.pow(1 / (1 + Math.exp(-this.activation)), 4); // Logistic function
    // this.output = Math.tanh(this.activation); // Tanh

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
    this.activation -= this.activation * Math.min(this.decay * timeStep, 1);
};