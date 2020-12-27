import {expect} from 'chai';
import {
    buildMap, countMonsters,
    createTileToAdjacent, fixSides,
    getTileSideReversed,
    partOne,
    partTwo,
    prepareInput,
    rearrangeMap, removeBorders
} from '../index';
import Tile from '../Tile';

export const input =
    'Tile 2311:\n' +
    '..##.#..#.\n' +
    '##..#.....\n' +
    '#...##..#.\n' +
    '####.#...#\n' +
    '##.##.###.\n' +
    '##...#.###\n' +
    '.#.#.#..##\n' +
    '..#....#..\n' +
    '###...#.#.\n' +
    '..###..###\n' +
    '\n' +
    'Tile 1951:\n' +
    '#.##...##.\n' +
    '#.####...#\n' +
    '.....#..##\n' +
    '#...######\n' +
    '.##.#....#\n' +
    '.###.#####\n' +
    '###.##.##.\n' +
    '.###....#.\n' +
    '..#.#..#.#\n' +
    '#...##.#..\n' +
    '\n' +
    'Tile 1171:\n' +
    '####...##.\n' +
    '#..##.#..#\n' +
    '##.#..#.#.\n' +
    '.###.####.\n' +
    '..###.####\n' +
    '.##....##.\n' +
    '.#...####.\n' +
    '#.##.####.\n' +
    '####..#...\n' +
    '.....##...\n' +
    '\n' +
    'Tile 1427:\n' +
    '###.##.#..\n' +
    '.#..#.##..\n' +
    '.#.##.#..#\n' +
    '#.#.#.##.#\n' +
    '....#...##\n' +
    '...##..##.\n' +
    '...#.#####\n' +
    '.#.####.#.\n' +
    '..#..###.#\n' +
    '..##.#..#.\n' +
    '\n' +
    'Tile 1489:\n' +
    '##.#.#....\n' +
    '..##...#..\n' +
    '.##..##...\n' +
    '..#...#...\n' +
    '#####...#.\n' +
    '#..#.#.#.#\n' +
    '...#.#.#..\n' +
    '##.#...##.\n' +
    '..##.##.##\n' +
    '###.##.#..\n' +
    '\n' +
    'Tile 2473:\n' +
    '#....####.\n' +
    '#..#.##...\n' +
    '#.##..#...\n' +
    '######.#.#\n' +
    '.#...#.#.#\n' +
    '.#########\n' +
    '.###.#..#.\n' +
    '########.#\n' +
    '##...##.#.\n' +
    '..###.#.#.\n' +
    '\n' +
    'Tile 2971:\n' +
    '..#.#....#\n' +
    '#...###...\n' +
    '#.#.###...\n' +
    '##.##..#..\n' +
    '.#####..##\n' +
    '.#..####.#\n' +
    '#..#.#..#.\n' +
    '..####.###\n' +
    '..#.#.###.\n' +
    '...#.#.#.#\n' +
    '\n' +
    'Tile 2729:\n' +
    '...#.#.#.#\n' +
    '####.#....\n' +
    '..#.#.....\n' +
    '....#..#.#\n' +
    '.##..##.#.\n' +
    '.#.####...\n' +
    '####.#.#..\n' +
    '##.####...\n' +
    '##..#.##..\n' +
    '#.##...##.\n' +
    '\n' +
    'Tile 3079:\n' +
    '#.#.#####.\n' +
    '.#..######\n' +
    '..#.......\n' +
    '######....\n' +
    '####.#..#.\n' +
    '.#...#.##.\n' +
    '#.#####.##\n' +
    '..#.###...\n' +
    '..#.......\n' +
    '..#.###...\n';


describe('Day 20 - Prepare input', () => {
    let result: Tile[];
    before(() => {
        result = prepareInput(input);
    })
    it('should return a length of 9', () => {
        expect(result.length).equal(9);
    });
    it('should return an id of 2311 for the first tile', () => {
        expect(result[0].getId()).equal(2311);
    });
    it('should return a length of 10 for the image of the first tile', () => {
        expect(result[0].getImage().length).equal(10);
    });
    it('should return ..##.#..#. as data of the first line of the first tile', () => {
        expect(result[0].getImage()[0]).equal('..##.#..#.');
    });
    it('should return ..###..### as data of the first last of the first tile', () => {
        expect(result[0].getImage()[9]).equal('..###..###');
    });
    it('should return a length of 10 for the image of the last tile', () => {
        expect(result[8].getImage().length).equal(10);
    });
    it('should return an id of 3079 for the last tile', () => {
        expect(result[8].getId()).equal(3079);
    });
    it('should return #.#.#####. as data of the first line of the last tile', () => {
        expect(result[8].getImage()[0]).equal('#.#.#####.');
    });
    it('should return ..#.###... as data of the first last of the last tile', () => {
        expect(result[8].getImage()[9]).equal('..#.###...');
    });
});


describe('Day 20 - Part One', () => {
    it('should return 20899048083289', () => {
        const result = partOne(prepareInput(input));
        expect(result).equal(20899048083289);
    });
});

describe('Day 20 - Part Two', () => {
    it('should return 273', () => {
        const result = partTwo(prepareInput(input));
        expect(result).equal(273);
    });
});


