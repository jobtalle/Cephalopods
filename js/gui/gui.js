const Gui = function(cephalopods, onReset) {
    this.simulationInfo = new SimulationInfo(document.getElementById(Gui.ID_SIMULATION_INFO), cephalopods);
    this.agentInfo = new AgentInfo(document.getElementById(Gui.ID_AGENT_INFO), cephalopods);
    this.buttons = new Buttons(document.getElementById(Gui.ID_BUTTONS), cephalopods, onReset);

    cephalopods.environment.onNextGen = environment => {
        this.simulationInfo.onNextGen(environment);
    };

    cephalopods.environment.onUpdate = environment => {
        this.simulationInfo.onUpdate(environment);

        if (environment.selected)
            this.agentInfo.onUpdate(environment);
    };

    cephalopods.environment.onSelect = environment => {
        if (environment.selected)
            document.getElementById(Gui.ID_INSPECTOR).style.display = "block";
        else
            document.getElementById(Gui.ID_INSPECTOR).style.display = "none";

        this.agentInfo.onSelect(environment);
    };
};

Gui.ID_INSPECTOR = "inspector";
Gui.ID_SIMULATION_INFO = "simulation-info";
Gui.ID_AGENT_INFO = "agent-info";
Gui.ID_BUTTONS = "buttons";