const AgentInfo = function(element) {
    this.lineMass = new Line("Mass: ");
    this.lineEaten = new Line("Eaten: ");
    this.lineVelocity = new Line("Velocity: ", "p/s");

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.lineMass.element);
    element.appendChild(this.lineEaten.element);
    element.appendChild(this.lineVelocity.element);
};

AgentInfo.prototype.onUpdate = function(environment) {
    if (!environment.selected)
        return;

    this.lineEaten.update(environment.selected.eaten);
    this.lineVelocity.update(environment.selected.velocity.length());
    // console.log(environment.selected.body.brain.outputs[0].output);
};

AgentInfo.prototype.onSelect = function(environment) {
    if (environment.selected) {
        this.lineMass.update(environment.selected.mass);

        this.onUpdate(environment);
    }
};