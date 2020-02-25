Mutator.BODY_RADIUS_MODIFY_POWER = 3;
Mutator.BODY_RADIUS_MODIFY_AMPLITUDE = 3;

Mutator.prototype.mutateBody = function(dna) {
    dna.radius += (Math.random() < .5 ? -1 : 1) * Math.pow(Math.random(), Mutator.BODY_RADIUS_MODIFY_POWER) * Mutator.BODY_RADIUS_MODIFY_AMPLITUDE;

    if (dna.radius < Body.RADIUS_MIN)
        dna.radius = Body.RADIUS_MIN;
    else if (dna.radius > Body.RADIUS_MAX)
        dna.radius = Body.RADIUS_MAX;

    this.mutateBrain(dna.brain, dna.radius);

    for (const appendage of dna.appendages) {
        switch (appendage.object) {
            case DNATentacle:
                this.mutateTentacle(appendage);

                break;
        }
    }
};