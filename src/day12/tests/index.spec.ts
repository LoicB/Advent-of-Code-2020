import {expect} from 'chai';
import {partOne, partTwo, prepareInput} from '../index';
import {Action, ShipInstruction} from "../navigation";

describe('Prepare instructions', () => {
    let instructions: ShipInstruction[];
    before(()=> {
        const input = 'F10\n' +
            'N3\n' +
            'F7\n' +
            'R90\n' +
            'F11';
        instructions = prepareInput(input)
    })
    it('should return F for the first instruction action', () => {
        expect(instructions[0].action).equal(Action.F);
    });
    it('should return 10 for the first instruction value', () => {
        expect(instructions[0].value).equal(10);
    });
    it('should return N for the second instruction action', () => {
        expect(instructions[1].action).equal(Action.N);
    });
    it('should return 7 for the second instruction value', () => {
        expect(instructions[1].value).equal(3);
    });
    it('should return F for the third instruction action', () => {
        expect(instructions[2].action).equal(Action.F);
    });
    it('should return 7 for the third instruction value', () => {
        expect(instructions[2].value).equal(7);
    });
    it('should return R for the fourth instruction action', () => {
        expect(instructions[3].action).equal(Action.R);
    });
    it('should return 90 for the fourth instruction value', () => {
        expect(instructions[3].value).equal(90);
    });
    it('should return F for the fourth instruction action', () => {
        expect(instructions[4].action).equal(Action.F);
    });
    it('should return 11 for the fourth instruction value', () => {
        expect(instructions[4].value).equal(11);
    });
});
describe('Day 12 - Part One', () => {
    it('should return 25', () => {
        const input = 'F10\n' +
            'N3\n' +
            'F7\n' +
            'R90\n' +
            'F11';
        const result = partOne(prepareInput(input));
        expect(result).equal(25);
    });
});

describe('Day 12 - Part Two', () => {
    it('should return 286', () => {
        const input = 'F10\n' +
            'N3\n' +
            'F7\n' +
            'R90\n' +
            'F11';
        const result = partTwo(prepareInput(input));
        expect(result).equal(286);
    });
});
