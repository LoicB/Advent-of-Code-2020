export const binarySpacePartitionConverter = (partition: string): number => {
    const seat: Seat = partitionToSeat(partition);
    return createSeatId(seat);
}

export interface Seat {
    row: number,
    column: number
}

export const partitionToSeat = (partition: string): Seat => {
    return {row: getRow(partition), column: getColumn(partition)};
}

const getRow = (partition: string): number => {
    let rowMin = 0;
    let rowMax = 127;
    for (let i = 0; i < 7; i++) {
        if (partition.charAt(i) === 'F') {
            rowMax -= Math.ceil((rowMax - rowMin) / 2);
        } else {
            rowMin += Math.ceil((rowMax - rowMin) / 2);
        }
    }
    return rowMin;
}

export const getColumn = (partition: string): number => {
    let columnMin = 0;
    let columnMax = 7;
    for (let i = 7; i < 11; i++) {
        if (partition.charAt(i) === 'L') {
            columnMax -= Math.ceil((columnMax - columnMin) / 2);
        } else {
            columnMin += Math.ceil((columnMax - columnMin) / 2);
        }
    }
    return columnMin;
}

export const createSeatId = (seat: Seat): number => {
    return seat.row * 8 + seat.column;
}

export const findUnoccupiedSeats = (seatIDs: number[]): number[] => {
    const unoccupiedSeatsIds: number[] = []
    const occupiedSeats: boolean[] = Array(127 * 8 + 7);
    seatIDs.forEach(id => occupiedSeats[id] = true);
    for (let i = 0; i < occupiedSeats.length; i++) {
        if (isSeatBeforeBusy(occupiedSeats, i) && isSeatAfterBusy(occupiedSeats, i) && !isSeatOccupied(occupiedSeats, i)) {
            unoccupiedSeatsIds.push(i);
        }
    }
    return unoccupiedSeatsIds;
}

const isSeatBeforeBusy = (occupiedSeats: boolean[], seatID: number): boolean => {
    return seatID > 0 && occupiedSeats[seatID - 1];
}
const isSeatAfterBusy = (occupiedSeats: boolean[], seatID: number): boolean => {
    return seatID < occupiedSeats.length && occupiedSeats[seatID + 1];
}
const isSeatOccupied = (occupiedSeats: boolean[], seatID: number): boolean => {
    return occupiedSeats[seatID];
}