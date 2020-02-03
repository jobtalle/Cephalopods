const Squids = function(width, height) {
    const squids = new Array(Math.ceil(width * height * Squids.SQUIDS_PER_PIXEL));

    this.update = timeStep => {
        for (const squid of squids)
            squid.update(timeStep);
    };

    this.draw = context => {
        for (const squid of squids)
            squid.draw(context);
    };

    for (let i = 0; i < squids.length; ++i)
        squids[i] = new Squid(
            new Vector(Math.random() * width, Math.random() * height),
            new Vector().fromAngle(Math.random() * Math.PI * 2).multiply(50));
};

Squids.SQUIDS_PER_PIXEL = .000005;