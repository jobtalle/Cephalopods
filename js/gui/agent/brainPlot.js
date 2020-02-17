const BrainPlot = function() {
    this.element = document.createElement("canvas");
    this.element.width = BrainPlot.WIDTH;
    this.element.height = BrainPlot.HEIGHT;
    this.cellRadius = 0;
    this.columns = 0;
    this.rows = 0;
    this.brain = null;
};

BrainPlot.WIDTH = 300;
BrainPlot.HEIGHT = 300;
BrainPlot.RADIUS_INSET = 2;
BrainPlot.COLOR_NEURON_INPUT = "lime";
BrainPlot.COLOR_NEURON = "orange";
BrainPlot.COLOR_NEURON_OUTPUT = "aqua";
BrainPlot.COLOR_EDGE = "white";

BrainPlot.prototype.update = function(environment) {
    const context = this.element.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(
        .5 * (this.element.width - this.cellRadius * 2 * this.columns),
        .5 * (this.element.height - this.cellRadius * 2 * this.rows));

    this.draw(context, environment.getFrameProgression());

    context.restore();
};

BrainPlot.prototype.select = function(brain) {
    this.build(brain);
};

BrainPlot.prototype.drawNeuron = function(context, x, y, activation, color) {
    context.strokeStyle = BrainPlot.COLOR_EDGE;
    context.globalAlpha = activation;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, this.cellRadius - BrainPlot.RADIUS_INSET, 0, Math.PI + Math.PI);
    context.fill();
    context.globalAlpha = 1;
    context.stroke();
};

BrainPlot.prototype.getOutput = function(neuron, f) {
    return neuron.outputPrevious + (neuron.output - neuron.outputPrevious) * f;
};

BrainPlot.prototype.draw = function(context, f) {
    for (let input = 0; input < this.brain.inputs.length; ++input)
        this.drawNeuron(
            context,
            this.cellRadius * (1 + 2 * input),
            this.cellRadius,
            this.getOutput(this.brain.inputs[input], f),
            BrainPlot.COLOR_NEURON_INPUT);

    let row = 1;
    let column = 0;

    for (let neuron = 0; neuron < this.brain.neurons.length; ++neuron) {
        this.drawNeuron(
            context,
            this.cellRadius * (1 + 2 * column),
            this.cellRadius * (1 + 2 * row),
            this.getOutput(this.brain.neurons[neuron], f),
            BrainPlot.COLOR_NEURON);

        if (++column === this.columns) {
            column = 0;
            ++row;
        }
    }

    if (column !== 0)
        ++row;

    for (let output = 0; output < this.brain.outputs.length; ++output)
        this.drawNeuron(
            context,
            this.cellRadius * (1 + 2 * output),
            this.cellRadius * (1 + 2 * row),
            this.getOutput(this.brain.outputs[output], f),
            BrainPlot.COLOR_NEURON_OUTPUT);
};

BrainPlot.prototype.build = function(brain) {
    this.columns = Math.max(
        Math.ceil(Math.sqrt(brain.neurons.length)),
        Math.max(brain.inputs.length, brain.outputs.length));
    this.rows = this.columns + 2;

    this.cellRadius = .5 * Math.min(this.element.width / this.columns, this.element.height / this.rows);
    this.brain = brain;
};