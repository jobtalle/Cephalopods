const Neuron = function() {
    this.activation = Neuron.INITIAL_ACTIVATION_MIN + (Neuron.INITIAL_ACTIVATION_MAX - Neuron.INITIAL_ACTIVATION_MIN) * Math.random();
    this.output = 0;
    this.outputPrevious = this.output;
};

Neuron.INITIAL_ACTIVATION_MIN = -3;
Neuron.INITIAL_ACTIVATION_MAX = 3;
Neuron.DECAY = .9;
Neuron.ACTIVATION_THRESHOLD = 0;

Neuron.prototype.update = function() {
    this.outputPrevious = this.output;
    this.output = 1 / (1 + Math.exp(-this.activation));
    this.activation *= Neuron.DECAY;
};