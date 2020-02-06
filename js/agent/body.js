const Body = function(position, velocity, direction) {
    this.position = position;
    this.velocity = velocity;
    this.direction = direction;
    this.tentacles = new Tentacles(this.position, this.direction);
    this.mouth = new Mouth();
    this.eyes = new Eyes();
};

Body.prototype.update = function(timeStep) {
    this.tentacles.update(timeStep, this.velocity);
    this.mouth.update(timeStep);
    this.eyes.update(timeStep);
};

Body.prototype.draw = function(context) {
    this.tentacles.draw(context);
    this.mouth.draw(context);
    this.eyes.draw(context);
};