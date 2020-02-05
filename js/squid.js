const Squid = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.wiggle = 0;
    this.tentacleLeft = new Tentacle(position, direction, 12, 8, 2);
    this.tentacleRight = new Tentacle(position, direction, 12, 8, 2);
};

Squid.TENTACLE_SPRING = 8;
Squid.TENTACLE_SPACING = 18;
Squid.WIGGLE_SPEED = 4;
Squid.FORCE_MULTIPLIER = 4;
Squid.FRICTION = 1.5;

Squid.prototype.update = function(timeStep) {
    this.wiggle += Squid.WIGGLE_SPEED * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    const wiggle = (.5 + .5 * Math.sin(this.wiggle)) * Math.PI * 0.5;

    this.tentacleLeft.setAnchor(this.position, this.direction.angle() + wiggle);
    this.tentacleRight.setAnchor(this.position, this.direction.angle() - wiggle);

    this.tentacleLeft.update(timeStep, this.velocity);
    this.tentacleRight.update(timeStep, this.velocity);

    this.velocity.x -= this.velocity.x * Squid.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Squid.FRICTION * timeStep;

    this.position.add(this.velocity);
};

Squid.prototype.draw = function(context) {
    context.strokeStyle = "red";

    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.position.x + this.direction.x * 20, this.position.y + this.direction.y * 20);
    context.stroke();

    this.tentacleLeft.draw(context);
    this.tentacleRight.draw(context);
};