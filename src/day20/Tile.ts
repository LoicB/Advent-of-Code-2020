export default class Tile {
    private readonly id: number;
    private readonly image: string[];
    private readonly top: string;
    private readonly bottom: string;
    private readonly left: string;
    private readonly right: string;

    constructor(id: number, image: string[]) {
        this.id = id;
        this.image = image;
        this.top = image[0];
        this.bottom = image[image.length - 1].split('').reverse().join('');
        this.left = image.map(line => line.charAt(0)).reverse().join('');
        this.right = image.map(line => line.charAt(line.length - 1)).join('');
    }

    toString(): string {
        let output: string = `Tile ${this.id}:\n`;
        for (let i = 0; i < this.image.length; i++) {
            output += `${this.image[i]}\n`;
        }
        return output;
    }

    isAdjacentWith(otherTile: Tile): boolean {
        return this.compareSideWithTile(this.top, otherTile)
            || this.compareSideWithTile(this.right, otherTile)
            || this.compareSideWithTile(this.bottom, otherTile)
            || this.compareSideWithTile(this.left, otherTile);
    }

    compareWithOtherNoMirror(otherTile: Tile):Direction {
        if (this.compareSideWithTileNoMirror(this.reverseString(this.top), otherTile)) {
            return Direction.TOP;
        } else if (this.compareSideWithTileNoMirror(this.reverseString(this.right), otherTile)) {
            return Direction.RIGHT;
        } else if (this.compareSideWithTileNoMirror(this.reverseString(this.bottom), otherTile)) {
            return Direction.BOTTOM;
        } else if (this.compareSideWithTileNoMirror(this.reverseString(this.left), otherTile)) {
            return Direction.LEFT;
        }
        return Direction.NONE;
    }

    private compareSideWithTileNoMirror(side: string, tile: Tile): boolean {
        return side === tile.top
            || side === tile.right
            || side === tile.bottom
            || side === tile.left;
    }

    private compareSideWithTile(side: string, tile: Tile): boolean {
        return this.compareSides(side, tile.top)
            || this.compareSides(side, tile.right)
            || this.compareSides(side, tile.bottom)
            || this.compareSides(side, tile.left);
    }

    private compareSides(sideA: string, sideB: string): boolean {
        return sideA === sideB || this.reverseString(sideA) === sideB;
    }

    private reverseString(txt: string): string {
        let reversedString: string = '';
        for (let i = txt.length - 1; i >= 0; i--) {
            reversedString += txt.charAt(i);
        }
        return reversedString;
    }

    getId(): number {
        return this.id;
    }

    getImage(): string[] {
        return this.image;
    }

    rotate(): Tile {
        const result: string[] = [];
        for (let i = 0; i < this.image.length; i++) {
            let newLine = '';
            for (let j = 0; j < this.image[i].length; j++) {
                newLine += this.image[this.image.length - j - 1].charAt(i);
            }
            result.push(newLine);
        }
        return new Tile(this.id, result);
    }
    mirror(): Tile {
        return new Tile(this.id, this.image.map(value => value.split('').reverse().join('')));
    }
    removeBorder(): string[] {
        const result: string[] = [];
        for (let i = 1; i < this.image.length - 1; i++) {
            result.push(this.image[i].substring(1, this.image[i].length - 1))
        }
        return result;
    }

}

export enum Direction {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    NONE
}
