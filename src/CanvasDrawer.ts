import {ConwayGrid} from './ConwayGrid';

export class CanvasDrawer {
    constructor(private grid: ConwayGrid, private canvas: HTMLCanvasElement ) {
    }

    draw(): void {
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const squareSideLen: number = this.canvas.width / this.grid.width;

        for(let pos of this.grid.alivePositions) {
            const [x, y]: [number, number] = [pos.x*squareSideLen, pos.y*squareSideLen];
            ctx.fillRect(x, y, squareSideLen, squareSideLen);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(x, y, squareSideLen, squareSideLen)
        }
    }
}
