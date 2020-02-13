const DNA = function(
    body = new DNABody()) {
    this.body = body;
};

DNA.prototype.copy = function() {
    return new DNA(
        this.body.copy());
};