Mutator.AXON_MODIFY_CHANCE = .3;
Mutator.AXON_MODIFY_AMPLITUDE = .2;

Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() > Mutator.AXON_MODIFY_CHANCE)
        return;

    dna.weight += (-1 + 2 * Math.random()) * Mutator.AXON_MODIFY_AMPLITUDE;

    if (dna.weight > Axon.WEIGHT_MAX)
        dna.weight = Axon.WEIGHT_MAX;
    else if (dna.weight < Axon.WEIGHT_MIN)
        dna.weight = Axon.WEIGHT_MIN;
};