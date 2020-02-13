const Buttons = function(element, cephalopods, onReset) {
    this.buttonSpeed = new ToggleButton(["Warp", "Real time"], mode => {
        switch (mode) {
            case "Warp":
                cephalopods.environment.warp = true;

                break;
            case "Real time":
                cephalopods.environment.warp = false;

                break;
        }
    });

    this.buttonReset = new Button("Reset", onReset);

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.buttonSpeed.element);
    element.appendChild(this.buttonReset.element);
};