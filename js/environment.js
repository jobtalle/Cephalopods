const Environment = function(radius) {
    this.radius = radius;
    this.agents = [
        new Agent(
            new Vector().multiply(.5),
            new Vector().fromAngle(Math.random() * Math.PI * 2))
    ];
};

Environment.prototype.update = function(timeStep) {
    const radiusSquared = this.radius * this.radius;

    for (let i = this.agents.length; i-- > 0;) {
        this.agents[i].update(timeStep);

        if (this.agents[i].position.dot(this.agents[i].position) > radiusSquared)
            this.agents.splice(i, 1);
    }
};

Environment.prototype.draw = function(context) {
    const gradient = context.createRadialGradient(0, 0, this.radius * .1, 0, 0, this.radius);

    gradient.addColorStop(0, "#434343");
    gradient.addColorStop(1, "black");

    context.strokeStyle = "white";
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    for (const agent of this.agents)
        agent.draw(context);
};