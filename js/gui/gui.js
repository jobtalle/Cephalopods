const Gui = function(cephalopods, onReset) {
    this.simulationInfo = new SimulationInfo(document.getElementById(Gui.ID_SIMULATION_INFO));
    this.buttons = new Buttons(document.getElementById(Gui.ID_BUTTONS), cephalopods, onReset);
    this.agentInfo = new AgentInfo(document.getElementById(Gui.ID_AGENT_INFO));
    this.brainView = new BrainView(document.getElementById(Gui.ID_BRAIN_VIEW));

    cephalopods.environment.onNextGen = environment => {
        this.simulationInfo.onNextGen(environment);
    };

    cephalopods.environment.onUpdate = environment => {
        this.simulationInfo.onUpdate(environment);
        this.agentInfo.onUpdate(environment);
        this.brainView.onUpdate(environment);
    };

    cephalopods.environment.onSelect = environment => {
        if (environment.selected)
            document.getElementById(Gui.ID_INSPECTOR).style.display = "initial";
        else
            document.getElementById(Gui.ID_INSPECTOR).style.display = "none";

        this.agentInfo.onSelect(environment);
        this.brainView.onSelect(environment);
    };

    this.simulationInfo.onNextGen(cephalopods.environment);

    document.getElementById(Gui.ID_INSPECTOR).style.display = "none";
};

Gui.ID_INSPECTOR = "inspector";
Gui.ID_SIMULATION_INFO = "simulation-info";
Gui.ID_BUTTONS = "buttons";
Gui.ID_AGENT_INFO = "agent-info";
Gui.ID_BRAIN_VIEW = "brain";