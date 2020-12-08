import {expect} from "chai";
import {BootCodeEngine, ExecutionStatus} from "../BootCodeEngine";
import {prepareInput} from "../index";

describe('test boot code', () => {
    it('should return 5', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const engine: BootCodeEngine = new BootCodeEngine(prepareInput(input));
        const result = engine.executeProgram();
        expect(result).equal(5);
    });

    it('should return LOOP first swap #1', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const engine: BootCodeEngine = new BootCodeEngine(prepareInput(input));
        let status: ExecutionStatus = ExecutionStatus.RUNNING;
        while (status === ExecutionStatus.RUNNING) {
            status = engine.execute();
        }
        expect(status).equal(ExecutionStatus.LOOP);
    });



    it('should return LOOP first swap #2', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'nop +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const engine: BootCodeEngine = new BootCodeEngine(prepareInput(input));
        let status: ExecutionStatus = ExecutionStatus.RUNNING;
        while (status === ExecutionStatus.RUNNING) {
            status = engine.execute();
        }
        expect(status).equal(ExecutionStatus.LOOP);
    });



    it('should return LOOP first swap #3', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'nop -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'jmp -4\n' +
            'acc +6';
        const engine: BootCodeEngine = new BootCodeEngine(prepareInput(input));
        let status: ExecutionStatus = ExecutionStatus.RUNNING;
        while (status === ExecutionStatus.RUNNING) {
            status = engine.execute();
        }
        expect(status).equal(ExecutionStatus.LOOP);
    });



    it('should return DONE first swap #4', () => {
        const input = 'nop +0\n' +
            'acc +1\n' +
            'jmp +4\n' +
            'acc +3\n' +
            'jmp -3\n' +
            'acc -99\n' +
            'acc +1\n' +
            'nop -4\n' +
            'acc +6';
        const engine: BootCodeEngine = new BootCodeEngine(prepareInput(input));
        let status: ExecutionStatus = ExecutionStatus.RUNNING;
        while (status === ExecutionStatus.RUNNING) {
            status = engine.execute();
        }
        expect(status).equal(ExecutionStatus.DONE);
    });
});
