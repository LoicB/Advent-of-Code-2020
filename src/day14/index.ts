import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput);
    const input: string[][] = [];
    lines.filter(line => line.trim().length > 0).forEach(line => {
        const instructions = line.split(' ');
        input.push([instructions[0], instructions[2]]);
    })
    return input;
}

const input = prepareInput(readInput())

export const partOne = (input: string[][]): number | undefined => {
    const mem: number[] = [];
    let currentMask: string | undefined;
    input.forEach(line => {
        if (line[0] === 'mask') {
            currentMask = line[1];
        } else if (currentMask !== undefined) {
            const indexSquareBracketOpen = line[0].indexOf('[');
            const indexSquareBracketClose = line[0].indexOf(']');
            const address = Number(line[0].substring(indexSquareBracketOpen + 1, indexSquareBracketClose));
            mem[address] = bitsToDecimal(applyMaskPartOne(decimalToBits(Number(line[1])), currentMask))
        }
    })
    return mem.reduce((a, b) => a + b);
}

export const partTwo = (input: string[][]): number | undefined => {
    const mem: Map<number, string> = new Map<number, string>();
    let currentMask: string | undefined;
    input.forEach(line => {
        if (line[0] === 'mask') {
            currentMask = line[1];
        } else if (currentMask !== undefined) {
            const indexSquareBracketOpen = line[0].indexOf('[');
            const indexSquareBracketClose = line[0].indexOf(']');
            const decimal = Number(line[0].substring(indexSquareBracketOpen + 1, indexSquareBracketClose));
            const addresses: number[] = bitsToDecimalPart2(applyMaskPartTwo(decimalToBits(decimal), currentMask));
            addresses.forEach(address => mem.set(address, line[1]));
        }
    })
    let result = 0;
    mem.forEach((value: string) => {
        result += Number(value)
    });
    return result;
}

export const decimalToBits = (decimal: number): string => {
    const temporaryBinary = decimal.toString(2);
    return "000000000000000000000000000000000000".substr(temporaryBinary.length) + temporaryBinary;
}

export const bitsToDecimal = (binary: string): number => {
    return parseInt(binary, 2);
}

export const applyMaskPartOne = (value: string, mask: string): string => {
    return applyMask(value, mask, 'X');
}

export const applyMaskPartTwo = (value: string, mask: string): string => {
    return applyMask(value, mask, '0');
}

/**
 * Apply a mask to a given value
 * @param value value to which the mask will be applied
 * @param mask mask that will modify the value.
 * @param mirroringCharacter character for which the corresponding bit is unchanged
 */
const applyMask = (value: string, mask: string, mirroringCharacter: string): string => {
    let result = '';
    for (let i = 0; i < mask.length; i++) {
        if (mask.charAt(i) === mirroringCharacter) {
            result += value.charAt(i);
        } else {
            result += mask.charAt(i);

        }
    }
    return result;
}


export const bitsToDecimalPart2 = (binary: string): number[] => {
    return removeXFromBinary(binary).map(value => bitsToDecimal(value));

}

const removeXFromBinary = (binary: string): string[] => {
    let result: string[] = [''];
    for (let i = 0; i < binary.length; i++) {
        if (binary.charAt(i) === '1') {
            result = result.map(value => value + '1');
        } else if (binary.charAt(i) === '0') {
            result = result.map(value => value + '0');
        } else if (binary.charAt(i) === 'X') {
            const tmpArr: string[] = [];
            result.forEach(value => tmpArr.push(value + '0', value + '1'));
            result = tmpArr;
        }
    }
    return result;
}

runPartOneAndTwo(partOne, partTwo, input)
