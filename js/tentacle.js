const Tentacle = function(position, direction, length, spring, springPower) {
    this.length = length;
    this.direction = direction.copy();
    this.spring = spring;
    this.springPower = springPower;
    this.head = new SegmentHead(position.copy());
    this.tail = this.build();
};

Tentacle.SPACING = 18;

Tentacle.prototype.update = function(timeStep, velocity) {
    this.tail.update(timeStep, velocity);
};

Tentacle.prototype.draw = function(context) {
    this.tail.draw(context);
};

Tentacle.prototype.build = function() {
    let tail = this.head;

    for (let i = 0; i < this.length; ++i) {
        const spring = this.spring * Math.pow(1 - (i / (this.length - 1)) * .35, this.springPower);
        const offset = this.direction.copy().negate().multiply(Tentacle.SPACING);

        tail = new Segment(
            tail.position.copy().add(offset),
            spring,
            Tentacle.SPACING,
            tail);
    }

    return tail;
};

Tentacle.prototype.setAnchor = function(position, angle) {
    this.direction.fromAngle(angle);
    this.head.setAnchor(position, this.direction);
};