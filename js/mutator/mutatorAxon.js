Mutator.AXON_MODIFY_CHANCE = .2;
Mutator.AXON_MODIFY_AMPLITUDE = .2;

Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() > Mutator.AXON_MODIFY_CHANCE)
        return;

    dna.weight += (2 * Math.random() - 1) * Mutator.AXON_MODIFY_AMPLITUDE;

    if (dna.weight > Axon.WEIGHT_MAX)
        dna.weight = Axon.WEIGHT_MAX;
    else if (dna.weight < Axon.WEIGHT_MIN)
        dna.weight = Axon.WEIGHT_MIN;
};