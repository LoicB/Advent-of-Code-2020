import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToNumberList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToNumberList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: number[]): number | undefined => {
    const sortedInput: number[] = input.sort((n1, n2) => n1 - n2);
    let oneJoltsCount = 0;
    let threeJoltsCount = 0;

    if (sortedInput[0] === 1) {
        oneJoltsCount++;
    } else if (sortedInput[0] === 3) {
        threeJoltsCount++;
    }
    for (let i = 0; i < sortedInput.length - 1; i++) {
        const gap = sortedInput[i + 1] - sortedInput[i];
        if (gap === 1) {
            oneJoltsCount++;
        } else if (gap === 3) {
            threeJoltsCount++;
        }
    }
    threeJoltsCount++;
    return oneJoltsCount * threeJoltsCount;
}

export const partTwo = (input: number[]): number | undefined => {
    const sortedInput: number[] = input.sort((n1, n2) => n1 - n2);
    let result = 1;
    let consecutiveOnes = 0;

    if (sortedInput[0] === 1) {
        consecutiveOnes++;
    }
    for (let i = 0; i < sortedInput.length - 1; i++) {
        const gap = sortedInput[i + 1] - sortedInput[i];
        if (gap === 1) {
            consecutiveOnes++;
        } else if (gap === 3) {
            if (consecutiveOnes > 1) {
                result *= calculatePossibleSubstitution(consecutiveOnes);
            }
            consecutiveOnes = 0;
        }
    }

    if (consecutiveOnes > 1) {
        result *= calculatePossibleSubstitution(consecutiveOnes)
    }
    return result
}

const calculatePossibleSubstitution = (consecutiveOnes: number) => {
    let result = Math.pow(2, consecutiveOnes - 1);
    if (consecutiveOnes >= 4) {
        result -= (consecutiveOnes-3) * (consecutiveOnes-2) / 2;
    }
    return result;
}

runPartOneAndTwo(partOne, partTwo, input)
