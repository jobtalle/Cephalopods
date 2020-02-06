const TIME_STEP_MAX = 0.1;

const viewport = document.getElementById("viewport");
const canvas = document.getElementById("renderer");
let squids = new Squids(canvas.width, canvas.height);
let lastDate = new Date();
let mouseDown = false;

const resize = () => {
    canvas.width = viewport.offsetWidth;
    canvas.height = viewport.offsetHeight;
    squids = new Squids(canvas.width, canvas.height);
};

const update = timeStep => {
    squids.update(Math.min(timeStep, TIME_STEP_MAX));

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    squids.draw(context);
};

const loopFunction = () => {
    const date = new Date();

    update((date - lastDate) * 0.001);
    requestAnimationFrame(loopFunction);

    lastDate = date;
};

window.onresize = resize;

canvas.addEventListener("mousedown", event => {
    mouseDown = true;
});

canvas.addEventListener("mousemove", event => {
    if (mouseDown) {
        const rect = canvas.getBoundingClientRect();

        squids.attract(event.clientX - rect.left, event.clientY - rect.top);
    }
});

canvas.addEventListener("mouseup", event => {
    mouseDown = false;
});

resize();
requestAnimationFrame(loopFunction);