const Tentacles = function(position, direction) {
    this.position = position;

    this.tentacles = [
        new Tentacle(position, new Vector(-20, -10), direction, 12, 8, 2),
        new Tentacle(position, new Vector(-20, 10), direction, 12, 8, 2)
        // new Tentacle(position, new Vector(-20, 0), direction, 12, 8, 2)
    ];

    this.wiggle = 0;
};

Tentacles.prototype.update = function(timeStep, impulse) {
    this.wiggle += 1 * timeStep;

    if (this.wiggle > 1)
        this.wiggle -= 1;

    let wiggle = Math.sin(Math.pow(this.wiggle, 1) * Math.PI * 2) * Math.PI * 0.5;

    for (const tentacle of this.tentacles) {
        tentacle.setAnchor(this.position, wiggle);
        tentacle.update(timeStep, impulse);

        wiggle = -wiggle;
    }
};

Tentacles.prototype.draw = function(context) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context);
};