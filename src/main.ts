interface Pos {
    x: number;
    y: number;
}

class ConwayGrid {
    alivePositions: Pos[];
    height: number;
    width: number;

    constructor(width: number, height: number, positions: Pos[]) {
        this.height = height;
        this.width = width;
        this.alivePositions = positions;
    }

    toString(): string {
        let rv: string = '';
        for(let row = 0; row < this.height; row++) {
            const aliveOnThisRow: Pos[] = this.alivePositions.filter(pos => pos.x === row);
            let lineStr: string = '';
            for(let col = 0; col < this.width; col++) {
                const blockIsAlive: boolean = aliveOnThisRow.some(pos => pos.y === col);
                lineStr +=  blockIsAlive ? '#' : ' ';
            }
            rv += lineStr+'\n';
        }
        return rv;
    }

    toCanvas(canvas: HTMLCanvasElement): void {
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    }
}

const g = new ConwayGrid(5, 5, [{x:1, y:1}, {x:2, y:2}, {x: 4, y:4}]);
const c: Element = document.querySelector("canvas.grid");

console.log(g.toString());