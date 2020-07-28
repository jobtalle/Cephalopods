const Vector = function(x = 0, y = 0) {
    this.x = x;
    this.y = y;
};

Vector.prototype.fromAngle = function(angle) {
    this.x = Math.cos(angle);
    this.y = Math.sin(angle);

    return this;
};

Vector.prototype.copy = function() {
    return new Vector(this.x, this.y);
};

Vector.prototype.set = function(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
};

Vector.prototype.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

Vector.prototype.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
};

Vector.prototype.normalize = function() {
    const iLength = 1 / this.length();

    this.x *= iLength;
    this.y *= iLength;

    return this;
};

Vector.prototype.lengthSqr = function() {
    return this.dot(this);
};

Vector.prototype.length = function() {
    return Math.sqrt(this.dot(this));
};

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
};

Vector.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
};

Vector.prototype.zero = function() {
    this.x = this.y = 0;

    return this;
};

Vector.prototype.dot = function(vector) {
    return this.x * vector.x + this.y * vector.y;
};

Vector.prototype.angle = function() {
    return Math.atan2(this.y, this.x);
};

Vector.prototype.isZero = function() {
    return this.x === 0 || this.y === 0;
};