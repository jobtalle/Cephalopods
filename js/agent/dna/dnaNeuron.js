const DNANeuron = function(
    decay = Neuron.DEFAULT_DECAY) {
    this.decay = decay;
};

DNANeuron.DEFAULT_DECAY = 1;

DNANeuron.prototype.copy = function() {
    return new DNANeuron(
        this.decay);
};