const Environment = function(
    radius,
    selector = null,
    mutator = null,
    agentCount = Environment.DEFAULT_AGENT_COUNT,
    simTime = Environment.DEFAULT_SIM_TIME) {
    this.onUpdate = null;
    this.onNextGen = null;

    this.radius = radius;
    this.selector = selector;
    this.mutator = mutator;
    this.agentCount = agentCount;
    this.simTime = simTime;
    this.generation = 0;
    this.agents = [];
    this.time = 0;
    this.warp = false;
    this.paused = false;

    this.initialize(this.agentCount);
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
    if (this.paused)
        return;

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

Environment.prototype.getInitialPosition = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount + Math.PI).multiply(
        this.radius - Environment.SPAWN_INSET);
};

Environment.prototype.getInitialDirection = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount);
};

Environment.prototype.nextGeneration = function() {
    this.time = 0;
    this.generation++;
    this.agents = this.selector.createNextGeneration(
        this.agents,
        this.getInitialPosition.bind(this),
        this.getInitialDirection.bind(this));

    if (this.onNextGen)
        this.onNextGen(this);
};

Environment.prototype.initialize = function(count) {
    for (let agent = 0; agent < count; ++agent)
        this.agents.push(new Agent(
            this.getInitialPosition(agent),
            this.getInitialDirection(agent)));
};