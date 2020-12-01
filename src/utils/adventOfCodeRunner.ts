
export function runPartOneAndTwo<T>(partOne: (input: T) => number | undefined, partTwo: (input: T) => number| undefined,input: T) {
    console.time('Time')
    const resultA = partOne(input)
    console.timeEnd('Time')
    console.time('Time')
    const resultB = partTwo(input)
    console.timeEnd('Time')

    console.log('Solution to part 1:', resultA)
    console.log('Solution to part 2:', resultB)
}
