import {expect} from 'chai';
import {
    calculatePossibleFields,
    InputPartOne,
    partOne,
    partTwo,
    prepareInputPartOne,
    prepareInputPartTwo, removeDuplicatePossible
} from '../index';

describe('Day 16 - Prepare input part one', () => {
    const rawInput =
        'class: 1-3 or 5-7\n' +
        'row: 6-11 or 33-44\n' +
        'seat: 13-40 or 45-50\n' +
        '\n' +
        'your ticket:\n' +
        '7,1,14\n' +
        '\n' +
        'nearby tickets:\n' +
        '7,3,47\n' +
        '40,4,50\n' +
        '55,2,20\n' +
        '38,6,12';
    const input: InputPartOne = prepareInputPartOne(rawInput);


    it('should return ranges', () => {
        expect(input.validValues[7]).equal(true);
        expect(input.validValues[3]).equal(true);
        expect(input.validValues[4]).equal(false);
        expect(input.validValues[55]).equal(undefined);
    });
    it('should return ticket', () => {
        expect(input.ticket).to.have.all.members([7, 1, 14]);
    });
    it('should return nearby tickets', () => {
        expect(JSON.stringify(input.nearbyTickets)).equal(JSON.stringify([[7, 3, 47],
            [40, 4, 50],
            [55, 2, 20],
            [38, 6, 12]]));
    });
});


describe('Day 16 - Prepare input part two', () => {
    const rawInput =
        'class: 0-1 or 4-19\n' +
        'row: 0-5 or 8-19\n' +
        'seat: 0-13 or 16-19\n' +
        '\n' +
        'your ticket:\n' +
        '11,12,13\n' +
        '\n' +
        'nearby tickets:\n' +
        '3,9,18\n' +
        '15,1,5\n' +
        '5,14,9';
    const input: Map<string, boolean[]> = prepareInputPartTwo(rawInput);


    it('should return ranges for class', () => {
        expect((input.get('class') || [])[0]).equal(true);
        expect((input.get('class') || [])[2]).equal(false);
        expect((input.get('class') || [])[20]).equal(undefined);
    });
    it('should return ranges for row', () => {
        expect((input.get('row') || [])[0]).equal(true);
        expect((input.get('row') || [])[6]).equal(false);
        expect((input.get('row') || [])[20]).equal(undefined);
    });
    it('should return ranges for seat', () => {
        expect((input.get('seat') || [])[0]).equal(true);
        expect((input.get('seat') || [])[15]).equal(false);
        expect((input.get('seat') || [])[20]).equal(undefined);
    });
});


describe('Day 16 - Part One', () => {
    it('should return 71', () => {
        const input =
            'class: 1-3 or 5-7\n' +
            'row: 6-11 or 33-44\n' +
            'seat: 13-40 or 45-50\n' +
            '\n' +
            'your ticket:\n' +
            '7,1,14\n' +
            '\n' +
            'nearby tickets:\n' +
            '7,3,47\n' +
            '40,4,50\n' +
            '55,2,20\n' +
            '38,6,12';
        const result = partOne(input);
        expect(result).equal(71);
    });
});

describe('Day 16 - Part Two', () => {
    it('should return 0', () => {
        const input =
            'class: 0-1 or 4-19\n' +
            'row: 0-5 or 8-19\n' +
            'seat: 0-13 or 16-19\n' +
            '\n' +
            'your ticket:\n' +
            '11,12,13\n' +
            '\n' +
            'nearby tickets:\n' +
            '3,9,18\n' +
            '15,1,5\n' +
            '5,14,9';
        const result = partTwo(input);
        expect(result).equal(1);
    });
});


describe('Day 16 - Test calculatePossibleFields', () => {
    it('should return 0', () => {
        const rawInput =
            'class: 0-1 or 4-19\n' +
            'row: 0-5 or 8-19\n' +
            'seat: 0-13 or 16-19\n' +
            '\n' +
            'your ticket:\n' +
            '11,12,13\n' +
            '\n' +
            'nearby tickets:\n' +
            '3,9,18\n' +
            '15,1,5\n' +
            '5,14,9';
        const input: Map<string, boolean[]> = prepareInputPartTwo(rawInput);
        const inputPartOne: InputPartOne = prepareInputPartOne(rawInput);
        const result = calculatePossibleFields(input, inputPartOne.nearbyTickets);
        expect(result.get('class')).to.have.all.members([1, 2]);
        expect(result.get('row')).to.have.all.members([0, 1, 2]);
        expect(result.get('seat')).to.have.all.members([2]);
    });
});


describe('Day 16 - Test calculatePossibleFields', () => {
    it('should return 0', () => {
        const rawInput =
            'class: 0-1 or 4-19\n' +
            'row: 0-5 or 8-19\n' +
            'seat: 0-13 or 16-19\n' +
            '\n' +
            'your ticket:\n' +
            '11,12,13\n' +
            '\n' +
            'nearby tickets:\n' +
            '3,9,18\n' +
            '15,1,5\n' +
            '5,14,9';
        const input: Map<string, boolean[]> = prepareInputPartTwo(rawInput);
        const inputPartOne: InputPartOne = prepareInputPartOne(rawInput);
        const result = removeDuplicatePossible(calculatePossibleFields(input, inputPartOne.nearbyTickets));
        expect(result.get('class')).equal(1);
        expect(result.get('row')).equal(0);
        expect(result.get('seat')).equal(2);
    });
});
