const Neuron = function() {
    this.activation = .5;
    this.output = 0;
    this.outputPrevious = this.output;
};

Neuron.DECAY = .9;
Neuron.ACTIVATION_THRESHOLD = 0;

Neuron.prototype.update = function() {
    this.outputPrevious = this.output;
    this.output = 1 / (1 + Math.exp(-this.activation));
    this.activation *= Neuron.DECAY;
};