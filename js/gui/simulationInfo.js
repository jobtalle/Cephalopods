const SimulationInfo = function(element) {
    this.lineGeneration = new Line("Generation #");
    this.lineTime = new Line("Time: ", "s");

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.lineGeneration.element);
    element.appendChild(this.lineTime.element);
};

SimulationInfo.prototype.onNextGen = function(environment) {
    this.lineGeneration.update(environment.generation);
};

SimulationInfo.prototype.onUpdate = function(environment) {
    this.lineTime.update(environment.time);
};