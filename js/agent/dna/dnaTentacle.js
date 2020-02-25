const DNATentacle = function(
    angle = DNATentacle.DEFAULT_ANGLE,
    length = DNATentacle.DEFAULT_LENGTH,
    spring = DNATentacle.DEFAULT_SPRING,
    springPower = DNATentacle.DEFAULT_SPRING_POWER) {
    DNAAppendage.call(this, angle, DNATentacle);

    this.length = length;
    this.spring = spring;
    this.springPower = springPower;
};

DNATentacle.DEFAULT_ANGLE = 0;
DNATentacle.DEFAULT_LENGTH = 8;
DNATentacle.DEFAULT_SPRING = .5;
DNATentacle.DEFAULT_SPRING_POWER = 3;

DNATentacle.prototype = Object.create(DNAAppendage.prototype);

DNATentacle.prototype.copy = function() {
    return new DNATentacle(
        this.angle,
        this.length,
        this.spring,
        this.springPower);
};