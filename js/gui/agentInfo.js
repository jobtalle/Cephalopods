const AgentInfo = function(element) {
    this.lineMass = new Line("Mass: ");
    this.lineVelocity = new Line("Velocity: ", "p/s");

    element.appendChild(this.lineMass.element);
    element.appendChild(this.lineVelocity.element);
};

AgentInfo.prototype.onUpdate = function(environment) {
    if (!environment.selected)
        return;

    this.lineVelocity.update(environment.selected.velocity.length());
};

AgentInfo.prototype.onSelect = function(environment) {
    if (environment.selected) {
        this.lineMass.update(environment.selected.mass);

        this.onUpdate(environment);
    }
};