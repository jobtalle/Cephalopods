const Appendage = function(dna, inputs, outputs, position, direction, radius, flip) {
    const angle = flip ? -dna.angle : dna.angle;

    this.inputs = inputs;
    this.outputs = outputs;
    this.offset = new Vector().fromAngle(angle).multiply(-radius);
    this.position = position;
    this.direction = direction;
    this.sign = angle === 0 ? 1 : Math.sign(angle);
    this.delta = new Vector();

    this.calculateDelta();
};

Appendage.instantiate = function(object, dna) {
    const args = [...arguments].slice(2);

    const instances = [new object(dna, ...args)];

    if (dna.angle !== 0 && dna.angle !== Math.PI)
        instances.push(new object(dna, ...args, true));

    return instances;
};

Appendage.prototype.calculateDelta = function() {
    this.delta.x = this.offset.x * this.direction.x - this.offset.y * this.direction.y;
    this.delta.y = this.offset.x * this.direction.y + this.offset.y * this.direction.x;

    return Math.atan2(-this.delta.y, -this.delta.x);
};