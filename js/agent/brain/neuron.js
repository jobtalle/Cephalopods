const Neuron = function() {
    this.activation = .5;
    this.output = 0;
    this.outputPrevious = this.output;
};

Neuron.DECAY = .9;
Neuron.ACTIVATION_THRESHOLD = .2;

Neuron.prototype.update = function() {
    this.outputPrevious = this.output;

    let a = this.activation;

    if (a < -Neuron.ACTIVATION_THRESHOLD)
        a = a + Neuron.ACTIVATION_THRESHOLD;
    else if (a > Neuron.ACTIVATION_THRESHOLD)
        a = a - Neuron.ACTIVATION_THRESHOLD;
    else
        a = 0;

    this.output = 1 / (1 + Math.exp(-a));
    this.activation *= Neuron.DECAY;
};