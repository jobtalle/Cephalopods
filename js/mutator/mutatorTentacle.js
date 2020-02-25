Mutator.TENTACLE_LENGTH_CHANCE = .2;
Mutator.TENTACLE_LENGTH_POWER = 4;
Mutator.TENTACLE_LENGTH_AMPLITUDE = 6;

Mutator.prototype.mutateTentacle = function(dna) {
    if (Math.random() < Mutator.TENTACLE_LENGTH_CHANCE) {
        dna.length += (Math.random() < .5 ? -1 : 1) * Math.ceil(Math.pow(Math.random(), Mutator.TENTACLE_LENGTH_POWER)) * Mutator.TENTACLE_LENGTH_AMPLITUDE;

        if (dna.length < Tentacle.LENGTH_MIN)
            dna.length = Tentacle.LENGTH_MIN;
        else if (dna.length > Tentacle.LENGTH_MAX)
            dna.length = Tentacle.LENGTH_MAX;
    }
};