import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => inputToStringList(rawInput)

const input = prepareInput(readInput())

export const partOne = (input: string[]): number | undefined => {
    let sum = 0;
    input.forEach(expression => sum += evaluateExpression(expression))
    return sum;
}

export const evaluateExpression = (expression: string): number => {
    const operatorStack: Operator[] = [];
    const outputStack: number[] = [];
    for (let i = 0; i < expression.length; i++) {
        const token: string = expression.charAt(i);
        if (isNumeric(token)) {
            outputStack.push(Number(token));
        } else if (isOperationSymbol(token)) {
            executeOperationWithoutPriority(operatorStack, outputStack);
            operatorStack.push(getOperator(token));
        } else if (token === '(') {
            operatorStack.push(Operator.OPENING_PARENTHESIS);
        } else if (token === ')') {
            executeUntilLeftParenthesis(operatorStack, outputStack);
            operatorStack.pop();
        }
    }
    executeOperationWithoutPriority(operatorStack, outputStack);
    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        if (operator != undefined) applyOperation(operator, outputStack);
    }
    return outputStack.pop() || 0;
}

const executeUntilLeftParenthesis = (operatorStack: Operator[], outputStack: number[]) => {
    while (!operatorOnTopIsLeftParenthesis(operatorStack)) {
        const operator = operatorStack.pop();
        if (operator != undefined) applyOperation(operator, outputStack);
    }
}

const executeOperationWithoutPriority = (operatorStack: Operator[], outputStack: number[]) => {
    while (operatorStack[operatorStack.length - 1] === Operator.ADDITION || operatorStack[operatorStack.length - 1] === Operator.MULTIPLICATION) {
        const operator = operatorStack.pop();
        if (operator != undefined) applyOperation(operator, outputStack);
    }
}

export const calculate = (number1: number, operation: Operator, number2: number): number => {
    let result: number;
    switch (operation) {
        case Operator.ADDITION:
            result = number1 + number2;
            break;
        case Operator.MULTIPLICATION:
            result = number1 * number2;
            break;
        case Operator.OPENING_PARENTHESIS:
        case Operator.CLOSING_PARENTHESIS:
            throw Error('not a valid operation');
    }
    return result;
}

export enum Operator {
    ADDITION = '+', MULTIPLICATION = '*', OPENING_PARENTHESIS = '(', CLOSING_PARENTHESIS = ')'
}

const isNumeric = (element: string) => {
    return /^\d+$/.test(element);
}
const isOperationSymbol = (element: string) => {
    return ['+',  '*'].indexOf(element) >= 0;
}
const getOperator = (element: string): Operator => {
    return Object.values(Operator).filter(ope => ope === element)[0];
}

export const partTwo = (input: string[]): number | undefined => {
    let sum = 0;
    input.forEach(expression => sum += evaluateExpressionPartTwo(expression))
    return sum;
}

export const evaluateExpressionPartTwo = (expression: string): number => {
    const operatorStack: Operator[] = [];
    const outputStack: number[] = [];
    for (let i = 0; i < expression.length; i++) {
        const token: string = expression.charAt(i);
        if (isNumeric(token)) {
            outputStack.push(Number(token));
        } else if (isOperationSymbol(token)) {
            executeOperationWithGreaterPrecedence(operatorStack, outputStack);
            operatorStack.push(getOperator(token));
        } else if (token === '(') {
            operatorStack.push(Operator.OPENING_PARENTHESIS);
        } else if (token === ')') {
            while (!operatorOnTopIsLeftParenthesis(operatorStack)) {
                applyAddition(operatorStack, outputStack);
            }
            operatorStack.pop();
        }
    }
    executeOperationWithGreaterPrecedence(operatorStack, outputStack);
    while (operatorStack.length > 0) {
        applyMultiplication(operatorStack, outputStack);
    }
    return outputStack.pop() || 0;
}

const executeOperationWithGreaterPrecedence = (operatorStack: Operator[], outputStack: number[]) => {
    while (operatorOnTopHasGreaterPrecedence(operatorStack)) {
        applyAddition(operatorStack, outputStack);
    }
}

const applyAddition = (operatorStack: Operator[], outputStack: number[]) => {
    const operator = operatorStack.pop() || Operator.ADDITION;
    applyOperation(operator, outputStack);
}

const applyMultiplication = (operatorStack: Operator[], outputStack: number[]) => {
    const operator = operatorStack.pop() || Operator.MULTIPLICATION;
    applyOperation(operator, outputStack);
}

const applyOperation = (operator: Operator, outputStack: number[]) => {
    const number1 = outputStack.pop() || 0;
    const number2 = outputStack.pop();
    if (number2 !== undefined) {
        outputStack.push(calculate(number1, operator, number2));
    } else {
        outputStack.push(number1);
    }
}

const operatorOnTopHasGreaterPrecedence = (operatorStack: Operator[]): boolean => {
    return operatorStack[operatorStack.length - 1] === Operator.ADDITION;
}

const operatorOnTopIsLeftParenthesis = (operatorStack: Operator[]): boolean => {
    return operatorStack[operatorStack.length - 1] === Operator.OPENING_PARENTHESIS;
}


runPartOneAndTwo(partOne, partTwo, input)
