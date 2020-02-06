const Tentacle = function(position, offset, direction, length, spring, springPower) {
    this.offset = offset;
    this.direction = direction;
    this.length = length;
    this.spring = spring;
    this.springPower = springPower;
    this.position = new Vector();
    this.calculatePosition(position);
    this.head = new SegmentHead(this.position);
    this.tail = this.build();
};

Tentacle.SPACING = 18;

Tentacle.prototype.update = function(timeStep, velocity) {
    this.tail.update(timeStep, velocity);
};

Tentacle.prototype.draw = function(context) {
    this.tail.draw(context);
};

Tentacle.prototype.calculatePosition = function(origin) {
    this.position.x = origin.x + this.offset.x * this.direction.x - this.offset.y * this.direction.y;
    this.position.y = origin.y + this.offset.x * this.direction.y + this.offset.y * this.direction.x;
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
    this.calculatePosition(position);
    this.head.setAnchor(this.position, this.direction.angle() + angle);
};