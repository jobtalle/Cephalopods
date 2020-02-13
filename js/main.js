const TIME_STEP_MAX = 0.1;

const viewport = document.getElementById("viewport");
const canvas = document.getElementById("renderer");
let cephalopods = null;
let gui = null;
let lastDate = new Date();

const reset = () => {
    cephalopods = new Cephalopods(canvas.width, canvas.height);
    gui = new Gui(cephalopods, reset);
};

const resize = () => {
    canvas.width = viewport.offsetWidth;
    canvas.height = viewport.offsetHeight;
    cephalopods.resize(canvas.width, canvas.height);
};

const update = timeStep => {
    cephalopods.update(Math.min(timeStep, TIME_STEP_MAX));

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    cephalopods.draw(context);
};

const loopFunction = () => {
    const date = new Date();

    update((date - lastDate) * 0.001);
    requestAnimationFrame(loopFunction);

    lastDate = date;
};

window.onresize = resize;

reset();
resize();
requestAnimationFrame(loopFunction);