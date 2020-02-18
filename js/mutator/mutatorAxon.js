Mutator.AXON_MODIFY_CHANCE = .3;
Mutator.AXON_MODIFY_AMPLITUDE = .4;

Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() > Mutator.AXON_MODIFY_CHANCE)
        return;

    const weightMax = 45;
    const weightMin = -45;

    dna.weight += (-1 + 2 * Math.random()) * Mutator.AXON_MODIFY_AMPLITUDE;

    if (dna.weight > weightMax)
        dna.weight = weightMax;
    else if (dna.weight < weightMin)
        dna.weight = weightMin;
};