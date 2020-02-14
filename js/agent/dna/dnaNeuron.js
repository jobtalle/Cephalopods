const DNANeuron = function(
    index,
    decay = Neuron.DEFAULT_DECAY) {
    this.index = index;
    this.decay = decay;
};

DNANeuron.DEFAULT_DECAY = 1;

DNANeuron.prototype.copy = function() {
    return new DNANeuron(
        this.index,
        this.decay);
};