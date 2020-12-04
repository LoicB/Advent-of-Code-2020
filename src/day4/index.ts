import {  readInput } from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {isPassportValid, isPassportStrictlyValid} from "./passportChecker";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string): Map<string, string>[] => {
    const lines: string[] = inputToStringList(rawInput);
    const documents: Map<string, string>[]= [];
    let documentData = new Map<string, string>();
    lines.forEach(line => {
        if (line.trim().length === 0) {
            documents.push(new Map(documentData));
            documentData.clear();
            documentData = new Map<string, string>();
        } else {
            const passportData = passport(line);
            passportData.forEach(value1 => {
                const documentFiled: DocumentField = document(value1);
                documentData.set(documentFiled.id, documentFiled.value);
            })
        }
    })

    documents.push(new Map(documentData));
    documentData.clear();
    documentData = new Map<string, string>();
    return documents;
}

const passport = (line: string): string[] => {
    return line.split(" ");
}

interface DocumentField {
    id: string,
    value: string
}
const document = (documentInput: string):DocumentField => {
    const data: string[] = documentInput.split(':');
    return {
        id: data[0],
        value: data[1]
    }
}

const input = prepareInput(readInput())

export const partOne = (input: Map<string, string>[]): number | undefined => {
    let passportValidCount = 0;
    input.forEach(passportData => {
        if (isPassportValid(passportData)) {
            passportValidCount++;
        }
    })
    return passportValidCount;
}

export const partTwo = (input: Map<string, string>[]): number | undefined => {
    let passportValidCount = 0;
    input.forEach(passportData => {
        if (isPassportStrictlyValid(passportData)) {
            passportValidCount++;
        }
    })
    return passportValidCount;
}

runPartOneAndTwo(partOne, partTwo, input)
