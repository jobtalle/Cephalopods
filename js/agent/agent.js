const Agent = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(this.position, this.direction);
    this.impulse = new Vector();
    this.mass = this.body.getMass();
};

Agent.FRICTION = .8;
Agent.TORQUE = 15;
Agent.ANGULAR_FRICTION = .5;

Agent.prototype.update = function(timeStep) {
    this.impulse.zero();
    this.body.update(timeStep, this.impulse);

    this.velocity.add(this.impulse);
    this.direction.add(this.impulse.multiply(Agent.TORQUE / this.mass));
    this.direction.normalize();

    this.velocity.x -= this.velocity.x * Agent.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Agent.FRICTION * timeStep;

    this.position.add(this.velocity);
};

Agent.prototype.draw = function(context) {
    this.body.draw(context);
};