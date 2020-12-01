import { readFileSync } from 'fs';
const getCallerFile = require('get-caller-file');

export const  readInput = () => {
    const file = getCallerFile()
        .split('\\')
        .slice(0, -1)
        .concat('input.txt')
        .join('/')
    return readFileSync(file).toString()
}

