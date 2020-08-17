const Body = function(dna, position, positionPrevious, direction, directionPrevious) {
    this.position = position;
    this.positionPrevious = positionPrevious;
    this.direction = direction;
    this.directionPrevious = directionPrevious;
    this.brain = new Brain(dna.brain);
    this.radius = dna.radius;

    this.appendages = [];

    for (let appendage = 0; appendage < dna.appendages.length; ++appendage)
        switch (dna.appendages[appendage].object) {
            case DNATentacle:
                this.appendages.push(...Appendage.instantiate(
                    Tentacle,
                    dna.appendages[appendage],
                    this.position,
                    this.direction,
                    this.radius));

                break;
        }
};

Body.MASS_PER_AREA = .04;
Body.NEURONS_PER_AREA = Body.MASS_PER_AREA / 4.0;
Body.RADIUS_MIN = 16.5;
Body.RADIUS_MAX = 100;

Body.getAllowedNeurons = function(radius) {
    return Math.floor(Math.PI * radius * radius * Body.NEURONS_PER_AREA);
};

Body.prototype.update = function(impulse) {
    this.brain.update();

    let input = 0;
    let output = 0;

    for (const appendage of this.appendages) {
        for (let i = 0; i < appendage.inputs; ++i)
            appendage.setInput(this.brain.outputs[output++].output, i);

        for (let i = 0; i < appendage.outputs; ++i)
            this.brain.inputs[input++].activation += appendage.getOutput(i);

        appendage.update(impulse);
    }
};

Body.prototype.draw = function(context, f) {
    const x = this.positionPrevious.x + (this.position.x - this.positionPrevious.x) * f;
    const y = this.positionPrevious.y + (this.position.y - this.positionPrevious.y) * f;
    const dx = this.directionPrevious.x + (this.direction.x - this.directionPrevious.x) * f;
    const dy = this.directionPrevious.y + (this.direction.y - this.directionPrevious.y) * f;

    for (const appendage of this.appendages)
        appendage.draw(context, f);

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.stroke();
};

Body.prototype.getMass = function() {
    let appendagesMass = 0;

    for (const appendage of this.appendages)
        appendagesMass += appendage.getMass();

    return Math.PI * this.radius * this.radius * Body.MASS_PER_AREA + appendagesMass;
};