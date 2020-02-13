const ToggleButton = function(modes, onToggle) {
    this.modes = modes;
    this.onToggle = onToggle;
    this.mode = modes[0];
    this.element = document.createElement("button");
    this.element.innerText = this.mode;
    this.element.onclick = this.onClick.bind(this);
};

ToggleButton.prototype.onClick = function() {
    this.onToggle(this.mode);
    this.mode = this.modes[(this.modes.indexOf(this.mode) + 1) % this.modes.length];
    this.element.innerText = this.mode;
};