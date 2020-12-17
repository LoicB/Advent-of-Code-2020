import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => [inputToStringList(rawInput)]

const input = prepareInput(readInput())

export const partOne = (input: string[][]): number | undefined => {
    let conwayCubes = input;
    for (let i = 0; i < 6; i++) {
        conwayCubes = nextCycle(conwayCubes);
    }
    let count = 0;
    for (let i = 0; i < conwayCubes.length; i++) {
        for (let j = 0; j < conwayCubes[i].length; j++) {
            for (let k = 0; k < conwayCubes[i][j].length; k++) {
                count += conwayCubes[i][j].charAt(k) === '#' ? 1 : 0
            }
        }
    }
    return count
}

export const nextCycle = (conwayCubes: string[][]): string[][] => {
    const newConwayCubes: string[][] = [];
    for (let i = -1; i <= conwayCubes.length; i++) {
        newConwayCubes[i + 1] = [];
        for (let j = -1; j <= conwayCubes[0].length; j++) {
            let line: string = '';
            for (let k = -1; k <= conwayCubes[0][0].length; k++) {
                const numberOfActive: number = getNumberOfActiveCube(i, j, k, conwayCubes);
                if (isCubeActive(i, j, k, conwayCubes)) {
                    if (numberOfActive === 3 || numberOfActive === 2) {
                        line += '#';
                    } else {
                        line += '.';
                    }
                } else {
                    if (numberOfActive === 3) {
                        line += '#';
                    } else {
                        line += '.';
                    }
                }
            }
            newConwayCubes[i + 1].push(line);
        }
    }
    return newConwayCubes;
}

export const getNumberOfActiveCube = (x: number, y: number, z: number, conwayCubes: string[][]): number => {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                if (x !== i || y !== j || z !== k) {
                    count += isCubeActive(i, j, k, conwayCubes) ? 1 : 0;
                }
            }
        }
    }
    return count;
}

const isCubeActive = (x: number, y: number, z: number, conwayCubes: string[][]) => {
    if (x < 0 || y < 0 || z < 0) {
        return false;
    }
    if (x >= conwayCubes.length || y >= conwayCubes[0].length || z >= conwayCubes[0][0].length) {
        return false;
    }
    return conwayCubes[x][y].charAt(z) === '#';
}

export const partTwo = (input: string[][]): number | undefined => {
    let conwayCubes = [input];
    for (let i = 0; i < 6; i++) {
        conwayCubes = nextCycle4D(conwayCubes);
    }
    let count = 0;
    for (let i = 0; i < conwayCubes.length; i++) {
        for (let j = 0; j < conwayCubes[i].length; j++) {
            for (let k = 0; k < conwayCubes[i][j].length; k++) {
                for (let m = 0; m < conwayCubes[i][j][k].length; m++) {
                    count += conwayCubes[i][j][k].charAt(m) === '#' ? 1 : 0
                }
            }
        }
    }
    return count
}


export const nextCycle4D = (conwayCubes: string[][][]): string[][][] => {
    const newConwayCubes: string[][][] = [];
    for (let i = -1; i <= conwayCubes.length; i++) {
        newConwayCubes[i + 1] = [];
        for (let j = -1; j <= conwayCubes[0].length; j++) {
            newConwayCubes[i + 1][j + 1] = [];
            for (let k = -1; k <= conwayCubes[0][0].length; k++) {
                let line: string = '';
                for (let m = -1; m <= conwayCubes[0][0][0].length; m++) {
                    const numberOfActive: number = getNumberOfActiveCube4D(i, j, k, m, conwayCubes);
                    if (isCubeActive4D(i, j, k, m, conwayCubes)) {
                        if (numberOfActive === 3 || numberOfActive === 2) {
                            line += '#';
                        } else {
                            line += '.';
                        }
                    } else {
                        if (numberOfActive === 3) {
                            line += '#';
                        } else {
                            line += '.';
                        }
                    }
                }
                newConwayCubes[i + 1][j + 1].push(line);
            }
        }
    }
    return newConwayCubes;
}

export const getNumberOfActiveCube4D = (w: number, x: number, y: number, z: number, conwayCubes: string[][][]): number => {
    let count = 0;
    for (let i = w - 1; i <= w + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            for (let k = y - 1; k <= y + 1; k++) {
                for (let m = z - 1; m <= z + 1; m++) {
                    if (w !== i || x !== j || y !== k || z !== m) {
                        count += isCubeActive4D(i, j, k, m, conwayCubes) ? 1 : 0;
                    }
                }
            }
        }
    }
    return count;
}

const isCubeActive4D = (w: number, x: number, y: number, z: number, conwayCubes: string[][][]) => {
    if (w < 0 || x < 0 || y < 0 || z < 0) {
        return false;
    }
    if (w >= conwayCubes.length || x >= conwayCubes[0].length || y >= conwayCubes[0][0].length || z >= conwayCubes[0][0][0].length) {
        return false;
    }
    return conwayCubes[w][x][y].charAt(z) === '#';
}

runPartOneAndTwo(partOne, partTwo, input)
