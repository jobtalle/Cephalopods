const Selector = function() {

};

Selector.prototype.createNextGeneration = function(
    agents,
    rater,
    mutator,
    getInitialPosition,
    getInitialDirection) {
    let bestAgent = null;
    let bestScore = -1;

    for (const agent of agents) {
        const score = rater.rate(agent);

        if (score > bestScore) {
            bestScore = score;
            bestAgent = agent;
        }
    }

    const nextGeneration = new Array(agents.length);

    for (let agent = 0; agent < agents.length; ++agent)
        nextGeneration[agent] = new Agent(
            mutator.mutate(agents[agent].dna.copy()),
            getInitialPosition(agent),
            getInitialDirection(agent));

    return nextGeneration;
};

