const Squid = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = direction.copy().multiply(90);
    this.wiggle = 0;
    this.tailHeadLeft = this.tailLeft = new SegmentHead(position.copy());
    this.tailHeadRight = this.tailRight = new SegmentHead(position.copy());

    for (let i = 0; i < 15; ++i) {
        const spring = Squid.TENTACLE_SPRING * Math.pow(1 - i / 15, 2);

        this.tailLeft = new Segment(
            this.tailLeft.position.copy().add(new Vector(Squid.TENTACLE_SPACING, 0)),
            spring,
            Squid.TENTACLE_SPACING,
            this.tailLeft);

        this.tailRight = new Segment(
            this.tailRight.position.copy().add(new Vector(Squid.TENTACLE_SPACING, 0)),
            spring,
            Squid.TENTACLE_SPACING,
            this.tailRight);
    }
};

Squid.TENTACLE_SPRING = 8;
Squid.TENTACLE_SPACING = 20;
Squid.WIGGLE_SPEED = 4;

Squid.prototype.update = function(timeStep) {
    if (Math.random() < 0.005) {
        this.direction = new Vector().fromAngle(Math.random() * Math.PI * 2);
        this.velocity = this.direction.copy().multiply(90);
    }

    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;

    this.wiggle += Squid.WIGGLE_SPEED * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    const wiggle = Math.cos(this.wiggle) * Math.PI * 0.5;

    this.tailHeadLeft.setAnchor(this.position, new Vector().fromAngle(this.direction.angle() + wiggle));
    this.tailHeadRight.setAnchor(this.position, new Vector().fromAngle(this.direction.angle() - wiggle));

    this.tailLeft.update(timeStep);
    this.tailRight.update(timeStep);
};

Squid.prototype.draw = function(context) {
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