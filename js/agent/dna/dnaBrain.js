const DNABrain = function(
    inputs = [],
    neurons = [new DNANeuron(), new DNANeuron()],
    outputs = [new DNANeuron()],
    axons = [
        new DNAAxon(
            0 | DNAAxon.FLAG_NEURON,
            1 | DNAAxon.FLAG_NEURON),
        new DNAAxon(
            1 | DNAAxon.FLAG_NEURON,
            0 | DNAAxon.FLAG_NEURON),
        new DNAAxon(
            0 | DNAAxon.FLAG_NEURON,
            0 | DNAAxon.FLAG_OUTPUT),
        new DNAAxon(
            1 | DNAAxon.FLAG_NEURON,
            0 | DNAAxon.FLAG_OUTPUT)
    ]) {
    this.inputs = inputs;
    this.neurons = neurons;
    this.outputs = outputs;
    this.axons = axons;
};

DNABrain.prototype.copy = function() {
    return new DNABrain(
        this.inputs,
        this.neurons,
        this.outputs,
        this.axons);
};