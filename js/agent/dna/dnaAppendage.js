const DNAAppendage = function(angle, object, inputs, outputs) {
    this.object = object;
    this.angle = angle;
    this.inputs = inputs;
    this.outputs = outputs;
};

DNAAppendage.makeRandomAngle = function() {
    const angle = Math.random() * Math.PI;

    if (angle < Appendage.ANGLE_ALIGN_THRESHOLD)
        return 0;
    else if (angle > Math.PI - Appendage.ANGLE_ALIGN_THRESHOLD)
        return Math.PI;

    return angle;
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