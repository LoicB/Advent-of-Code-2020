import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput);

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    const rules: string[] = getRules(input);
    const messages: string[] = getMessages(input, rules.length);
    return countMatchingMessages(rules, messages);
}

export const partTwo = (input: string[]): number | undefined => {
    const rules: string[] = getRules(input).filter(rule => !rule.startsWith('8: ') && !rule.startsWith('11: '));
    rules.push('8: 42 | 42 8')
    rules.push('11: 42 31 | 42 11 31')
    const messages: string[] = getMessages(input, rules.length).filter(message => message.trim().length > 0);
    return countMatchingMessagesRecursive(rules, messages);
}

const getRules = (input: string[]) => {
    const rules: string[] = [];
    let index = 0;
    while (input[index].trim().length > 0) {
        rules.push(input[index]);
        index++;
    }
    return rules;
}

const getMessages = (input: string[], startingIndex: number): string[] => {
    let index = startingIndex;
    const messages: string[] = [];
    while (index < input.length) {
        messages.push(input[index]);
        index++;
    }
    return messages;
}


const countMatchingMessages = (rules: string[], messages: string[]) => {
    let index = 0;
    const regex: RegExp = createRegexRule(rules, 0);
    let count = 0;
    while (index < messages.length) {
        if (messages[index].match(regex)) {
            count++;
        }
        index++;
    }
    return count;
}


const countMatchingMessagesRecursive = (rules: string[], messages: string[]) => {
    let index = 0;
    const regex: RegExp = createRegexRule(rules, 0);
    const regexRecc1: RegExp = createRegexRuleSimple(rules, 42);
    const regexRecc2: RegExp = createRegexRuleSimple(rules, 31);
    let count = 0;
    while (index < messages.length) {
        if (messages[index].match(regex)) {
            const matches42: string[] = (messages[index].match(regexRecc1) || []).filter(value => value !== undefined);
            const matches31: string[] = (messages[index].match(regexRecc2) || []).filter(value => value !== undefined);
            if (matches42.length === matches31.length) {
                count++;
            }
        }
        index++;
    }
    return count;
}

export const createRegexRule = (rules: string[], ruleIndex: number): RegExp => {
    return new RegExp(`^${createRegexRuleGeneric(rules, ruleIndex)}$`, 'gm');
}


export const createRegexRuleSimple = (rules: string[], ruleIndex: number): RegExp => {
    return new RegExp(`${createRegexRuleGeneric(rules, ruleIndex)}`, 'g');
}

const createRegexRuleGeneric = (rules: string[], ruleIndex: number): string => {
    const rulesMap: Map<number, string[]> = new Map<number, string[]>();
    rules.forEach(value => {
        const parts = value.split(':');
        rulesMap.set(Number(parts[0]), formatRules(parts[1]));
    })
    const regexMap: Map<number, string[]> = new Map<number, string[]>();
    const regexArray = createRegexForRule(ruleIndex, rulesMap, regexMap);
    return regexArray.join('');
}

const isRuleRecursive = (ruleIndex: number, rules: string[]) => {
    return rules.indexOf(`${ruleIndex}`) > 0;
}

const removeRecursion = (ruleIndex: number, rules: string[]): string[] => {
    const newRules: string[] = [...rules];
    const recursiveIndex = newRules.indexOf(`${ruleIndex}`);
    if (recursiveIndex === newRules.length - 1) {
        newRules[recursiveIndex] = '*';
    } else {
        const before = newRules[recursiveIndex - 1];
        const after = newRules[recursiveIndex + 1];
        newRules.splice(recursiveIndex - 1, 3);
        newRules.push(before);
        newRules.push('*');
        newRules.push(after);
        newRules.push('*');
    }
    return newRules;
}


const createRegexForRule = (ruleIndex: number, rulesMap: Map<number, string[]>, regexMap: Map<number, string[]>): string[] => {
    if (regexMap.has(ruleIndex)) {
        return regexMap.get(ruleIndex) || [];
    }
    let rules: string[] = rulesMap.get(ruleIndex) || [];
    if (isRuleRecursive(ruleIndex, rules)) {
        rules = removeRecursion(ruleIndex, rules);
    }
    let outputRules: string[] = [];
    rules.forEach(rule => {
        if (isNumeric(rule)) {
            const newIndex = Number(rule);
            const newRegexRules: string[] = createRegexForRule(Number(newIndex), rulesMap, regexMap);
            if (newRegexRules.length === 1) {
                outputRules = [...outputRules, ...newRegexRules];
            } else {
                outputRules = [...outputRules, '(', ...newRegexRules, ')'];
            }
        } else if (shouldCharacterBeCopied(rule)) {
            outputRules.push(rule)
        }
    });
    regexMap.set(ruleIndex, outputRules);
    return outputRules;
}

const formatRules = (rules: string): string[] => {
    return rules.split(' ').map(value => value.replace(/"/g, ''));
}

const isNumeric = (char: string) => {
    return /^\d+$/.test(char);
}
const shouldCharacterBeCopied = (char: string) => {
    return isLetter(char) || isOr(char) || isQuestionMark(char) || isMultiply(char) || isParenthesis(char);
}
const isLetter = (char: string) => {
    return char.match(/[a-z]/i);
}
const isOr = (char: string) => {
    return char === '|';
}
const isMultiply = (char: string) => {
    return char === '*';
}
const isQuestionMark = (char: string) => {
    return char === '?';
}
const isParenthesis = (char: string) => {
    return char === '(' || char === ')';
}

runPartOneAndTwo(partOne, partTwo, input)

