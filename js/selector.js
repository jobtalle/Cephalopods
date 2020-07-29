const Selector = function() {

};

Selector.prototype.createNextGeneration = function(
    agents,
    rater,
    mutator,
    getInitialPosition,
    getInitialDirection) {

    agents.sort(function (a, b) {
        return rater.rate(b) - rater.rate(a)
    })

    let bestAgent = agents[0];
    let bestScore = rater.rate(bestAgent);
    let sum = 0;

    for (const agent of agents) {
        sum += rater.rate(agent);
    }

    Environment.changeMaxScore(bestScore);
    Environment.changeAverageScore(sum / agents.length);

    const nextGeneration = new Array(agents.length);
    const spawnOffset = Math.floor(Math.random() * agents.length);

    let copyAgents = Math.floor((agents.length + 3) / 4);
    for (let i = 0; i < copyAgents; i++) {
        const index = (i + spawnOffset) % agents.length;

        nextGeneration[index] = new Agent(
            agents[i].dna.copy(),
            getInitialPosition(index),
            getInitialDirection(index));

        const index1 = (i + spawnOffset + copyAgents) % agents.length;
        nextGeneration[index1] = new Agent(
            mutator.mutate(agents[i].dna.copy()),
            getInitialPosition(index1),
            getInitialDirection(index1));

        const index2 = (i + spawnOffset + 2 * copyAgents) % agents.length;
        nextGeneration[index2] = new Agent(
            mutator.mutate(agents[i].dna.copy()),
            getInitialPosition(index2),
            getInitialDirection(index2));

        const index3 = (i + spawnOffset + 3 * copyAgents) % agents.length;
        nextGeneration[index3] = new Agent(
            mutator.mutate(agents[i].dna.copy()),
            getInitialPosition(index3),
            getInitialDirection(index3));
    }

    return nextGeneration;
};

