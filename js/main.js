let timePerGenBox = null;
let foodCoefBox = null;
let agentCntBox = null;


window.onload = function() {
    let form = document.forms[0];

    timePerGenBox = form.elements["perGenTime"];
    foodCoefBox = form.elements["foodCoef"];
    agentCntBox = form.elements["agentsCnt"];
    axonMutChanceBox = form.elements["axonMutChance"];
    axonMutAmplBox = form.elements["axonMutAmpl"];
    axonCreateChanceBox = form.elements["axonCreateChance"];
    axonRemoveChanceBox = form.elements["axonRemoveChance"];

    timePerGenBox.value = Environment.DEFAULT_SIM_TIME;
    foodCoefBox.value = Environment.DEFAULT_FOOD_COEF;
    agentCntBox.value = Environment.DEFAULT_AGENT_COUNT;
    axonMutChanceBox.value = Mutator.AXON_MODIFY_CHANCE;
    axonMutAmplBox.value = Mutator.AXON_MODIFY_AMPLITUDE;
    axonCreateChanceBox.value = Mutator.AXON_CREATE_CHANCE;
    axonRemoveChanceBox.value = Mutator.AXON_REMOVE_CHANCE;
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
    Mutator.AXON_MODIFY_CHANCE = axonMutChanceBox.value;
    Mutator.AXON_MODIFY_AMPLITUDE = axonMutAmplBox.value;
    Mutator.AXON_CREATE_CHANCE = axonCreateChanceBox.value;
    Mutator.AXON_REMOVE_CHANCE = axonRemoveChanceBox.value;

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
        Environment.maxScore = -1;
        Environment.maxScores = [];
        document.getElementById("startMenu").style.display = "none";

        cephalopods = new Cephalopods(canvas.width, canvas.height, agentsCnt, simTime, foodCoef);
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






