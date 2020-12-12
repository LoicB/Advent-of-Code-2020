export interface Position {
    x: number;
    y: number;
    direction: string;
}

export const STARTING_SHIP_POSITION = {
    x: 0,
    y: 0,
    direction: 'east'
}

export const STARTING_WAYPOINT_POSITION = {
    x: 10,
    y: 1,
    direction: 'east'
}

export interface ShipInstruction {
    action: Action,
    value: number
}

export enum Action {
    N = 'N', S = 'S', E = 'E', W = 'W', L = 'L', R = 'R', F = 'F'
}

const direction: string[] = ['north', 'east', 'south', 'west']

export const navigateShip = (position: Position, instruction: ShipInstruction): Position => {
    let outputX = position.x;
    let outputY = position.y;
    let outputDirection = position.direction;
    switch (instruction.action) {
        case Action.N:
            outputY += instruction.value;
            break;
        case Action.S:
            outputY -= instruction.value;
            break;
        case Action.E:
            outputX += instruction.value;
            break;
        case Action.W:
            outputX -= instruction.value;
            break;
        case Action.L:
            outputDirection = direction[(4 + direction.indexOf(position.direction) - calcRotationIndex(instruction.value)) % 4]
            break;
        case Action.R:
            outputDirection = direction[(direction.indexOf(position.direction) + calcRotationIndex(instruction.value)) % 4]
            break;
        case Action.F:
            const {x, y} = moveForward(position, instruction.value);
            outputX = x;
            outputY = y;
            break;
    }
    return {
        x: outputX,
        y: outputY,
        direction: outputDirection
    };
}

const moveForward = (position: Position, value: number): Position => {
    let x = position.x;
    let y = position.y;
    switch (position.direction) {
        case 'north':
            y += value;
            break;
        case 'south':
            y -= value;
            break;
        case 'east':
            x += value;
            break;
        case 'west':
            x -= value;
            break;
    }
    return {x, y, direction: position.direction};
}

const calcRotationIndex = (value: number): number => {
    let index: number;
    if (value === 180) {
        index = 2;
    } else if (value === 270) {
        index = 3;
    } else {
        index = 1;
    }
    return index;
}

export interface SeaMap {
    shipStatus: Position,
    waypointStatus: Position
}

export const navigateShipPart2 = (shipPosition: Position, waypointPosition: Position, instruction: ShipInstruction): SeaMap => {
    let shipX = shipPosition.x;
    let shipY = shipPosition.y;
    let waypointX = waypointPosition.x;
    let waypointY = waypointPosition.y;
    switch (instruction.action) {
        case Action.F:
            shipX += instruction.value * waypointPosition.x;
            shipY += instruction.value * waypointPosition.y;
            break;
        case Action.N:
            waypointY += instruction.value;
            break;
        case Action.S:
            waypointY -= instruction.value;
            break;
        case Action.E:
            waypointX += instruction.value;
            break;
        case Action.W:
            waypointX -= instruction.value;
            break;
        case Action.L:
            const {x:leftX, y:leftY} = rotateLeft(instruction.value, waypointX, waypointY);
            waypointX = leftX;
            waypointY = leftY;
            break;
        case Action.R:
            const {x:rightX, y:rightY} = rotateRight(instruction.value, waypointX, waypointY);
            waypointX = rightX;
            waypointY = rightY;
            break;
    }
    return {
        shipStatus: {
            x: shipX,
            y: shipY,
            direction: shipPosition.direction
        },
        waypointStatus: {
            x: waypointX,
            y: waypointY,
            direction: waypointPosition.direction
        }
    };
}

interface Coordinates {
    x: number,
    y: number
}

const rotateLeft = (value: number, x: number, y: number): Coordinates => {
    return rotate(value, x, y, rotateLeftOnce);
}

const rotateRight = (value: number, x: number, y: number): Coordinates => {
    return rotate(value, x, y, rotateRightOnce);
}


const rotate = (value: number, x: number, y: number, rotateAction: (x: number, y: number) => Coordinates): Coordinates => {
    let angleLeft = value;
    let resX = x;
    let resY = y;
    while (angleLeft > 0) {
        const {x:newX, y: newY} = rotateAction(resX, resY);
        resX = newX;
        resY = newY;
        angleLeft -= 90;
    }
    return {x: resX, y: resY};
}
const rotateLeftOnce = (x: number, y: number): Coordinates => {
    return {x:-y, y:x};
}
const rotateRightOnce = (x: number, y: number): Coordinates => {
    return {x:y, y:-x};
}
