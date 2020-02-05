const Squids = function(width, height) {
    const makeSquid = () => {
        return new Squid(
            new Vector(width, height).multiply(.5),
            new Vector().fromAngle(Math.random() * Math.PI * 2));
    };

    const squid = makeSquid();

    this.stopMoving = () => {
        squid.velocity.x = squid.velocity.y = 0;
        squid.wiggle = Math.PI * 0.45;
    };

    this.attract = (x, y) => {
        squid.direction.x = x;
        squid.direction.y = y;
        squid.direction.subtract(squid.position).normalize();
        squid.velocity.set(squid.direction).multiply(130);
    };

    this.update = timeStep => {
        squid.update(timeStep);
    };

    this.draw = context => {
        squid.draw(context);
    };
};

Squids.SQUIDS_PER_PIXEL = .000007;
Squids.DEAD_ZONE = 256;