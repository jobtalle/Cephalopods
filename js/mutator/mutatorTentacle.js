Mutator.TENTACLE_LENGTH_MUTATE_CHANCE = .2;
Mutator.TENTACLE_LENGTH_MUTATE_POWER = 2;
Mutator.TENTACLE_LENGTH_MUTATE_AMPLITUDE = 2;

Mutator.prototype.mutateTentacle = function(dna) {
    if (Math.random() < Mutator.TENTACLE_LENGTH_MUTATE_CHANCE) {
        dna.length += Math.round((Math.random() < .5 ? -1 : 1) * Math.pow(Math.random(), Mutator.TENTACLE_LENGTH_MUTATE_POWER) * Mutator.TENTACLE_LENGTH_MUTATE_AMPLITUDE);

        if (dna.length < Tentacle.LENGTH_MIN)
            dna.length = Tentacle.LENGTH_MIN;
        else if (dna.length > Tentacle.LENGTH_MAX)
            dna.length = Tentacle.LENGTH_MAX;
    }
};