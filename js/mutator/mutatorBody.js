Mutator.BODY_RADIUS_CHANCE = .3;
Mutator.BODY_RADIUS_POWER = 4;
Mutator.BODY_RADIUS_AMPLITUDE = 10;
Mutator.APPENDAGE_CREATE_CHANCE = .02;
Mutator.APPENDAGE_REMOVE_CHANCE = Mutator.APPENDAGE_CREATE_CHANCE;

Mutator.prototype.createAppendage = function() {
    switch (Math.floor(Math.random())) {
        case 0:
            return new DNATentacle();
    }
};

Mutator.prototype.addAppendage = function(dna, appendage) {
    dna.appendages.push(appendage);
    dna.brain.outputs += appendage.getRequiredInputs();
    dna.brain.inputs += appendage.getRequiredOutputs();
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

    for (let appendage = dna.appendages.length; appendage-- > 0;) {
        if (Math.random() < Mutator.APPENDAGE_REMOVE_CHANCE) {
            const inputs = dna.appendages[appendage].getRequiredInputs();
            const outputs = dna.appendages[appendage].getRequiredOutputs();

            for (let i = 0; i < inputs; ++i)
                this.removeNeuron(dna.brain, DNAAxon.FLAG_OUTPUT, output);

            for (let i = 0; i < outputs; ++i)
                this.removeNeuron(dna.brain, DNAAxon.FLAG_INPUT, input);

            dna.appendages.splice(appendage, 1);

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

    if (Math.random() < Mutator.APPENDAGE_CREATE_CHANCE * dna.appendages.length)
        this.addAppendage(dna, this.createAppendage());
};