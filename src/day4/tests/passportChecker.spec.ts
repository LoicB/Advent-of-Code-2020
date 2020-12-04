import {prepareInput} from "../index";
import {
    isBirthYearValid,
    isExpirationYearValid,
    isHairColorValid,
    isHeightValid,
    isIssueYearValid,
    isPassportValid,
    isPassportStrictlyValid, isEyeColorValid, isPassportIDValid, isCountryIDValid
} from "../passportChecker";
import {expect} from "chai";

describe('test passport validity', () => {
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
    it('should return true for the first document', () => {
        const valid = isPassportValid(input[0])
        expect(valid).equal(true);
    });
    it('should return false for the second document', () => {
        const valid = isPassportValid(input[1])
        expect(valid).equal(false);
    });
    it('should return true for the fourth document', () => {
        const valid = isPassportValid(input[2])
        expect(valid).equal(true);
    });
    it('should return false for the fifth document', () => {
        const valid = isPassportValid(input[3])
        expect(valid).equal(false);
    });
});


describe('test passport validity strict test', () => {
    const rawInput = 'eyr:1972 cid:100\n' +
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
    let input: Map<string, string>[];

    before(()=> {
        input = prepareInput(rawInput)
    })
    it('should return false for the first document', () => {
        const valid = isPassportStrictlyValid(input[0])
        expect(valid).equal(false);
    });
    it('should return false for the second document', () => {
        const valid = isPassportStrictlyValid(input[1])
        expect(valid).equal(false);
    });
    it('should return false for the fourth document', () => {
        const valid = isPassportStrictlyValid(input[2])
        expect(valid).equal(false);
    });
    it('should return false for the fifth document', () => {
        const valid = isPassportStrictlyValid(input[3])
        expect(valid).equal(false);
    });
});

describe('test passport validity strict test all valid', () => {
    const rawInput = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n' +
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
    let input: Map<string, string>[];

    before(()=> {
        input = prepareInput(rawInput)
    })
    it('should return true for the first document', () => {
        const valid = isPassportStrictlyValid(input[0])
        expect(valid).equal(true);
    });
    it('should return true for the second document', () => {
        const valid = isPassportStrictlyValid(input[1])
        expect(valid).equal(true);
    });
    it('should return true for the fourth document', () => {
        const valid = isPassportStrictlyValid(input[2])
        expect(valid).equal(true);
    });
    it('should return true for the fifth document', () => {
        const valid = isPassportStrictlyValid(input[3])
        expect(valid).equal(true);
    });
});


