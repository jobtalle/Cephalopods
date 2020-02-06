const Body = function(position, direction) {
    this.position = position;
    this.direction = direction;
    this.tentacles = new Tentacles(this.position, this.direction);
    this.mouth = new Mouth();
    this.eyes = new Eyes();
    this.radius = 20;
};

Body.MASS_BASE = 20;

Body.prototype.update = function(timeStep, impulse) {
    this.tentacles.update(timeStep, impulse);
    this.mouth.update(timeStep);
    this.eyes.update(timeStep);
};

Body.prototype.draw = function(context) {
    this.tentacles.draw(context);
    this.mouth.draw(context);
    this.eyes.draw(context);

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(
        this.position.x - this.direction.x * this.radius,
        this.position.y - this.direction.y * this.radius);
    context.lineTo(
        this.position.x + this.direction.x * this.radius,
        this.position.y + this.direction.y * this.radius);
    context.stroke();
};

Body.prototype.getMass = function() {
    return Body.MASS_BASE + this.tentacles.getMass();
};