const Neuron = function(dna) {
    this.decay = dna.decay;
    this.activation = 0;
};

Neuron.prototype.update = function(timeStep) {
    this.state -= this.state * Math.min(this.decay * timeStep, 1);
};

Neuron.prototype.getOutput = function() {
    return Math.tanh(this.state);
};