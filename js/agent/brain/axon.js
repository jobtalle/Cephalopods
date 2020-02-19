const Axon = function(dna, from, to) {
    this.weight = dna.weight;
    this.from = from;
    this.to = to;
};

Axon.WEIGHT_MIN = -5;
Axon.WEIGHT_MAX = 5;

Axon.prototype.update = function() {
    this.to.activation += this.from.output * this.weight;
};