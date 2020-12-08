export class BootCodeEngine {
    private readonly history: number[];
    private readonly instruction: Instruction[];
    private accumulator: number;
    private head: number;

    constructor(instruction: Instruction[]) {
        this.accumulator = 0;
        this.head = 0;
        this.history = [0];
        this.instruction = instruction;
    }

    executeProgram(): number {
        while (this.execute() === ExecutionStatus.RUNNING) {
        }
        return this.accumulator;
    }

    execute(): ExecutionStatus {
        const currentHed = this.head;
        switch (this.instruction[currentHed].operation) {
            case Operation.jmp:
                this.head += this.instruction[currentHed].argument;
                break;
            case Operation.acc:
                this.accumulator += this.instruction[currentHed].argument;
                this.head += 1;
                break;
            default:
            case Operation.nop:
                this.head += 1;
                break;
        }

        let status: ExecutionStatus;
        if (BootCodeEngine.isProgramLooping(this.history, this.head)) {
            status = ExecutionStatus.LOOP;
        } else if (BootCodeEngine.isProgramDone(this.instruction.length, this.head)) {
            status = ExecutionStatus.DONE;
        } else {
            this.history.push(this.head);
            status = ExecutionStatus.RUNNING;
        }
        return status;
    }

    getAccumulator(): number {
        return this.accumulator;
    }

    private static isProgramLooping(history: number[], head: number): boolean {
        return history.indexOf(head) !== -1;
    }

    private static isProgramDone(numberInstructions: number, head: number): boolean {
        return head < 0 || head >= numberInstructions;
    }
}

export enum Operation {nop = 'nop', jmp = 'jmp', acc = 'acc',}

export enum ExecutionStatus { RUNNING, LOOP, DONE}

export class Instruction {
    operation: Operation;
    argument: number;

    constructor(operation: Operation, argument: number) {
        this.operation = operation;
        this.argument = argument;
    }

}
