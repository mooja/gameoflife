import { ConwayGrid, Pos } from './ConwayGrid';
import { CanvasDrawer } from './CanvasDrawer';

function main(): void {
    const g = new ConwayGrid(20, 20, [{x:1, y:0}, {x:2, y:1}, {x:2, y:2}, {x:1, y:2}, {x:0, y:2}]);
    const c: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
    const drawer = new CanvasDrawer(g, c);

    let gameIsPaused = false;
    let gameIntervalId: number = runGame(g, drawer);
    function runGame(g: ConwayGrid, drawer: CanvasDrawer): number {
        return window.setInterval(() => {
            drawer.draw();
            g.next()
        }, 400);
    }

    const pauseButton = document.querySelector(".pause_button");
    pauseButton.addEventListener("click", event => {
        event.preventDefault();
        if (gameIsPaused) {
            gameIntervalId = runGame(g, drawer);
        }
        else {
            window.clearInterval(gameIntervalId);
        }
        gameIsPaused = !gameIsPaused;
    });

    console.log('hi');
}

window.addEventListener("load", main);