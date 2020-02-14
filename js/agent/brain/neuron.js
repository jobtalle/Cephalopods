const Neuron = function(dna) {
    this.decay = dna.decay;
    this.activation = 0;
    this.output = 0;
};

Neuron.prototype.update = function(timeStep) {
    this.output = 1 / (1 + Math.exp(-this.activation));
    this.activation -= this.activation * Math.min(this.decay * timeStep, 1);
};