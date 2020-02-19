const NeuronPlot = function(neuron, type, x, y, radius) {
    this.neuron = neuron;
    this.type = type;
    this.x = x;
    this.y = y;
    this.radius = radius;
};

NeuronPlot.TYPE_INPUT = 0;
NeuronPlot.TYPE_NEURON = 1;
NeuronPlot.TYPE_OUTPUT = 2;
NeuronPlot.COLOR_FILL = [
    "lime",
    "orange",
    "aqua"
];
NeuronPlot.COLOR_EDGE = "white";

NeuronPlot.prepareContext = function(context) {
    context.strokeStyle = NeuronPlot.COLOR_EDGE;
};

NeuronPlot.prototype.getActivation = function(f) {
    return this.neuron.outputPrevious + (this.neuron.output - this.neuron.outputPrevious) * f;
};

NeuronPlot.prototype.update = function(f) {

};

NeuronPlot.prototype.draw = function(context, f) {
    context.globalAlpha = this.getActivation(f);
    context.fillStyle = NeuronPlot.COLOR_FILL[this.type];
    context.beginPath();
    context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI + Math.PI);
    context.fill();
    context.globalAlpha = 1;
    context.stroke();
};