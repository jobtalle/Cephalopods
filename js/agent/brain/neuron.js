const Neuron = function(dna) {
    this.decay = dna.decay;
    this.state = 0;
};

Neuron.DEFAULT_DECAY = 1;

Neuron.prototype.update = function(timeStep) {
    this.state -= this.state * this.decay * timeStep;
};

Neuron.prototype.getOutput = function() {
    return Math.tanh(this.state);
};