const DNAAppendage = function(angle, object, inputs, outputs) {
    this.object = object;
    this.angle = angle;
    this.inputs = inputs;
    this.outputs = outputs;
};

DNAAppendage.prototype.isDoubled = function() {
    return this.angle !== 0 && this.angle !== Math.PI;
};

DNAAppendage.prototype.getRequiredInputs = function() {
    if (this.isDoubled())
        return this.inputs + this.inputs;

    return this.inputs;
};

DNAAppendage.prototype.getRequiredOutputs = function() {
    if (this.isDoubled())
        return this.outputs + this.outputs;

    return this.outputs;
};