const Tentacles = function(position, direction) {
    this.tentacles = [
        new Tentacle(position, direction, 12, 8, 2),
        new Tentacle(position, direction, 12, 8, 2)
    ];

    this.wiggle = 0;
};

Tentacles.prototype.update = function(timeStep, anchor, direction, velocity) {
    this.wiggle += 6 * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    let wiggle = Math.sin(this.wiggle) * Math.PI * 0.5;

    for (const tentacle of this.tentacles) {
        tentacle.setAnchor(anchor, direction.angle() + wiggle);
        tentacle.update(timeStep, velocity);

        wiggle = -wiggle;
    }
};

Tentacles.prototype.draw = function(context) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context);
};