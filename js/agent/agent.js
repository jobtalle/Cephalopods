const Agent = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(this.position, this.direction);
    this.impulse = new Vector();
    this.mass = this.body.getMass();
};

Agent.FRICTION = .8;
Agent.TORQUE = .5;
Agent.ANGULAR_FRICTION = .5;
Agent.IMPULSE = 50;

Agent.prototype.update = function(timeStep) {
    this.velocity.x -= this.velocity.x * Agent.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Agent.FRICTION * timeStep;

    this.position.x += this.velocity.x * timeStep;
    this.position.y += this.velocity.y * timeStep;

    this.impulse.zero();
    this.body.update(timeStep, this.impulse);

    this.velocity.add(this.impulse.copy().multiply(Agent.IMPULSE / this.mass));
    this.direction.add(this.impulse.copy().multiply(Agent.TORQUE / this.mass));
    this.direction.normalize();
};

Agent.prototype.draw = function(context) {
    this.body.draw(context);
};