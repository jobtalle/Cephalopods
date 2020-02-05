const Body = function(position, direction) {
    this.tentacles = new Tentacles(position, direction);
    this.mouth = new Mouth();
    this.eyes = new Eyes();
};

Body.prototype.update = function(timeStep, position, direction, velocity) {
    this.tentacles.update(timeStep, position, direction, velocity);
    this.mouth.update(timeStep);
    this.eyes.update(timeStep);
};

Body.prototype.draw = function(context) {
    this.tentacles.draw(context);
    this.mouth.draw(context);
    this.eyes.draw(context);
};