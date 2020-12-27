import {  readInput } from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToNumberList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToNumberList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: number[]): number | undefined => {
    return loop(input[1], findLoopSize(input[0]));
}

export const findLoopSize = (publicKey: number): number => {
    let loopSize = 0;
    let resultKey = 1;
    while (resultKey !== publicKey) {
        resultKey = newLoopValue(resultKey, 7);
        loopSize++;
    }
    return loopSize;
}

export const loop = (subjectNumber: number, loopSize: number): number => {
    let result: number = 1;
    for (let i = 0; i < loopSize; i++) {
        result = newLoopValue(result, subjectNumber);
    }
    return result;
}

export const newLoopValue = (currentNumber: number, subjectNumber: number): number => {
    return (currentNumber * subjectNumber) % 20201227;
}

export const partTwo = (_: number[]): string | undefined => {
    return 'Merry Christmas';
}


runPartOneAndTwo(partOne, partTwo, input)
