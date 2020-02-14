const DNAAxon = function(
    from,
    to,
    weight = -1 + 2 * Math.random()) {
    this.from = from;
    this.to = to;
    this.weight = weight;
};

DNAAxon.DEFAULT_WEIGHT = .1;
DNAAxon.INDEX_MASK = 0x00FFFFFF;
DNAAxon.FLAG_INPUT = 0x01000000;
DNAAxon.FLAG_NEURON = 0x02000000;
DNAAxon.FLAG_OUTPUT = 0x04000000;

DNAAxon.prototype.copy = function() {
    return new DNAAxon(
        this.from,
        this.to,
        this.weight);
};