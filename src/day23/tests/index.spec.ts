import {expect} from 'chai';
import {
    CrabCupsGame,
    createGame,
    gameToCups, getDestinationId,
    getPickUpIds,
    move,
    partOne,
    prepareInput
} from '../index';

describe('Day 23 - Part One', () => {
    it('should return 67384529', () => {
        const input = '389125467';
        const result = partOne(prepareInput(input));
        expect(result).equal(67384529);
    });
});


describe('Day 23 - Move', () => {
    it('should play sample move #1', () => {
        const cups: number[] = [3, 8, 9, 1, 2, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const result = move(game);
        expect(JSON.stringify(gameToCups(result))).equals(JSON.stringify([2, 8, 9, 1, 5, 4, 6, 7, 3]));
        expect(result.selectedCup.id).equal(2);
    });
    it('should play sample move #2', () => {
        const cups: number[] = [3, 2, 8, 9, 1, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 2;
        const result = move({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(JSON.stringify(gameToCups(result))).equals(JSON.stringify([5, 4, 6, 7, 8, 9, 1, 3, 2]));
        expect(result.selectedCup.id).equal(5);
    });
    it('should play sample move #3', () => {
        const cups: number[] = [3, 2, 5, 4, 6, 7, 8, 9, 1];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = move({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(JSON.stringify(gameToCups(result))).equals(JSON.stringify([8, 9, 1, 3, 4, 6, 7, 2, 5]));
        expect(result.selectedCup.id).equal(8);
    });
    it('should play sample move #10', () => {
        const cups: number[] = [5, 7, 4, 1, 8, 3, 9, 2, 6];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = move({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(JSON.stringify(gameToCups(result))).equals(JSON.stringify([8, 3, 7, 4, 1, 9, 2, 6, 5]));
        expect(result.selectedCup.id).equal(8);
    });
});

describe('Day 23 - get pick up', () => {
    it('should play sample move #1', () => {
        const cups: number[] = [3, 8, 9, 1, 2, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 3;
        const result = getPickUpIds({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).to.have.all.members([8, 9, 1]);
    });
    it('should play sample move #2', () => {
        const cups: number[] = [3, 2, 8, 9, 1, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 2;
        const result = getPickUpIds({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).to.have.all.members([8, 9, 1]);
    });
    it('should play sample move #3', () => {
        const cups: number[] = [3, 2, 5, 4, 6, 7, 8, 9, 1];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = getPickUpIds({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).to.have.all.members([4, 6, 7]);
    });
    it('should play sample move #10', () => {
        const cups: number[] = [5, 7, 4, 1, 8, 3, 9, 2, 6];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = getPickUpIds({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).to.have.all.members([7, 4, 1]);
    });
});

describe('Day 23 - get destination', () => {
    it('should play sample move #1', () => {
        const cups: number[] = [3, 8, 9, 1, 2, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 3;
        const result = getDestinationId({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).equals(2);
    });
    it('should play sample move #2', () => {
        const cups: number[] = [3, 2, 8, 9, 1, 5, 4, 6, 7];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 2;
        const result = getDestinationId({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).equals(7);
    });
    it('should play sample move #3', () => {
        const cups: number[] = [3, 2, 5, 4, 6, 7, 8, 9, 1];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = getDestinationId({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).equals(3);
    });
    it('should play sample move #10', () => {
        const cups: number[] = [5, 7, 4, 1, 8, 3, 9, 2, 6];
        const game: CrabCupsGame = createGame(cups);
        const selectedCup: number = 5;
        const result = getDestinationId({...game, selectedCup: game.cupRegistry[selectedCup]});
        expect(result).equals(3);
    });
});
