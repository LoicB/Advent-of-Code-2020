import {expect} from 'chai';
import {findLoopSize, loop, partOne, prepareInput} from '../index';

describe('Day 25 - Part One', () => {
    it('should return 14897079', () => {
        const input = '5764801\n' +
            '17807724';
        const result = partOne(prepareInput(input));
        expect(result).equal(14897079);
    });
});

describe('Day 25 - find Loop ize', () => {
    it('should return 8', () => {
        const result = findLoopSize(5764801);
        expect(result).equal(8);
    });


    it('should return 11', () => {
        const result = findLoopSize(17807724);
        expect(result).equal(11);
    });
});


describe('Day 25 - Loop', () => {
    it('should return 5764801', () => {
        const result = loop(7, 8);
        expect(result).equal(5764801);
    });


    it('should return 5764801', () => {
        const result = loop(7, 11);
        expect(result).equal(17807724);
    });
});
