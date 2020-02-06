const Tentacles = function(position, direction) {
    this.position = position;
    this.direction = direction;

    this.tentacles = [
        // new Tentacle(position, new Vector(-20, -10), direction, 12, 8, 2),
        // new Tentacle(position, new Vector(-20, 10), direction, 12, 8, 2)
        new Tentacle(position, new Vector(-20, 0), direction, 12, 8, 2)
    ];

    this.wiggle = 0;
    this.impulse = new Vector();
};

Tentacles.prototype.update = function(timeStep, velocity) {
    this.impulse.zero();
    this.wiggle += 6 * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    let wiggle = Math.sin(this.wiggle) * Math.PI * 0.5;

    for (const tentacle of this.tentacles) {
        tentacle.setAnchor(this.position, wiggle);
        tentacle.update(timeStep, this.impulse);

        wiggle = -wiggle;
    }

    const forward = this.direction.dot(this.impulse);
    const side = this.direction.y * this.impulse.x - this.direction.x * this.impulse.y;

    velocity.x += this.direction.x * forward;
    velocity.y += this.direction.y * forward;

    const f = .5;
    const ddx = this.direction.y * side * f;
    const ddy = this.direction.x * side * f;

    this.direction.x += ddx;
    this.direction.y -= ddy;
    this.direction.normalize();
};

Tentacles.prototype.draw = function(context) {
    for (const tentacle of this.tentacles)
        tentacle.draw(context);
};