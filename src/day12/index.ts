import {readInput} from '../utils/readInput';
import {runPartOneAndTwo} from "../utils/adventOfCodeRunner";
import {inputToStringList} from "../utils/cookInput";
import {
    Action,
    navigateShip,
    ShipInstruction,
    Position,
    STARTING_SHIP_POSITION,
    STARTING_WAYPOINT_POSITION, SeaMap, navigateShipPart2
} from "./navigation";

export const prepareInput = (rawInput: string) => {
    const lines: string[] = inputToStringList(rawInput);
    const instructions: ShipInstruction[] = [];
    lines.filter(line => line.trim().length > 0).forEach(line => {
        instructions.push({
            action: line.charAt(0) as Action,
            value: Number(line.substr(1))
        });
    })
    return instructions;
}

const input = prepareInput(readInput())

export const partOne = (input: ShipInstruction[]): number | undefined => {
    let status: Position = STARTING_SHIP_POSITION;
    input.forEach(instruction => {
        status = navigateShip(status, instruction)
    })
    return Math.abs(status.x) + Math.abs(status.y);
}

export const partTwo = (input: ShipInstruction[]): number | undefined => {
    let seaMap: SeaMap = {
        shipStatus: STARTING_SHIP_POSITION,
        waypointStatus: STARTING_WAYPOINT_POSITION
    }
    input.forEach(instruction => {
        seaMap = navigateShipPart2(seaMap.shipStatus, seaMap.waypointStatus, instruction);
    });
    return Math.abs(seaMap.shipStatus.x) + Math.abs(seaMap.shipStatus.y);
}


runPartOneAndTwo(partOne, partTwo, input)
