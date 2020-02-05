const Agent = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(position, direction);
};

Agent.FRICTION = 1.5;

Agent.prototype.update = function(timeStep) {
    this.body.update(timeStep, this.position, this.direction, this.velocity);

    this.velocity.x -= this.velocity.x * Agent.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Agent.FRICTION * timeStep;

    this.position.add(this.velocity);
};

Agent.prototype.draw = function(context) {
    context.strokeStyle = "red";

    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.position.x + this.direction.x * 20, this.position.y + this.direction.y * 20);
    context.stroke();

    this.body.draw(context);
};