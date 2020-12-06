import {expect} from 'chai';
import {partOne, partTwo, prepareInputPart1, prepareInputPart2} from '../index';


describe('Prepare input', () => {
    const rawInput = 'abc\n' +
        '\n' +
        'a\n' +
        'b\n' +
        'c\n' +
        '\n' +
        'ab\n' +
        'ac\n' +
        '\n' +
        'a\n' +
        'a\n' +
        'a\n' +
        'a\n' +
        '\n' +
        'b';
    let input: Set<string>[];

    before(()=> {
        input = prepareInputPart1(rawInput)
    })
    it('should return abd for the first custom declaration', () => {
        expect(input[0].size).equal(3);
        expect(input[0].has('a')).equal(true);
        expect(input[0].has('b')).equal(true);
        expect(input[0].has('c')).equal(true);
    });
    it('should return abc for the second custom declaration', () => {
        expect(input[1].size).equal(3);
        expect(input[1].has('a')).equal(true);
        expect(input[1].has('b')).equal(true);
        expect(input[1].has('c')).equal(true);
    });
    it('should return abc for the third custom declaration', () => {
        expect(input[2].size).equal(3);
        expect(input[2].has('a')).equal(true);
        expect(input[2].has('b')).equal(true);
        expect(input[2].has('c')).equal(true);
    });
    it('should return a for the fourth custom declaration', () => {
        expect(input[3].size).equal(1);
        expect(input[3].has('a')).equal(true);
    });
    it('should return b for the fifth custom declaration', () => {
        expect(input[4].size).equal(1);
        expect(input[4].has('b')).equal(true);
    });
});


describe('Prepare input part 2', () => {
    const rawInput = 'abc\n' +
        '\n' +
        'a\n' +
        'b\n' +
        'c\n' +
        '\n' +
        'ab\n' +
        'ac\n' +
        '\n' +
        'a\n' +
        'a\n' +
        'a\n' +
        'a\n' +
        '\n' +
        'b';
    let input: Map<string, number>[];

    before(()=> {
        input = prepareInputPart2(rawInput)
    })
    it('should return 1 a for the first custom declaration', () => {
        expect(input[0].get('a')).equal(1);
    });
    it('should return 1 b for the first custom declaration', () => {
        expect(input[0].get('b')).equal(1);
    });
    it('should return 1 c for the first custom declaration', () => {
        expect(input[0].get('c')).equal(1);
    });
    it('should return 1 a for the second custom declaration', () => {
        expect(input[1].get('a')).equal(1);
    });
    it('should return 1 b for the second custom declaration', () => {
        expect(input[1].get('b')).equal(1);
    });
    it('should return 1 c for the second custom declaration', () => {
        expect(input[1].get('c')).equal(1);
    });
    it('should return 2 a for the third custom declaration', () => {
        expect(input[2].get('a')).equal(2);
    });
    it('should return 1 b for the third custom declaration', () => {
        expect(input[2].get('b')).equal(1);
    });
    it('should return 1 c for the third custom declaration', () => {
        expect(input[2].get('c')).equal(1);
    });
    it('should return 4 a for the fourth custom declaration', () => {
        expect(input[3].get('a')).equal(4);
    });
    it('should return 1 b for the fifth custom declaration', () => {
        expect(input[4].get('b')).equal(1);
    });
});

describe('Day 6 - Part One', () => {
    it('should return 11', () => {
        const input = 'abc\n' +
            '\n' +
            'a\n' +
            'b\n' +
            'c\n' +
            '\n' +
            'ab\n' +
            'ac\n' +
            '\n' +
            'a\n' +
            'a\n' +
            'a\n' +
            'a\n' +
            '\n' +
            'b';
        const result = partOne(input);
        expect(result).equal(11);
    });
});

describe('Day 6 - Part Two', () => {
    it('should return 6', () => {
        const input = 'abc\n' +
            '\n' +
            'a\n' +
            'b\n' +
            'c\n' +
            '\n' +
            'ab\n' +
            'ac\n' +
            '\n' +
            'a\n' +
            'a\n' +
            'a\n' +
            'a\n' +
            '\n' +
            'b';
        const result = partTwo(input);
        expect(result).equal(6);
    });
});
