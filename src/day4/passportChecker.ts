export const isPassportValid = (passport: Map<string, string>): boolean => {
    return passport.size === 8 || (passport.size === 7 && passport.get('cid') === undefined);
}

export const isPassportStrictlyValid = (passport: Map<string, string>): boolean => {
    return isBirthYearValid(passport) && isIssueYearValid(passport) && isExpirationYearValid(passport)
        && isHeightValid(passport) && isHairColorValid(passport) && isEyeColorValid(passport) && isPassportIDValid(passport) && isCountryIDValid(passport);
}


export const isBirthYearValid = (passport: Map<string, string>): boolean => {
    return passport.has('byr') && Number(passport.get('byr')) >= 1920 && Number(passport.get('byr')) <= 2002;
}

export const isIssueYearValid = (passport: Map<string, string>): boolean => {
    return passport.has('iyr') && Number(passport.get('iyr')) >= 2010 && Number(passport.get('iyr')) <= 2020;
}

export const isExpirationYearValid = (passport: Map<string, string>): boolean => {
    return passport.has('eyr') && Number(passport.get('eyr')) >= 2020 && Number(passport.get('eyr')) <= 2030;
}


export const isHeightValid = (passport: Map<string, string>): boolean => {
    let valid: boolean = false;
    if (passport.has('hgt')) {
        const hgt = passport.get('hgt');
        if (hgt !== undefined) {
            valid = isHeightValueValid(hgt);
        }
    }
    return valid;
}

const isHeightValueValid = (hgt: string): boolean => {
    let valid: boolean = false;
    const unit = hgt.substring(hgt.length - 2);
    const hgtNumber = Number(hgt.substr(0, hgt.length - 2))
    if (unit === 'cm') {
        valid = hgtNumber >= 150 && hgtNumber <= 193;
    } else if (unit === 'in') {
        valid = hgtNumber >= 59 && hgtNumber <= 76;
    }
    return valid;
}

export const isHairColorValid = (passport: Map<string, string>): boolean => {
    let valid: boolean = false;
    const hcl = passport.get('hcl');
    if (hcl) {
        const matches = hcl.match(/^#[0-9a-f]{6}$/gm);
        valid = matches !== null && matches.length === 1;
    }
    return valid;
}


export const isEyeColorValid = (passport: Map<string, string>): boolean => {
    const ecl = passport.get('ecl');
    return ecl !== undefined && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(ecl) >= 0;
}
export const isPassportIDValid = (passport: Map<string, string>): boolean => {
    let valid: boolean = false;
    const pid = passport.get('pid');
    if (pid) {
        const matches = pid.match(/^[0-9]{9}$/gm);
        valid = matches !== null && matches.length === 1;
    }
    return valid;
}


export const isCountryIDValid = (_: Map<string, string>): boolean => {
    return true;
}
