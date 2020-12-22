import {expect} from 'chai';
import {calculateScore, partOne, partTwo, playRound, playRoundRecursiveCombat, prepareInput} from '../index';

describe('Day 22 - Part One', () => {
    it('should return 306', () => {
        const input = 'Player 1:\n' +
            '9\n' +
            '2\n' +
            '6\n' +
            '3\n' +
            '1\n' +
            '\n' +
            'Player 2:\n' +
            '5\n' +
            '8\n' +
            '4\n' +
            '7\n' +
            '10';
        const result = partOne(prepareInput(input));
        expect(result).equal(306);
    });
});

describe('Day 22 - Play round', () => {
    it('should play sample round #1', () => {
        const deck1 = [9, 2, 6, 3, 1];
        const deck2 = [5, 8, 4, 7, 10];
        playRound(deck1, deck2);
        expect(deck1).to.have.all.members([2, 6, 3, 1, 9, 5]);
        expect(deck2).to.have.all.members([8, 4, 7, 10]);
    });
    it('should play sample round #2', () => {
        const deck1 = [2, 6, 3, 1, 9, 5];
        const deck2 = [8, 4, 7, 10];
        playRound(deck1, deck2);
        expect(deck1).to.have.all.members([6, 3, 1, 9, 5]);
        expect(deck2).to.have.all.members([4, 7, 10, 8, 2]);
    });
    it('should play sample round #3', () => {
        const deck1 = [6, 3, 1, 9, 5];
        const deck2 = [4, 7, 10, 8, 2];
        playRound(deck1, deck2);
        expect(deck1).to.have.all.members([3, 1, 9, 5, 6, 4]);
        expect(deck2).to.have.all.members([7, 10, 8, 2]);
    });
    it('should play sample round #4', () => {
        const deck1 = [3, 1, 9, 5, 6, 4];
        const deck2 = [7, 10, 8, 2];
        playRound(deck1, deck2);
        expect(deck1).to.have.all.members([1, 9, 5, 6, 4]);
        expect(deck2).to.have.all.members([10, 8, 2, 7, 3]);
    });
});
describe('Day 22 - Calculate score', () => {
    it('should return 306', () => {
        const deck1 = [3, 2, 10, 6, 8, 5, 9, 4, 7, 1];
        const score = calculateScore(deck1);
        expect(score).equals(306);
    });
});
describe('Day 22 - Part Two', () => {
    it('should return 291', () => {
        const input = 'Player 1:\n' +
            '9\n' +
            '2\n' +
            '6\n' +
            '3\n' +
            '1\n' +
            '\n' +
            'Player 2:\n' +
            '5\n' +
            '8\n' +
            '4\n' +
            '7\n' +
            '10';
        const result = partTwo(prepareInput(input));
        expect(result).equal(291);
    });
});

describe('Day 22 - Play round Recursive Combat', () => {

    it('should play sample round #1', () => {
        const deck1 = [9, 2, 6, 3, 1];
        const deck2 = [5, 8, 4, 7, 10];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([2, 6, 3, 1, 9, 5]);
        expect(deck2).to.have.all.members([8, 4, 7, 10]);
    });
    it('should play sample round #2', () => {
        const deck1 = [2, 6, 3, 1, 9, 5];
        const deck2 = [8, 4, 7, 10];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([6, 3, 1, 9, 5]);
        expect(deck2).to.have.all.members([4, 7, 10, 8, 2]);
    });
    it('should play sample round #3', () => {
        const deck1 = [6, 3, 1, 9, 5];
        const deck2 = [4, 7, 10, 8, 2];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([3, 1, 9, 5, 6, 4]);
        expect(deck2).to.have.all.members([7, 10, 8, 2]);
    });
    it('should play sample round #4', () => {
        const deck1 = [3, 1, 9, 5, 6, 4];
        const deck2 = [7, 10, 8, 2];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([1, 9, 5, 6, 4]);
        expect(deck2).to.have.all.members([10, 8, 2, 7, 3]);
    });
    it('should play sample round #9', () => {
        const deck1 = [4, 9, 8, 5, 2];
        const deck2 = [3, 10, 1, 7, 6];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([9, 8, 5, 2]);
        expect(deck2).to.have.all.members([10, 1, 7, 6, 3, 4]);
    });
    it('should play sample round #13', () => {
        const deck1 = [2, 8, 1];
        const deck2 = [6, 3, 4, 10, 9, 7, 5];
        playRoundRecursiveCombat(deck1, deck2);
        expect(deck1).to.have.all.members([8, 1]);
        expect(deck2).to.have.all.members([3, 4, 10, 9, 7, 5, 6, 2]);
    });
});