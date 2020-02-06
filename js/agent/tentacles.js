const Tentacles = function(position, direction) {
    this.position = position;
    this.direction = direction;

    this.tentacles = [
        // new Tentacle(position, new Vector(-20, -10), direction, 12, 8, 2),
        // new Tentacle(position, new Vector(-20, 10), direction, 12, 8, 2),
        new Tentacle(position, new Vector(-20, 0), direction, 12, 8, 2)
    ];

    this.wiggle = 0;
};

Tentacles.prototype.update = function(timeStep, velocity) {
    this.wiggle += 6 * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    let wiggle = Math.sin(this.wiggle) * Math.PI * 0.5;

    for (const tentacle of this.tentacles) {
        tentacle.setAnchor(this.position, wiggle);
        tentacle.update(timeStep, velocity);

        wiggle = -wiggle;
    }

    this.direction.normalize();
};

Tentacles.prototype.draw = function(context) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context);
};