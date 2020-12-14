import {expect} from 'chai';
import {
    applyMaskPartOne,
    applyMaskPartTwo,
    bitsToDecimal,
    bitsToDecimalPart2,
    decimalToBits,
    partOne,
    partTwo,
    prepareInput
} from '../index';

describe('Day 14 - Part One', () => {
    it('should return 165', () => {
        const input = 'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\n' +
            'mem[8] = 11\n' +
            'mem[7] = 101\n' +
            'mem[8] = 0';
        const result = partOne(prepareInput(input));
        expect(result).equal(165);
    });
});

describe('Day 14 - Part Two', () => {
    it('should return 208', () => {
        const input = 'mask = 000000000000000000000000000000X1001X\n' +
            'mem[42] = 100\n' +
            'mask = 00000000000000000000000000000000X0XX\n' +
            'mem[26] = 1';
        const result = partTwo(prepareInput(input));
        expect(result).equal(208);
    });
});


describe('Day 14 - Decimal to bits', () => {
    it('decimals of 11', () => {
        const decimal = 11;
        const expected = '000000000000000000000000000000001011'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
    it('decimals of 73', () => {
        const decimal = 73;
        const expected = '000000000000000000000000000001001001'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
    it('decimals of 101', () => {
        const decimal = 101;
        const expected = '000000000000000000000000000001100101'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
    it('decimals of 0', () => {
        const decimal = 0;
        const expected = '000000000000000000000000000000000000'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
    it('decimals of 64', () => {
        const decimal = 64;
        const expected = '000000000000000000000000000001000000'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
    it('decimals of 20006', () => {
        const decimal = 20006;
        const expected = '000000000000000000000100111000100110'
        const result = decimalToBits(decimal);
        expect(result).equal(expected);
    });
});


describe('Day 14 - Bits to decimal', () => {
    it('should return 11', () => {
        const decimal = '000000000000000000000000000000001011'
        const expected = 11;
        const result = bitsToDecimal(decimal);
        expect(result).equal(expected);
    });
    it('should return 73', () => {
        const decimal = '000000000000000000000000000001001001'
        const expected = 73;
        const result = bitsToDecimal(decimal);
        expect(result).equal(expected);
    });
    it('should return 101', () => {
        const decimal = '000000000000000000000000000001100101'
        const expected = 101;
        const result = bitsToDecimal(decimal);
        expect(result).equal(expected);
    });
    it('should return 0', () => {
        const decimal = '000000000000000000000000000000000000'
        const expected = 0;
        const result = bitsToDecimal(decimal);
        expect(result).equal(expected);
    });
    it('should return 64', () => {
        const decimal = '000000000000000000000000000001000000'
        const expected = 64;
        const result = bitsToDecimal(decimal);
        expect(result).equal(expected);
    });
});


describe('Day 14 - Apply mask', () => {
    it('should return 73', () => {
        const value = '000000000000000000000000000000001011';
        const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
        const expected = '000000000000000000000000000001001001';
        const result = applyMaskPartOne(value, mask);
        expect(result).equal(expected);
    });

    it('should return 101', () => {
        const value = '000000000000000000000000000001100101';
        const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
        const expected = '000000000000000000000000000001100101';
        const result = applyMaskPartOne(value, mask);
        expect(result).equal(expected);
    });
    it('should return 64', () => {
        const value = '000000000000000000000000000000000000';
        const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
        const expected = '000000000000000000000000000001000000';
        const result = applyMaskPartOne(value, mask);
        expect(result).equal(expected);
    });
});


describe('Day 14 - Apply mask part 2', () => {
    it('sample #1', () => {
        const value = '000000000000000000000000000000101010';
        const mask = '000000000000000000000000000000X1001X';
        const expected = '000000000000000000000000000000X1101X';
        const result = applyMaskPartTwo(value, mask);
        expect(result).equal(expected);
    });
    it('sample #2', () => {
        const value = '000000000000000000000000000000011010';
        const mask = '00000000000000000000000000000000X0XX';
        const expected = '00000000000000000000000000000001X0XX';
        const result = applyMaskPartTwo(value, mask);
        expect(result).equal(expected);
    });
});



describe('Day 14 - Bits to decimal Part 2', () => {
    it('should return [26,27,58,59]', () => {
        const decimal = '000000000000000000000000000000X1101X'
        const expected = [26,27,58,59];
        const result = bitsToDecimalPart2(decimal);
        expect(result).to.eql(expected);
    });
    it('should return [16,17,18,19,24,25,26,27]', () => {
        const decimal = '00000000000000000000000000000001X0XX'
        const expected = [16,17,18,19,24,25,26,27];
        const result = bitsToDecimalPart2(decimal);
        expect(result).to.eql(expected);
    });
});
