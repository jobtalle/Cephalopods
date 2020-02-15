const DNABrain = function(
    inputs = [],
    neurons = DNABrain.makeNeurons(DNABrain.DEFAULT_NEURON_COUNT),
    outputs = [new DNANeuron()],
    axons = DNABrain.makeAxons(DNABrain.DEFAULT_NEURON_COUNT, 1)) {
    this.inputs = inputs;
    this.neurons = neurons;
    this.outputs = outputs;
    this.axons = axons;
};

DNABrain.DEFAULT_NEURON_COUNT = 9;
DNABrain.DEFAULT_AXON_CHANCE = 1;

DNABrain.makeNeurons = function(count) {
    const neurons = new Array(count);

    for (let i = 0; i < neurons.length; ++i)
        neurons[i] = new DNANeuron();

    return neurons;
};

DNABrain.makeAxons = function(neuronCount, outputCount) {
    const axons = [];

    for (let neuron = 0; neuron < neuronCount; ++neuron) {
        for (let other = 0; other < neuronCount; ++other) {
            if (other === neuron)
                continue;

            if (Math.random() > DNABrain.DEFAULT_AXON_CHANCE)
                continue;

            axons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                other | DNAAxon.FLAG_NEURON));
        }

        for (let output = 0; output < outputCount; ++output)
            axons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                output | DNAAxon.FLAG_OUTPUT));
    }

    return axons;
};

DNABrain.prototype.copy = function() {
    return new DNABrain(
        this.inputs,
        this.neurons,
        this.outputs,
        this.axons);
};