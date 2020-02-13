const Body = function(dna, position, direction) {
    this.position = position;
    this.direction = direction;
    this.tentacles = new Tentacles(dna.tentacles, this.position, this.direction);
    this.mouth = new Mouth(dna.mouth);
    this.eyes = new Eyes(dna.eyes);
    this.radius = dna.radius;
};

Body.MASS_BASE = 50;

Body.prototype.update = function(timeStep, impulse) {
    this.tentacles.update(timeStep, impulse);
    this.mouth.update(timeStep);
    this.eyes.update(timeStep);
};

Body.prototype.draw = function(context) {
    this.tentacles.draw(context);
    this.mouth.draw(context);
    this.eyes.draw(context);

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(
        this.position.x - this.direction.x * this.radius,
        this.position.y - this.direction.y * this.radius);
    context.lineTo(
        this.position.x + this.direction.x * this.radius,
        this.position.y + this.direction.y * this.radius);
    context.stroke();

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
};

Body.prototype.getMass = function() {
    return Body.MASS_BASE + this.tentacles.getMass();
};