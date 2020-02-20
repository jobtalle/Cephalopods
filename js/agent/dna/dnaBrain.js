const DNABrain = function(
    inputs = DNABrain.DEFAULT_INPUTS,
    neurons = DNABrain.DEFAULT_NEURONS,
    outputs = DNABrain.DEFAULT_OUTPUTS,
    axons = DNABrain.makeAxons(DNABrain.DEFAULT_NEURONS, DNABrain.DEFAULT_OUTPUTS)) {
    this.inputs = inputs;
    this.neurons = neurons;
    this.outputs = outputs;
    this.axons = axons;
};

DNABrain.DEFAULT_INPUTS = 0;
DNABrain.DEFAULT_NEURONS = 6;
DNABrain.DEFAULT_OUTPUTS = 2;
DNABrain.DEFAULT_AXON_CHANCE = .7;

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
    const axons = [];

    for (const axon of this.axons)
        axons.push(axon.copy());

    return new DNABrain(
        this.inputs,
        this.neurons,
        this.outputs,
        axons);
};