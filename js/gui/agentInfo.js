const AgentInfo = function(element, cephalopods) {
    this.lineVelocity = new Line("Velocity: ", "u/s");

    element.appendChild(this.lineVelocity.element);
};

AgentInfo.prototype.onUpdate = function(environment) {
    this.lineVelocity.update(environment.selected.velocity.length());
};

AgentInfo.prototype.onSelect = function(environment) {
    if (environment.selected)
        this.onUpdate(environment);
};