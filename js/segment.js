const Segment = function(position, spacing = 0, parent = null) {
    this.position = position;
    this.spacing = spacing;
    this.parent = parent;
    this.lateral = 0;
    this.delta = new Vector();

    if (parent)
        this.direction = this.position.copy().subtract(this.parent.position).normalize();
    else
        this.direction = null;
};

Segment.LATERAL_AMPLITUDE = 0.1;
Segment.LATERAL_FOLLOW = 5;
Segment.MAX_ANGLE = Math.PI * 0.25;
Segment.MAX_ANGLE_COS = Math.cos(Segment.MAX_ANGLE);

Segment.prototype.getHead = function() {
    if (this.parent)
        return this.parent.getHead();
    else
        return this;
};

Segment.prototype.update = function(timeStep) {
    if (!this.parent)
        return;

    this.parent.update(timeStep);
    this.lateral += (this.parent.lateral - this.lateral) * timeStep * Segment.LATERAL_FOLLOW;
    this.direction.set(this.position).subtract(this.parent.position).normalize();

    this.delta.x = this.direction.x + this.parent.lateral * this.direction.y * Segment.LATERAL_AMPLITUDE;
    this.delta.y = this.direction.y - this.parent.lateral * this.direction.x * Segment.LATERAL_AMPLITUDE;

    if (this.delta.isZero()) {
        this.position.x = this.parent.position.x + this.spacing;
        this.position.y = 0;
    }
    else {
        this.delta.normalize();

        if (this.parent.direction) {
            const dot = this.parent.direction.dot(this.delta);

            if (dot < Segment.MAX_ANGLE_COS) {
                const signDot = this.delta.x * this.parent.direction.y - this.delta.y * this.parent.direction.x;
                const angle = Math.atan2(this.parent.direction.y, this.parent.direction.x);

                if (signDot < 0)
                    this.delta.fromAngle(angle + Segment.MAX_ANGLE);
                else
                    this.delta.fromAngle(angle - Segment.MAX_ANGLE);
            }
        }

        this.position.set(this.parent.position).add(this.delta.multiply(this.spacing));
    }
};

Segment.prototype.draw = function(context) {
    if (!this.parent)
        return;

    this.parent.draw(context);

    context.strokeStyle = "black";

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
    context.lineTo(this.position.x + this.direction.x * 40, this.position.y + this.direction.y * 40);
    context.stroke();
};