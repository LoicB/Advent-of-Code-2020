import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput)
    const deckPlayer1: number[] = createDeck(lines, 1);
    const deckPlayer2: number[] = createDeck(lines, deckPlayer1.length + 3);
    return {deckPlayer1, deckPlayer2};
}

const createDeck = (lines: string[], fromIndex: number) => {
    let index = fromIndex;
    const deck: number[] = []
    while (index < lines.length && lines[index].trim().length > 0) {
        deck.push(Number(lines[index]))
        index++;
    }
    return deck;
}

const input = prepareInput(readInput())

interface Game {
    deckPlayer1: number[],
    deckPlayer2: number[]
}

enum Player {
    One, Two
}

export const partOne = (input: Game): number | undefined => {
    return playGame([...input.deckPlayer1], [...input.deckPlayer2]);
}

const playGame = (deck1: number[], deck2: number[]) => {
    while (!isGameOver(deck1, deck2)) {
        playRound(deck1, deck2);
    }
    return calculateScore(deck1.length > 0 ? deck1 : deck2);
}

const isGameOver = (deck1: number[], deck2: number[]) => {
    return deck1.length === 0 || deck2.length === 0;
}

export const playRound = (deck1: number[], deck2: number[]) => {
    const cardDeck1: number = deck1.shift() || 0;
    const cardDeck2: number = deck2.shift() || 0;
    const roundWinner = cardDeck1 > cardDeck2 ? Player.One : Player.Two;
    applyRoundWinner(roundWinner, deck1, deck2, cardDeck1, cardDeck2);
}

const applyRoundWinner = (winner: Player, deck1: number[], deck2: number[], cardDeck1: number, cardDeck2: number) => {
    if (winner === Player.One) {
        deck1.push(cardDeck1);
        deck1.push(cardDeck2);
    } else {
        deck2.push(cardDeck2);
        deck2.push(cardDeck1);
    }
}

export const calculateScore = (deck1: number[]): number => {
    let score = 0;
    for (let i = 0; i < deck1.length; i++) {
        score += deck1[i] * (deck1.length - i);
    }
    return score;
}

export const partTwo = (input: Game): number | undefined => {
    return playGameRecursiveCombat([...input.deckPlayer1], [...input.deckPlayer2]);
}


const playGameRecursiveCombat = (deck1: number[], deck2: number[]): number => {
    const historyPlayer1: Set<string> = new Set<string>();
    const historyPlayer2: Set<string> = new Set<string>();
    while (!isGameOver(deck1, deck2)) {
        const currentDeck1 = JSON.stringify(deck1);
        const currentDeck2 = JSON.stringify(deck2);
        if (historyPlayer1.has(currentDeck1) || historyPlayer2.has(currentDeck2) ) {
            return calculateScore(deck1);
        }
        historyPlayer1.add(currentDeck1);
        historyPlayer2.add(currentDeck2);
        playRoundRecursiveCombat(deck1, deck2);
    }
    return calculateScore(deck1.length > 0 ? deck1 : deck2);
}

export const playRoundRecursiveCombat = (deck1: number[], deck2: number[]) => {
    const cardDeck1: number = deck1.shift() || 0;
    const cardDeck2: number = deck2.shift() || 0;
    let roundWinner: Player;

    if (cardDeck1 <= deck1.length && cardDeck2 <= deck2.length) {
        const newDeck1 = deck1.slice(0, cardDeck1);
        const newDeck2 = deck2.slice(0, cardDeck2);
        playGameRecursiveCombat(newDeck1, newDeck2);
        roundWinner = newDeck1.length > 0 ? Player.One : Player.Two;
    } else {
        roundWinner = cardDeck1 > cardDeck2 ? Player.One : Player.Two;
    }
    applyRoundWinner(roundWinner, deck1, deck2, cardDeck1, cardDeck2);
}


runPartOneAndTwo(partOne, partTwo, input)
