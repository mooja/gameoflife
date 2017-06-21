import { ConwayGrid, Pos } from './ConwayGrid';
import { CanvasDrawer } from './CanvasDrawer';

function main(): void {
    const grid = new ConwayGrid(20, 20, [{x:1, y:0}, {x:2, y:1}, {x:2, y:2}, {x:1, y:2}, {x:0, y:2}]);
    const canvas: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
    const renderer: CanvasDrawer = new CanvasDrawer(grid, canvas);
    renderer.draw();

    const pauseButton: Element = document.querySelector(".pause_button");
    const nextStepButton: Element = document.querySelector(".next_step_button");
    const rangeControl: Element = document.querySelector("speed");

    let gameIsPaused = false;
    let gameIntervalId: number = runGame(grid, renderer);
    function runGame(g: ConwayGrid, drawer: CanvasDrawer): number {
        return window.setInterval(() => {
            g.next()
            drawer.draw();
        }, 400);
    }

    function handlePauseButton(event) {
        if (gameIsPaused) {
            gameIntervalId = runGame(grid, renderer);
            pauseButton.innerHTML = "Pause";
        }
        else {
            window.clearInterval(gameIntervalId);
            pauseButton.innerHTML = "Resume";
            nextStepButton.removeAttribute("disabled");
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
}

window.addEventListener("load", main);