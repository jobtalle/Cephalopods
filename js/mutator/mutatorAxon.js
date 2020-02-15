Mutator.prototype.mutateAxon = function(dna) {
    /*
    const weightMax = 400;
    const weightMin = -400;

    dna.weight += (-1 + 2 * Math.random()) * 30;

    if (dna.weight > weightMax)
        dna.weight = weightMax;
    else if (dna.weight < weightMin)
        dna.weight = weightMin;
     */

    if (Math.random() < .1)
        dna.weight = -100 + Math.random() * 200;
};