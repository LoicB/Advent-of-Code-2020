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
    const expressionElement = expression.split(' ');
    const numberStack: number[] = [];
    const operatorStack: Operator[] = [];
    expressionElement.forEach(element => {
        if (isNumeric(element)) {
            numberStack.push(applyNumberCase(Number(element), operatorStack, numberStack));
        } else if (isOperationSymbol(element)) {
            operatorStack.push(getOperator(element));
        } else if (isOpeningParenthesis(element)) {
            numberStack.push(applyOpenParenthesis(element, operatorStack));
        } else if (isClosingParenthesis(element)) {
            numberStack.push(applyClosingParenthesis(element, operatorStack, numberStack));
        }
    })
    return numberStack.pop() || 0;
}

const applyClosingParenthesis  = (element: string, operatorStack: Operator[], numberStack: number[]): number => {
    let newElement = Number(element.substring(0, element.indexOf(')')));
    for (let i = 0; i < element.length - element.indexOf(')'); i++) {
        if (operatorStack[operatorStack.length - 1] === Operator.OPENING_PARENTHESIS) {
            operatorStack.pop();
        }
        const currentParenthesis: number = applyNumberCase(newElement, operatorStack, numberStack);
        operatorStack.pop();
        if (operatorStack[operatorStack.length - 1] === Operator.OPENING_PARENTHESIS) {
            newElement = (currentParenthesis);
        } else {
            newElement = (applyNumberCase(currentParenthesis, operatorStack, numberStack));
        }
    }
    return newElement;
}

const applyOpenParenthesis = (element: string, operatorStack: Operator[]) => {
    let newElement = element;
    while ((isOpeningParenthesis(newElement))) {
        operatorStack.push(Operator.OPENING_PARENTHESIS);
        newElement = newElement.substring(1);
    }
    return Number(newElement);
}

const applyNumberCase = (newNumber: number, operatorStack: Operator[], numberStack: number[]): number => {
    const operator = operatorStack.pop();
    const number = numberStack.pop();
    let numberToAddToStack: number;
    if (number === undefined || operator === undefined) {
        numberToAddToStack = newNumber;
    } else {
        numberToAddToStack = calculate(number, operator, newNumber);
    }
    return numberToAddToStack;
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
        case Operator.DIVISION:
            result = number1 / number2;
            break;
        case Operator.SUBTRACTION:
            result = number1 - number2;
            break;
        case Operator.OPENING_PARENTHESIS:
        case Operator.CLOSING_PARENTHESIS:
            throw Error('not a valid operation');
    }
    return result;
}

export enum Operator {
    ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, OPENING_PARENTHESIS, CLOSING_PARENTHESIS
}

const isNumeric = (element: string) => {
    return /^\d+$/.test(element);
}
const isOperationSymbol = (element: string) => {
    return ['+', '-', '*', '/'].indexOf(element) >= 0;
}
const getOperator = (element: string): Operator => {
    let operation: Operator;
    if (element === '+') {
        operation = Operator.ADDITION;
    } else if (element === '-') {
        operation = Operator.SUBTRACTION;
    } else if (element === '*') {
        operation = Operator.MULTIPLICATION;
    } else {
        operation = Operator.DIVISION;
    }
    return operation;
}
const isOpeningParenthesis = (element: string): boolean => {
    return element.charAt(0) === '(';
}
const isClosingParenthesis = (element: string): boolean => {
    return element.charAt(element.length - 1) === ')';
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

const applyOperation =  (operator: Operator, outputStack: number[]) => {
    const number1 = outputStack.pop() || 0;
    const number2 = outputStack.pop();
    if (number2 !== undefined) {
        outputStack.push(calculate(number1, operator , number2));
    } else {
        outputStack.push(number1);
    }
}

const operatorOnTopHasGreaterPrecedence = (operatorStack: Operator[]):boolean => {
    return operatorStack[operatorStack.length -1] === Operator.ADDITION;
}

const operatorOnTopIsLeftParenthesis = (operatorStack: Operator[]):boolean => {
    return operatorStack[operatorStack.length -1] === Operator.OPENING_PARENTHESIS;
}


runPartOneAndTwo(partOne, partTwo, input)
