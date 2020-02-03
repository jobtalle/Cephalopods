const Segment = function(position, spacing = 0, parent = null) {
    this.position = position;
    this.spacing = spacing;
    this.parent = parent;
};

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

    let dx = this.position.x - this.parent.position.x;
    let dy = this.position.y - this.parent.position.y;

    if (dx === 0 && dy === 0)
        dx = 1;

    const multiplier = this.spacing / Math.sqrt(dx * dx + dy * dy);

    this.position.x = this.parent.position.x + dx * multiplier;
    this.position.y = this.parent.position.y + dy * multiplier;
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