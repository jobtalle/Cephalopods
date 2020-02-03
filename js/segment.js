const Segment = function(position, spacing = 0, parent = null) {
    this.position = position;
    this.spacing = spacing;
    this.parent = parent;
    this.lateral = 0;
    this.lateralForce = 0;
};

Segment.LATERAL_AMPLITUDE = 0.1;
Segment.LATERAL_FOLLOW = 5;

Segment.prototype.getHead = function() {
    if (this.parent)
        return this.parent.getHead();
    else
        return this;
};

Segment.prototype.update = function(direction, timeStep) {
    if (!this.parent)
        return;

    this.parent.update(direction, timeStep);
    this.lateral += (this.parent.lateral - this.lateral) * timeStep * Segment.LATERAL_FOLLOW;

    const dxp = this.position.x - this.parent.position.x;
    const dyp = this.position.y - this.parent.position.y;
    const l = Math.sqrt(dxp * dxp + dyp * dyp);

    const dx = dxp + this.parent.lateral * direction.y * this.spacing * Segment.LATERAL_AMPLITUDE;
    const dy = dyp - this.parent.lateral * direction.x * this.spacing * Segment.LATERAL_AMPLITUDE;

    if (dx === 0 && dy === 0) {
        this.position.x = this.parent.position.x + this.spacing;
        this.position.y = 0;
    }
    else {
        const multiplier = this.spacing / Math.sqrt(dx * dx + dy * dy);

        this.position.x = this.parent.position.x + dx * multiplier;
        this.position.y = this.parent.position.y + dy * multiplier;
    }
};

Segment.prototype.draw = function(context) {
    if (!this.parent)
        return;

    this.parent.draw(context);

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.parent.position.x, this.parent.position.y);
    context.stroke();

    context.beginPath();
    context.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
    context.stroke();
};