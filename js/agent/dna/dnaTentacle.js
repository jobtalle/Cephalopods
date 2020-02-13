const DNATentacle = function(
    length = DNATentacle.DEFAULT_LENGTH,
    spring = DNATentacle.DEFAULT_SPRING,
    springPower = DNATentacle.DEFAULT_SPRING_POWER) {
    this.length = length;
    this.spring = spring;
    this.springPower = springPower;
};

DNATentacle.DEFAULT_LENGTH = 16;
DNATentacle.DEFAULT_SPRING = 8;
DNATentacle.DEFAULT_SPRING_POWER = 2;

DNATentacle.prototype.copy = function() {
    return new DNATentacle(
        this.length,
        this.spring,
        this.springPower);
};