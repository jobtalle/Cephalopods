const DNAAxon = function(
    from,
    to,
    weight = (-.5 + Math.random()) * 200) {
    this.from = from;
    this.to = to;
    this.weight = weight;
};

DNAAxon.DEFAULT_WEIGHT = .1;
DNAAxon.INDEX_MASK = 0x0FFFFFFF;
DNAAxon.FLAG_INPUT = 0x10000000;
DNAAxon.FLAG_NEURON = 0x20000000;
DNAAxon.FLAG_OUTPUT = 0x40000000;

DNAAxon.prototype.copy = function() {
    return new DNAAxon(
        this.from,
        this.to,
        this.weight);
};