import { prepareInput} from "../index";
import {expect} from "chai";
import {
    navigateShip,
    ShipInstruction,
    Position,
    STARTING_SHIP_POSITION,
    navigateShipPart2,
    STARTING_WAYPOINT_POSITION, SeaMap
} from "../navigation";

describe('navigation handling from scenario', () => {
    const input = 'F10\n' +
        'N3\n' +
        'F7\n' +
        'R90\n' +
        'F11';
    let instructions: ShipInstruction[] = prepareInput(input);

    it('should return east 10, north 0 after instructions #1', () => {
        const result: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 10, y: 0, direction: 'east'}));
    });

    it('should return east 0, north 3 after instructions #2', () => {
        const result: Position = navigateShip(STARTING_SHIP_POSITION, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: 3, direction: 'east'}));
    });

    it('should return east 0, north 0 after instructions #4', () => {
        const result: Position = navigateShip(STARTING_SHIP_POSITION, instructions[3]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: 0, direction: 'south'}));
    });
    it('should return east 0, south 11 after instructions  #4 #5', () => {
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[3]);
        const result: Position = navigateShip(status, instructions[4]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: -11, direction: 'south'}));
    });
});


describe('navigation handling ', () => {
    it('should return west 10, north 0 after instructions', () => {
        const input = 'L90\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: 10, direction: 'north'}));
    });
    it('should return west 10, north 0 after instructions', () => {
        const input = 'R90\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: -10, direction: 'south'}));
    });
    it('should return west 10, north 0 after instructions', () => {
        const input = 'L180\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: -10, y: 0, direction: 'west'}));
    });
    it('should return west 10, north 0 after instructions', () => {
        const input = 'R180\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: -10, y: 0, direction: 'west'}));
    });
    it('should return west 10, north 0 after instructions', () => {
        const input = 'L270\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: -10, direction: 'south'}));
    });
    it('should return west 10, north 0 after instructions', () => {
        const input = 'R270\n' +
            'F10';
        let instructions: ShipInstruction[] = prepareInput(input);
        const status: Position = navigateShip(STARTING_SHIP_POSITION, instructions[0]);
        const result: Position = navigateShip(status, instructions[1]);
        expect(JSON.stringify(result)).equal(JSON.stringify({x: 0, y: 10, direction: 'north'}));
    });

    it('should return west 10, north 0 after instructions', () => {
        const input = 'R270';
        let instructions: ShipInstruction[] = prepareInput(input);
        const result: Position = navigateShip({ x: 70, y: 102, direction: 'north' }, instructions[0]);
        expect(JSON.stringify(result)).equal(JSON.stringify({ x: 70, y: 102, direction: 'west' }));
    });
});


describe('navigation handling from scenario #2', () => {
    const input = 'F10\n' +
        'N3\n' +
        'F7\n' +
        'R90\n' +
        'F11';
    let instructions: ShipInstruction[] = prepareInput(input);

    it('should return the ship at east 100, north 10 after instructions #1', () => {
        const result: SeaMap = navigateShipPart2(STARTING_SHIP_POSITION, STARTING_WAYPOINT_POSITION, instructions[0]);
        expect(JSON.stringify(result.shipStatus)).equal(JSON.stringify({x: 100, y: 10, direction: 'east'}));
        expect(JSON.stringify(result.waypointStatus)).equal(JSON.stringify({x: 10, y: 1, direction: 'east'}));
    });

    it('should return the waypoint at east 14, north 110 after instructions #2', () => {
        const status: SeaMap = navigateShipPart2(STARTING_SHIP_POSITION, STARTING_WAYPOINT_POSITION, instructions[0]);
        const result: SeaMap = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[1]);
        expect(JSON.stringify(result.shipStatus)).equal(JSON.stringify({x: 100, y: 10, direction: 'east'}));
        expect(JSON.stringify(result.waypointStatus)).equal(JSON.stringify({x: 10, y: 4, direction: 'east'}));
    });

    it('should return the ship at east 170, north 38 after instructions #2', () => {
        let status: SeaMap = navigateShipPart2(STARTING_SHIP_POSITION, STARTING_WAYPOINT_POSITION, instructions[0]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[1]);
        const result: SeaMap = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[2]);
        expect(JSON.stringify(result.shipStatus)).equal(JSON.stringify({x: 170, y: 38, direction: 'east'}));
        expect(JSON.stringify(result.waypointStatus)).equal(JSON.stringify({x: 10, y: 4, direction: 'east'}));
    });


    it('should return the waypoint at east 174, north 28 after instructions #2', () => {
        let status: SeaMap = navigateShipPart2(STARTING_SHIP_POSITION, STARTING_WAYPOINT_POSITION, instructions[0]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[1]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[2]);
        const result: SeaMap = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[3]);
        expect(JSON.stringify(result.shipStatus)).equal(JSON.stringify({x: 170, y: 38, direction: 'east'}));
        expect(JSON.stringify(result.waypointStatus)).equal(JSON.stringify({x: 4, y: -10, direction: 'east'}));
    });

    it('should return the ship at east 170, north 38 after instructions #2', () => {
        let status: SeaMap = navigateShipPart2(STARTING_SHIP_POSITION, STARTING_WAYPOINT_POSITION, instructions[0]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[1]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[2]);
        status = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[3]);
        const result: SeaMap = navigateShipPart2(status.shipStatus, status.waypointStatus, instructions[4]);
        expect(JSON.stringify(result.shipStatus)).equal(JSON.stringify({x: 214, y: -72, direction: 'east'}));
        expect(JSON.stringify(result.waypointStatus)).equal(JSON.stringify({x: 4, y: -10, direction: 'east'}));
    });

});