describe('test Birth Year', () => {

    it('should return true for 1990', () => {
        const valid = isBirthYearValid(new Map<string, string>([['byr', '1990']]));
        expect(valid).equal(true);
    });
    it('should return true for 1920', () => {
        const valid = isBirthYearValid(new Map<string, string>([['byr', '1920']]));
        expect(valid).equal(true);
    });
    it('should return true for 2002', () => {
        const valid = isBirthYearValid(new Map<string, string>([['byr', '2002']]));
        expect(valid).equal(true);
    });
    it('should return false for 1900', () => {
        const valid = isBirthYearValid(new Map<string, string>([['byr', '1900']]));
        expect(valid).equal(false);
    });
    it('should return false for 2020', () => {
        const valid = isBirthYearValid(new Map<string, string>([['byr', '2020']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isBirthYearValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});


describe('test Issue Year', () => {
    it('should return true for 2015', () => {
        const valid = isIssueYearValid(new Map<string, string>([['iyr', '2015']]));
        expect(valid).equal(true);
    });
    it('should return true for 2010', () => {
        const valid = isIssueYearValid(new Map<string, string>([['iyr', '2010']]));
        expect(valid).equal(true);
    });
    it('should return true for 2020', () => {
        const valid = isIssueYearValid(new Map<string, string>([['iyr', '2020']]));
        expect(valid).equal(true);
    });
    it('should return false for 2000', () => {
        const valid = isIssueYearValid(new Map<string, string>([['iyr', '2000']]));
        expect(valid).equal(false);
    });
    it('should return false for 2025', () => {
        const valid = isIssueYearValid(new Map<string, string>([['iyr', '2025']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isIssueYearValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});


describe('test Expiration  Year', () => {
    it('should return true for 2025', () => {
        const valid = isExpirationYearValid(new Map<string, string>([['eyr', '2025']]));
        expect(valid).equal(true);
    });
    it('should return true for 2020', () => {
        const valid = isExpirationYearValid(new Map<string, string>([['eyr', '2020']]));
        expect(valid).equal(true);
    });
    it('should return true for 2030', () => {
        const valid = isExpirationYearValid(new Map<string, string>([['eyr', '2030']]));
        expect(valid).equal(true);
    });
    it('should return false for 2019', () => {
        const valid = isExpirationYearValid(new Map<string, string>([['eyr', '2019']]));
        expect(valid).equal(false);
    });
    it('should return false for 2031', () => {
        const valid = isExpirationYearValid(new Map<string, string>([['eyr', '2031']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isExpirationYearValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});


describe('test Height', () => {
    it('should return true for 150cm', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '150cm']]));
        expect(valid).equal(true);
    });
    it('should return true for 193cm', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '193cm']]));
        expect(valid).equal(true);
    });
    it('should return true for 59in', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '59in']]));
        expect(valid).equal(true);
    });
    it('should return true for 76in', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '76in']]));
        expect(valid).equal(true);
    });
    it('should return false for 149cm', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '149cm']]));
        expect(valid).equal(false);
    });
    it('should return false for 194cm', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '194cm']]));
        expect(valid).equal(false);
    });
    it('should return false for 58in', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '58in']]));
        expect(valid).equal(false);
    });
    it('should return false for 77in', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '77in']]));
        expect(valid).equal(false);
    });
    it('should return false for invalid unit', () => {
        const valid = isHeightValid(new Map<string, string>([['hgt', '70an']]));
        expect(valid).equal(false);
    });
    it('should return false for no height', () => {
        const valid = isHeightValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});


describe('test Hair Color', () => {
    it('should return true for #123abc', () => {
        const valid = isHairColorValid(new Map<string, string>([['hcl', '#123abc']]));
        expect(valid).equal(true);
    });
    it('should return false for #123abz', () => {
        const valid = isHairColorValid(new Map<string, string>([['hcl', '#123abz']]));
        expect(valid).equal(false);
    });
    it('should return false for 123abc', () => {
        const valid = isHairColorValid(new Map<string, string>([['hcl', '123abc']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isHairColorValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});


describe('test Eye Color', () => {
    it('should return true for #123abc', () => {
        const valid = isEyeColorValid(new Map<string, string>([['ecl', 'brn']]));
        expect(valid).equal(true);
    });
    it('should return false for #123abz', () => {
        const valid = isEyeColorValid(new Map<string, string>([['ecl', 'wat']]));
        expect(valid).equal(false);
    });
    it('should return false for 123abc', () => {
        const valid = isEyeColorValid(new Map<string, string>([['ecl', 'test']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isEyeColorValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});



describe('test Passport ID', () => {
    it('should return true for #123abc', () => {
        const valid = isPassportIDValid(new Map<string, string>([['pid', '000000001']]));
        expect(valid).equal(true);
    });
    it('should return false for #123abz', () => {
        const valid = isPassportIDValid(new Map<string, string>([['pid', '0123456789']]));
        expect(valid).equal(false);
    });
    it('should return false for 123abc', () => {
        const valid = isPassportIDValid(new Map<string, string>([['pid', '1']]));
        expect(valid).equal(false);
    });
    it('should return false for no year', () => {
        const valid = isPassportIDValid(new Map<string, string>([]));
        expect(valid).equal(false);
    });
});



describe('test Country ID', () => {
    it('should return true for #123abc', () => {
        const valid = isCountryIDValid(new Map<string, string>([['cid', '150cm']]));
        expect(valid).equal(true);
    });
    it('should return true for #123abz', () => {
        const valid = isCountryIDValid(new Map<string, string>([['cid', '#123abc']]));
        expect(valid).equal(true);
    });
    it('should return true for 123abc', () => {
        const valid = isCountryIDValid(new Map<string, string>([['cid', '1']]));
        expect(valid).equal(true);
    });
    it('should return true for no year', () => {
        const valid = isCountryIDValid(new Map<string, string>([]));
        expect(valid).equal(true);
    });
});
