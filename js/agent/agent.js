const Agent = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(this.position, this.velocity, this.direction);
};

Agent.FRICTION = 1;

Agent.prototype.update = function(timeStep) {
    this.body.update(timeStep);

    this.velocity.x -= this.velocity.x * Agent.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Agent.FRICTION * timeStep;

    this.position.add(this.velocity);
};

Agent.prototype.draw = function(context) {
    this.body.draw(context);
};