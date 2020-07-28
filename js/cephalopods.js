const Cephalopods = function(width, height, agentsCount, simTime) {
    this.width = width;
    this.height = height;
    this.environment = new Environment(
        1200,
        new Selector(),
        new Rater(),
        new Mutator(),
        agentsCount,
        simTime);
    this.zoom = .7;
    this.translate = {
        x: this.width * 0.5,
        y: this.height * 0.5
    }
    this.isStarted = false;
};

Cephalopods.prototype.update = function(timeStep) {
    this.environment.update(timeStep);
};

Cephalopods.prototype.draw = function(context) {
    context.save();
    context.translate(this.translate.x, this.translate.y);
    context.scale(this.zoom, this.zoom);
    context.lineWidth = 3;

    this.environment.draw(context);

    context.restore();
};

Cephalopods.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
    this.translate = {
        x: this.width * 0.5,
        y: this.height * 0.5
    }
};

Cephalopods.prototype.click = function(x, y) {
    x -= this.width * .5;
    y -= this.height * .5;
    x /= this.zoom;
    y /= this.zoom;

    this.environment.click(x, y);
};
