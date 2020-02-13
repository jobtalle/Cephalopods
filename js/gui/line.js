const Line = function(prefix, suffix = null, value = 0) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.element = document.createElement("span");
    this.element.className = Line.CLASS;
};

Line.CLASS = "line";
Line.DECIMALS = 2;

Line.prototype.update = function(value) {
    if (Number.isInteger(value))
        this.element.innerText = this.prefix + value.toString();
    else
        this.element.innerText = this.prefix + value.toFixed(Line.DECIMALS);

    if (this.suffix)
        this.element.innerText += this.suffix;
};