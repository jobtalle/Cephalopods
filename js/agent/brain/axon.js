const Axon = function(dna, from, to) {
    this.weight = dna.weight;
    this.from = from;
    this.to = to;
};

Axon.prototype.update = function() {
    this.to.activation += this.from.output * this.weight;
};