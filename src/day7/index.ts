import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    const counted: boolean[] = Array(input.length);
    return countBags(input, counted, 'shiny gold');
}

export const partTwo = (input: string[]): number | undefined => {
    return countBagContent(input, 'shiny gold');
}

const countBags = (input: string[], counted: boolean[], color: string): number => {
    let numberBagColors = 0;
    input.forEach((line, index) => {
        if (!counted[index] && line.indexOf(color) > 0) {
            counted[index] = true;
            numberBagColors++;
            numberBagColors += countBags(input, counted, getParentBag(line))
        }
    });
    return numberBagColors;
}

const getParentBag = (line: string): string => {
    const elements = line.split(" ");
    return `${elements[0]} ${elements[1]}`;
}

const countBagContent = (input: string[], color: string): number => {
    let count = 0;
    input.forEach(line => {
        if (line.startsWith(color)) {
            const bags = bagContent(line);
            bags.forEach((numberOfBags: number, color: string) => {
                count += numberOfBags * (1 + countBagContent(input, color));
            });
        }
    });
    return count;
}


const bagContent = (line: string): Map<string, number> => {
    const bags = new Map<string, number>();
    const elements = line.split(" ");
    for (let i = 4; i < elements.length; i += 4) {
        const numberBags = bags.get(`${elements[0]} ${elements[1]}`);
        if (elements[i] !== 'no') {
            const addedNumberOfBags = Number(elements[i]);
            if (numberBags === undefined) {
                bags.set(`${elements[i + 1]} ${elements[i + 2]}`, addedNumberOfBags);
            } else {
                bags.set(`${elements[i + 1]} ${elements[i + 2]}`, addedNumberOfBags + numberBags);
            }
        }
    }
    return bags;
}

runPartOneAndTwo(partOne, partTwo, input)
