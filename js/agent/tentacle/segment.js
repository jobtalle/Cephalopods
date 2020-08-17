const Segment = function(position, spring = 0, spacing = 0, parent = null) {
    this.position = position.copy();
    this.positionPrevious = this.position.copy();
    this.spring = spring;
    this.spacing = spacing;
    this.parent = parent;
    this.delta = new Vector();

    if (parent)
        this.direction = this.parent.position.copy().subtract(this.position).normalize();
    else
        this.direction = new Vector();

    this.directionPrevious = this.direction.copy();
};

Segment.PUSH_POWER = 2.5;

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

Segment.prototype.update = function(velocity) {
    if (!this.parent)
        return;

    this.positionPrevious.set(this.position);
    this.directionPrevious.set(this.direction);

    this.parent.update(velocity);
    this.direction.set(this.parent.position).subtract(this.position).normalize();
    this.delta.set(this.direction).negate();

    const lateralDot = (this.direction.x * this.parent.direction.y - this.direction.y * this.parent.direction.x);

    if (this.direction.dot(this.parent.direction) < 0) {
        const force = this.spring * Math.sign(lateralDot);

        this.delta.x += this.direction.y * force;
        this.delta.y -= this.direction.x * force;
    }
    else {
        const force = this.spring * lateralDot;

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
    const push = (this.direction.y * dx - this.direction.x * dy) * Math.pow(Math.abs(lateralDot), Segment.PUSH_POWER);

    velocity.x -= this.direction.y * push;
    velocity.y += this.direction.x * push;
};

Segment.prototype.draw = function(context, f) {
    if (!this.parent)
        return;

    this.parent.draw(context, f);

    const x = this.positionPrevious.x + (this.position.x - this.positionPrevious.x) * f;
    const y = this.positionPrevious.y + (this.position.y - this.positionPrevious.y) * f;
    const px = this.parent.positionPrevious.x + (this.parent.position.x - this.parent.positionPrevious.x) * f;
    const py = this.parent.positionPrevious.y + (this.parent.position.y - this.parent.positionPrevious.y) * f;
    const dx = this.directionPrevious.x + (this.direction.x - this.directionPrevious.x) * f;
    const dy = this.directionPrevious.y + (this.direction.y - this.directionPrevious.y) * f;

    context.strokeStyle = "white";

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(px, py);
    context.stroke();

    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.stroke();

    // context.strokeStyle = "red";
    //
    // context.beginPath();
    // context.moveTo(x, y);
    // context.lineTo(x - dx * 40, y - dy * 40);
    // context.stroke();
};