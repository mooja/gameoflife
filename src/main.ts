import { ConwayGrid, Pos } from './ConwayGrid';
import { CanvasDrawer } from './CanvasDrawer';

function main(): void {
    const g = new ConwayGrid(20, 20, [{x:1, y:0}, {x:2, y:1}, {x:2, y:2}, {x:1, y:2}, {x:0, y:2}]);
    const c: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
    const drawer = new CanvasDrawer(g, c);
    drawer.draw();

    const nextStepButton = document.querySelector(".next_step");
    const pauseButton = document.querySelector(".pause_button");

    let gameIsPaused = false;
    let gameIntervalId: number = runGame(g, drawer);
    function runGame(g: ConwayGrid, drawer: CanvasDrawer): number {
        return window.setInterval(() => {
            g.next()
            drawer.draw();
        }, 400);
    }
    nextStepButton.setAttribute("disabled", "true");

    pauseButton.addEventListener("click", event => {
        event.preventDefault();
        if (gameIsPaused) {
            gameIntervalId = runGame(g, drawer);
            pauseButton.setAttribute("value", "Pause");
            nextStepButton.setAttribute("disabled", "true");
        }
        else {
            window.clearInterval(gameIntervalId);
            pauseButton.setAttribute("value", "Resume");
            nextStepButton.removeAttribute("disabled");
        }
        gameIsPaused = !gameIsPaused;
    });

    nextStepButton.addEventListener("click", event => {
        if (!gameIsPaused) return;
        g.next();
        drawer.draw();
    });
}

window.addEventListener("load", main);