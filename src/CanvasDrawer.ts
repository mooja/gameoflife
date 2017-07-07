import {ConwayGrid} from './ConwayGrid';

export class CanvasDrawer {
    squareSideLen: number;
    constructor(private grid: ConwayGrid, private canvas: HTMLCanvasElement ) {
        this.squareSideLen = this.canvas.width / this.grid.width;
    }
 
    draw(): void {
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let pos of this.grid.alivePositions) {
            const [x, y]: [number, number] = [pos.x*this.squareSideLen, pos.y*this.squareSideLen];
            ctx.fillStyle = '#00406D';
            ctx.fillRect(x, y, this.squareSideLen, this.squareSideLen);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(x, y, this.squareSideLen, this.squareSideLen)
        }
    }

    resize(): void {
        this.squareSideLen = this.canvas.width / this.grid.width;
        this.draw();
    }

    getGridPos(x: number, y: number): [number, number] {
        return [Math.floor(x / this.squareSideLen), 
            Math.floor(y / this.squareSideLen)];
    }
}
