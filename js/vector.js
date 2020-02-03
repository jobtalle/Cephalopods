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

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
};

Vector.prototype.equals = function(vector) {
    return this.x === vector.x && this.y === vector.y;
};