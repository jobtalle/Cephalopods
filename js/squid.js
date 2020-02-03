const Squid = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = direction.copy().multiply(65);
    this.wiggle = 0;
    this.tailHead = this.tail = new Segment(position.copy());

    for (let i = 0; i < 15; ++i)
        this.tail = new Segment(
            this.tail.position.copy().add(new Vector(Squid.TENTACLE_SPACING, 0)),
            Squid.TENTACLE_SPACING,
            this.tail);
};

Squid.TENTACLE_SPACING = 20;
Squid.WIGGLE_SPEED = 3;

Squid.prototype.update = function(timeStep) {
    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;
    this.wiggle += Squid.WIGGLE_SPEED * timeStep;

    if (this.wiggle > Math.PI + Math.PI)
        this.wiggle -= Math.PI + Math.PI;

    this.tailHead.lateral = Math.sin(this.wiggle);
    this.tailHead.position.set(this.position);

    this.tail.update(timeStep);
};

Squid.prototype.draw = function(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.stroke();

    this.tail.draw(context);
};