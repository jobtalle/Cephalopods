const Info = function(element, cephalopods) {
    this.lineGeneration = new Line("Generation #");
    this.lineTime = new Line("Time: ", "s");

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.lineGeneration.element);
    element.appendChild(this.lineTime.element);

    cephalopods.environment.onNextGen = this.onNextGen.bind(this);
    cephalopods.environment.onUpdate = this.onUpdate.bind(this);

    this.onNextGen(cephalopods.environment);
    this.onUpdate(cephalopods.environment);
};

Info.prototype.onNextGen = function(environment) {
    this.lineGeneration.update(environment.generation);
};

Info.prototype.onUpdate = function(environment) {
    this.lineTime.update(environment.time);
};