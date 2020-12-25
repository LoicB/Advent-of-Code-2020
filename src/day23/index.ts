import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";

export const prepareInput = (rawInput: string) => {
    return rawInput.split('').map(value => Number(value));
}

const input = prepareInput(readInput())

interface Cup {
    id: number,
    next?: Cup
}

export interface CrabCupsGame {
    cupRegistry: Cup[],
    selectedCup: Cup,
    numberOfCups: number;
}

export const partOne = (input: number[]): number | undefined => {
    let game: CrabCupsGame = createGame(input);
    for (let i = 0; i < 100; i++) {
        game = move(game);
    }
    return calculateResult(game);
}

export const gameToCups = (game: CrabCupsGame): number[] => {
    const cups: Cup[] = [];
    let cup: Cup = game.selectedCup;
    for (let i = 0; i < game.numberOfCups; i++) {
        cups.push(cup);
        cup = cup.next || cup;
    }
    return cups.map(value => value.id);
}

export const createGame = (input: number[]): CrabCupsGame => {
    const cupRegistry: Cup[] = Array<Cup>(input.length + 1);
    let cup: Cup = {id: input[0]};
    cupRegistry[cup.id] = cup;
    for (let i = 1; i < input.length; i++) {
        const newCup = {id: Number(input[i])};
        cup.next = newCup;
        cupRegistry[newCup.id] = newCup;
        cup = newCup;
    }
    cup.next = cupRegistry[input[0]];
    return {
        cupRegistry,
        selectedCup: cupRegistry[input[0]],
        numberOfCups: input.length
    }
}

const calculateResult = (game: CrabCupsGame): number => {
    let cup: Cup = game.cupRegistry[1];
    let result = 0;
    for (let i = 1; i < game.numberOfCups; i++) {
        cup = cup.next || cup;
        result = 10 * result + cup.id;
    }
    return result;
}

export const move = (game: CrabCupsGame): CrabCupsGame => {
    const destinationID = getDestinationId(game);
    const pickUp: Cup = extractPickUp(game);
    addPickupAfterDestination(game, pickUp, destinationID);
    game.selectedCup = game.selectedCup.next || game.selectedCup;
    return game;
}

const addPickupAfterDestination = (game: CrabCupsGame, pickUp: Cup, destinationID: number) => {
    if (pickUp.next === undefined || pickUp.next.next === undefined) {
        throw Error('The game is broken');
    }
    pickUp.next.next.next = game.cupRegistry[destinationID].next;
    game.cupRegistry[destinationID].next = pickUp;
}

const extractPickUp = (game: CrabCupsGame): Cup => {
    const pickUp = getPickUpIds(game);
    game.selectedCup.next = game.cupRegistry[pickUp[2]].next;
    return game.cupRegistry[pickUp[0]];
}


export const getPickUpIds = (game: CrabCupsGame): number[] => {
    if (game.selectedCup.next === undefined || game.selectedCup.next.next === undefined || game.selectedCup.next.next.next === undefined) {
        throw Error('The game is broken');
    }
    return [game.selectedCup.next.id, game.selectedCup.next.next.id, game.selectedCup.next.next.next.id]
}


export const getDestinationId = (game: CrabCupsGame): number => {
    const pickUp = getPickUpIds(game);
    let destinationId = destinationMinusOne(game.selectedCup.id, game.numberOfCups);
    while (isDestinationPickedUp(destinationId, pickUp)) {
        destinationId = destinationMinusOne(destinationId, game.numberOfCups);
    }
    return destinationId;
}

const isDestinationPickedUp = (destination: number, pickUp: number[]): boolean => {
    return pickUp.indexOf(destination) !== -1;
}

const destinationMinusOne = (destination: number, numberOfCups: number): number => {
    return (numberOfCups + destination - 2) % (numberOfCups) + 1;
}

export const partTwo = (input: number[]): number | undefined => {
    const cups = [...input];
    for (let i = 10; i <= 1000000; i++) {
        cups.push(i);
    }
    let game: CrabCupsGame = createGame(cups);

    for (let i = 0; i < 10000000; i++) {
        game = move(game);
    }
    return calculateResultPartTwo(game);
}


const calculateResultPartTwo = (game: CrabCupsGame): number => {
    const cup: Cup = game.cupRegistry[1];
    return (cup.next || cup).id * (cup.next?.next || cup).id;
}


runPartOneAndTwo(partOne, partTwo, input)
