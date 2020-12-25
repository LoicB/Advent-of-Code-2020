import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    const tileOnBLackSide: Map<string, boolean> = new Map<string, boolean>();
    for (let i = 0; i < input.length; i++) {
        const tilePosition: string = JSON.stringify(moveFromCenter(input[i]));
        tileOnBLackSide.set(tilePosition, !(tileOnBLackSide.get(tilePosition) || false));
    }
    return countBlackTiles(tileOnBLackSide);
}

export const countBlackTiles = (tileOnBLackSide: Map<string, boolean>) => {
    let numberOfBlackTiles = 0;
    tileOnBLackSide.forEach((onBlack: boolean, _: string) => {
        numberOfBlackTiles += onBlack ? 1 : 0;
    });
    return numberOfBlackTiles;
}

export const moveFromCenter = (line: string): Position => {
    return moveMultipleTimes({x: 0, y: 0, z: 0}, line);
}

export const moveMultipleTimes = (position: Position, line: string): Position => {
    let index = 0;
    let newPosition: Position = position;
    while (index < line.length) {
        const {direction, newIndex} = nextDirection(line, index);
        newPosition = moveToTile(newPosition, direction);
        index = newIndex;
    }
    return newPosition;
}

export const moveToTile = (position: Position, direction: Direction): Position => {
    let newPosition: Position;
    switch (direction) {
        case Direction.ne:
            newPosition = {x: position.x + 1, y: position.y - 1, z: position.z};
            break
        case Direction.e:
            newPosition = {x: position.x + 1, y: position.y, z: position.z - 1};
            break
        case Direction.se:
            newPosition = {x: position.x, y: position.y + 1, z: position.z - 1};
            break
        case Direction.sw:
            newPosition = {x: position.x - 1, y: position.y + 1, z: position.z};
            break
        case Direction.w:
            newPosition = {x: position.x - 1, y: position.y, z: position.z + 1};
            break
        case Direction.nw:
            newPosition = {x: position.x, y: position.y - 1, z: position.z + 1};
            break
    }
    return newPosition;
}

export const nextDirection = (line: string, index: number): { direction: Direction, newIndex: number } => {
    let direction: Direction;
    if (line.charAt(index) === 'e') {
        direction = Direction.e;
    } else if (line.charAt(index) === 'w') {
        direction = Direction.w;
    } else if (line.charAt(index) === 's') {
        direction = line.charAt(index + 1) === 'e' ? Direction.se : Direction.sw;
    } else if (line.charAt(index) === 'n') {
        direction = line.charAt(index + 1) === 'e' ? Direction.ne : Direction.nw;
    } else {
        throw new Error('invalid direction');
    }
    return {direction: direction, newIndex: index + direction.length}
}

export const partTwo = (input: string[]): number | undefined => {
    const blackTiles: boolean[][][] = updateInput(input);
    return countBlackTilesFromFloor(afterGivenDays(100, blackTiles));
}

export const updateInput = (input: string[]): boolean[][][] => {
    const tileOnBLackSide: Map<string, boolean> = new Map<string, boolean>();
    for (let i = 0; i < input.length; i++) {
        const tilePosition: string = JSON.stringify(moveFromCenter(input[i]));
        tileOnBLackSide.set(tilePosition, !(tileOnBLackSide.get(tilePosition) || false));
    }
    const positions: Position[] = [];
    tileOnBLackSide.forEach((value, key) => {
        if (value) {
            positions.push(JSON.parse(key));
        }
    })
    return createFloor(positions);
}

const createFloor = (positions: Position[]): boolean[][][] => {
    let minX = positions[0].x;
    let maxX = positions[0].x;
    let minY = positions[0].y;
    let maxY = positions[0].y;
    let minZ = positions[0].z;
    let maxZ = positions[0].z;
    const blackTiles: boolean[][][] = [];
    positions.forEach(position => {
        minX = Math.min(minX, position.x);
        maxX = Math.max(maxX, position.x);
        minY = Math.min(minY, position.y);
        maxY = Math.max(maxY, position.y);
        minZ = Math.min(minZ, position.z);
        maxZ = Math.max(maxZ, position.z);
    });
    for (let i = minX; i <= maxX; i++) {
        blackTiles[i - minX] = [];
        for (let j = minY; j <= maxY; j++) {
            blackTiles[i - minX][j - minY] = [];
            for (let k = minZ; k <= maxZ; k++) {
                blackTiles[i - minX][j - minY].push(false);
            }
        }
    }
    positions.forEach(position => {
        blackTiles[position.x - minX][position.y - minY][position.z - minZ] = true;
    });
    return blackTiles;

}

export const getNumberOfAdjacentBlackTile = (w: number, x: number, y: number, blackTiles: boolean[][][]): number => {
    let count = 0;
    count += isBlackTile(w + 1, x - 1, y, blackTiles) ? 1 : 0;
    count += isBlackTile(w + 1, x, y - 1, blackTiles) ? 1 : 0;
    count += isBlackTile(w, x + 1, y - 1, blackTiles) ? 1 : 0;
    count += isBlackTile(w - 1, x + 1, y, blackTiles) ? 1 : 0;
    count += isBlackTile(w - 1, x, y + 1, blackTiles) ? 1 : 0;
    count += isBlackTile(w, x - 1, y + 1, blackTiles) ? 1 : 0;
    return count;
}

const isBlackTile = (x: number, y: number, z: number, blackTiles: boolean[][][]) => {
    if (x < 0 || y < 0 || z < 0) {
        return false;
    }
    if (x >= blackTiles.length || y >= blackTiles[0].length || z >= blackTiles[0][0].length) {
        return false;
    }
    return blackTiles[x][y][z];
}

const isTileBecomingBlack = (x: number, y: number, z: number, blackTiles: boolean[][][]) => {
    const numberOfActive: number = getNumberOfAdjacentBlackTile(x, y, z, blackTiles);
    return numberOfActive === 2 || (numberOfActive === 1 && isBlackTile(x, y, z, blackTiles));
}

export const afterGivenDays = (numberOfDays: number, tiles: boolean[][][]): boolean[][][] => {
    let outputTiles: boolean[][][] = tiles;
    for (let i = 0; i < numberOfDays; i++) {
        outputTiles = nextDay(outputTiles);
    }
    return outputTiles;
}

export const nextDay = (blackTiles: boolean[][][]): boolean[][][] => {
    const newBlackTiles: boolean[][][] = [];
    for (let i = -1; i <= blackTiles.length; i++) {
        newBlackTiles[i + 1] = [];
        for (let j = -1; j <= blackTiles[0].length; j++) {
            newBlackTiles[i + 1][j + 1] = [];
            for (let k = -1; k <= blackTiles[0][0].length; k++) {
                newBlackTiles[i + 1][j + 1][k + 1] = isTileBecomingBlack(i, j, k, blackTiles);
            }
        }
    }
    return newBlackTiles;
}

interface Position {
    x: number,
    y: number,
    z: number
}

export const countBlackTilesFromFloor = (blackTile: boolean[][][]) => {
    let numberOfBlackTiles = 0;
    for (let i = 0; i < blackTile.length; i++) {
        for (let j = 0; j < blackTile.length; j++) {
            for (let k = 0; k < blackTile.length; k++) {
                numberOfBlackTiles += blackTile[i][j][k] ? 1 : 0
            }
        }
    }
    return numberOfBlackTiles;
}

export enum Direction {
    e = 'e', se = 'se', sw = 'sw', w = 'w', nw = 'nw', ne = 'ne'
}

runPartOneAndTwo(partOne, partTwo, input)


