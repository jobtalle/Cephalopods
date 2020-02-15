const Mutator = function() {

};

Mutator.prototype.mutate = function(dna) {
    this.mutateBody(dna.body);

    return dna;
};