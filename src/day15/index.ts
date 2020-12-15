import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";

export const prepareInput = (rawInput: string) => {
    return rawInput.split(',').map(value => Number(value));
}

const input = prepareInput(readInput())

export const partOne = (input: number[]): number | undefined => {
    return findThNumberSpoken(input, 2020);
}

export const partTwo = (input: number[]): number | undefined => {
    return findThNumberSpoken(input, 30000000);
}

const findThNumberSpoken = (input: number[], n: number) => {
    let turn: number = 1;
    const numberToTurn: Map<number, Turn> = new Map<number, Turn>();
    for (let i = 0; i < input.length; i++) {
        numberToTurn.set(input[i], new Turn(turn));
        turn++;
    }
    let lastValue: number = input[input.length - 1];
    for (let i = input.length; i < n; i++) {
        let thisTurn: Turn = numberToTurn.get(lastValue) || new Turn(0);
        lastValue = thisTurn.getValue();
        numberToTurn.set(lastValue, (numberToTurn.get(lastValue) || new Turn(turn)).newTurn(turn));
        turn++;
    }
    return lastValue;

}

class Turn {
    lastTurn: number;
    previousTurn: number;

    constructor(index: number) {
        this.lastTurn = index;
        this.previousTurn = index;
    }

    getValue(): number {
        return this.lastTurn - this.previousTurn;
    }

    newTurn(value: number): Turn {
        this.previousTurn = this.lastTurn;
        this.lastTurn = value;
        return this;
    }

}


runPartOneAndTwo(partOne, partTwo, input)
