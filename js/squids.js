const Squids = function(width, height) {
    const squids = new Array(Math.ceil(width * height * Squids.SQUIDS_PER_PIXEL));

    const makeSquid = () => {
        return new Squid(
            new Vector(Math.random() * width, Math.random() * height),
            new Vector().fromAngle(Math.random() * Math.PI * 2));
    };

    this.update = timeStep => {
        for (let i = 0; i < squids.length; ++i) {
            const squid = squids[i];

            squid.update(timeStep);

            if (squid.position.x < -Squids.DEAD_ZONE ||
                squid.position.y < -Squids.DEAD_ZONE ||
                squid.position.x > width + Squids.DEAD_ZONE ||
                squid.position.y > height + Squids.DEAD_ZONE)
                squids[i] = makeSquid();
        }
    };

    this.draw = context => {
        for (const squid of squids)
            squid.draw(context);
    };

    for (let i = 0; i < squids.length; ++i)
        squids[i] = makeSquid();
};

Squids.SQUIDS_PER_PIXEL = .000008;
Squids.DEAD_ZONE = 256;