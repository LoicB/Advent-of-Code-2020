import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";
import {binarySpacePartitionConverter, findUnoccupiedSeats} from "./binarySpacePartitioning";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    let highestSeatID = 0;
     input.forEach(line => highestSeatID =Math.max(highestSeatID, binarySpacePartitionConverter(line)));
    return highestSeatID;
}

export const partTwo = (input: string[]): number | undefined => {
    const ids: number[] =[];
    input.forEach(line => ids.push(binarySpacePartitionConverter(line)));
    return findUnoccupiedSeats(ids)[0];
}

runPartOneAndTwo(partOne, partTwo, input)
