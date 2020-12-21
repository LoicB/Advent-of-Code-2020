import {expect} from 'chai';
import {createRegexRule, partOne, prepareInput} from '../index';

describe('Day 19 - Part One', () => {
    it('should return 2', () => {
        const input =
            '0: 4 1 5\n' +
            '1: 2 3 | 3 2\n' +
            '2: 4 4 | 5 5\n' +
            '3: 4 5 | 5 4\n' +
            '4: "a"\n' +
            '5: "b"\n' +
            '\n' +
            'ababbb\n' +
            'bababa\n' +
            'abbbab\n' +
            'aaabbb\n' +
            'aaaabbb';
        const result = partOne(prepareInput(input));
        expect(result).equal(2);
    });
});

describe('Create regex', () => {
    const input: string[] =
        ['0: 4 1 5',
        '1: 2 3 | 3 2',
        '2: 4 4 | 5 5',
        '3: 4 5 | 5 4',
        '4: "a"',
        '5: "b"'];
    it('should return ^a((aa|bb)(ab|ba)|(ab|ba)(aa|bb))b$', () => {
        const result = createRegexRule(input, 0);
        expect(result).to.eql(/^a((aa|bb)(ab|ba)|(ab|ba)(aa|bb))b$/gm);
    });
    it('should return ^(aa|bb)(ab|ba)|(ab|ba)(aa|bb)$', () => {
        const result = createRegexRule(input, 1);
        expect(result).to.eql(/^(aa|bb)(ab|ba)|(ab|ba)(aa|bb)$/gm);
    });
    it('should return ^aa|bb$', () => {
        const result = createRegexRule(input, 2);
        expect(result).to.eql(/^aa|bb$/gm);
    });
    it('should return ^ab|ba$', () => {
        const result = createRegexRule(input, 3);
        expect(result).to.eql(/^ab|ba$/gm);
    });
    it('should return ^a$', () => {
        const result = createRegexRule(input, 4);
        expect(result).to.eql(/^a$/gm);
    });
    it('should return ^b$', () => {
        const result = createRegexRule(input, 5);
        expect(result).to.eql(/^b$/gm);
    });
});
