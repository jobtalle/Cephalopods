Mutator.AXON_CREATE_CHANCE = .04;
Mutator.AXON_REMOVE_CHANCE = Mutator.AXON_CREATE_CHANCE;
Mutator.NEURON_CREATE_CHANCE = .015;
Mutator.NEURON_REMOVE_CHANCE = Mutator.NEURON_CREATE_CHANCE;
Mutator.NEURON_COUNT_MIN = 5;
Mutator.NEURON_AXON_CHANCE = .35;

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

    switch (flag) {
        case DNAAxon.FLAG_INPUT:
            --dna.inputs;

            break;
        case DNAAxon.FLAG_NEURON:
            --dna.neurons;

            break;
        case DNAAxon.FLAG_OUTPUT:
            --dna.outputs;

            break;
    }
};

Mutator.prototype.copyAxons = function(dna, flag, source, target) {
    const neuronSource = flag | source;
    const neuronTarget = flag | target;

    for (let axon = dna.axons.length; axon-- > 0;) {
        if (dna.axons[axon].to === neuronSource)
            dna.axons.push(new DNAAxon(
                dna.axons[axon].from,
                neuronTarget,
                dna.axons[axon].weight));

        if (dna.axons[axon].from === neuronSource)
            dna.axons.push(new DNAAxon(
                neuronTarget,
                dna.axons[axon].to,
                dna.axons[axon].weight));
    }
};

Mutator.prototype.addNeuron = function(dna, flag) {
    switch (flag) {
        case DNAAxon.FLAG_INPUT:
            for (let neuron = 0; neuron < dna.neurons; ++neuron)
                if (Math.random() < Mutator.NEURON_AXON_CHANCE)
                    dna.axons.push(new DNAAxon(
                        DNAAxon.FLAG_INPUT | dna.inputs,
                        DNAAxon.FLAG_NEURON | neuron));

            ++dna.inputs;

            break;
        case DNAAxon.FLAG_NEURON:
            for (let neuron = 0; neuron < dna.neurons; ++neuron) {
                if (Math.random() < Mutator.NEURON_AXON_CHANCE)
                    dna.axons.push(new DNAAxon(
                        DNAAxon.FLAG_NEURON | neuron,
                        DNAAxon.FLAG_NEURON | dna.neurons));

                if (Math.random() < Mutator.NEURON_AXON_CHANCE)
                    dna.axons.push(new DNAAxon(
                        DNAAxon.FLAG_NEURON | dna.neurons,
                        DNAAxon.FLAG_NEURON | neuron));
            }

            ++dna.neurons;

            break;
        case DNAAxon.FLAG_OUTPUT:
            for (let neuron = 0; neuron < dna.neurons; ++neuron)
                if (Math.random() < Mutator.NEURON_AXON_CHANCE)
                    dna.axons.push(new DNAAxon(
                        DNAAxon.FLAG_NEURON | neuron,
                        DNAAxon.FLAG_OUTPUT | dna.outputs));

            ++dna.outputs;

            break;
    }
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

    for (let i = 0; i < dna.neurons; ++i) if (Math.random() < Mutator.NEURON_CREATE_CHANCE)
        this.addNeuron(dna, DNAAxon.FLAG_NEURON);

    for (let neuron = dna.neurons; neuron-- > 0;)
        if (Math.random() < Mutator.NEURON_REMOVE_CHANCE && dna.neurons > Mutator.NEURON_COUNT_MIN)
            this.removeNeuron(dna, DNAAxon.FLAG_NEURON, neuron);

    const allowedNeurons = Body.getAllowedNeurons(bodyRadius);

    while (dna.neurons > allowedNeurons)
        this.removeNeuron(dna, DNAAxon.FLAG_NEURON, Math.floor(Math.random() * dna.neurons));
};