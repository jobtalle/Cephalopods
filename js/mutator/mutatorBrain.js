Mutator.AXON_CREATE_CHANCE = .005;
Mutator.AXON_REMOVE_CHANCE = Mutator.AXON_CREATE_CHANCE;
Mutator.NEURON_CREATE_CHANCE = .005;
Mutator.NEURON_REMOVE_CHANCE = Mutator.NEURON_CREATE_CHANCE;
Mutator.NEURON_COUNT_MIN = 5;

Mutator.prototype.hasAxon = function(dna, from, to) {
    for (const axon of dna.axons)
        if (axon.from === from && axon.to === to)
            return true;

    return false;
};

Mutator.prototype.shiftAxonConnections = function(dna, connection, threshold, delta) {
    if ((connection & DNAAxon.INDEX_MASK) > threshold)
        return (connection & ~DNAAxon.INDEX_MASK) | ((connection & DNAAxon.INDEX_MASK) + delta);

    return connection;
};

Mutator.prototype.removeNeuron = function(dna, flag, index) {
    const neuron = flag | index;

    for (let axon = dna.axons.length; axon-- > 0;) {
        if (dna.axons[axon].from === neuron || dna.axons[axon].to === neuron) {
            dna.axons.splice(axon, 1);

            continue;
        }

        if ((dna.axons[axon].from & flag) === flag)
            dna.axons[axon].from = this.shiftAxonConnections(dna, dna.axons[axon].from, index, -1);

        if ((dna.axons[axon].to & flag) === flag)
            dna.axons[axon].to = this.shiftAxonConnections(dna, dna.axons[axon].to, index, -1);
    }

    --dna.neurons;
};

Mutator.prototype.mutateBrain = function(dna, bodyRadius) {
    const newAxons = [];

    for (let axon = dna.axons.length; axon-- > 0;)
        if (Math.random() < Mutator.AXON_REMOVE_CHANCE)
            dna.axons.splice(axon, 1);

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

        for (let input = 0; input < dna.inputs; input++) {
            if (this.hasAxon(dna, input | DNAAxon.FLAG_INPUT, neuron | DNAAxon.FLAG_NEURON) ||
                Math.random() > Mutator.AXON_CREATE_CHANCE)
                continue;

            newAxons.push(new DNAAxon(
                input | DNAAxon.FLAG_INPUT,
                neuron | DNAAxon.FLAG_NEURON
            ));
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

    dna.axons.push(...newAxons);

    for (const axon of dna.axons)
        this.mutateAxon(axon);

    if (Math.random() < dna.neurons * Mutator.NEURON_CREATE_CHANCE)
        ++dna.neurons;

    for (let neuron = dna.neurons; neuron-- > 0;)
        if (Math.random() < Mutator.NEURON_REMOVE_CHANCE && dna.neurons > Mutator.NEURON_COUNT_MIN)
            this.removeNeuron(dna, DNAAxon.FLAG_NEURON, neuron);

    const allowedNeurons = Body.getAllowedNeurons(bodyRadius);

    while (dna.neurons > allowedNeurons)
        this.removeNeuron(dna, DNAAxon.FLAG_NEURON, Math.floor(Math.random() * dna.neurons));
};