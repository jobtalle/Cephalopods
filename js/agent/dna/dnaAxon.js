const DNAAxon = function(
    weight = DNAAxon.DEFAULT_WEIGHT) {
    this.weight = weight;
};

DNAAxon.DEFAULT_WEIGHT = 0;

DNAAxon.prototype.copy = function() {
    return new DNAAxon(
        this.weight);
};