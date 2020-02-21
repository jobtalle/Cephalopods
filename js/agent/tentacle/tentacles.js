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
        mass += tentacle.getMass();

    return mass;
};

Tentacles.prototype.update = function(impulse, outputs) {
    for (let tentacle = 0; tentacle < this.tentacles.length; ++tentacle) {
        this.tentacles[tentacle].setAnchor(this.position, 2 * outputs[tentacle].output - 1);
        this.tentacles[tentacle].update(impulse);
    }
};

Tentacles.prototype.draw = function(context, f) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context, f);
};