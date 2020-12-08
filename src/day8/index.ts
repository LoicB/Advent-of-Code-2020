import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {BootCodeEngine, ExecutionStatus, Instruction, Operation} from "./BootCodeEngine";
import {inputToStringList} from "../utils/cookInput";

export const prepareInput = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput);
    const instructions: Instruction[] = [];
    lines.filter(line => line.trim().length > 0).forEach(line => {
        const instructionParts = line.split(' ');
        instructions.push(new Instruction(Operation[instructionParts[0] as keyof typeof Operation], Number(instructionParts[1])));
    })
    return instructions;
}

const input = prepareInput(readInput())

export const partOne = (input: Instruction[]): number | undefined => {
    const interpreter: BootCodeEngine = new BootCodeEngine(input);
    return interpreter.executeProgram();
}

export const partTwo = (input: Instruction[]): number | undefined => {
    for (let i = 0; i < input.length; i++) {
        if (input[i].operation === Operation.jmp || input[i].operation === Operation.nop) {
            const newInput = [...input];
            newInput[i] = new Instruction(input[i].operation === Operation.jmp? Operation.nop: Operation.jmp, input[i].argument);
            const interpreter:BootCodeEngine = new BootCodeEngine(newInput);
            const status = exec(interpreter);
            if (status === ExecutionStatus.DONE){
                return interpreter.getAccumulator();
            }
        }
    }
    return
}

const exec = (interpreter: BootCodeEngine): ExecutionStatus => {
    let status: ExecutionStatus = ExecutionStatus.RUNNING;
    while (status === ExecutionStatus.RUNNING) {
        status = interpreter.execute();
    }
    return status
}


runPartOneAndTwo(partOne, partTwo, input)
