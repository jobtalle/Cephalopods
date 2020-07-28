const Environment = function(
    radius,
    selector,
    rater,
    mutator,
    agentCount = Environment.DEFAULT_AGENT_COUNT,
    simTime = Environment.DEFAULT_SIM_TIME,
    foodCoef = Environment.DEFAULT_FOOD_COEF) {
    this.onUpdate = null;
    this.onNextGen = null;
    this.onSelect = null;
    this.foodCoef = foodCoef;

    this.food = new Food(radius, this.foodCoef);
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
    this.timeToFrame = 0;
    this.bestResult = 0;

    this.initialize(this.agentCount);

    Environment.instance = this;
};

Environment.instance = null

Environment.FRAME_TIME = .065;
Environment.SPAWN_INSET = .05;
Environment.DEFAULT_AGENT_COUNT = 20;
Environment.DEFAULT_SIM_TIME = 20;
Environment.MAX_FRAME_TIME = 1 / 60;
Environment.WARP_STEP = Environment.FRAME_TIME * 10;
Environment.SELECT_RADIUS_MULTIPLIER = 3;

Environment.DEFAULT_FOOD_COEF = 1;

Environment.maxScore = -1;
Environment.avrgMaxScore = -1;

Environment.maxScores = []
Environment.averageScores = []

Environment.changeMaxScore = function(score) {
    if (Environment.maxScore < score) {
        Environment.maxScore = score;
        let gen = Environment.instance.generation;
        Environment.maxScores.push({score, gen});
    }
}
Environment.changeAverageScore = function(score) {
    if (Environment.avrgMaxScore < score) {
        Environment.avrgMaxScore = score;
        let gen = Environment.instance.generation;
        Environment.maxScores.push({score, gen});
    }
}
Environment.getScores = function() {
    console.log("Max scores");
    console.log(Environment.maxScores);
    console.log("Max average scores");
    console.log(Environment.averageScores);
}

Environment.prototype.getFrameProgression = function() {
    return this.timeToFrame / Environment.FRAME_TIME;
};

Environment.prototype.step = function() {
    for (const agent of this.agents)
        agent.update();

    this.food.update(this.agents);

    if (this.agents.length === 0 || this.time > this.simTime)
        this.nextGeneration();
};

Environment.prototype.simulate = function(timeStep) {
    this.timeToFrame += timeStep;
    this.time += timeStep;

    while (this.timeToFrame > Environment.FRAME_TIME) {
        this.timeToFrame -= Environment.FRAME_TIME;

        this.step();
    }

    if (this.onUpdate)
        this.onUpdate(this);
};

Environment.prototype.update = function(timeStep) {
    if (this.paused)
        return;

    if (this.warp) {
        const startTime = new Date();

        while ((new Date() - startTime) * .001 < Environment.MAX_FRAME_TIME)
            this.simulate(Environment.WARP_STEP);
    }
    else
        this.simulate(timeStep);
};

Environment.prototype.draw = function(context) {
    const frameProgression = this.getFrameProgression();
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
        agent.draw(context, frameProgression);

    if (this.selected) {
        const x = this.selected.positionPrevious.x + (this.selected.position.x - this.selected.positionPrevious.x) * frameProgression;
        const y = this.selected.positionPrevious.y + (this.selected.position.y - this.selected.positionPrevious.y) * frameProgression;

        context.strokeStyle = "yellow";
        context.beginPath();
        context.arc(
            x,
            y,
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
        const radius = agent.body.radius * Environment.SELECT_RADIUS_MULTIPLIER;

        if (dx * dx + dy * dy < radius * radius) {
            this.selected = agent;

            if (this.onSelect)
                this.onSelect(this);

            break;
        }
    }
};

Environment.prototype.getInitialPosition = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount + Math.PI).multiply(
        this.radius * (1 - Environment.SPAWN_INSET));
};

Environment.prototype.getInitialDirection = function(index) {
    return new Vector().fromAngle(index * Math.PI * 2 / this.agentCount);
};

Environment.prototype.nextGeneration = function() {
    this.selected = null;
    this.food = new Food(this.radius, this.foodCoef);

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