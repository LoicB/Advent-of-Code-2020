import {expect} from 'chai';
import {findCommonIngredients, getAllergens, getIngredients, partOne, partTwo, prepareInput} from '../index';

describe('Day 21 - Part One', () => {
    it('should return 5', () => {
        const input = 'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\n' +
            'trh fvjkl sbzzf mxmxvkd (contains dairy)\n' +
            'sqjhc fvjkl (contains soy)\n' +
            'sqjhc mxmxvkd sbzzf (contains fish)'
        ;
        const result = partOne(prepareInput(input));
        expect(result).equal(5);
    });
});


describe('Day 21 - Test getIngredients', () => {
    it('First food', () => {
        const input = 'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)';
        const result = getIngredients(input);
        expect(result).to.have.all.members(['mxmxvkd', 'kfcds', 'sqjhc', 'nhms']);
    });
    it('Second food', () => {
        const input = 'trh fvjkl sbzzf mxmxvkd (contains dairy)';
        const result = getIngredients(input);
        expect(result).to.have.all.members(['trh', 'fvjkl', 'sbzzf', 'mxmxvkd']);
    });
    it('Thrid food', () => {
        const input = 'sqjhc fvjkl (contains soy)';
        const result = getIngredients(input);
        expect(result).to.have.all.members(['sqjhc', 'fvjkl']);
    });
    it('Fourth food', () => {
        const input = 'sqjhc mxmxvkd sbzzf (contains fish)';
        const result = getIngredients(input);
        expect(result).to.have.all.members(['sqjhc', 'mxmxvkd', 'sbzzf']);
    });
});


describe('Day 21 - Test getAllergens', () => {
    it('First food', () => {
        const input = 'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)';
        const result = getAllergens(input);
        expect(result).to.have.all.members(['dairy', 'fish']);
    });
    it('Second food', () => {
        const input = 'trh fvjkl sbzzf mxmxvkd (contains dairy)'        ;
        const result = getAllergens(input);
        expect(result).to.have.all.members(['dairy']);
    });
    it('Thrid food', () => {
        const input = 'sqjhc fvjkl (contains soy)';
        const result = getAllergens(input);
        expect(result).to.have.all.members(['soy']);
    });
    it('Fourth food', () => {
        const input = 'sqjhc mxmxvkd sbzzf (contains fish)';
        const result = getAllergens(input);
        expect(result).to.have.all.members(['fish']);
    });
});

describe('Day 21 - Test findCommonIngredients', () => {
    it('two times same list', () => {
        const input1: string[] = ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'];
        const input2: string[] = ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'];
        const result = findCommonIngredients(input1, input2);
        expect(result).to.have.all.members(['mxmxvkd', 'kfcds', 'sqjhc', 'nhms']);
    });
    it('First and second list', () => {
        const input1: string[] = ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'];
        const input2: string[] = ['trh', 'fvjkl', 'sbzzf', 'mxmxvkd'];
        const result = findCommonIngredients(input1, input2);
        expect(result).to.have.all.members(['mxmxvkd']);
    });
    it('First and third list', () => {
        const input1: string[] = ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'];
        const input2: string[] = ['sqjhc', 'fvjkl'];
        const result = findCommonIngredients(input1, input2);
        expect(result).to.have.all.members(['sqjhc']);
    });
    it('First and fourth list', () => {
        const input1: string[] = ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'];
        const input2: string[] = ['sqjhc', 'mxmxvkd', 'sbzzf'];
        const result = findCommonIngredients(input1, input2);
        expect(result).to.have.all.members(['mxmxvkd', 'sqjhc']);
    });
});

describe('Day 21 - Part Two', () => {
    it('should return mxmxvkd,sqjhc,fvjkl', () => {
        const input = 'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\n' +
            'trh fvjkl sbzzf mxmxvkd (contains dairy)\n' +
            'sqjhc fvjkl (contains soy)\n' +
            'sqjhc mxmxvkd sbzzf (contains fish)'
        ;
        const result = partTwo(prepareInput(input));
        expect(result).equal('mxmxvkd,sqjhc,fvjkl');
    });
});
