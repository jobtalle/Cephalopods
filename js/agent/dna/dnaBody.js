const DNABody = function(
    radius = DNABody.DEFAULT_RADIUS,
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

DNABody.DEFAULT_RADIUS = 20;

DNABody.prototype.copy = function() {
    return new DNABody(
        this.radius,
        this.tentacles.copy(),
        this.mouth.copy(),
        this.eyes.copy(),
        this.brain.copy());
};