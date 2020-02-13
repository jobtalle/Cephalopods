const DNATentacle = function(
    angle = DNATentacle.DEFAULT_ANGLE,
    length = DNATentacle.DEFAULT_LENGTH,
    spring = DNATentacle.DEFAULT_SPRING,
    springPower = DNATentacle.DEFAULT_SPRING_POWER) {
    this.angle = angle;
    this.length = length;
    this.spring = spring;
    this.springPower = springPower;
};

DNATentacle.DEFAULT_ANGLE = 0;
DNATentacle.DEFAULT_LENGTH = 16;
DNATentacle.DEFAULT_SPRING = 8;
DNATentacle.DEFAULT_SPRING_POWER = 2;

DNATentacle.prototype.copy = function() {
    return new DNATentacle(
        this.angle,
        this.length,
        this.spring,
        this.springPower);
};