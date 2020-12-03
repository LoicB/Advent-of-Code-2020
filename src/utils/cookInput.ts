
export const inputToNumberList = (input: string): number[] => {
    const stringList: string[] = inputToStringList(input);
    return stringList.map(line => {
        return Number(line)
    });
}

export const inputToStringList = (input: string): string[] => {
    return input.split(/\r?\n/);
}


export const inputTo2dStringList = (input: string): string[][] => {
    const stringList: string[] = inputToStringList(input);
    return stringList.map(line => {
        return line.split('');
    });
}
