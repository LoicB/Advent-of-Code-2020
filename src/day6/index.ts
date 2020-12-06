import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";


export const prepareInputPart1 = (rawInput: string): Set<string>[] => {
    const lines: string[] = inputToStringList(rawInput);
    const declarationForms: Set<string>[] = [];
    let currentDeclarationForm = new Set<string>();
    lines.forEach(line => {
        if (line.trim().length === 0) {
            declarationForms.push(new Set(currentDeclarationForm));
            currentDeclarationForm.clear();
            currentDeclarationForm = new Set<string>();
        } else {
            for (let i = 0; i < line.length; i++) {
                currentDeclarationForm.add(line.charAt(i));
            }
        }
    })
    declarationForms.push(new Set(currentDeclarationForm));
    return declarationForms;
}


export const prepareInputPart2 = (rawInput: string): Map<string, number>[] => {
    const lines: string[] = inputToStringList(rawInput);
    const declarationForms: Map<string, number>[] = [];
    let currentDeclarationForm = new Map<string, number>();
    lines.forEach(line => {
        if (line.trim().length === 0) {
            declarationForms.push(new Map(currentDeclarationForm));
            currentDeclarationForm.clear();
            currentDeclarationForm = new Map<string, number>();
        } else {
            increaseValueInMap(currentDeclarationForm, 'passenger');
            for (let i = 0; i < line.length; i++) {
                increaseValueInMap(currentDeclarationForm, line.charAt(i));
            }
        }
    })
    declarationForms.push(new Map(currentDeclarationForm));
    return declarationForms;
}
const increaseValueInMap = (map: Map<string, number>, key: string) => {
    const value = map.get(key);
    if (value === undefined) {
        map.set(key, 1);
    } else {
        map.set(key, 1 + value);
    }
}

const input = readInput()

export const partOne = (rawInput: string): number | undefined => {
    const input = prepareInputPart1(rawInput)
    let sumCounts = 0;
    input.forEach(answers => sumCounts += answers.size)
    return sumCounts
}

export const partTwo = (rawInput: string): number | undefined => {
    const input = prepareInputPart2(rawInput)
    let sumCounts = 0;
    input.forEach(answers => {
        const passenger = answers.get('passenger');
        answers.forEach((value: number, key: string) => {
            sumCounts += key !== 'passenger' && value === passenger ? 1 : 0;
        })
    })
    return sumCounts
}


runPartOneAndTwo(partOne, partTwo, input)
