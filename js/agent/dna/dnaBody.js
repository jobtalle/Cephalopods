const DNABody = function(
    radius = Body.RADIUS_MIN,
    tentacles = [new DNATentacle(1.5)],
    mouth = new DNAMouth(),
    eyes = new DNAEyes(),
    brain = new DNABrain()) {
    this.radius = radius;
    this.tentacles = tentacles;
    this.mouth = mouth;
    this.eyes = eyes;
    this.brain = brain;
};

DNABody.prototype.copy = function() {
    const tentacles = new Array(this.tentacles.length);

    for (let tentacle = 0; tentacle < tentacles.length; ++tentacle)
        tentacles[tentacle] = this.tentacles[tentacle].copy();

    return new DNABody(
        this.radius,
        tentacles,
        this.mouth.copy(),
        this.eyes.copy(),
        this.brain.copy());
};