import {expect} from 'chai';
import {partOne, partTwo, prepareInput} from '../index';

describe('Day 8 - Part One', () => {
    it('should return 5', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const result = partOne(prepareInput(input));
        expect(result).equal(5);
    });
});

describe('Day 8 - Part Two', () => {
    it('should return 8', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const result = partTwo(prepareInput(input));
        expect(result).equal(8);
    });
});
