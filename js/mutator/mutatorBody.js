Mutator.BODY_RADIUS_CHANCE = .3;
Mutator.BODY_RADIUS_POWER = 4;
Mutator.BODY_RADIUS_AMPLITUDE = 10;

Mutator.prototype.mutateBody = function(dna) {
    if (Math.random() < Mutator.BODY_RADIUS_CHANCE) {
        dna.radius += (Math.random() < .5 ? -1 : 1) * Math.pow(Math.random(), Mutator.BODY_RADIUS_POWER) * Mutator.BODY_RADIUS_AMPLITUDE;

        if (dna.radius < Body.RADIUS_MIN)
            dna.radius = Body.RADIUS_MIN;
        else if (dna.radius > Body.RADIUS_MAX)
            dna.radius = Body.RADIUS_MAX;
    }

    this.mutateBrain(dna.brain, dna.radius);

    let input = 0;
    let output = 0;

    for (const appendage of dna.appendages) {
        const inputsPrevious = appendage.getRequiredInputs();
        const outputsPrevious = appendage.getRequiredOutputs();

        this.mutateAppendage(appendage);

        const inputs = appendage.getRequiredInputs();
        const outputs = appendage.getRequiredOutputs();
        const inputsDelta = inputs - inputsPrevious;
        const outputsDelta = outputs - outputsPrevious;

        if (inputsDelta !== 0) {
            if (inputsDelta < 0) {
                for (let i = 0; i < -inputsDelta; ++i)
                    this.removeNeuron(dna.brain, DNAAxon.FLAG_OUTPUT, output + appendage.inputs + i);
            }
            else {
                dna.brain.outputs += inputsDelta;

                for (let i = 0; i < inputsDelta; ++i)
                    this.copyAxons(dna.brain, DNAAxon.FLAG_OUTPUT, output + i, output + appendage.inputs + i);
            }
        }

        if (outputsDelta !== 0) {
            if (outputsDelta < 0) {
                // Half outputs
            }
            else {
                // Double outputs
            }
        }

        input += inputs;
        output += outputs;

        switch (appendage.object) {
            case DNATentacle:
                this.mutateTentacle(appendage);

                break;
        }
    }
};