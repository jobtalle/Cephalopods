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
    let sum = 0;
    let avrgSpeed = 0;
    let avrgMass = 0;

    for (const agent of agents) {
        const score = rater.rate(agent);
        sum += score;
        avrgSpeed += agent.avrgSpeed / agent.ticks;
        avrgMass += agent.body.getMass()

        if (score > bestScore) {
            bestScore = score;
            bestAgent = agent;
        }
    }

    Environment.changeMaxScore(bestScore, bestAgent);
    Environment.changeAverageScore(sum / agents.length, avrgSpeed / agents.length, avrgMass / agents.length);

    const nextGeneration = new Array(agents.length);
    const spawnOffset = Math.floor(Math.random() * agents.length);

    nextGeneration[spawnOffset] = new Agent(
        bestAgent.dna.copy(),
        getInitialPosition(spawnOffset),
        getInitialDirection(spawnOffset));

    for (let agent = 1; agent < agents.length; ++agent) {
        const index = (agent + spawnOffset) % agents.length;

        nextGeneration[index] = new Agent(
            mutator.mutate(bestAgent.dna.copy()),
            getInitialPosition(index),
            getInitialDirection(index));
    }

    return nextGeneration;
};

