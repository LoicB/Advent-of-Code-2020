import {expect} from 'chai';
import {partOne, partTwo, prepareInput} from '../index';

describe('Input preparation', () => {
    const input = '1-3 a: abcde\n' +
        '1-3 b: cdefg\n' +
        '2-9 c: ccccccccc';
    let refinedInput: string[][];

    before(()=> {
        refinedInput = prepareInput(input)
    })
    it('should have 1-3 a as first policy', () => {
        expect(refinedInput[0][0]).equal('1-3 a');
    });
    it('should have abcde as first password', () => {
        expect(refinedInput[0][1]).equal('abcde');
    });
    it('should have 1-3 b as second policy', () => {
        expect(refinedInput[1][0]).equal('1-3 b');
    });
    it('should have cdefg a as second password', () => {
        expect(refinedInput[1][1]).equal('cdefg');
    });
    it('should have 2-9 c as third policy', () => {
        expect(refinedInput[2][0]).equal('2-9 c');
    });
    it('should have ccccccccc a as third password', () => {
        expect(refinedInput[2][1]).equal('ccccccccc');
    });
});

describe('Day 2 - Part One', () => {
    it('should return 2', () => {
        const input = '1-3 a: abcde\n' +
            '1-3 b: cdefg\n' +
            '2-9 c: ccccccccc';
        const result = partOne(prepareInput(input));
        expect(result).equal(2);
    });
});

describe('Day 2 - Part Two', () => {
    it('should return 1', () => {
        const input = '1-3 a: abcde\n' +
            '1-3 b: cdefg\n' +
            '2-9 c: ccccccccc';
        const result = partTwo(prepareInput(input));
        expect(result).equal(1);
    });
});
