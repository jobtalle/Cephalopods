const Agent = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(this.position, this.direction);
    this.impulse = new Vector();
    this.angularMomentum = 0;
};

Agent.FRICTION = .8;
Agent.TORQUE = 10;
Agent.ANGULAR_FRICTION = 8;

Agent.prototype.update = function(timeStep) {
    this.impulse.zero();
    this.body.update(timeStep, this.impulse);

    const forward = this.direction.dot(this.impulse);
    const side = this.direction.y * this.impulse.x - this.direction.x * this.impulse.y;

    this.velocity.x += this.direction.x * forward;
    this.velocity.y += this.direction.y * forward;

    this.angularMomentum += side * Agent.TORQUE * timeStep;
    this.angularMomentum -= this.angularMomentum * Agent.ANGULAR_FRICTION * timeStep;

    this.direction.fromAngle(this.direction.angle() + this.angularMomentum);

    this.velocity.x -= this.velocity.x * Agent.FRICTION * timeStep;
    this.velocity.y -= this.velocity.y * Agent.FRICTION * timeStep;

    this.position.add(this.velocity);
};

Agent.prototype.draw = function(context) {
    this.body.draw(context);
};