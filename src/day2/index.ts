import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";
import {isValidPolicy1, isValidPolicy2} from "./passwordChecker";

export const prepareInput = (rawInput: string): string[][] => {
    const stringList: string[] = inputToStringList(rawInput);
    return stringList.filter(line => line.trim().length > 0)
        .map(line => {
            const splitLine = line.split(':');
            return [splitLine[0], splitLine[1].trim()];
        });
}

const input = prepareInput(readInput())

export const partOne = (input: string[][]): number | undefined => {
    let validCounter = 0;
    input.forEach(value => {
        if (isValidPolicy1(value[0], value[1])) {
            validCounter++;
        }
    });
    return validCounter;
}

export const partTwo = (input: string[][]): number | undefined => {
    let validCounter = 0;
    input.forEach(value => {
        if (isValidPolicy2(value[0], value[1])) {
            validCounter++;
        }
    });
    return validCounter;
}


runPartOneAndTwo(partOne, partTwo, input)
