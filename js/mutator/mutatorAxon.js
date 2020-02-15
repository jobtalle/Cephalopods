Mutator.prototype.mutateAxon = function(dna) {
    if (Math.random() < .2);

    const weightMax = 100;
    const weightMin = -100;

    dna.weight += (-1 + 2 * Math.random()) * 10;

    if (dna.weight > weightMax)
        dna.weight = weightMax;
    else if (dna.weight < weightMin)
        dna.weight = weightMin;

    // if (Math.random() < .1)
    //     dna.weight = -100 + Math.random() * 200;
};