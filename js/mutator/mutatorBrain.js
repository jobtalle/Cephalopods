Mutator.AXON_CREATE_CHANCE = .035;
Mutator.AXON_REMOVE_CHANCE = .04;

Mutator.prototype.hasAxon = function(dna, from, to) {
    for (const axon of dna.axons)
        if (axon.from === from && axon.to === to)
            return true;

    return false;
};

Mutator.prototype.mutateBrain = function(dna) {
    const newAxons = [];

    for (let neuron = 0; neuron < dna.neurons; ++neuron) {
        for (let other = 0; other < dna.neurons; ++other) {
            if (other === neuron ||
                this.hasAxon(dna, neuron | DNAAxon.FLAG_NEURON, other | DNAAxon.FLAG_NEURON) ||
                Math.random() > Mutator.AXON_CREATE_CHANCE)
                continue;

            newAxons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                other | DNAAxon.FLAG_NEURON));
        }

        for (let output = 0; output < dna.outputs; ++output) {
            if (this.hasAxon(dna, neuron | DNAAxon.FLAG_NEURON, output | DNAAxon.FLAG_OUTPUT) ||
                Math.random() > Mutator.AXON_CREATE_CHANCE)
                continue;

            newAxons.push(new DNAAxon(
                neuron | DNAAxon.FLAG_NEURON,
                output | DNAAxon.FLAG_OUTPUT));
        }
    }


    for (let axon = dna.axons.length; axon-- > 0;)
        if (Math.random() < Mutator.AXON_REMOVE_CHANCE)
            dna.axons.splice(axon, 1);

    dna.axons.push(...newAxons);

    for (const axon of dna.axons)
        this.mutateAxon(axon);
};