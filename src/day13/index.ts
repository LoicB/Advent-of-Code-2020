import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";


export interface BusSchedules {
    timestamp: number,
    busIDs: number[]
}

const rawInput = readInput()

export const prepareInputPartOne = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput);
    const IDs: number[] = lines[1].split(',').filter(id => id !== 'x').map(id => Number(id));
    return {
        timestamp: Number(lines[0]),
        busIDs: IDs
    }
}


export const partOne = (rawInput: string): number | undefined => {
    const input: BusSchedules = prepareInputPartOne(rawInput);
    let earliestTimestamp = -1;
    let busID = -1;
    input.busIDs.forEach(id => {
        const busNextDepartingTime = busNextDepartureTime(input.timestamp, id);
        if (earliestTimestamp === -1 || earliestTimestamp >= busNextDepartingTime) {
            earliestTimestamp = busNextDepartingTime;
            busID = id;
        }
    })
    return busID * (earliestTimestamp - input.timestamp);
}

export const busNextDepartureTime = (timestamp: number, id: number): number => {
    return timestamp + id - timestamp % id;
}


export const prepareInputPartTwo = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput);
    const IDs: number[] = lines[1].split(',').map(id => id === 'x' ? 1 : Number(id));
    return {
        timestamp: Number(lines[0]),
        busIDs: IDs
    }
}



export const partTwo = (rawInput: string): number | undefined => {
    const input: BusSchedules = prepareInputPartTwo(rawInput);
    return Number(chineseRemainder(input.busIDs));
}


/*
 * based on Base on http://rosettacode.org/wiki/Chinese_remainder_theorem
 */
const mulInv = (a: number, b: number): BigInt => {
    let b0 = BigInt(b);
    let x0 = BigInt(0);
    let x1 = BigInt(1);
    let q, tmp;
    if (b == 1) {
        return BigInt(1);
    }
    while (a > 1) {
        q = BigInt(Math.floor(a / b));
        tmp = a;
        a = b;
        b = tmp % b;
        tmp = x0;
        x0 = x1 - (q * x0);
        x1 = tmp;
    }
    if (x1 < 0) {
        x1 += b0;
    }
    return x1;
}

const chineseRemainder = (busIDs: number[]) => {
    let p = 1;
    let prod = BigInt(busIDs.filter(id => id !== 1).reduce((a, b) => a * b));
    let sum = BigInt(0);
    for (let i = 0; i < busIDs.length; i++) {
        p = Number(prod) / busIDs[i];
        sum += (BigInt(busIDs[i] - i) * BigInt(mulInv(p, busIDs[i])) * BigInt(p));
    }
    if (sum < 0) {
        sum += prod;
    }
    return sum % prod;
}

runPartOneAndTwo(partOne, partTwo, rawInput)
