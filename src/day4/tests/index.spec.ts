import {expect} from 'chai';
import {partOne, partTwo, prepareInput} from '../index';

describe('Prepare input', () => {
    const rawInput = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
        'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
        '\n' +
        'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
        'hcl:#cfa07d byr:1929\n' +
        '\n' +
        'hcl:#ae17e1 iyr:2013\n' +
        'eyr:2024\n' +
        'ecl:brn pid:760753108 byr:1931\n' +
        'hgt:179cm\n' +
        '\n' +
        'hcl:#cfa07d eyr:2025 pid:166559648\n' +
        'iyr:2011 ecl:brn hgt:59in';
    let input: Map<string, string>[];

    before(()=> {
        input = prepareInput(rawInput)
    })
    it('should return 147 for the first document cid', () => {
        expect(input[0].get('cid')).equal('147');
    });
    it('should return 183cm for the first document hgt', () => {
        expect(input[0].get('hgt')).equal('183cm');
    });
    it('should return 350 for the second document cid', () => {
        expect(input[1].get('cid')).equal('350');
    });
    it('should return undefined for the last document cid', () => {
        expect(input[3].get('cid')).equal(undefined);
    });
});


describe('Day 4 - Part One', () => {
    it('should return 2', () => {
        const input = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
            'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
            '\n' +
            'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
            'hcl:#cfa07d byr:1929\n' +
            '\n' +
            'hcl:#ae17e1 iyr:2013\n' +
            'eyr:2024\n' +
            'ecl:brn pid:760753108 byr:1931\n' +
            'hgt:179cm\n' +
            '\n' +
            'hcl:#cfa07d eyr:2025 pid:166559648\n' +
            'iyr:2011 ecl:brn hgt:59in';
        const result = partOne(prepareInput(input));
        expect(result).equal(2);
    });
    it('should return 4', () => {
        const input = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n' +
            'hcl:#623a2f\n' +
            '\n' +
            'eyr:2029 ecl:blu cid:129 byr:1989\n' +
            'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n' +
            '\n' +
            'hcl:#888785\n' +
            'hgt:164cm byr:2001 iyr:2015 cid:88\n' +
            'pid:545766238 ecl:hzl\n' +
            'eyr:2022\n' +
            '\n' +
            'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719';
        const result = partOne(prepareInput(input));
        expect(result).equal(4);
    });
});

describe('Day 4 - Part Two', () => {
    it('should return 0', () => {
        const input = 'eyr:1972 cid:100\n' +
            'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n' +
            '\n' +
            'iyr:2019\n' +
            'hcl:#602927 eyr:1967 hgt:170cm\n' +
            'ecl:grn pid:012533040 byr:1946\n' +
            '\n' +
            'hcl:dab227 iyr:2012\n' +
            'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n' +
            '\n' +
            'hgt:59cm ecl:zzz\n' +
            'eyr:2038 hcl:74454a iyr:2023\n' +
            'pid:3556412378 byr:2007';
        const result = partTwo(prepareInput(input));
        expect(result).equal(0);
    });


    it('should return 4', () => {
        const input = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n' +
            'hcl:#623a2f\n' +
            '\n' +
            'eyr:2029 ecl:blu cid:129 byr:1989\n' +
            'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n' +
            '\n' +
            'hcl:#888785\n' +
            'hgt:164cm byr:2001 iyr:2015 cid:88\n' +
            'pid:545766238 ecl:hzl\n' +
            'eyr:2022\n' +
            '\n' +
            'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719';
        const result = partTwo(prepareInput(input));
        expect(result).equal(4);
    });
});
