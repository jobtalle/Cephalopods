const Agent = function(dna, position, direction) {
    this.dna = dna;
    this.position = position;
    this.direction = direction;
    this.velocity = new Vector();
    this.body = new Body(dna.body, this.position, this.direction);
    this.impulse = new Vector();
    this.mass = this.body.getMass();
    this.eaten = 0;
};

Agent.FRICTION = 1;
Agent.TORQUE = .5;
Agent.IMPULSE = 150;

Agent.prototype.update = function(timeStep) {
    this.velocity.divide(1 + Agent.FRICTION * timeStep);

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