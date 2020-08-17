Mutator.BODY_RADIUS_MODIFY_POWER = 3;
Mutator.BODY_RADIUS_MODIFY_AMPLITUDE = 3;
Mutator.BODY_RADIUS_MUTATION_CHANCE = 0.05

Mutator.prototype.mutateBody = function(dna) {
    if (Math.random() < Mutator.BODY_RADIUS_MUTATION_CHANCE) {
        let delta = (2 * Math.random() - 1) * Mutator.BODY_RADIUS_MODIFY_AMPLITUDE;
        dna.radius += delta;

        if (dna.radius < Body.RADIUS_MIN)
            dna.radius = Body.RADIUS_MIN;
        else if (dna.radius > Body.RADIUS_MAX)
            dna.radius = Body.RADIUS_MAX;
    }

    this.mutateBrain(dna.brain, dna.radius);
};