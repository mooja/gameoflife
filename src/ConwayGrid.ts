function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export interface Pos {
    x: number;
    y: number;
}

export class ConwayGrid {
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

    toggleCell(target: Pos): void {
        if (this.posIsAlive(target)) {
            const idx: number = this.alivePositions
                .findIndex(p => p.x === target.x && p.y === target.y);
            this.alivePositions.splice(idx, 1);
        }
        else {
            this.alivePositions.push(target);
        }
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

    resize(newSize: number): void {
        // TODO: handle out of bounds positions
        // * find all out of bound positions and remove them
        this.width = newSize;
        this.height = newSize;
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
}