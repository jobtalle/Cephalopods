const Tentacles = function(dna, position, direction, radius) {
    this.position = position;
    this.tentacles = new Array(dna.tentacles.length);

    for (let tentacle = 0; tentacle < dna.tentacles.length; ++tentacle)
        this.tentacles[tentacle] = new Tentacle(
            dna.tentacles[tentacle],
            position,
            direction,
            radius);
};

Tentacles.prototype.getMass = function() {
    let mass = 0;

    for (const tentacle of this.tentacles)
        mass += tentacle.getLength();

    return mass;
};

Tentacles.prototype.update = function(timeStep, impulse, outputs) {
    for (const tentacle of this.tentacles) {
        tentacle.setAnchor(this.position, outputs[0].output * 2 - 1);
        tentacle.update(timeStep, impulse);
    }
};

Tentacles.prototype.draw = function(context) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context);
};