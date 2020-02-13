const Buttons = function(element, onReset) {
    this.buttonReset = new Button("Reset", onReset);

    while (element.firstChild)
        element.removeChild(element.firstChild);

    element.appendChild(this.buttonReset.element);
};