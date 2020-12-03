import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputTo2dStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputTo2dStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[][]): number | undefined => {
    return exploreTreeForest(input, {right: 3, down: 1});
}

export const partTwo = (input: string[][]): number | undefined => {
    let multipliedTreesCount = 1;
    multipliedTreesCount *= exploreTreeForest(input, {right: 1, down: 1});
    multipliedTreesCount *= exploreTreeForest(input, {right: 3, down: 1});
    multipliedTreesCount *= exploreTreeForest(input, {right: 5, down: 1});
    multipliedTreesCount *= exploreTreeForest(input, {right: 7, down: 1});
    multipliedTreesCount *= exploreTreeForest(input, {right: 1, down: 2});
    return multipliedTreesCount;
}

interface Slope {
    right: number,
    down: number,
}

const exploreTreeForest = (input: string[][], slope: Slope): number => {
    const traveller = {down: 0, right: 0};
    let treeCounter = 0;
        while (traveller.down < input.length) {
            if (isTree(input, traveller.down, traveller.right)) {
                treeCounter++;
            }
            traveller.down += slope.down;
            traveller.right += slope.right;
        }
    return treeCounter;
}

export const isTree = (forest: string[][], x: number, y: number): boolean => {
    return forest[x][y % forest[0].length] === '#';
}


runPartOneAndTwo(partOne, partTwo, input)
