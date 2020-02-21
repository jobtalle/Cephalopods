const DNABody = function(
    radius = Body.RADIUS_MIN,
    tentacles = new DNATentacles(),
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
    return new DNABody(
        this.radius,
        this.tentacles.copy(),
        this.mouth.copy(),
        this.eyes.copy(),
        this.brain.copy());
};