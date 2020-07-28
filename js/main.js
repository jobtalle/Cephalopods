const TIME_STEP_MAX = 0.1;

const viewport = document.getElementById("viewport");
const canvas = document.getElementById("renderer");
let cephalopods = null;
let gui = null;
let lastDate = new Date();

let previousMousePos = null;

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', function (evt) {
    let mousePos = getMousePos(canvas, evt);
    if ((evt.buttons & 4) !== 0) {
        previousMousePos = mousePos;
    }
}, false);

canvas.addEventListener('mousemove', function (evt) {
    let mousePos = getMousePos(canvas, evt);
    if ((evt.buttons & 4) !== 0) {
        if (cephalopods !== null) {
            cephalopods.translate.x += mousePos.x - previousMousePos.x;
            cephalopods.translate.y += mousePos.y - previousMousePos.y;
        }
    }
    previousMousePos = mousePos;
}, false);

canvas.addEventListener('wheel', function (evt) {
    if (cephalopods !== null) {
        cephalopods.zoom -= evt.deltaY * 0.001;
        cephalopods.zoom = Math.min(Math.max(cephalopods.zoom, 0.25), 2.0)
    }
}, false);

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

canvas.addEventListener("mousedown", event => {
    cephalopods.click(event.clientX, event.clientY);
});

reset();
resize();
requestAnimationFrame(loopFunction);