import {expect} from 'chai';
import {partOne, partTwo, prepareInput} from '../index';

describe('Day 1 - Part One', () => {
    it('should return 514579', () => {
        const input = '1721\n' +
            '979\n' +
            '366\n' +
            '299\n' +
            '675\n' +
            '1456';
        const result = partOne(prepareInput(input));
        expect(result).equal(514579);
    });
});

describe('Day 1 - Part Two', () => {
    it('should return 241861950', () => {
        const input = '1721\n' +
            '979\n' +
            '366\n' +
            '299\n' +
            '675\n' +
            '1456';
        const result = partTwo(prepareInput(input));
        expect(result).equal(241861950);
    });
});
