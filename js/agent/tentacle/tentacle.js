const Tentacle = function(position, offset, direction, length, spring, springPower) {
    this.offset = offset;
    this.direction = direction;
    this.length = length;
    this.spring = spring;
    this.springPower = springPower;
    this.delta = new Vector();
    this.calculateDelta();
    this.head = new SegmentHead(this.delta);
    this.tail = this.build();
};

Tentacle.SPACING = 18;

Tentacle.prototype.update = function(timeStep, velocity) {
    this.tail.update(timeStep, velocity);
};

Tentacle.prototype.draw = function(context) {
    this.tail.draw(context);
};

Tentacle.prototype.calculateDelta = function() {
    this.delta.x = this.offset.x * this.direction.x - this.offset.y * this.direction.y;
    this.delta.y = this.offset.x * this.direction.y + this.offset.y * this.direction.x;

    return Math.atan2(-this.delta.y, -this.delta.x);
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
    const deltaAngle = this.calculateDelta();

    this.head.setAnchor(this.delta.add(position), deltaAngle + angle);
};