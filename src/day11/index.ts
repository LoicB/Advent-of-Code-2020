import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputTo2dStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputTo2dStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[][]): number | undefined => {
    let waitingRoom: string[][] = input;
    let completed: boolean = false;
    while (!completed) {
        const nextWaitingRoom = nextRoundsPartOne(waitingRoom);
        completed = areAreasSame(waitingRoom, nextWaitingRoom)
        waitingRoom = nextWaitingRoom.map(range => range.slice());
    }
    return countOccupiedSeats(waitingRoom);
}

export const partTwo = (input: string[][]): number | undefined => {
    let waitingRoom: string[][] = input;
    let completed: boolean = false;
    while (!completed) {
        const nextWaitingRoom = nextRoundsPartTwo(waitingRoom);
        completed = areAreasSame(waitingRoom, nextWaitingRoom)
        waitingRoom = nextWaitingRoom.map(range => range.slice());
    }
    return countOccupiedSeats(waitingRoom);
}

export const nextRoundsPartOne = (waitingArea: string[][]): string[][] => {
    const newWaitingAre: string[][] = [];
    for (let i = 0; i < waitingArea.length; i++) {
        newWaitingAre[i] = [];
        for (let j = 0; j < waitingArea[i].length; j++) {
            if (waitingArea[i][j] === '.') {
                newWaitingAre[i][j] = waitingArea[i][j];
            } else {
                const occupiedSeats = countAdjacentOccupiedSeats(waitingArea, i, j);
                if (occupiedSeats === 0) {
                    newWaitingAre[i][j] = '#';
                } else if (occupiedSeats >= 4) {
                    newWaitingAre[i][j] = 'L';
                } else {
                    newWaitingAre[i][j] = waitingArea[i][j];
                }
            }
        }
    }
    return newWaitingAre;
}

export const nextRoundsPartTwo = (waitingArea: string[][]): string[][] => {
    const newWaitingAre: string[][] = [];
    for (let i = 0; i < waitingArea.length; i++) {
        newWaitingAre[i] = [];
        for (let j = 0; j < waitingArea[i].length; j++) {
            if (waitingArea[i][j] === '.') {
                newWaitingAre[i][j] = waitingArea[i][j];
            } else {
                const occupiedSeats = countSurroundingOccupiedSeats(waitingArea, i, j);
                if (occupiedSeats === 0) {
                    newWaitingAre[i][j] = '#';
                } else if (occupiedSeats >= 5) {
                    newWaitingAre[i][j] = 'L';
                } else {
                    newWaitingAre[i][j] = waitingArea[i][j];
                }
            }
        }
    }
    return newWaitingAre;
}

export const countAdjacentOccupiedSeats = (waitingArea: string[][], seatX: number, seatY: number): number => {
    let occupiedSeats = 0;
    for (let i = Math.max(0, seatX - 1); i <= Math.min(waitingArea.length - 1, seatX + 1); i++) {
        for (let j = Math.max(0, seatY - 1); j <= Math.min(waitingArea[i].length - 1, seatY + 1); j++) {
            if (i !== seatX || j !== seatY) {
                occupiedSeats += waitingArea[i][j] === '#' ? 1 : 0;
            }
        }
    }
    return occupiedSeats;
}

export const countSurroundingOccupiedSeats = (waitingArea: string[][], seatX: number, seatY: number): number => {
    let occupiedSeats = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
                let x = seatX + i;
                let y = seatY + j;
                while (x >= 0 && y >= 0 && x < waitingArea.length && y < waitingArea[x].length && waitingArea[x][y] === '.') {
                    x += i;
                    y += j;
                }
                if (x >= 0 && y >= 0 && x < waitingArea.length && y < waitingArea[x].length) {
                    occupiedSeats += waitingArea[x][y] === '#' ? 1 : 0;
                }
            }
        }
    }
    return occupiedSeats;
}

export const waitingAreaToString = (waitingArea: string[][]): string => {
    let toString: string = '';
    for (let i = 0; i < waitingArea.length; i++) {
        for (let j = 0; j < waitingArea[i].length; j++) {
            toString += waitingArea[i][j];
        }
        toString += '\n';
    }
    return toString;
}

const countOccupiedSeats = (waitingArea: string[][]): number => {
    let count = 0;
    for (let i = 0; i < waitingArea.length; i++) {
        for (let j = 0; j < waitingArea[i].length; j++) {
            count += waitingArea[i][j] === '#' ? 1 : 0;
        }
    }
    return count;
}

export const areAreasSame = (waitingArea1: string[][], waitingArea2: string[][]): boolean => {
    let same: boolean = waitingArea1.length === waitingArea2.length;
    for (let i = 0; same && i < waitingArea1.length; i++) {
        same = waitingArea1[i].length === waitingArea2[i].length;
        for (let j = 0; same && j < waitingArea1.length; j++) {
            same = (waitingArea1[i][j] === waitingArea2[i][j]);
        }
    }
    return same;
}


runPartOneAndTwo(partOne, partTwo, input)
