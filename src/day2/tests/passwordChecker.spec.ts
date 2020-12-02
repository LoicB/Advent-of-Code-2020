import {expect} from "chai";
import {countOccurrences, isValidPolicy1, passwordPolicyLetter, passwordPolicyRange} from "../passwordChecker";

describe('Test if password respects policy', () => {
    it('should return 1-3 a: abcde as valid', () => {
        expect(isValidPolicy1('1-3 a','abcde')).equal(true);
    });

    it('should return 1-3 b: cdefg as not valid', () => {
        expect(isValidPolicy1('1-3 b','cdefg')).equal(false);
    });

    it('should return 2-9 c: ccccccccc as valid', () => {
        expect(isValidPolicy1('2-9 c','ccccccccc')).equal(true);
    });

    it('should return 9-12 q : qqqxhnhdmqqqqjz as valid', () => {
        expect(isValidPolicy1('9-12 q','qqqxhnhdmqqqqjz')).equal(false);
    });
});


describe('Test extraction of password range', () => {
    it('should return 1-3', () => {
        const range = passwordPolicyRange('1-3 a');
        expect(range.min).equal(1);
        expect(range.max).equal(3);
    });

    it('should return 2-9', () => {
        const range = passwordPolicyRange('2-9 c');
        expect(range.min).equal(2);
        expect(range.max).equal(9);
    });

    it('should return 9-12', () => {
        const range = passwordPolicyRange('9-12 q');
        expect(range.min).equal(9);
        expect(range.max).equal(12);
    });
});

describe('Test extraction of password letter', () => {
    it('should return a', () => {
        expect(passwordPolicyLetter('1-3 a')).equal('a');
    });

    it('should return b', () => {
        expect(passwordPolicyLetter('1-3 b')).equal('b');
    });

    it('should return c', () => {
        expect(passwordPolicyLetter('2-9 c')).equal('c');
    });

    it('should return q', () => {
        expect(passwordPolicyLetter('9-12 q')).equal('q');
    });
});



describe('Test counting occurrences', () => {
    it('counts occurrences of a in abcde', () => {
        expect(countOccurrences('abcde', 'a')).equal(1);
    });
    it('counts occurrences of b in abcde', () => {
        expect(countOccurrences('abcde', 'b')).equal(1);
    });
    it('counts occurrences of e in abcde', () => {
        expect(countOccurrences('abcde', 'e')).equal(1);
    });
    it('counts occurrences of f in abcde', () => {
        expect(countOccurrences('abcde', 'f')).equal(0);
    });
    it('counts occurrences of c in ccccccccc', () => {
        expect(countOccurrences('ccccccccc', 'c')).equal(9);
    });
    it('counts occurrences of f in ccccccccc', () => {
        expect(countOccurrences('ccccccccc', 'f')).equal(0);
    });
    it('counts occurrences of q in qqqxhnhdmqqqqjz', () => {
        expect(countOccurrences('qqqxhnhdmqqqqjz', 'q')).equal(7);
    });
});
