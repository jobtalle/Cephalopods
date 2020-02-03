const Squid = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = direction.copy();
    this.tail = new Segment(position.copy());

    for (let i = 0; i < 20; ++i)
        this.tail = new Segment(
            this.tail.position.copy().add(new Vector(Squid.TENTACLE_SPACING, 0)),
            Squid.TENTACLE_SPACING,
            this.tail);
};

Squid.TENTACLE_SPACING = 20;

Squid.prototype.update = function(timeStep) {
    this.tail.update(timeStep);

    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;
    this.tail.getHead().position.set(this.position);
};

Squid.prototype.draw = function(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.stroke();

    this.tail.draw(context);
};