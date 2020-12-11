import {expect} from 'chai';
import {
    areAreasSame,
    countAdjacentOccupiedSeats, countSurroundingOccupiedSeats,
    nextRoundsPartOne, nextRoundsPartTwo,
    partOne,
    partTwo,
    prepareInput
} from '../index';

describe('Day 11 - Part One', () => {
    it('should return 37', () => {
        const input =
            'L.LL.LL.LL\n' +
            'LLLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLLL\n' +
            'L.LLLLLL.L\n' +
            'L.LLLLL.LL';
        const result = partOne(prepareInput(input));
        expect(result).equal(37);
    });
});

describe('Day 11 - Part Two', () => {
    it('should return 26', () => {
        const input =
            'L.LL.LL.LL\n' +
            'LLLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLLL\n' +
            'L.LLLLLL.L\n' +
            'L.LLLLL.LL';
        const result = partTwo(prepareInput(input));
        expect(result).equal(26);
    });
});


describe('Next rounds calculation', () => {
    it('round #1', () => {
        const input =
            'L.LL.LL.LL\n' +
            'LLLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLLL\n' +
            'L.LLLLLL.L\n' +
            'L.LLLLL.LL';
        const expectedOutput =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });

    it('round #2', () => {
        const input =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const expectedOutput =
            '#.LL.L#.##\n' +
            '#LLLLLL.L#\n' +
            'L.L.L..L..\n' +
            '#LLL.LL.L#\n' +
            '#.LL.LL.LL\n' +
            '#.LLLL#.##\n' +
            '..L.L.....\n' +
            '#LLLLLLLL#\n' +
            '#.LLLLLL.L\n' +
            '#.#LLLL.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #3', () => {
        const input =
            '#.LL.L#.##\n' +
            '#LLLLLL.L#\n' +
            'L.L.L..L..\n' +
            '#LLL.LL.L#\n' +
            '#.LL.LL.LL\n' +
            '#.LLLL#.##\n' +
            '..L.L.....\n' +
            '#LLLLLLLL#\n' +
            '#.LLLLLL.L\n' +
            '#.#LLLL.##';
        const expectedOutput =
            '#.##.L#.##\n' +
            '#L###LL.L#\n' +
            'L.#.#..#..\n' +
            '#L##.##.L#\n' +
            '#.##.LL.LL\n' +
            '#.###L#.##\n' +
            '..#.#.....\n' +
            '#L######L#\n' +
            '#.LL###L.L\n' +
            '#.#L###.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #4', () => {
        const input =
            '#.##.L#.##\n' +
            '#L###LL.L#\n' +
            'L.#.#..#..\n' +
            '#L##.##.L#\n' +
            '#.##.LL.LL\n' +
            '#.###L#.##\n' +
            '..#.#.....\n' +
            '#L######L#\n' +
            '#.LL###L.L\n' +
            '#.#L###.##';
        const expectedOutput =
            '#.#L.L#.##\n' +
            '#LLL#LL.L#\n' +
            'L.L.L..#..\n' +
            '#LLL.##.L#\n' +
            '#.LL.LL.LL\n' +
            '#.LL#L#.##\n' +
            '..L.L.....\n' +
            '#L#LLLL#L#\n' +
            '#.LLLLLL.L\n' +
            '#.#L#L#.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #5', () => {
        const input =
            '#.#L.L#.##\n' +
            '#LLL#LL.L#\n' +
            'L.L.L..#..\n' +
            '#LLL.##.L#\n' +
            '#.LL.LL.LL\n' +
            '#.LL#L#.##\n' +
            '..L.L.....\n' +
            '#L#LLLL#L#\n' +
            '#.LLLLLL.L\n' +
            '#.#L#L#.##';
        const expectedOutput =
            '#.#L.L#.##\n' +
            '#LLL#LL.L#\n' +
            'L.#.L..#..\n' +
            '#L##.##.L#\n' +
            '#.#L.LL.LL\n' +
            '#.#L#L#.##\n' +
            '..L.L.....\n' +
            '#L#L##L#L#\n' +
            '#.LLLLLL.L\n' +
            '#.#L#L#.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #6', () => {
        const input =
            '#.#L.L#.##\n' +
            '#LLL#LL.L#\n' +
            'L.#.L..#..\n' +
            '#L##.##.L#\n' +
            '#.#L.LL.LL\n' +
            '#.#L#L#.##\n' +
            '..L.L.....\n' +
            '#L#L##L#L#\n' +
            '#.LLLLLL.L\n' +
            '#.#L#L#.##';
        const result = nextRoundsPartOne(prepareInput(input));
        expect(result.toString()).equal(prepareInput(input).toString());
    });
});


describe('Test adjacent count', () => {
    it('should return 4', () => {
        const input =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const result = countAdjacentOccupiedSeats(prepareInput(input), 2, 0);
        expect(result).equal(4);
    });
});


describe('Test array comparator', () => {
    const array1 = [["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"], ["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"], ["#", ".", "#", ".", "#", ".", ".", "#", ".", "."], ["#", "#", "#", "#", ".", "#", "#", ".", "#", "#"], ["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"], ["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"], [".", ".", "#", ".", "#", ".", ".", ".", ".", "."], ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"], ["#", ".", "#", "#", "#", "#", "#", "#", ".", "#"], ["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"]];
    const array2 = [["#", ".", "#", "L", ".", "L", "#", ".", "#", "#"], ["#", "L", "L", "L", "#", "L", "L", ".", "L", "#"], ["L", ".", "#", ".", "L", ".", ".", "#", ".", "."], ["#", "L", "#", "#", ".", "#", "#", ".", "L", "#"], ["#", ".", "#", "L", ".", "L", "L", ".", "L", "L"], ["#", ".", "#", "L", "#", "L", "#", ".", "#", "#"], [".", ".", "L", ".", "L", ".", ".", ".", ".", "."], ["#", "L", "#", "L", "#", "#", "L", "#", "L", "#"], ["#", ".", "L", "L", "L", "L", "L", "L", ".", "L"], ["#", ".", "#", "L", "#", "L", "#", ".", "#", "#"]];

    it('should return false', () => {
        const result = areAreasSame(array1, array2);
        expect(result).equal(false);
    });
    it('should return true', () => {
        const array2 = array1.map(row => row.slice());
        const result = areAreasSame(array1, array2);
        expect(result).equal(true);
    });
});


describe('Next rounds part 2 calculation', () => {
    it('round #1', () => {
        const input =
            'L.LL.LL.LL\n' +
            'LLLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLLL\n' +
            'L.LLLLLL.L\n' +
            'L.LLLLL.LL';
        const expectedOutput =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });

    it('round #2', () => {
        const input =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const expectedOutput =
            '#.LL.LL.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLL#\n' +
            '#.LLLLLL.L\n' +
            '#.LLLLL.L#';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #3', () => {
        const input =
            '#.LL.LL.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..L..\n' +
            'LLLL.LL.LL\n' +
            'L.LL.LL.LL\n' +
            'L.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLL#\n' +
            '#.LLLLLL.L\n' +
            '#.LLLLL.L#';
        const expectedOutput =
            '#.L#.##.L#\n' +
            '#L#####.LL\n' +
            'L.#.#..#..\n' +
            '##L#.##.##\n' +
            '#.##.#L.##\n' +
            '#.#####.#L\n' +
            '..#.#.....\n' +
            'LLL####LL#\n' +
            '#.L#####.L\n' +
            '#.L####.L#';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #4', () => {
        const input =
            '#.L#.##.L#\n' +
            '#L#####.LL\n' +
            'L.#.#..#..\n' +
            '##L#.##.##\n' +
            '#.##.#L.##\n' +
            '#.#####.#L\n' +
            '..#.#.....\n' +
            'LLL####LL#\n' +
            '#.L#####.L\n' +
            '#.L####.L#';
        const expectedOutput =
            '#.L#.L#.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..#..\n' +
            '##LL.LL.L#\n' +
            'L.LL.LL.L#\n' +
            '#.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLL#\n' +
            '#.LLLLL#.L\n' +
            '#.L#LL#.L#';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #5', () => {
        const input =
            '#.L#.L#.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..#..\n' +
            '##LL.LL.L#\n' +
            'L.LL.LL.L#\n' +
            '#.LLLLL.LL\n' +
            '..L.L.....\n' +
            'LLLLLLLLL#\n' +
            '#.LLLLL#.L\n' +
            '#.L#LL#.L#';
        const expectedOutput =
            '#.L#.L#.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..#..\n' +
            '##L#.#L.L#\n' +
            'L.L#.#L.L#\n' +
            '#.L####.LL\n' +
            '..#.#.....\n' +
            'LLL###LLL#\n' +
            '#.LLLLL#.L\n' +
            '#.L#LL#.L#';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(expectedOutput).toString());
    });


    it('round #6', () => {
        const input =
            '#.L#.L#.L#\n' +
            '#LLLLLL.LL\n' +
            'L.L.L..#..\n' +
            '##L#.#L.L#\n' +
            'L.L#.LL.L#\n' +
            '#.LLLL#.LL\n' +
            '..#.L.....\n' +
            'LLL###LLL#\n' +
            '#.LLLLL#.L\n' +
            '#.L#LL#.L#';
        const result = nextRoundsPartTwo(prepareInput(input));
        expect(result.toString()).equal(prepareInput(input).toString());
    });
});


describe('Test surrounding count', () => {
    it('should return 5', () => {
        const input =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const result = countSurroundingOccupiedSeats(prepareInput(input), 0, 1);
        expect(result).equal(5);
    });

    it('should return 4', () => {
        const input =
            '#.##.##.##\n' +
            '#######.##\n' +
            '#.#.#..#..\n' +
            '####.##.##\n' +
            '#.##.##.##\n' +
            '#.#####.##\n' +
            '..#.#.....\n' +
            '##########\n' +
            '#.######.#\n' +
            '#.#####.##';
        const result = countSurroundingOccupiedSeats(prepareInput(input), 1, 0);
        expect(result).equal(4);
    });
});
