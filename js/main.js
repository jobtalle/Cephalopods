let timePerGenBox = null;
let foodCoefBox = null;
let agentCntBox = null;

let simTime = Environment.DEFAULT_SIM_TIME
let foodCoef = Environment.FOOD_COEF
let agentsCnt = Environment.DEFAULT_AGENT_COUNT

window.onload = function() {
    let form = document.forms[0];
    timePerGenBox = form.elements["perGenTime"];
    foodCoefBox = form.elements["foodCoef"];
    agentCntBox = form.elements["agentsCnt"];

    timePerGenBox.value = simTime;
    foodCoefBox.value = foodCoef;
    agentCntBox.value = agentsCnt;
}

const TIME_STEP_MAX = 0.1;
const viewport = document.getElementById("viewport");
const canvas = document.getElementById("renderer");

let cephalopods = null;
let gui = null;
let lastDate = new Date();

let previousMousePos = null;

function ValidateVariables() {
    simTime = timePerGenBox.value;
    foodCoef = foodCoefBox.value;
    agentsCnt = agentCntBox.value;

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
        document.getElementById("startMenu").style.display = "none";

        cephalopods = new Cephalopods(canvas.width, canvas.height, agentsCnt, simTime);
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

    canvas.addEventListener("mousedown", event => {
        cephalopods.click(event.clientX, event.clientY);
    });

    window.onresize = resize;
    reset();
    resize();
    requestAnimationFrame(loopFunction);
}






