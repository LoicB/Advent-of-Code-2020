
export const inputToNumberList = (input: string): number[] => {
    const stringList: string[] = inputToStringList(input);
    return stringList.map(line => {
        return Number(line)
    });
}

export const inputToStringList = (input: string): string[] => {
    return input.split("\n");
}
