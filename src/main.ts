import { ConwayGrid, Pos } from './ConwayGrid';
import { CanvasDrawer } from './CanvasDrawer';
import { debounce } from './util';

const grid = new ConwayGrid(20, 20, [{x:1, y:0}, {x:2, y:1}, {x:2, y:2}, {x:1, y:2}, {x:0, y:2}]);
const canvas: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
const renderer: CanvasDrawer = new CanvasDrawer(grid, canvas);

// Pause & Next buttons.
const pauseButton: Element = document.querySelector(".pause_button");
const nextStepButton: Element = document.querySelector(".next_step_button");

// Speed controls.
const speedControl = <HTMLInputElement>document.querySelector(".speed-control");
const speedDisplay: Element = document.querySelector(".speed-display");
const [minSpeed, maxSpeed, defaultSpeed] = [0, 10, 2]; // steps per second
speedControl.value = `${100*(defaultSpeed/(maxSpeed-minSpeed))}`;

// Size controls.
const sizeDisplay: Element = document.querySelector(".size-display");
const sizeControl = <HTMLInputElement>document.querySelector(".size-control");
const [minSize, maxSize, defaultSize] = [10, 50, 20];
sizeControl.value = `${100*(defaultSize/(maxSize-minSize))}`;

// Global State
let gameIsPaused = false;
let gameSpeed = defaultSpeed;
let gameIntervalId: number = runGame(grid, renderer);
function runGame(g: ConwayGrid, drawer: CanvasDrawer, speed: number = gameSpeed): number {
    const updateInterval = 1000 / speed;
    return window.setInterval(() => {
        g.next()
        drawer.draw();
    }, updateInterval);
}

function handlePauseButton(event) {
    if (gameIsPaused) {
        gameIntervalId = runGame(grid, renderer);
        pauseButton.innerHTML = "Pause";
        nextStepButton.classList.add("button-inactive");
        nextStepButton.classList.remove("button-active");
    }
    else {
        window.clearInterval(gameIntervalId);
        pauseButton.innerHTML = "Resume";
        nextStepButton.classList.remove("button-inactive");
        nextStepButton.classList.add("button-active");
    }
    gameIsPaused = !gameIsPaused;
}
pauseButton.addEventListener("click", handlePauseButton);

function handleStepButton(event) {
    if (!gameIsPaused) return;
    grid.next();
    renderer.draw();
}
nextStepButton.addEventListener("click", handleStepButton);

function handleCanvasClick(event) {
    if(!gameIsPaused) return;
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    const [gridX, gridY] = renderer.getGridPos(x, y);
    grid.toggleCell({x: gridX, y: gridY});
    renderer.draw();
}
canvas.addEventListener('click', handleCanvasClick);

function handleSpeedChange(event) {
    if (gameIsPaused) return;
    window.clearInterval(gameIntervalId);
    const newSpeed = minSpeed + ((this.value*(maxSpeed-minSpeed))/100);
    speedDisplay.textContent = `Speed ${newSpeed > 1 ? newSpeed.toFixed(0) : newSpeed.toFixed(1)}`;
    if (newSpeed == 0) return;
    gameSpeed = newSpeed;
    gameIntervalId = runGame(grid, renderer);
}
speedControl.addEventListener("input", debounce(handleSpeedChange, 10, false));

function handleSizeChange(event): void {
    if (!gameIsPaused)
        window.clearInterval(gameIntervalId);

    const absSize: number = (this as HTMLFormElement).value;
    let newSize: number = Math.floor(minSize+(absSize/100)*(maxSize-minSize));
    grid.resize(newSize);
    renderer.resize();
    sizeDisplay.textContent = `Grid Size ${newSize}`;

    if (!gameIsPaused)
        gameIntervalId = runGame(grid, renderer);
    else
        renderer.draw();
}
sizeControl.addEventListener('input', debounce(handleSizeChange, 10, false));