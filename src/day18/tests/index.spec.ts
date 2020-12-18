import {expect} from 'chai';
import {
    calculate,
    evaluateExpression,
    evaluateExpressionPartTwo,
    Operator,
    partOne,
    partTwo,
    prepareInput
} from '../index';

describe('Day 18 - Part One', () => {
    it('should return 26406', () => {
        const input = '1 + 2 * 3 + 4 * 5 + 6\n' +
            '2 * 3 + (4 * 5)\n' +
            '5 + (8 * 3 + 9 + 3 * 4 * 3)\n' +
            '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))\n' +
            '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2\n';
        const result = partOne(prepareInput(input));
        expect(result).equal(26406);
    });
});


describe('Day 18 - Evaluate expression', () => {
    it('should return 71', () => {
        const input = '1 + 2 * 3 + 4 * 5 + 6';
        const result = evaluateExpression(input);
        expect(result).equal(71);
    });
    it('should return 51', () => {
        const input = '1 + (2 * 3) + (4 * (5 + 6))';
        const result = evaluateExpression(input);
        expect(result).equal(51);
    });
    it('should return 26', () => {
        const input = '2 * 3 + (4 * 5)';
        const result = evaluateExpression(input);
        expect(result).equal(26);
    });
    it('should return 437', () => {
        const input = '5 + (8 * 3 + 9 + 3 * 4 * 3)';
        const result = evaluateExpression(input);
        expect(result).equal(437);
    });
    it('should return 12240', () => {
        const input = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))';
        const result = evaluateExpression(input);
        expect(result).equal(12240);
    });
    it('should return 13632', () => {
        const input = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2';
        const result = evaluateExpression(input);
        expect(result).equal(13632);
    });
    it('should return 3', () => {
        const input = '1 + 2';
        const result = evaluateExpression(input);
        expect(result).equal(3);
    });
    it('should return 4', () => {
        const input = '((1 + 2) + 1)';
        const result = evaluateExpression(input);
        expect(result).equal(4);
    });
    it('should return 6', () => {
        const input = '4 * ((1 + 2) + 1) + 2';
        const result = evaluateExpression(input);
        expect(result).equal(18);
    });
});

describe('Day 18 - Calculation', () => {
    it('should return 4', () => {
        const result = calculate(1, Operator.ADDITION, 3);
        expect(result).equal(4);
    });
    it('should return 9', () => {
        const result = calculate(3, Operator.MULTIPLICATION, 3);
        expect(result).equal(9);
    });
    it('should return 9', () => {
        const result = calculate(3, Operator.SUBTRACTION, 3);
        expect(result).equal(0);
    });
    it('should return 3', () => {
        const result = calculate(9, Operator.DIVISION, 3);
        expect(result).equal(3);
    });
    it('should return 3', () => {
        const result = calculate(9, Operator.DIVISION, 0);
        expect(result).equal(Infinity);
    });
});

describe('Day 18 - Part Two', () => {
    it('should return 694173', () => {
        const input = '1 + 2 * 3 + 4 * 5 + 6\n' +
            '1 + (2 * 3) + (4 * (5 + 6))\n' +
            '2 * 3 + (4 * 5)\n' +
            '5 + (8 * 3 + 9 + 3 * 4 * 3)\n' +
            '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))\n' +
            '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2';
        const result = partTwo(prepareInput(input));
        expect(result).equal(694173);
    });
});

describe('Day 18 - Evaluate expression Part Two', () => {
    it('should return 231', () => {
        const input = '1 + 2 * 3 + 4 * 5 + 6';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(231);
    });
    it('should return 51', () => {
        const input = '1 + (2 * 3) + (4 * (5 + 6))';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(51);
    });
    it('should return 46', () => {
        const input = '2 * 3 + (4 * 5)';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(46);
    });
    it('should return 1445', () => {
        const input = '5 + (8 * 3 + 9 + 3 * 4 * 3)';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(1445);
    });
    it('should return 669060', () => {
        const input = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(669060);
    });
    it('should return 23340', () => {
        const input = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(23340);
    });
    it('should return 3', () => {
        const input = '1 + 2';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(3);
    });
    it('should return 4', () => {
        const input = '((1 + 2) + 1)';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(4);
    });
    it('should return 24', () => {
        const input = '4 * ((1 + 2) + 1) + 2';
        const result = evaluateExpressionPartTwo(input);
        expect(result).equal(24);
    });
});