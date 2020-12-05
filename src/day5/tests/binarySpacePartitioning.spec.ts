import {
    binarySpacePartitionConverter,
    createSeatId,
    findUnoccupiedSeats,
    partitionToSeat
} from "../binarySpacePartitioning";
import {expect} from "chai";
import assert from "assert";


describe('Test binary space partition', () => {
    it('should return 357', () => {
        const result = binarySpacePartitionConverter('FBFBBFFRLR');
        expect(result).equal(357);
    });
    it('should return 357', () => {
        const result = binarySpacePartitionConverter('BFFFBBFRRR');
        expect(result).equal(567);
    });
    it('should return 357', () => {
        const result = binarySpacePartitionConverter('FFFBBBFRRR');
        expect(result).equal(119);
    });
    it('should return 357', () => {
        const result = binarySpacePartitionConverter('BBFFBBFRLL');
        expect(result).equal(820);
    });
});


describe('Test partition to seat', () => {
    it('should return row: 44, column: 5', () => {
        const result = partitionToSeat('FBFBBFFRLR');
        assert.deepStrictEqual(result, {row: 44, column: 5});
    });
    it('should return row: 70, column: 7', () => {
        const result = partitionToSeat('BFFFBBFRRR');
        assert.deepStrictEqual(result,{row: 70, column: 7});
    });
    it('should return row: 14, column: 7', () => {
        const result = partitionToSeat('FFFBBBFRRR');
        assert.deepStrictEqual(result,{row: 14, column: 7});
    });
    it('should return row: 102, column: 820', () => {
        const result = partitionToSeat('BBFFBBFRLL');
        assert.deepStrictEqual(result,{row: 102, column: 4});
    });
});


describe('Test Seat ID creation', () => {
    it('should return r357', () => {
        const result = createSeatId({row: 44, column: 5});
        expect(result).equal(357);
    });
    it('should return 567', () => {
        const result = createSeatId({row: 70, column: 7});
        expect(result).equal(567);
    });
    it('should return 119', () => {
        const result = createSeatId({row: 14, column: 7});
        expect(result).equal(119);
    });
    it('should return 820', () => {
        const result = createSeatId({row: 102, column: 4});
        expect(result).equal(820);
    });
});

describe('Test Finding Unoccupied Seats', () => {
    it('should return 14', () => {
        const seatId = [];
        const testSeats = [1,2,3,14,944,945]
        for (let i = 0; i < 127 * 8 + 7; i++) {
            if (testSeats.indexOf(i) === -1) {
                seatId.push(i);
            }
        }
        const result = findUnoccupiedSeats(seatId);
        expect(result[0]).equal(14);
    });
    it('should return 14', () => {
        const seatId = [];
        const testSeats = [14,944,945]
        for (let i = 0; i < 127 * 8 + 7; i++) {
            if (testSeats.indexOf(i) === -1) {
                seatId.push(i);
            }
        }
        const result = findUnoccupiedSeats(seatId);
        expect(result[0]).equal(14);
    });
    it('should return 14', () => {
        const seatId = [];
        const testSeats = [1,2,3,14]
        for (let i = 0; i < 127 * 8 + 7; i++) {
            if (testSeats.indexOf(i) === -1) {
                seatId.push(i);
            }
        }
        const result = findUnoccupiedSeats(seatId);
        expect(result[0]).equal(14);
    });
});

