const Agent = function(dna, position, direction) {
    this.dna = dna;
    this.position = position;
    this.positionPrevious = this.position.copy();
    this.direction = direction;
    this.directionPrevious = this.direction.copy();
    this.velocity = new Vector();
    this.body = new Body(dna.body, this.position, this.positionPrevious, this.direction, this.directionPrevious);
    this.impulse = new Vector();
    this.mass = this.body.getMass();
    this.eaten = 0;
    this.damage = 0

    this.positionSaved = this.position.copy()
    this.positionPreviousSaved = this.positionPrevious.copy()
};

Agent.FRICTION = .88;
Agent.TORQUE = .8;
Agent.IMPULSE = 20;

Agent.prototype.collision = function () {
    this.position.set(this.positionSaved)
    this.positionPrevious.set(this.positionPreviousSaved)
    this.impulse.negate()
    this.velocity.zero()

    this.damage++;
}

Agent.prototype.update = function() {
    this.positionSaved = this.position.copy()
    this.positionPreviousSaved = this.positionPrevious.copy()

    this.positionPrevious.set(this.position);
    this.directionPrevious.set(this.direction);

    this.velocity.multiply(Agent.FRICTION);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.impulse.zero();
    this.body.update(this.impulse);

    // this.velocity.add(this.impulse.copy().multiply(Agent.IMPULSE / this.mass));
    this.velocity.add(this.direction.copy().multiply(this.direction.dot(this.impulse) * Agent.IMPULSE / this.mass));
    this.direction.subtract(this.impulse.copy().multiply(Agent.TORQUE / this.mass));
    this.direction.normalize();
};

Agent.prototype.draw = function(context, f) {
    this.body.draw(context, f);
};