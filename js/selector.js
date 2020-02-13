const Selector = function(rater) {
    this.rater = rater;
};

Selector.prototype.createNextGeneration = function(
    agents,
    getInitialPosition,
    getInitialDirection) {
    let bestAgent = null;
    let bestScore = -1;

    for (const agent of agents) {
        const score = this.rater.rate(agent);

        if (score > bestScore) {
            bestScore = score;
            bestAgent = agent;
        }
    }

    const nextGeneration = new Array(agents.length);

    for (let agent = 0; agent < agents.length; ++agent)
        nextGeneration[agent] = bestAgent.copy(
            getInitialPosition(agent),
            getInitialDirection(agent));

    return nextGeneration;
};

