const Body = function(dna, position, positionPrevious, direction, directionPrevious) {
    this.position = position;
    this.positionPrevious = positionPrevious;
    this.direction = direction;
    this.directionPrevious = directionPrevious;
    this.brain = new Brain(dna.brain);
    this.mouth = new Mouth(dna.mouth);
    this.eyes = new Eyes(dna.eyes);
    this.radius = dna.radius;
    this.tentacles = new Tentacles(dna.tentacles, this.position, this.direction, this.radius);
};

Body.MASS_BASE = 50;

Body.prototype.update = function(impulse) {
    this.brain.update();
    this.tentacles.update(impulse, this.brain.outputs);
    this.mouth.update();
    this.eyes.update();
};

Body.prototype.draw = function(context, f) {
    const x = this.positionPrevious.x + (this.position.x - this.positionPrevious.x) * f;
    const y = this.positionPrevious.y + (this.position.y - this.positionPrevious.y) * f;
    const dx = this.directionPrevious.x + (this.direction.x - this.directionPrevious.x) * f;
    const dy = this.directionPrevious.y + (this.direction.y - this.directionPrevious.y) * f;

    this.tentacles.draw(context, f);
    this.mouth.draw(context);
    this.eyes.draw(context);

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(
        x - dx * this.radius,
        y - dy * this.radius);
    context.lineTo(
        x + dx * this.radius,
        y + dy * this.radius);
    context.stroke();

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.stroke();
};

Body.prototype.getMass = function() {
    return Body.MASS_BASE + this.tentacles.getMass();
};