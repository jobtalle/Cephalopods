const Gui = function(cephalopods, onReset) {
    this.info = new Info(document.getElementById(Gui.ID_INFO), cephalopods);
    this.buttons = new Buttons(document.getElementById(Gui.ID_BUTTONS), cephalopods, onReset);
};

Gui.ID_INFO = "info";
Gui.ID_BUTTONS = "buttons";