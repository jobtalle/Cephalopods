const Rater = function() {

};

Rater.prototype.rate = function(agent) {
    return 5.0 * agent.eaten - 10.0 * agent.damage + agent.distance * 0.01;
};