const Squids = function(width, height) {
    const environment = new Environment(1000, 8, new Mutator());
    let zoom = .7;

    this.attract = (x, y) => {
        x -= width * .5;
        y -= height * .5;
        x /= zoom;
        y /= zoom;

        // squid.direction.x = x;
        // squid.direction.y = y;
        // squid.direction.subtract(squid.position).normalize();
    };

    this.update = timeStep => {
        environment.update(timeStep);
    };

    this.draw = context => {
        context.save();
        context.translate(width * .5, height * .5);
        context.scale(zoom, zoom);
        context.lineWidth = 3;

        environment.draw(context);

        context.restore();
    };
};