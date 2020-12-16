import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

const applyValidRange = (validValues: boolean[], ranges: string[]) => {
    ranges.forEach(range => {
        if (isRange(range)) {
            const rangeChar = range.split('-');
            for (let i = Number(rangeChar[0]); i < Number(rangeChar[1]) + 1; i++) {
                validValues[i] = true;
            }
        }
    })
}

const removeUndefined = (validValues: boolean[]) => {
    for (let i = 0; i < validValues.length; i++) {
        if (validValues[i] === undefined) {
            validValues[i] = false;
        }
    }

}

const isRange = (range: string) => {
    return range.indexOf('-') !== -1
}

const getTicket = (line: string): number[] => {
    let ticket: number[] = [];
    const ticketFields: string[] = line.split(',');
    ticketFields.forEach(field => ticket.push(Number(field)));
    return ticket;
}

const getNearbyTicks = (lines: string[], index: number): number[][] => {
    let nearbyTickets: number[][] = [];
    while (index < lines.length && lines[index].trim().length > 0) {
        nearbyTickets.push(getTicket(lines[index]));
        index++;
    }
    return nearbyTickets;
}

export const prepareInputPartOne = (rawInput: string): InputPartOne => {
    const lines: string[] = inputToStringList(rawInput);
    const validValues: boolean[] = [];
    let index = 0;
    while (lines[index].trim().length > 0) {
        const ranges: string[] = lines[index].split(' ');
        applyValidRange(validValues, ranges);
        index++;
    }
    removeUndefined(validValues);
    index += 2;
    let ticket: number[] = getTicket(lines[index]);

    index += 3;
    let nearbyTickets = getNearbyTicks(lines, index);
    return {
        validValues,
        ticket,
        nearbyTickets
    }

}


export const prepareInputPartTwo = (rawInput: string): Map<string, boolean[]> => {
    const lines: string[] = inputToStringList(rawInput);
    const map: Map<string, boolean[]> = new Map<string, boolean[]>();
    let index = 0;
    while (lines[index].trim().length > 0) {
        const validValues: boolean[] = [];
        const parts: string[] = lines[index].split(':');
        const words: string[] = parts[1].split(' ');
        words.forEach(word => {
            if (word.indexOf('-') !== -1) {
                const range = word.split('-');
                for (let i = Number(range[0]); i < Number(range[1]) + 1; i++) {
                    validValues[i] = true;
                }
            }
        })
        for (let i = 0; i < validValues.length; i++) {
            if (validValues[i] === undefined) {
                validValues[i] = false;
            }
        }
        map.set(parts[0], validValues);
        index++;
    }
    return map;

}

export interface InputPartOne {
    validValues: boolean[],
    ticket: number[],
    nearbyTickets: number[][]
}


const input = readInput()

export const partOne = (rawInput: string): number | undefined => {
    const input: InputPartOne = prepareInputPartOne(rawInput);
    let errorRate: number = 0;
    input.ticket.filter(field => !isFieldValue(field, input.validValues)).forEach(field => errorRate += field);
    input.nearbyTickets.forEach(otherTicket => otherTicket.filter(field => !isFieldValue(field, input.validValues)).forEach(field => errorRate += field));
    return errorRate
}

const isFieldValue = (field: number, validValues: boolean[]): boolean => {
    return (field < validValues.length && validValues[field]);
}

export const partTwo = (rawInput: string): number | undefined => {
    const input: Map<string, boolean[]> = prepareInputPartTwo(rawInput);
    const inputPart1: InputPartOne = prepareInputPartOne(rawInput);
    const nearbyTickets: number[][] = [];
    inputPart1.nearbyTickets.filter(otherTicket => otherTicket.filter(field => isFieldValue(field, inputPart1.validValues)).length === otherTicket.length).forEach(otherTicket => nearbyTickets.push(otherTicket));


    const rulesToFields: Map<string, number[]> = calculatePossibleFields(input, nearbyTickets);
    const result: Map<string, number> = removeDuplicatePossible(rulesToFields);
    let ticketHash = 1;
    result.forEach((value, key) => {
        if (key.startsWith('departure')) {
            ticketHash *= inputPart1.ticket[value];
        }
    });
    return ticketHash;
}


export const calculatePossibleFields = (rulesToFields: Map<string, boolean[]>, nearbyTickets: number[][]): Map<string, number[]> => {
    const result: Map<string, number[]> = new Map<string, number[]>();
    rulesToFields.forEach((value, key) => {
        const validFields: number[] = []
        let allFieldsValid = false;
        let index = 0;
        while (index < nearbyTickets[0].length) {
            allFieldsValid = nearbyTickets.filter(ticket => value[ticket[index]]).length === nearbyTickets.length;
            if (allFieldsValid) {
                validFields.push(index);
            }
            index++;
        }
        result.set(key, validFields);
    });
    return result;
}

export const removeDuplicatePossible = (rulesToFields: Map<string, number[]>): Map<string, number> => {
    const result: Map<string, number> = new Map<string, number>();
    const singleFields: number[] = [];
    while (rulesToFields.size > 0) {
        rulesToFields.forEach((value, key) => {
            if (value.length === 1) {
                singleFields.push(value[0]);
                result.set(key, value[0]);
            }
        });
        result.forEach((_, key) => {
            rulesToFields.delete(key);
        });
        for (let key of Array.from(rulesToFields.keys())) {
            const array: number[] = (rulesToFields.get(key) || []).filter(value => singleFields.indexOf(value) === -1);
            rulesToFields.set(key, array);
        }
    }
    return result;

}

runPartOneAndTwo(partOne, partTwo, input)
