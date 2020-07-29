Mutator.BODY_RADIUS_MODIFY_POWER = 3;
Mutator.BODY_RADIUS_MODIFY_AMPLITUDE = 3;

Mutator.prototype.mutateBody = function(dna) {
    let delta = (2 * Math.random() - 1) * Mutator.BODY_RADIUS_MODIFY_AMPLITUDE;
    dna.radius += delta;//(2 * Math.pow(Math.random(), Mutator.BODY_RADIUS_MODIFY_POWER) - 1) * Mutator.BODY_RADIUS_MODIFY_AMPLITUDE;

    if (dna.radius < Body.RADIUS_MIN)
        dna.radius = Body.RADIUS_MIN;
    else if (dna.radius > Body.RADIUS_MAX)
        dna.radius = Body.RADIUS_MAX;

    this.mutateBrain(dna.brain, dna.radius);
};