const Segment = function(position, spring = 0, spacing = 0, parent = null) {
    this.position = position.copy();
    this.positionPrevious = position.copy();
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

Segment.prototype.update = function(timeStep, velocity) {
    if (!this.parent)
        return;

    this.positionPrevious.set(this.position);
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

    const dx = this.position.x - this.positionPrevious.x;
    const dy = this.position.y - this.positionPrevious.y;
    const dot = (this.direction.y * dx - this.direction.x * dy) * timeStep;

    velocity.x -= this.direction.y * dot;
    velocity.y += this.direction.x * dot;
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