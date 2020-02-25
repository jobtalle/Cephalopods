const Tentacle = function(dna, position, direction, radius, flip = false) {
    Appendage.call(this, dna, direction, radius, flip);

    this.length = dna.length;
    this.spring = dna.spring;
    this.springPower = dna.springPower;
    this.head = new SegmentHead(position.copy().add(this.delta));
    this.tail = this.build();
};

Tentacle.SPACING = 18;
Tentacle.MASS_PER_SEGMENT = 2.5;

Tentacle.prototype = Object.create(Appendage.prototype);

Tentacle.prototype.update = function(velocity) {
    this.tail.update(velocity);
};

Tentacle.prototype.draw = function(context, f) {
    this.tail.draw(context, f);
};

Tentacle.prototype.getLength = function() {
    return this.tail.getLength();
};

Tentacle.prototype.getMass = function() {
    return this.getLength() * Tentacle.MASS_PER_SEGMENT;
};

Tentacle.prototype.build = function() {
    let tail = this.head;

    for (let i = 0; i < this.length; ++i) {
        const spring = this.spring * Math.pow(1 - (i / (this.length - 1)) * 0.35, this.springPower);

        tail = new Segment(
            tail.position.copy().add(this.delta.copy().normalize().multiply(Tentacle.SPACING)),
            spring,
            Tentacle.SPACING,
            tail);
    }

    return tail;
};

Tentacle.prototype.setAnchor = function(position, angle) {
    const deltaAngle = this.calculateDelta();

    this.head.setAnchor(this.delta.add(position), deltaAngle + angle * this.sign);
};