const Brain = function(dna) {
    this.inputs = [];
    this.neurons = [];
    this.outputs = [];
    this.axons = [];

    for (const dnaInput of dna.inputs)
        this.inputs.push(new Neuron(dnaInput));

    for (const dnaNeuron of dna.neurons)
        this.neurons.push(new Neuron(dnaNeuron));

    for (const dnaOutput of dna.outputs)
        this.outputs.push(new Neuron(dnaOutput));

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

Brain.prototype.update = function(timeStep) {

};