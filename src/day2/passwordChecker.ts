export const isValidPolicy1 = (passwordPolicy: string, password: string): boolean => {
    const {min, max} = passwordPolicyRange(passwordPolicy);
    const letter = passwordPolicyLetter(passwordPolicy);
    const occurrencesCount = countOccurrences(password, letter);
    return occurrencesCount >= min && occurrencesCount <= max;
}

export const isValidPolicy2 = (passwordPolicy: string, password: string): boolean => {
    const {min: index1, max: index2} = passwordPolicyRange(passwordPolicy);
    const letter = passwordPolicyLetter(passwordPolicy);
    return (password.charAt(index1 - 1) !== password.charAt(index2 - 1)) && (password.charAt(index1 - 1) === letter || password.charAt(index2 - 1) === letter);
}

interface PasswordPolicyRange {
    min: number;
    max: number;
}

export const passwordPolicyRange = (passwordPolicy: string): PasswordPolicyRange => {
    const match = passwordPolicy.match(/\d+/g);
    const digits = match ? match.map(Number) : [0, 0];
    return {min: digits[0], max: digits[1]};
}


export const passwordPolicyLetter = (passwordPolicy: string): string => {
    return passwordPolicy.charAt(passwordPolicy.length - 1);
}


export const countOccurrences = (password: string, character: string): number => {
    let count = 0;
    let firstIndex = password.indexOf(character);
    while (firstIndex >= 0) {
        count++;
        firstIndex = password.indexOf(character, firstIndex + 1);
    }
    return count;
}

