import {expect} from 'chai';
import {  partOne, prepareInput} from '../index';

describe('Day 5 - Part One', () => {
    it('should return 514579', () => {
        const input = 'FBFBBFFRLR\n' +
            'BFFFBBFRRR\n' +
            'FFFBBBFRRR\n' +
            'BBFFBBFRLL';
        const result = partOne(prepareInput(input));
        expect(result).equal(820);
    });
});
