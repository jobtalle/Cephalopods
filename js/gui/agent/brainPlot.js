const BrainPlot = function() {
    this.element = document.createElement("canvas");
    this.element.width = BrainPlot.WIDTH;
    this.element.height = BrainPlot.HEIGHT;
    this.neurons = [];
    this.axons = [];
};

BrainPlot.WIDTH = 300;
BrainPlot.HEIGHT = 300;
BrainPlot.RADIUS_MAX = 32;
BrainPlot.RADIUS_INSET = .3;
BrainPlot.LINE_WIDTH = 2;

BrainPlot.prototype.update = function(environment) {
    const progress = environment.getFrameProgression();
    const context = this.element.getContext("2d");

    for (const neuron of this.neurons)
        neuron.update(progress);

    for (const axon of this.axons)
        axon.update(progress);

    context.lineWidth = BrainPlot.LINE_WIDTH;
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.draw(context, progress);
};

BrainPlot.prototype.select = function(brain) {
    this.build(brain);
};

BrainPlot.prototype.draw = function(context, f) {
    context.save();

    NeuronPlot.prepareContext(context);

    for (const neuron of this.neurons)
        neuron.draw(context, f);

    context.restore();
    context.save();

    AxonPlot.prepareContext(context);

    for (const axon of this.axons)
        axon.draw(context, f);

    context.restore();
};

BrainPlot.prototype.build = function(brain) {
    const columns = Math.max(
        Math.ceil(Math.sqrt(brain.neurons.length)),
        Math.max(brain.inputs.length, brain.outputs.length));
    const rows = Math.floor(Math.sqrt(brain.neurons.length)) +
        (brain.inputs.length !== 0) +
        (brain.outputs.length !== 0);
    const cellRadius = Math.min(
        BrainPlot.RADIUS_MAX,
        .5 * Math.min(this.element.width / columns, this.element.height / rows));
    const cellRadiusDraw = cellRadius * (1 - BrainPlot.RADIUS_INSET);
    const xStart = (this.element.width - columns * cellRadius * 2) * .5;
    const yStart = (this.element.height - rows * cellRadius * 2) * .5;
    let row = 0;
    let column = 0;

    this.neurons.length = 0;
    this.axons.length = 0;

    for (let input = 0; input < brain.inputs.length; ++input)
        this.neurons.push(new NeuronPlot(
            brain.inputs[input],
            NeuronPlot.TYPE_INPUT,
            xStart + cellRadius * (1 + 2 * input),
            yStart + cellRadius,
            cellRadiusDraw));

    if (brain.inputs.length !== 0)
        ++row;

    for (let neuron = 0; neuron < brain.neurons.length; ++neuron) {
        this.neurons.push(new NeuronPlot(
            brain.neurons[neuron],
            NeuronPlot.TYPE_NEURON,
            xStart + cellRadius * (1 + 2 * column),
            yStart + cellRadius * (1 + 2 * row),
            cellRadiusDraw));

        if (++column === columns) {
            column = 0;
            ++row;
        }
    }

    if (column !== 0)
        ++row;

    for (let output = 0; output < brain.outputs.length; ++output)
        this.neurons.push(new NeuronPlot(
            brain.outputs[output],
            NeuronPlot.TYPE_OUTPUT,
            xStart + cellRadius * (1 + 2 * output),
            yStart + cellRadius * (1 + 2 * row),
            cellRadiusDraw));

    for (const axon of brain.axons)
        this.axons.push(new AxonPlot(axon, this.neurons, cellRadiusDraw));
};