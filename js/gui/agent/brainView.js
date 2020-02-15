const BrainView = function(element) {
    this.plot = new BrainPlot();

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.plot.element);
};

BrainView.prototype.onUpdate = function(environment) {
    if (!environment.selected)
        return;

    this.plot.update();
};

BrainView.prototype.onSelect = function(environment) {
    if (!environment.selected)
        return;

    this.plot.select(environment.selected.body.brain);
    this.plot.update();
};