describe('Day 20 - build Map', () => {
    let result: Tile[][];
    before(() => {
        result = buildMap(createTileToAdjacent(prepareInput(input)));
    })
    it('should return 1951', () => {
        expect(result[0][0].getId()).equal(1951);
    });
    it('should return 2311', () => {
        expect(result[0][1].getId()).equal(2311);
    });
    it('should return 3079', () => {
        expect(result[0][2].getId()).equal(3079);
    });
    it('should return 2729', () => {
        expect(result[1][0].getId()).equal(2729);
    });
    it('should return 1427', () => {
        expect(result[1][1].getId()).equal(1427);
    });
    it('should return 2473', () => {
        expect(result[1][2].getId()).equal(2473);
    });
    it('should return 2971', () => {
        expect(result[2][0].getId()).equal(2971);
    });
    it('should return 1489', () => {
        expect(result[2][1].getId()).equal(1489);
    });
    it('should return 1171', () => {
        expect(result[2][2].getId()).equal(1171);
    });
});

describe('Day 20 - get sides', () => {
    let result: boolean[][];
    before(() => {
        result = getTileSideReversed(buildMap(createTileToAdjacent(prepareInput(input))));
    })
    it('should return true', () => {
        expect(result[0][0]).equal(true);
    });
    it('should return true', () => {
        expect(result[0][1]).equal(true);
    });
    it('should return false', () => {
        expect(result[0][2]).equal(false);
    });
    it('should return true', () => {
        expect(result[1][0]).equal(true);
    });
    it('should return true', () => {
        expect(result[1][1]).equal(true);
    });
    it('should return true', () => {
        expect(result[1][2]).equal(true);
    });
    it('should return true', () => {
        expect(result[2][0]).equal(true);
    });
    it('should return true', () => {
        expect(result[2][1]).equal(true);
    });
    it('should return true', () => {
        expect(result[2][2]).equal(true);
    });
});


describe('Day 20 - get sides after fixSides', () => {
    let result: boolean[][];
    before(() => {
        const map = buildMap(createTileToAdjacent(prepareInput(input)));
        const reversed = getTileSideReversed(map);
        const correctedMap = fixSides(map, reversed);
        result = getTileSideReversed(correctedMap);
    })
    it('should return true once corrected', () => {
        expect(result[0][0]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[0][1]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[0][2]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[1][0]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[1][1]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[1][2]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[2][0]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[2][1]).equal(true);
    });
    it('should return true once corrected', () => {
        expect(result[2][2]).equal(true);
    });
});


describe('Day 20 - removeBorders', () => {
    it('should return 273', () => {
        const result = removeBorders(rearrangeMap(buildMap(createTileToAdjacent(prepareInput(input)))));
        const expected: string[] =
            ['.#.#..#.##...#.##..#####',
                '###....#.#....#..#......',
                '##.##.###.#.#..######...',
                '###.#####...#.#####.#..#',
                '##.#....#.##.####...#.##',
                '...########.#....#####.#',
                '....#..#...##..#.#.###..',
                '.####...#..#.....#......',
                '#..#.##..#..###.#.##....',
                '#.####..#.####.#.#.###..',
                '###.#.#...#.######.#..##',
                '#.####....##..########.#',
                '##..##.#...#...#.#.#.#..',
                '...#..#..#.#.##..###.###',
                '.#.#....#.##.#...###.##.',
                '###.#...#..#.##.######..',
                '.#.#.###.##.##.#..#.##..',
                '.####.###.#...###.#..#.#',
                '..#.#..#..#.#.#.####.###',
                '#..####...#.#.#.###.###.',
                '#####..#####...###....##',
                '#.##..#..#...#..####...#',
                '.#.###..##..##..####.##.',
                '...###...##...#...#..###']
        expect(JSON.stringify(result)).equal(JSON.stringify(expected));
    });
});


describe('Day 20 - countMonsters', () => {
    it('should return 2', () => {
        const map: string[] = removeBorders(rearrangeMap(buildMap(createTileToAdjacent(prepareInput(input)))));
        const monster: string[] =
            [
                '                  # ',
                '#    ##    ##    ###',
                ' #  #  #  #  #  #   '
            ]
        const mapTile: Tile = new Tile(1, map);
        const result = countMonsters(mapTile.mirror().rotate().rotate().rotate().getImage(), monster)
        expect(result).equal(2);
    });
    it('should return 273', () => {
        const map: string[] =
            [
                '.####...#####..#...###..',
                '#####..#..#.#.####..#.#.',
                '.#.#...#.###...#.##.##..',
                '#.#.##.###.#.##.##.#####',
                '..##.###.####..#.####.##',
                '...#.#..##.##...#..#..##',
                '#.##.#..#.#..#..##.#.#..',
                '.###.##.....#...###.#...',
                '#.####.#.#....##.#..#.#.',
                '##...#..#....#..#...####',
                '..#.##...###..#.#####..#',
                '....#.##.#.#####....#...',
                '..##.##.###.....#.##..#.',
                '#...#...###..####....##.',
                '.#.##...#.##.#.#.###...#',
                '#.###.#..####...##..#...',
                '#.###...#.##...#.######.',
                '.###.###.#######..#####.',
                '..##.#..#..#.#######.###',
                '#.#..##.########..#..##.',
                '#.#####..#.#...##..#....',
                '#....##..#.#########..##',
                '#...#.....#..##...###.##',
                '#..###....##.#...##.##.#'
            ]
        const monster: string[] =
            [
                '                  # ',
                '#    ##    ##    ###',
                ' #  #  #  #  #  #   '
            ]
        const mapTile: Tile = new Tile(1, map);
        const result = countMonsters(mapTile.getImage(), monster)
        expect(result).equal(2);
    });
});


