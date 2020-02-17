Mutator.AXON_MODIFY_CHANCE = .65;
Mutator.AXON_MODIFY_AMPLITUDE = 20;

Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() > Mutator.AXON_MODIFY_CHANCE)
        return;

    const weightMax = 100;
    const weightMin = -100;

    dna.weight += (-1 + 2 * Math.random()) * Mutator.AXON_MODIFY_AMPLITUDE;

    if (dna.weight > weightMax)
        dna.weight = weightMax;
    else if (dna.weight < weightMin)
        dna.weight = weightMin;
};