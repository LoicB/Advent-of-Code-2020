import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToNumberList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToNumberList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: number[]): number | undefined => {
    const index = findIndexNumberBreaksProperty(input);
    let numberBreaksProperty : number | undefined;
    if (index !== undefined) {
        numberBreaksProperty = input[index];
    }
    return numberBreaksProperty;
}

const findIndexNumberBreaksProperty = (input: number[]): number | undefined => {
    let index = 25;
    while (index < input.length) {
        if (!findSumInPrevious(input, index, 25)) {
            return index;
        } else {
            index++;
        }
    }
    return
}


export const findSumInPrevious = (input: number[], index: number, length: number): boolean => {
    const numbers: Array<boolean> = Array(input[index]);
    for (let i = index - length; i <= index; i++) {
        numbers[input[i] - 1] = true;
        if (numbers[input[index] - input[i] - 1]) {
            return true;
        }
    }
    return false
}

export const partTwo = (input: number[]): number | undefined => {
    const index = findIndexNumberBreaksProperty(input);
    let encryptionWeakness : number | undefined;
    if (index !== undefined) {
        encryptionWeakness = findEncryptionWeakness(input, index);
    }
    return encryptionWeakness;
}


export const findEncryptionWeakness = (input: number[], index: number): number | undefined => {
    for (let i = 0; i < index; i++) {
        let sum = input[i];
        for (let j = i + 1; j < index && sum <= input[index]; j++) {
            sum += input[j];
            if (sum === input[index]) {
                return  extractWeaknessFromRange(input, i, j);
            }
        }
    }
    return
}

const extractWeaknessFromRange =(input: number[], from: number, to: number) => {
    let min = input[from];
    let max = input[from];
    for (let k = from; k <= to; k++) {
        min = Math.min(min, input[k]);
        max = Math.max(max, input[k]);
    }
    return min + max;
}


runPartOneAndTwo(partOne, partTwo, input)
