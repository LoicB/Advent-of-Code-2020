import {readInput} from '../utils/readInput';
import {inputToNumberList} from "../utils/cookInput";
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";

export const prepareInput = (rawInput: string) => inputToNumberList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: number[]) => {
    const numbers: Array<boolean> = Array(2020);
    for (let i = 0; i < input.length; i++) {
        numbers[input[i] - 1] = true;
        if (numbers[2020 - input[i] - 1]) {
            return (2020 - input[i]) * input[i];
        }
    }
    return
}

export const partTwo = (input: number[]) => {
    const numbers: Array<boolean> = Array(2020);
    for (let i = 0; i < input.length; i++) {
        numbers[input[i] - 1] = true;
        for (let j = i + 1; j < input.length; j++) {
            numbers[input[j] - 1] = true;
            if (numbers[2020 - input[i] - input[j] - 1]) {
                return (2020 - input[i] - input[j]) * input[i] * input[j];
            }
        }
    }
    return
}

runPartOneAndTwo(partOne, partTwo, input)

