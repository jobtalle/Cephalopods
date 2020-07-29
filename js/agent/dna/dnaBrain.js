const DNABrain = function(
    inputs = DNABrain.DEFAULT_INPUTS,
    neurons = Body.getAllowedNeurons(Body.RADIUS_MIN),
    outputs = DNABrain.DEFAULT_OUTPUTS,
    axons = DNABrain.makeAxons(neurons, DNABrain.DEFAULT_OUTPUTS)) {
    this.inputs = inputs;
    this.neurons = neurons;
    this.outputs = outputs;
    this.axons = axons;
};

DNABrain.DEFAULT_INPUTS = 2;
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

        for (let output = 0; output < outputCount; ++output) {
            if (Math.random() > DNABrain.DEFAULT_AXON_CHANCE)
                continue;

            axons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                output | DNAAxon.FLAG_OUTPUT));
        }
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