const Body = function(dna, position, positionPrevious, direction, directionPrevious) {
    this.position = position;
    this.positionPrevious = positionPrevious;
    this.direction = direction;
    this.directionPrevious = directionPrevious;
    this.brain = new Brain(dna.brain);
    this.mouth = new Mouth(dna.mouth);
    this.eyes = new Eyes(dna.eyes);
    this.radius = dna.radius;
    // this.tentacles = new Tentacles(dna.tentacles, this.position, this.direction, this.radius);

    this.tentacles = [];

    for (let tentacle = 0; tentacle < dna.tentacles.length; ++tentacle)
        this.tentacles.push(...Appendage.instantiate(
            Tentacle,
            dna.tentacles[tentacle],
            this.position,
            this.direction,
            this.radius));
};

Body.MASS_PER_AREA = .025;
Body.NEURONS_PER_AREA = .007;
Body.RADIUS_MIN = 16.5;
Body.RADIUS_MAX = 100;

Body.getAllowedNeurons = function(radius) {
    return Math.floor(Math.PI * radius * radius * Body.NEURONS_PER_AREA);
};

Body.prototype.update = function(impulse) {
    this.brain.update();

    let output = 0;

    for (let tentacle = 0; tentacle < this.tentacles.length; ++tentacle) {
        this.tentacles[tentacle].setAnchor(this.position, 2 * this.brain.outputs[output++].output - 1);
        this.tentacles[tentacle].update(impulse);
    }

    this.mouth.update();
    this.eyes.update();
};

Body.prototype.draw = function(context, f) {
    const x = this.positionPrevious.x + (this.position.x - this.positionPrevious.x) * f;
    const y = this.positionPrevious.y + (this.position.y - this.positionPrevious.y) * f;
    const dx = this.directionPrevious.x + (this.direction.x - this.directionPrevious.x) * f;
    const dy = this.directionPrevious.y + (this.direction.y - this.directionPrevious.y) * f;

    for (let tentacle = 0; tentacle < this.tentacles.length; ++tentacle)
        this.tentacles[tentacle].draw(context, f);

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
    let tentacleMass = 0;

    for (let tentacle = 0; tentacle < this.tentacles.length; ++tentacle)
        tentacleMass += this.tentacles[tentacle].getMass();

    return Math.PI * this.radius * this.radius * Body.MASS_PER_AREA + tentacleMass;
};