const DNATentacles = function(
    tentacles = [new DNATentacle(-1.5), new DNATentacle(1.5)]) {
    this.tentacles = tentacles;
};

DNATentacles.prototype.copy = function() {
    const tentacles = new Array(this.tentacles.length);

    for (let tentacle = 0; tentacle < this.tentacles.length; ++tentacle)
        tentacles[tentacle] = this.tentacles[tentacle].copy();

    return new DNATentacles(
        tentacles);
};