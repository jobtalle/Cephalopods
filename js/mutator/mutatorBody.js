Mutator.BODY_RADIUS_CHANCE = .3;
Mutator.BODY_RADIUS_POWER = 4;
Mutator.BODY_RADIUS_AMPLITUDE = 10;
Mutator.APPENDAGE_CREATE_CHANCE = .05;
Mutator.APPENDAGE_REMOVE_CHANCE = .05;

Mutator.prototype.createAppendage = function() {
    switch (Math.floor(Math.random())) {
        case 0:
            return new DNATentacle();
    }
};

Mutator.prototype.addAppendage = function(dna, appendage) {
    const inputs = appendage.getRequiredInputs();
    const outputs = appendage.getRequiredOutputs();

    dna.appendages.push(appendage);

    for (let i = 0; i < inputs; ++i)
        this.addNeuron(dna.brain, DNAAxon.FLAG_OUTPUT);

    for (let i = 0; i < outputs; ++i)
        this.addNeuron(dna.brain, DNAAxon.FLAG_INPUT);
};

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

    for (let appendage = 0; appendage < dna.appendages.length; ++appendage) {
        if (Math.random() < Mutator.APPENDAGE_REMOVE_CHANCE) {
            for (let i = dna.appendages[appendage].getRequiredInputs(); i-- > 0;)
                this.removeNeuron(dna.brain, DNAAxon.FLAG_OUTPUT, output + i);

            for (let i = dna.appendages[appendage].getRequiredOutputs(); i-- > 0;)
                this.removeNeuron(dna.brain, DNAAxon.FLAG_INPUT, input + i);

            dna.appendages.splice(appendage--, 1);

            continue;
        }

        const inputsPrevious = dna.appendages[appendage].getRequiredInputs();
        const outputsPrevious = dna.appendages[appendage].getRequiredOutputs();

        this.mutateAppendage(dna.appendages[appendage]);

        const inputs = dna.appendages[appendage].getRequiredInputs();
        const outputs = dna.appendages[appendage].getRequiredOutputs();
        const inputsDelta = inputs - inputsPrevious;
        const outputsDelta = outputs - outputsPrevious;

        if (inputsDelta !== 0) {
            if (inputsDelta < 0) {
                for (let i = 0; i < -inputsDelta; ++i)
                    this.removeNeuron(dna.brain, DNAAxon.FLAG_OUTPUT, output + dna.appendages[appendage].inputs + i);
            }
            else {
                dna.brain.outputs += inputsDelta;

                for (let i = 0; i < inputsDelta; ++i)
                    this.copyAxons(dna.brain, DNAAxon.FLAG_OUTPUT, output + i, output + dna.appendages[appendage].inputs + i);
            }
        }

        if (outputsDelta !== 0) {
            if (outputsDelta < 0) {
                for (let i = 0; i < -outputsDelta; ++i)
                    this.removeNeuron(dna.brain, DNAAxon.FLAG_INPUT, input + dna.appendages[appendage].outputs + i);
            }
            else {
                dna.brain.inputs += outputsDelta;

                for (let i = 0; i < outputsDelta; ++i)
                    this.copyAxons(dna.brain, DNAAxon.FLAG_INPUT, input + i, input + dna.appendages[appendage].outputs + i);
            }
        }

        input += inputs;
        output += outputs;

        switch (dna.appendages[appendage].object) {
            case DNATentacle:
                this.mutateTentacle(dna.appendages[appendage]);

                break;
        }
    }

    if (Math.random() < Mutator.APPENDAGE_CREATE_CHANCE)
        this.addAppendage(dna, this.createAppendage());
};