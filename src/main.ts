import { ConwayGrid, Pos } from './ConwayGrid';
import { CanvasDrawer } from './CanvasDrawer';

const g = new ConwayGrid(20, 20, [{x:1, y:0}, {x:2, y:1}, {x:2, y:2}, {x:1, y:2}, {x:0, y:2}]);
const c: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
const drawer = new CanvasDrawer(g, c);

setInterval(() => {
    drawer.draw();
    g.next()
},
400);