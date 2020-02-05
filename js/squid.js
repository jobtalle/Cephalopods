const Squid = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.wiggle = 0;
    this.tailHeadLeft = this.tailLeft = new SegmentHead(position.copy());
    this.tailHeadRight = this.tailRight = new SegmentHead(position.copy());

    const tentacleLength = 12;

    for (let i = 0; i < tentacleLength; ++i) {
        const spring = Squid.TENTACLE_SPRING * Math.pow(1 - (i / tentacleLength) * 0.35, 2);
        const offset = direction.copy().negate().multiply(Squid.TENTACLE_SPACING);

        this.tailLeft = new Segment(
            this.tailLeft.position.copy().add(offset),
            spring,
            Squid.TENTACLE_SPACING,
            this.tailLeft);

        this.tailRight = new Segment(
            this.tailRight.position.copy().add(offset),
            spring,
            Squid.TENTACLE_SPACING,
            this.tailRight);
    }
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

    this.tailHeadLeft.setAnchor(this.position, new Vector().fromAngle(
        this.direction.angle() + wiggle));
    this.tailHeadRight.setAnchor(this.position, new Vector().fromAngle(
        this.direction.angle() - wiggle));

    this.tailLeft.update(timeStep, this.velocity);
    this.tailRight.update(timeStep, this.velocity);
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

    this.tailLeft.draw(context);
    this.tailRight.draw(context);
};