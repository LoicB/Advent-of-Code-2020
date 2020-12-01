
export const inputToNumberList = (input: string): number[] => {
    const stringList: string[] = input.split("\n");
    return stringList.map(line => {
        return Number(line)
    });
}
