const Squids = function(width, height) {
    const makeSquid = () => {
        return new Agent(
            new Vector().multiply(.5),
            new Vector().fromAngle(Math.random() * Math.PI * 2));
    };

    const squid = makeSquid();
    let zoom = .7;

    squid.velocity.x = squid.velocity.y = 0;
    squid.wiggle = Math.PI * 0.45;

    this.attract = (x, y) => {
        x -= width * .5;
        y -= height * .5;
        x /= zoom;
        y /= zoom;

        squid.direction.x = x;
        squid.direction.y = y;
        squid.direction.subtract(squid.position).normalize();
    };

    this.update = timeStep => {
        squid.update(timeStep);
    };

    this.draw = context => {
        context.save();
        context.translate(width * .5, height * .5);
        context.scale(zoom, zoom);
        context.lineWidth = 3;

        squid.draw(context);

        context.restore();
    };
};