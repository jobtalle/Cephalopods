const Rater = function() {

};

Rater.prototype.rate = function(agent) {
    return agent.eaten - agent.damage;
};