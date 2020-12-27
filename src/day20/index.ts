import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";
import Tile, {Direction} from './Tile';

export const prepareInput = (rawInput: string) => {
    const inputArray: string[] = inputToStringList(rawInput).filter(value => value.trim().length > 0);
    const tiles: Tile[] = [];
    let index = 0;
    while (index < inputArray.length) {
        const id: number = Number(inputArray[index].substring(4, 9));
        const image: string[] = [];
        index++;
        for (let i = index; i < index + 10; i++) {
            image.push(inputArray[i]);
        }
        index += 10;
        tiles.push(new Tile(id, image));
    }
    return tiles;
}

const input = prepareInput(readInput())

export const partOne = (input: Tile[]): number | undefined => {
    const numberOfAdjacent: number[] = input.map(_ => 0);
    let angleTiles: Tile[] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i].isAdjacentWith(input[j])) {
                numberOfAdjacent[i]++;
                numberOfAdjacent[j]++;
            }
        }
        if (numberOfAdjacent[i] === 2) {
            angleTiles.push(input[i]);
        }
    }
    let result = 1;
    angleTiles.forEach(value => result = result * value.getId())
    return result;
}

export const partTwo = (input: Tile[]): number | undefined => {
    const map: string[] = removeBorders(rearrangeMap(buildMap(createTileToAdjacent(input))));
    const monster: string[] =
        [
            '                  # ',
            '#    ##    ##    ###',
            ' #  #  #  #  #  #   '
        ]
    let numberOfHash = 0;
    map.forEach(value => {
        for (let i = 0; i < value.length; i++) {
            numberOfHash += (value.charAt(i) === '#') ? 1 : 0
        }
    });

    let numberOfHashInMonster = 0;
    monster.forEach(value => {
        for (let i = 0; i < value.length; i++) {
            numberOfHashInMonster += (value.charAt(i) === '#') ? 1 : 0
        }
    });
    const mapTile: Tile = new Tile(1, map);
    let numberOfMonster = 0;
    numberOfMonster = Math.max(countMonsters(mapTile.getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.rotate().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.rotate().rotate().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.rotate().rotate().rotate().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.mirror().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.mirror().rotate().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.mirror().rotate().rotate().getImage(), monster), numberOfMonster);
    numberOfMonster = Math.max(countMonsters(mapTile.mirror().rotate().rotate().rotate().getImage(), monster), numberOfMonster);
    return numberOfHash - (numberOfMonster * numberOfHashInMonster);
}

export const countMonsters = (map: string[], monster: string[]): number => {
    let count = 0;
    for (let i = 0; i < map.length - monster.length; i++) {
        for (let j = 0; j < map[i].length - monster[0].length; j++) {
            if (findMatch(map, monster, i, j)) {
                count++;
            }
        }
    }
    return count;
}

function findMatch(map: string[], monster: string[], i: number, j: number) {
    let b = true;
    for (let k = 0; k < monster.length; k++) {
        for (let n = 0; n < monster[k].length; n++) {
            if (monster[k][n] === '#' && map[k + i][j + n] === '.') {
                b = false;
                break
            }
        }
    }
    return b;
}

export const createTileToAdjacent = (input: Tile[]): Map<Tile, Tile[]> => {
    const tileToAdjacent: Map<Tile, Tile[]> = new Map<Tile, Tile[]>();
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i].isAdjacentWith(input[j])) {
                updateAdjacentTiles(input[i], input[j], tileToAdjacent);
                updateAdjacentTiles(input[j], input[i], tileToAdjacent);
            }
        }
    }
    return tileToAdjacent;
}

export const rearrangeMap = (rawMap: Tile[][]): Tile[][] => {
    const reversed = getTileSideReversed(rawMap);
    const map = fixSides(rawMap, reversed);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (i > 0) {
                const directionTop: Direction = map[i][j].compareWithOtherNoMirror(map[i - 1][j]);
                if (directionTop !== Direction.TOP) {
                    map[i][j] = redirectToTop(map[i][j], directionTop);
                }
            }
            if (i < map.length - 1) {
                const directionBottom: Direction = map[i][j].compareWithOtherNoMirror(map[i + 1][j]);
                if (directionBottom !== Direction.BOTTOM) {
                    map[i][j] = redirectToBottom(map[i][j], directionBottom);
                }
            }
            if (j > 0) {
                const directionLeft: Direction = map[i][j].compareWithOtherNoMirror(map[i][j - 1]);
                if (directionLeft !== Direction.LEFT) {
                    map[i][j] = redirectToLeft(map[i][j], directionLeft);
                }
            }
            if (j < map[i].length - 1) {
                const directionRight: Direction = map[i][j].compareWithOtherNoMirror(map[i][j + 1]);
                if (directionRight !== Direction.RIGHT) {
                    map[i][j] = redirectToRight(map[i][j], directionRight);
                }
            }
        }
    }
    return map;
}

const redirectToTop = (tile: Tile, direction: Direction): Tile => {
    if (direction === Direction.LEFT) {
        return tile.rotate();
    } else if (direction === Direction.BOTTOM) {
        return tile.rotate().rotate();
    } else if (direction === Direction.RIGHT) {
        return tile.rotate().rotate().rotate();
    } else {
        return tile;
    }
}

