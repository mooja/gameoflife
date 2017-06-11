interface Pos {
    x: number;
    y: number;
}

function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

class ConwayGrid {
    constructor(public width: number,
                public height: number,
                public alivePositions: Pos[]) {
    }

    getNeighbours(target: Pos): Pos[] {
        return this.alivePositions.filter(p => { 
            let minDistanceX: number = [mod(p.x-target.x, this.width), mod(target.x-p.x, this.width)].sort()[0];
            let minDistanceY: number = [mod(p.y-target.y, this.height), mod(target.y-p.y, this.height)].sort()[0];
            if (minDistanceX > 1 || minDistanceY > 1) return false;
            if (target.x === p.x && target.y === p.y) return false;
            return true;
        });
    }

    getNumNeighbours(target: Pos): number {
        return this.getNeighbours(target).length;
    }

    posIsAlive(target: Pos): boolean {
        return this.alivePositions
            .some(p => target.x === p.x && target.y === p.y);
    }

    next(): void {
        const newAlivePositions: Pos[] = [];

        for(let row = 0; row < this.height; row++) {
            for(let col = 0; col < this.width; col++) {
                const isAlive = this.posIsAlive({x: row, y: col});
                const numNeighbors: number = this.getNumNeighbours({x: row, y: col});

                if (isAlive && (numNeighbors === 2 || numNeighbors === 3)) 
                    newAlivePositions.push({x: row, y: col});
                if (!isAlive && numNeighbors === 3)
                    newAlivePositions.push({x: row, y: col});
            }
        }

        this.alivePositions = newAlivePositions;
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

class CanvasDrawer {
    constructor(private grid: ConwayGrid, private canvas: HTMLCanvasElement ) {
    }

    draw(): void {
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const squareSideLen: number = 75;

        for(let pos of this.grid.alivePositions) {
            const [x, y]: [number, number] = [pos.x*squareSideLen, pos.y*squareSideLen];
            ctx.fillRect(x, y, squareSideLen, squareSideLen);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(x, y, squareSideLen, squareSideLen)
        }
    }
}

const g = new ConwayGrid(5, 5, [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}]);
const c: HTMLCanvasElement  = <HTMLCanvasElement>document.querySelector("canvas.grid");
const drawer = new CanvasDrawer(g, c);

setInterval(() => {
    drawer.draw();
    g.next()
},
2000);