const Environment = function(
    radius,
    selector,
    rater,
    mutator,
    agentCount = Environment.DEFAULT_AGENT_COUNT,
    simTime = Environment.DEFAULT_SIM_TIME) {
    this.onUpdate = null;
    this.onNextGen = null;
    this.onSelect = null;

    this.food = new Food(radius);
    this.radius = radius;
    this.selector = selector;
    this.rater = rater;
    this.mutator = mutator;
    this.agentCount = agentCount;
    this.simTime = simTime;
    this.generation = 0;
    this.agents = [];
    this.time = 0;
    this.warp = false;
    this.paused = false;
    this.selected = null;

    this.initialize(this.agentCount);
};

Environment.SPAWN_INSET = 400;
Environment.DEFAULT_AGENT_COUNT = 14;
Environment.DEFAULT_SIM_TIME = 15;
Environment.MAX_ITERATION_TIME = 1 / 60;
Environment.WARP_STEP = .1;
Environment.SELECT_RADIUS_MULTIPLIER = 3;

Environment.prototype.simulate = function(timeStep) {
    this.food.update(timeStep, this.agents);

    for (const agent of this.agents)
        agent.update(timeStep);

    this.time += timeStep;

    if (this.onUpdate)
        this.onUpdate(this);

    if (this.agents.length === 0 || this.time > this.simTime)
        this.nextGeneration();
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

    this.food.draw(context);

    for (const agent of this.agents)
        agent.draw(context);

    if (this.selected) {
        context.strokeStyle = "yellow";
        context.beginPath();
        context.arc(
            this.selected.position.x,
            this.selected.position.y,
            this.selected.body.radius * Environment.SELECT_RADIUS_MULTIPLIER,
            0,
            Math.PI + Math.PI);
        context.stroke();
    }
};

Environment.prototype.click = function(x, y) {
    this.selected = null;

    if (this.onSelect)
        this.onSelect(this);

    for (const agent of this.agents) {
        const dx = x - agent.position.x;
        const dy = y - agent.position.y;
        const squaredRadius = (agent.body.radius * Environment.SELECT_RADIUS_MULTIPLIER) ** 2;

        if (dx * dx + dy * dy < squaredRadius) {
            this.selected = agent;

            if (this.onSelect)
                this.onSelect(this);

            break;
        }
    }
};

Environment.prototype.getInitialPosition = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount + Math.PI).multiply(
        this.radius - Environment.SPAWN_INSET);
};

Environment.prototype.getInitialDirection = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount);
};

Environment.prototype.nextGeneration = function() {
    this.selected = null;
    this.food = new Food(this.radius);

    if (this.onSelect)
        this.onSelect(this);

    this.time = 0;
    this.generation++;
    this.agents = this.selector.createNextGeneration(
        this.agents,
        this.rater,
        this.mutator,
        this.getInitialPosition.bind(this),
        this.getInitialDirection.bind(this));

    if (this.onNextGen)
        this.onNextGen(this);
};

Environment.prototype.initialize = function(count) {
    for (let agent = 0; agent < count; ++agent)
        this.agents.push(new Agent(
            new DNA(),
            this.getInitialPosition(agent),
            this.getInitialDirection(agent)));
};