Mutator.prototype.mutateBrain = function(dna) {
    for (const input of dna.inputs)
        this.mutateNeuron(input);

    for (const neuron of dna.neurons)
        this.mutateNeuron(neuron);

    for (const output of dna.outputs)
        this.mutateNeuron(output);

    for (const axon of dna.axons)
        this.mutateAxon(axon);
};