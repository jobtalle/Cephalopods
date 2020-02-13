const Environment = function(
    radius,
    mutator = null,
    agentCount = Environment.DEFAULT_AGENT_COUNT,
    simTime = Environment.DEFAULT_SIM_TIME) {
    this.onUpdate = null;
    this.onNextGen = null;

    this.radius = radius;
    this.mutator = mutator;
    this.agentCount = agentCount;
    this.simTime = simTime;
    this.generation = -1;
    this.agents = [];
    this.time = 0;
    this.warp = false;

    this.nextGeneration();
};

Environment.SPAWN_INSET = 128;
Environment.DEFAULT_AGENT_COUNT = 8;
Environment.DEFAULT_SIM_TIME = 16;
Environment.MAX_ITERATION_TIME = 1 / 60;
Environment.WARP_STEP = .1;

Environment.prototype.simulate = function(timeStep) {
    const radiusSquared = this.radius * this.radius;

    for (let i = this.agents.length; i-- > 0;) {
        this.agents[i].update(timeStep);

        if (this.agents[i].position.dot(this.agents[i].position) > radiusSquared)
            this.agents.splice(i, 1);
    }

    this.time += timeStep;

    if (this.agents.length === 0 || this.time > this.simTime)
        this.nextGeneration();

    if (this.onUpdate)
        this.onUpdate(this);
};

Environment.prototype.update = function(timeStep) {
    if (this.warp) {
        const startTime = new Date();

        while ((new Date() - startTime) * .001 < Environment.MAX_ITERATION_TIME)
            this.simulate(Environment.WARP_STEP);
    }
    else
        this.simulate(timeStep);
};

Environment.prototype.draw = function(context) {
    const gradient = context.createRadialGradient(0, 0, this.radius * .1, 0, 0, this.radius);

    gradient.addColorStop(0, "#4b4b4b");
    gradient.addColorStop(1, "#343434");

    context.strokeStyle = "white";
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    for (const agent of this.agents)
        agent.draw(context);
};

Environment.prototype.nextGeneration = function() {
    this.agents.length = 0;
    this.time = 0;
    this.generation++;

    // TODO: Use mutator

    this.initialize(this.agentCount);

    if (this.onNextGen)
        this.onNextGen(this);
};

Environment.prototype.initialize = function(agentCount) {
    for (let agent = 0; agent < agentCount; ++agent) {
        const angle = agent * Math.PI * 2 / agentCount;

        this.agents.push(new Agent(
            new Vector().fromAngle(angle + Math.PI).multiply(this.radius - Environment.SPAWN_INSET),
            new Vector().fromAngle(angle)));
    }
};