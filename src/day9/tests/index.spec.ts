import {expect} from 'chai';
import {findEncryptionWeakness, findSumInPrevious, partOne, partTwo, prepareInput} from '../index';

describe('Day 9 - Part One', () => {
    it('should return undefined', () => {
        const input = '34\n 15\n 45\n 16\n 30\n 43\n 36\n 21\n 32\n 18\n' +
            '14\n 31\n 47\n 41\n 22\n 39\n 9\n 38\n 6\n 7\n 42\n' +
            '46\n 4\n 3\n 8\n 10';
        const result = partOne(prepareInput(input));
        expect(result).equal(undefined);
    });
});

describe('Day 9 - Part Two', () => {
    it('should return undefined', () => {
        const input = '34\n 15\n 45\n 16\n 30\n 43\n 36\n 21\n 32\n 18\n' +
            '14\n 31\n 47\n 41\n 22\n 39\n 9\n 38\n 6\n 7\n 42\n' +
            '46\n 4\n 3\n 8\n 10';
        const result = partTwo(prepareInput(input));
        expect(result).equal(undefined);
    });
});


describe('Test find in previous number method', () => {

    const input = '35\n' +
        '20\n' +
        '15\n' +
        '25\n' +
        '47\n' +
        '40\n' +
        '62\n' +
        '55\n' +
        '65\n' +
        '95\n' +
        '102\n' +
        '117\n' +
        '150\n' +
        '182\n' +
        '127\n' +
        '219\n' +
        '299\n' +
        '277\n' +
        '309\n' +
        '576';

    it('should return true for the 5th element', () => {
        const result = findSumInPrevious(prepareInput(input), 5, 5);
        expect(result).equal(true);
    });
    it('should return true for the 6th element', () => {
        const result = findSumInPrevious(prepareInput(input), 6, 5);
        expect(result).equal(true);
    });
    it('should return true for the 7th element', () => {
        const result = findSumInPrevious(prepareInput(input), 7, 5);
        expect(result).equal(true);
    });
    it('should return true for the 7th element', () => {
        const result = findSumInPrevious(prepareInput(input), 7, 5);
        expect(result).equal(true);
    });
    it('should return true for the 8th element', () => {
        const result = findSumInPrevious(prepareInput(input), 8, 5);
        expect(result).equal(true);
    });
    it('should return true for the 9th element', () => {
        const result = findSumInPrevious(prepareInput(input), 9, 5);
        expect(result).equal(true);
    });
    it('should return true for the 10th element', () => {
        const result = findSumInPrevious(prepareInput(input), 10, 5);
        expect(result).equal(true);
    });
    it('should return true for the 11th element', () => {
        const result = findSumInPrevious(prepareInput(input), 11, 5);
        expect(result).equal(true);
    });
    it('should return true for the 12th element', () => {
        const result = findSumInPrevious(prepareInput(input), 12, 5);
        expect(result).equal(true);
    });
    it('should return true for the 13th element', () => {
        const result = findSumInPrevious(prepareInput(input), 13, 5);
        expect(result).equal(true);
    });
    it('should return false for the 14th element', () => {
        const result = findSumInPrevious(prepareInput(input), 14, 5);
        expect(result).equal(false);
    });
    it('should return true for the 15th element', () => {
        const result = findSumInPrevious(prepareInput(input), 15, 5);
        expect(result).equal(true);
    });
    it('should return true for the 16th element', () => {
        const result = findSumInPrevious(prepareInput(input), 16, 5);
        expect(result).equal(true);
    });
    it('should return true for the 17th element', () => {
        const result = findSumInPrevious(prepareInput(input), 17, 5);
        expect(result).equal(true);
    });
    it('should return true for the 18th element', () => {
        const result = findSumInPrevious(prepareInput(input), 18, 5);
        expect(result).equal(true);
    });
    it('should return true for the 19th element', () => {
        const result = findSumInPrevious(prepareInput(input), 19, 5);
        expect(result).equal(true);
    });

    it('should return true', () => {
        const input = '34\n 15\n 45\n 16\n 30\n 43\n 36\n 21\n 32\n 18\n' +
            '14\n 31\n 47\n 41\n 22\n 39\n 9\n 38\n 6\n 7\n 42\n' +
            '46\n 4\n 3\n 8\n 10';
        const result =  findSumInPrevious(prepareInput(input), 25, 25);
        expect(result).equal(true);
    });
});


describe('Test findEncryptionWeakness', () => {
    it('should return 62', () => {

        const input = '35\n' +
            '20\n' +
            '15\n' +
            '25\n' +
            '47\n' +
            '40\n' +
            '62\n' +
            '55\n' +
            '65\n' +
            '95\n' +
            '102\n' +
            '117\n' +
            '150\n' +
            '182\n' +
            '127\n' +
            '219\n' +
            '299\n' +
            '277\n' +
            '309\n' +
            '576';
        const result = findEncryptionWeakness(prepareInput(input), 14);
        expect(result).equal(62);
    });
});
