const Brain = function(dna) {
    this.inputs = [];
    this.neurons = [];
    this.outputs = [];
    this.axons = [];

    for (let input = 0; input < dna.inputs; ++input)
        this.inputs.push(new Neuron());

    for (let neuron = 0; neuron < dna.neurons; ++neuron)
        this.neurons.push(new Neuron());

    for (let output = 0; output < dna.outputs; ++output)
        this.outputs.push(new Neuron());

    for (const dnaAxon of dna.axons)
        this.axons.push(new Axon(
            dnaAxon,
            this.getNeuron(dnaAxon.from),
            this.getNeuron(dnaAxon.to)));
};

Brain.prototype.getNeuron = function(axonIndex) {
    switch (axonIndex & ~DNAAxon.INDEX_MASK) {
        case DNAAxon.FLAG_INPUT:
            return this.inputs[axonIndex & DNAAxon.INDEX_MASK];
        case DNAAxon.FLAG_NEURON:
            return this.neurons[axonIndex & DNAAxon.INDEX_MASK];
        case DNAAxon.FLAG_OUTPUT:
            return this.outputs[axonIndex & DNAAxon.INDEX_MASK];
    }
};

Brain.prototype.update = function() {
    for (const input of this.inputs)
        input.update();

    for (const neuron of this.neurons)
        neuron.update();

    for (const output of this.outputs)
        output.update();

    for (const axon of this.axons)
        axon.update();
};