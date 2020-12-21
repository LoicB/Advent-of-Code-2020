export function runPartOneAndTwo<T>(partOne: (input: T) => any | undefined, partTwo: (input: T) => any | undefined, input: T) {
    if (process.env.npm_lifecycle_event && !process.env.npm_lifecycle_event.startsWith('test')) {
        console.time('Time to part 1')
        const resultA = partOne(input)
        console.timeEnd('Time to part 1')
        console.time('Time to part 2')
        const resultB = partTwo(input);
        console.timeEnd('Time to part 2')

        console.log('Solution to part 1:', resultA)
        console.log('Solution to part 2:', resultB)
    }
}
