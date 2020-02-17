const Segment = function(position, spring = 0, spacing = 0, parent = null) {
    this.position = position.copy();
    this.spring = spring;
    this.spacing = spacing;
    this.parent = parent;
    this.delta = new Vector();

    if (parent)
        this.direction = this.parent.position.copy().subtract(this.position).normalize();
    else
        this.direction = new Vector();
};

Segment.prototype.getHead = function() {
    if (this.parent)
        return this.parent.getHead();
    else
        return this;
};

Segment.prototype.getLength = function() {
    if (this.parent)
        return 1 + this.parent.getLength();

    return 0;
};

Segment.prototype.update = function(timeStep, velocity) {
    if (!this.parent)
        return;

    const xp = this.position.x;
    const yp = this.position.y;

    this.parent.update(timeStep, velocity);
    this.direction.set(this.parent.position).subtract(this.position).normalize();
    this.delta.set(this.direction).negate();

    const lateralDot = (this.direction.x * this.parent.direction.y - this.direction.y * this.parent.direction.x);

    if (this.direction.dot(this.parent.direction) < 0) {
        const force = this.spring * Math.sign(lateralDot) * timeStep;

        this.delta.x += this.direction.y * force;
        this.delta.y -= this.direction.x * force;
    }
    else {
        const force = this.spring * lateralDot * timeStep;

        this.delta.x += this.direction.y * force;
        this.delta.y -= this.direction.x * force;
    }

    if (this.delta.isZero()) {
        this.position.x = this.parent.position.x + this.spacing;
        this.position.y = 0;
    }
    else
        this.position.set(this.parent.position).add(this.delta.multiply(this.spacing / this.delta.length()));

    const dx = this.position.x - xp;
    const dy = this.position.y - yp;
    const push = (this.direction.y * dx - this.direction.x * dy) * lateralDot * lateralDot;

    velocity.x -= this.direction.y * push;
    velocity.y += this.direction.x * push;
};

Segment.prototype.draw = function(context) {
    if (!this.parent)
        return;

    this.parent.draw(context);

    context.strokeStyle = "white";

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.parent.position.x, this.parent.position.y);
    context.stroke();

    context.beginPath();
    context.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
    context.stroke();

    context.strokeStyle = "red";

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.position.x - this.direction.x * 40, this.position.y - this.direction.y * 40);
    context.stroke();
};