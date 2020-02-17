Mutator.AXON_MODIFY_CHANCE = .65;
Mutator.AXON_MODIFY_AMPLITUDE = .6;

Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() > Mutator.AXON_MODIFY_CHANCE)
        return;

    const weightMax = 40;
    const weightMin = -40;

    dna.weight += (-1 + 2 * Math.random()) * Mutator.AXON_MODIFY_AMPLITUDE;

    if (dna.weight > weightMax)
        dna.weight = weightMax;
    else if (dna.weight < weightMin)
        dna.weight = weightMin;
};