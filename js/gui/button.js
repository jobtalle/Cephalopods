const Button = function(text, onClick) {
    this.element = document.createElement("button");
    this.element.innerText = text;
    this.element.onclick = onClick;
};