const DNABody = function(
    radius = Body.RADIUS_MIN,
    appendages = [new DNATentacle()],
    brain = new DNABrain(0, appendages[0].getRequiredInputs())) {
    this.radius = radius;
    this.appendages = appendages;
    this.brain = brain;
};

DNABody.prototype.copy = function() {
    const appendages = new Array(this.appendages.length);

    for (let appendage = 0; appendage < appendages.length; ++appendage)
        appendages[appendage] = this.appendages[appendage].copy();

    return new DNABody(
        this.radius,
        appendages,
        this.brain.copy());
};