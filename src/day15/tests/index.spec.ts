import {expect} from 'chai';
import {partOne, prepareInput} from '../index';

describe('Day 15 - Part One', () => {
    it('should return 436', () => {
        const input = '0,3,6';
        const result = partOne(prepareInput(input));
        expect(result).equal(436);
    });
    it('should return 1', () => {
        const input = '1,3,2';
        const result = partOne(prepareInput(input));
        expect(result).equal(1);
    });
    it('should return 10', () => {
        const input = '2,1,3';
        const result = partOne(prepareInput(input));
        expect(result).equal(10);
    });
    it('should return 27', () => {
        const input = '1,2,3';
        const result = partOne(prepareInput(input));
        expect(result).equal(27);
    });
    it('should return 78', () => {
        const input = '2,3,1';
        const result = partOne(prepareInput(input));
        expect(result).equal(78);
    });
    it('should return 438', () => {
        const input = '3,2,1';
        const result = partOne(prepareInput(input));
        expect(result).equal(438);
    });
    it('should return 1836', () => {
        const input = '3,1,2';
        const result = partOne(prepareInput(input));
        expect(result).equal(1836);
    });
});
