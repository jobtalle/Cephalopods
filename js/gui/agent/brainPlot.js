const BrainPlot = function() {
    this.element = document.createElement("canvas");
    this.element.width = BrainPlot.WIDTH;
    this.element.height = BrainPlot.HEIGHT;
    this.cellRadius = 0;
    this.columns = 0;
    this.brain = null;
};

BrainPlot.WIDTH = 300;
BrainPlot.HEIGHT = 300;
BrainPlot.RADIUS_INSET = 2;

BrainPlot.prototype.update = function() {
    const context = this.element.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    this.draw(context);
};

BrainPlot.prototype.select = function(brain) {
    this.build(brain);
};

BrainPlot.prototype.draw = function(context) {
    const drawRadius = this.cellRadius - BrainPlot.RADIUS_INSET;

    context.fillStyle = "white";
    context.strokeStyle = "white";

    for (let input = 0; input < this.brain.inputs.length; ++input) {
        context.beginPath();
        context.arc(
            this.cellRadius * (1 + 2 * input),
            this.cellRadius,
            drawRadius, 0, Math.PI + Math.PI);
        context.fill();
        context.stroke();
    }

    let row = 1;
    let column = 0;

    context.fillStyle = "orange";

    for (let neuron = 0; neuron < this.brain.neurons.length; ++neuron) {
        context.beginPath();
        context.arc(
            this.cellRadius * (1 + 2 * column),
            this.cellRadius * (1 + 2 * row),
            drawRadius, 0, Math.PI + Math.PI);
        context.fill();

        if (++column === this.columns) {
            column = 0;
            ++row;
        }
    }

    if (column !== 0)
        ++row;

    context.fillStyle = "aqua";

    for (let output = 0; output < this.brain.outputs.length; ++output) {
        context.beginPath();
        context.arc(
            this.cellRadius * (1 + 2 * output),
            this.cellRadius * (1 + 2 * row),
            drawRadius, 0, Math.PI + Math.PI);
        context.fill();
    }
};

BrainPlot.prototype.build = function(brain) {
    this.columns = Math.max(
        Math.ceil(Math.sqrt(brain.neurons.length)),
        Math.max(brain.inputs.length, brain.outputs.length));
    const rows = this.columns + 2;

    this.cellRadius = .5 * Math.min(this.element.width / this.columns, this.element.height / rows);
    this.brain = brain;
};