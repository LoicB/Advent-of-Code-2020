import {expect} from 'chai';
import { partOne, partTwo, prepareInput} from '../index';

describe('Day 10 - Part One', () => {
    it('should return 35 sample #1', () => {
        const input = '16\n' +
            '10\n' +
            '15\n' +
            '5\n' +
            '1\n' +
            '11\n' +
            '7\n' +
            '19\n' +
            '6\n' +
            '12\n' +
            '4';
        const result = partOne(prepareInput(input));
        expect(result).equal(35);
    });
    it('should return 220 sample #2', () => {
        const input = '28\n 33\n 18\n 42\n 31\n 14\n 46\n 20\n 48\n 47\n 24\n' +
            '23\n 49\n 45\n 19\n 38\n 39\n 11\n 1\n 32\n 25\n 35\n' +
            '8\n 17\n 7\n 9\n 4\n 2\n 34\n 10\n 3';
        const result = partOne(prepareInput(input));
        expect(result).equal(220);
    });
});

describe('Day 10 - Part Two', () => {
    it('should return 8 sample #1', () => {
        const input = '16\n' +
            '10\n' +
            '15\n' +
            '5\n' +
            '1\n' +
            '11\n' +
            '7\n' +
            '19\n' +
            '6\n' +
            '12\n' +
            '4';
        const result = partTwo(prepareInput(input));
        expect(result).equal(8);
    });


    it('should return 19208 sample #2', () => {
        const input = '28\n 33\n 18\n 42\n 31\n 14\n 46\n 20\n 48\n 47\n 24\n' +
            '23\n 49\n 45\n 19\n 38\n 39\n 11\n 1\n 32\n 25\n 35\n' +
            '8\n 17\n 7\n 9\n 4\n 2\n 34\n 10\n 3';
        const result = partTwo(prepareInput(input));
        expect(result).equal(19208);
    });


    it('should return 4 sample #3', () => {
        const input = '1\n' +
            '2\n' +
            '3';
        const result = partTwo(prepareInput(input));
        expect(result).equal(4);
    });


    it('should return 4 sample #4', () => {
        const input = '47\n' +
            '46\n' +
            '48\n' +
            '49';
        const result = partTwo(prepareInput(input));
        expect(result).equal(4);
    });


    it('should return 8 sample #3', () => {
        const input = '1\n' +
            '2\n' +
            '3\n' +
            '4';
        const result = partTwo(prepareInput(input));
        expect(result).equal(7);
    });
});
