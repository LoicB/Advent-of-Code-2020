import {expect} from 'chai';
import {getNumberOfActiveCube, nextCycle, partOne, partTwo, prepareInput} from '../index';

describe('Day 17 - Part One', () => {
    it('should return 112', () => {
        const input =
            '.#.\n' +
            '..#\n' +
            '###';
        const result = partOne(prepareInput(input));
        expect(result).equal(112);
    });
});


describe('Day 17 - nextCycle', () => {
    it('should return 112', () => {
        const input = [['.#.', '..#', '###']];
        const expectResult = [[".....", ".....", ".#...", "...#.", "..#.."], [".....", ".....", ".#.#.", "..##.", "..#.."], [".....", ".....", ".#...", "...#.", "..#.."]];
        const result = nextCycle(input);
        expect(JSON.stringify(result)).equal(JSON.stringify(expectResult));
    });
});
//getNumberOfActiveCube

describe('Day 17 - getNumberOfActiveCube', () => {

    const input =
        '.#.\n' +
        '..#\n' +
        '###';
    const conwayCubes = prepareInput(input);
    it('should return 1', () => {
        const result = getNumberOfActiveCube(0, 0, 0, conwayCubes);
        expect(result).equal(1);
    });
    it('should return 2', () => {
        const result = getNumberOfActiveCube(0, 0, 1, conwayCubes);
        expect(result).equal(1);
    });
    it('should return 2', () => {
        const result = getNumberOfActiveCube(0, 0, 2, conwayCubes);
        expect(result).equal(2);
    });
    it('should return 2', () => {
        const result = getNumberOfActiveCube(0, 3, 0, conwayCubes);
        expect(result).equal(2);
    });
    it('should return 3', () => {
        const result = getNumberOfActiveCube(0, 3, 1, conwayCubes);
        expect(result).equal(3);
    });
    it('should return 2', () => {
        const result = getNumberOfActiveCube(0, 3, 2, conwayCubes);
        expect(result).equal(2);
    });
});
describe('Day 17 - Part Two', () => {
    it('should return 848', () => {
        const input =
            '.#.\n' +
            '..#\n' +
            '###';
        const result = partTwo(prepareInput(input));
        expect(result).equal(848);
    });
});