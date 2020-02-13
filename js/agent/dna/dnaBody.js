const DNABody = function(
    radius = DNABody.DEFAULT_RADIUS,
    tentacles = new DNATentacles(),
    mouth = new DNAMouth(),
    eyes = new DNAEyes()) {
    this.radius = radius;
    this.tentacles = tentacles;
    this.mouth = mouth;
    this.eyes = eyes;
};

DNABody.DEFAULT_RADIUS = 20;

DNABody.prototype.copy = function() {
    return new DNABody(
        this.radius,
        this.tentacles.copy(),
        this.mouth.copy(),
        this.eyes.copy());
};