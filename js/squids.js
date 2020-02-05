const Squids = function(width, height) {
    const makeSquid = () => {
        return new Agent(
            new Vector(width, height).multiply(.5),
            new Vector().fromAngle(Math.random() * Math.PI * 2));
    };

    const squid = makeSquid();

    squid.velocity.x = squid.velocity.y = 0;
    squid.wiggle = Math.PI * 0.45;

    this.attract = (x, y) => {
        squid.direction.x = x;
        squid.direction.y = y;
        squid.direction.subtract(squid.position).normalize();
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