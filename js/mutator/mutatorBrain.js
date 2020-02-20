Mutator.prototype.mutateBrain = function(dna) {
    for (const axon of dna.axons)
        this.mutateAxon(axon);
};