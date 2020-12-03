import {expect} from 'chai';
import {isTree, partOne, partTwo, prepareInput} from '../index';

describe('Day 1 - Part One', () => {
    it('should return 7', () => {
        const input = '..##.......\n' +
            '#...#...#..\n' +
            '.#....#..#.\n' +
            '..#.#...#.#\n' +
            '.#...##..#.\n' +
            '..#.##.....\n' +
            '.#.#.#....#\n' +
            '.#........#\n' +
            '#.##...#...\n' +
            '#...##....#\n' +
            '.#..#...#.#';
        const result = partOne(prepareInput(input));
        expect(result).equal(7);
    });
});

describe('Day 1 - Part Two', () => {
    it('should return 336', () => {
        const input = '..##.......\n' +
            '#...#...#..\n' +
            '.#....#..#.\n' +
            '..#.#...#.#\n' +
            '.#...##..#.\n' +
            '..#.##.....\n' +
            '.#.#.#....#\n' +
            '.#........#\n' +
            '#.##...#...\n' +
            '#...##....#\n' +
            '.#..#...#.#';
        const result = partTwo(prepareInput(input));
        expect(result).equal(336);
    });
});


describe('testing tree detector', () => {
    const input = '..##.......\n' +
        '#...#...#..\n' +
        '.#....#..#.\n' +
        '..#.#...#.#\n' +
        '.#...##..#.\n' +
        '..#.##.....\n' +
        '.#.#.#....#\n' +
        '.#........#\n' +
        '#.##...#...\n' +
        '#...##....#\n' +
        '.#..#...#.#';
    let refinedInput: string[][];

    before(()=> {
        refinedInput = prepareInput(input)
    })

    it('is not a tree at x=0, y=0', () => {
        const result = isTree(refinedInput, 0, 0);
        expect(result).equal(false);
    });

    it('is not a tree at x=1, y=3', () => {
        const result = isTree(refinedInput, 1, 3);
        expect(result).equal(false);
    });

    it('is a tree at x=2, y=6', () => {
        const result = isTree(refinedInput, 2, 6);
        expect(result).equal(true);
    });

    it('is a not tree at x=3, y=9', () => {
        const result = isTree(refinedInput, 3, 9);
        expect(result).equal(false);
    });

    it('is a tree at x=4, y=12', () => {
        const result = isTree(refinedInput, 4, 12);
        expect(result).equal(true);
    });

    it('is a tree at x=5, y=15', () => {
        const result = isTree(refinedInput, 5, 15);
        expect(result).equal(true);
    });

    it('is a not tree at x=6, y=18', () => {
        const result = isTree(refinedInput, 6, 18);
        expect(result).equal(false);
    });

    it('is a tree at x=7, y=21', () => {
        const result = isTree(refinedInput, 7, 21);
        expect(result).equal(true);
    });

    it('is a tree at x=8, y=24', () => {
        const result = isTree(refinedInput, 8, 24);
        expect(result).equal(true);
    });

    it('is a tree at x=9, y=27', () => {
        const result = isTree(refinedInput, 9, 27);
        expect(result).equal(true);
    });

    it('is a tree at x=10, y=30', () => {
        const result = isTree(refinedInput, 10, 30);
        expect(result).equal(true);
    });


});
