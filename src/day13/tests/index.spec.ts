import {expect} from 'chai';
import {busNextDepartureTime, BusSchedules, partOne, partTwo, prepareInputPartOne, prepareInputPartTwo} from '../index';

describe('Prepare input part one', () => {
    let busPlan: BusSchedules;
    before(()=> {
        const input = '939\n' +
            '7,13,x,x,59,x,31,19';
        busPlan = prepareInputPartOne(input)
    })
    it('should return 939 has first timestamp', () => {
        expect(busPlan.timestamp).equal(939);
    });
    it('should have 5 elements', () => {
        expect(busPlan.busIDs.length).equal(5);
    });
    it('should return 7 has first element', () => {
        expect(busPlan.busIDs[0]).equal(7);
    });
    it('should return 13 has second element', () => {
        expect(busPlan.busIDs[1]).equal(13);
    });
    it('should return 59 has third element', () => {
        expect(busPlan.busIDs[2]).equal(59);
    });
    it('should return 31 has fourth element', () => {
        expect(busPlan.busIDs[3]).equal(31);
    });
    it('should return 19 has fifth element', () => {
        expect(busPlan.busIDs[4]).equal(19);
    });
});


describe('Day 13 - Test busNextDepartureTime', () => {
    it('should return 945 the bus 7', () => {
        const result = busNextDepartureTime(939, 7);
        expect(result).equal(945);
    });

    it('should return 949 with the bus 13', () => {
        const result = busNextDepartureTime(939, 13);
        expect(result).equal(949);
    });

    it('should return 944 with the bus 59', () => {
        const result = busNextDepartureTime(939, 59);
        expect(result).equal(944);
    });

    it('should return 961 with the bus 31', () => {
        const result = busNextDepartureTime(939, 31);
        expect(result).equal(961);
    });

    it('should return 950 with the bus 19', () => {
        const result = busNextDepartureTime(939, 19);
        expect(result).equal(950);
    });

});

describe('Day 13 - Part One', () => {
    it('should return 295', () => {
        const input = '939\n' +
            '7,13,x,x,59,x,31,19';
        const result = partOne(input);
        expect(result).equal(295);
    });
});



describe('Prepare input part two', () => {
    let busSchedules: BusSchedules;
    before(()=> {
        const input = '939\n' +
            '7,13,x,x,59,x,31,19';
        busSchedules = prepareInputPartTwo(input)
    })
    it('should return 939 has first timestamp', () => {
        expect(busSchedules.timestamp).equal(939);
    });
    it('should have 5 elements', () => {
        expect(busSchedules.busIDs.length).equal(8);
    });
    it('should return 7 has first element', () => {
        expect(busSchedules.busIDs[0]).equal(7);
    });
    it('should return 13 has second element', () => {
        expect(busSchedules.busIDs[1]).equal(13);
    });
    it('should return 1 has third element', () => {
        expect(busSchedules.busIDs[2]).equal(1);
    });
    it('should return 1 has fourth element', () => {
        expect(busSchedules.busIDs[3]).equal(1);
    });
    it('should return 59 has fifth element', () => {
        expect(busSchedules.busIDs[4]).equal(59);
    });
    it('should return 1 has sixth element', () => {
        expect(busSchedules.busIDs[5]).equal(1);
    });
    it('should return 31 has seventh element', () => {
        expect(busSchedules.busIDs[6]).equal(31);
    });
    it('should return 19 has height element', () => {
        expect(busSchedules.busIDs[7]).equal(19);
    });
});

describe('Day 13 - Part Two', () => {
    it('should return 1068781', () => {
        const input = '939\n' +
            '7,13,x,x,59,x,31,19';
        const result = partTwo(input);
        expect(result).equal(1068781);
    });

    it('should return 3417', () => {
        const input = '939\n' +
            '17,x,13,19';
        const result = partTwo(input);
        expect(result).equal(3417);
    });

    it('should return 754018', () => {
        const input = '939\n' +
            '67,7,59,61';
        const result = partTwo(input);
        expect(result).equal(754018);
    });

    it('should return 779210', () => {
        const input = '939\n' +
            '67,x,7,59,61';
        const result = partTwo(input);
        expect(result).equal(779210);
    });

    it('should return 1261476', () => {
        const input = '939\n' +
            '67,7,x,59,61';
        const result = partTwo(input);
        expect(result).equal(1261476);
    });

    it('should return 1202161486', () => {
        const input = '939\n' +
            '1789,37,47,1889';
        const result = partTwo(input);
        expect(result).equal(1202161486);
    });

});