const redirectToBottom = (tile: Tile, direction: Direction): Tile => {
    if (direction === Direction.RIGHT) {
        return tile.rotate();
    } else if (direction === Direction.TOP) {
        return tile.rotate().rotate();
    } else if (direction === Direction.LEFT) {
        return tile.rotate().rotate().rotate();
    } else {
        return tile;
    }
}


const redirectToLeft = (tile: Tile, direction: Direction): Tile => {
    if (direction === Direction.BOTTOM) {
        return tile.rotate();
    } else if (direction === Direction.RIGHT) {
        return tile.rotate().rotate();
    } else if (direction === Direction.TOP) {
        return tile.rotate().rotate().rotate();
    } else {
        return tile;
    }
}

const redirectToRight = (tile: Tile, direction: Direction): Tile => {
    if (direction === Direction.TOP) {
        return tile.rotate();
    } else if (direction === Direction.LEFT) {
        return tile.rotate().rotate();
    } else if (direction === Direction.BOTTOM) {
        return tile.rotate().rotate().rotate();
    } else {
        return tile;
    }
}


export const buildMap = (tileToAdjacent: Map<Tile, Tile[]>): Tile[][] => {
    const angleTiles: Tile[] = [];
    tileToAdjacent.forEach((value, key) => {
        if (value.length === 2) {
            angleTiles.push(key);
        }
    })
    const usedTile: Set<Tile> = new Set<Tile>();
    const map: Tile[][] = [];
    map[0] = [];
    map[0].push(angleTiles[0]);
    usedTile.add(angleTiles[0]);
    let lastDiagonal = [angleTiles[0]];

    while (usedTile.size < tileToAdjacent.size) {
        const nextTiles: Tile[] = sortNextAdjacent(lastDiagonal, tileToAdjacent, usedTile);
        let index = 0;
        for (let i = 0; i < nextTiles.length; i++) {
            if (map[i] === undefined) {
                map[i] = [];
            }
            while (map[i + index].length === Math.sqrt(tileToAdjacent.size)) {
                index++;
            }
            map[i + index].push(nextTiles[i]);
            usedTile.add(nextTiles[i]);

        }
        lastDiagonal = nextTiles;
    }
    return map;
}

const sortNextAdjacent = (tiles: Tile[], tileToAdjacent: Map<Tile, Tile[]>, usedTile: Set<Tile>) => {
    if (tiles.length === 1) {
        return tileToAdjacent.get(tiles[0]) || [];
    }
    const outputTiles: Tile[] = [];
    for (let i = 0; i < tiles.length; i++) {
        const adjacentTile: Tile[] = (tileToAdjacent.get(tiles[i]) || []).filter(value => !usedTile.has(value));
        adjacentTile.filter(tile => !usedTile.has(tile)).forEach(tile => {
            if (outputTiles.indexOf(tile) > -1) {
                outputTiles.splice(outputTiles.indexOf(tile), 1);
            }
            outputTiles.push(tile);
        })
    }
    return outputTiles;
}

export const getTileSideReversed = (map: Tile[][]): boolean[][] => {
    const reversed: boolean[][] = [...Array<boolean>(map.length)].map((_, index) => Array<boolean>(map[index].length));
    reversed[0][0] = true;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (i > 0) {
                if (map[i][j].compareWithOtherNoMirror(map[i - 1][j]) === Direction.NONE) {
                    reversed[i][j] = !reversed[i - 1][j];
                } else {
                    reversed[i][j] = reversed[i - 1][j];
                }
            }
            if (j > 0) {
                if (map[i][j].compareWithOtherNoMirror(map[i][j - 1]) === Direction.NONE) {
                    reversed[i][j] = !reversed[i][j - 1];
                } else {
                    reversed[i][j] = reversed[i][j - 1];
                }
            }
        }
    }
    return reversed;
}

export const fixSides = (map: Tile[][], reversed: boolean[][]): Tile[][] => {
    if (reversed) {
    }
    map.forEach((tiles, i) => tiles.forEach((tile, j) => {
        if (reversed[i][j]) {
            map[i][j] = tile.mirror();
        }
    }))
    return map;
}

export const removeBorders = (map: Tile[][]): string[] => {
    const tilesNoBorder: string[][][] = map.map(value => value.map(value1 => value1.removeBorder()));
    if (tilesNoBorder) {
    }
    const lines: string[] = [];
    for (let i = 0; i < tilesNoBorder.length; i++) {
        for (let j = 0; j < tilesNoBorder[i].length; j++) {
            for (let k = 0; k < tilesNoBorder[i][j].length; k++) {
                if (lines[k] === undefined) {
                    lines[k] = '';
                }
                lines[k] += tilesNoBorder[i][j][k]
            }
        }
    }
    const lineSize = map.length * (tilesNoBorder[0][0].length);
    while (lines.filter(line => line.length > lineSize).length > 0) {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length > map.length) {
                lines.push(lines[i].substring(lineSize));
            }
            lines[i] = lines[i].substring(0, lineSize);
        }
    }
    return lines.filter(line => line.trim().length > 0);
}

const updateAdjacentTiles = (tileA: Tile, tileB: Tile, tileToAdjacent: Map<Tile, Tile[]>) => {
    const currentAdjacentTile: Tile[] = tileToAdjacent.get(tileA) || [];
    currentAdjacentTile.push(tileB);
    tileToAdjacent.set(tileA, currentAdjacentTile);
}


runPartOneAndTwo(partOne, partTwo, input)
