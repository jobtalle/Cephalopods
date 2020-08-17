const Selector = function() {

};

Selector.SELECTOR_CEPHALOPODS_COEF = 4

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
    let avrgSpeed = 0;
    let avrgMass = 0;

    for (const agent of agents) {
        avrgSpeed += agent.avrgSpeed / agent.ticks;
        avrgMass += agent.body.getMass()
        sum += rater.rate(agent);
    }

    Environment.changeMaxScore(bestScore, bestAgent);
    Environment.changeAverageScore(sum / agents.length, avrgSpeed / agents.length, avrgMass / agents.length);

    const nextGeneration = new Array(agents.length);
    const nextDna = new Array(agents.length);

    let copyAgents = Math.floor((agents.length + Selector.SELECTOR_CEPHALOPODS_COEF - 1) / Selector.SELECTOR_CEPHALOPODS_COEF);
    for (let i = 0; i < copyAgents; i++) {
        nextDna[i] = agents[i].dna.copy()

        for (let j = 1; j < Selector.SELECTOR_CEPHALOPODS_COEF; j++) {
            const index = i + j * copyAgents;
            if (index < agents.length) {
                nextDna[index] = mutator.mutate(agents[i].dna.copy())
            }
        }
    }

    shuffle(nextDna);

    for (let i = 0; i < agents.length; i++) {
        nextGeneration[i] = new Agent(
            mutator.mutate(nextDna[i]),
            getInitialPosition(i),
            getInitialDirection(i));
    }

    return nextGeneration;
};

