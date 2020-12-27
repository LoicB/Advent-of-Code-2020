import {expect} from 'chai';
import {
    afterGivenDays, countBlackTilesFromFloor,
    Direction,
    moveFromCenter,
    moveMultipleTimes,
    moveToTile, nextDay,
    nextDirection,
    partOne,
    prepareInput, updateInput
} from '../index';

describe('Day 24 - Part One', () => {
    it('should return 10', () => {
        const input = 'sesenwnenenewseeswwswswwnenewsewsw\n' +
            'neeenesenwnwwswnenewnwwsewnenwseswesw\n' +
            'seswneswswsenwwnwse\n' +
            'nwnwneseeswswnenewneswwnewseswneseene\n' +
            'swweswneswnenwsewnwneneseenw\n' +
            'eesenwseswswnenwswnwnwsewwnwsene\n' +
            'sewnenenenesenwsewnenwwwse\n' +
            'wenwwweseeeweswwwnwwe\n' +
            'wsweesenenewnwwnwsenewsenwwsesesenwne\n' +
            'neeswseenwwswnwswswnw\n' +
            'nenwswwsewswnenenewsenwsenwnesesenew\n' +
            'enewnwewneswsewnwswenweswnenwsenwsw\n' +
            'sweneswneswneneenwnewenewwneswswnese\n' +
            'swwesenesewenwneswnwwneseswwne\n' +
            'enesenwswwswneneswsenwnewswseenwsese\n' +
            'wnwnesenesenenwwnenwsewesewsesesew\n' +
            'nenewswnwewswnenesenwnesewesw\n' +
            'eneswnwswnwsenenwnwnwwseeswneewsenese\n' +
            'neswnwewnwnwseenwseesewsenwsweewe\n' +
            'wseweeenwnesenwwwswnew';
        const result = partOne(prepareInput(input));
        expect(result).equal(10);
    });
});


describe('Day 24 - move from center', () => {
    it('should return -1, 1', () => {
        const input = 'neeswseenwwswnwswswnw';
        const result = moveFromCenter(input);
        expect(result.x).equal(-2);
        expect(result.y).equal(1);
        expect(result.z).equal(1);
    });
});


describe('Day 24 - move multiple times', () => {
    it('should return 1, 5', () => {
        const position =  {x: 2, y: 2, z: 2};
        const input = 'seswneswswsenwwnwse';
        const result = moveMultipleTimes(position, input);
        expect(result.x).equal(-1);
        expect(result.y).equal(5);
        expect(result.z).equal(2);
    });
});
describe('Day 24 - move to tile', () => {
    it('should return 3, 1', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.ne;
        const result = moveToTile(position, direction);
        expect(result.x).equal(3);
        expect(result.y).equal(1);
        expect(result.z).equal(2);
    });
    it('should return 3, 2', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.e;
        const result = moveToTile(position, direction);
        expect(result.x).equal(3);
        expect(result.y).equal(2);
        expect(result.z).equal(1);
    });
    it('should return 3, 3', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.se;
        const result = moveToTile(position, direction);
        expect(result.x).equal(2);
        expect(result.y).equal(3);
        expect(result.z).equal(1);
    });
    it('should return 2, 3', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.sw;
        const result = moveToTile(position, direction);
        expect(result.x).equal(1);
        expect(result.y).equal(3);
        expect(result.z).equal(2);
    });
    it('should return 1, 2', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.w;
        const result = moveToTile(position, direction);
        expect(result.x).equal(1);
        expect(result.y).equal(2);
        expect(result.z).equal(3);
    });
    it('should return 2, 1', () => {
        const position =  {x: 2, y: 2, z: 2};
        const direction = Direction.nw;
        const result = moveToTile(position, direction);
        expect(result.x).equal(2);
        expect(result.y).equal(1);
        expect(result.z).equal(3);
    });
});

describe('Day 24 - next direction', () => {
    it('should return se', () => {
        const index =  0;
        const input = 'seswneswswsenwwnwse';
        const result = nextDirection(input, index);
        expect(result.direction).equal(Direction.se);
        expect(result.newIndex).equal(2);
    });
    it('should return sw', () => {
        const index =  2;
        const input = 'seswneswswsenwwnwse';
        const result = nextDirection(input, index);
        expect(result.direction).equal(Direction.sw);
        expect(result.newIndex).equal(4);
    });
    it('should return ne', () => {
        const index =  4;
        const input = 'seswneswswsenwwnwse';
        const result = nextDirection(input, index);
        expect(result.direction).equal(Direction.ne);
        expect(result.newIndex).equal(6);
    });
    it('should return e', () => {
        const index =  0;
        const input = 'eesenwseswswnenwswnwnwsewwnwsene';
        const result = nextDirection(input, index);
        expect(result.direction).equal(Direction.e);
        expect(result.newIndex).equal(1);
    });
});

describe('Day 24 - after Given Days', () => {
    let blackTiles: boolean[][][];
    before(()=> {
        blackTiles = preparePartTwoInput();
    })
    it('should return 15', () => {
        const result = countBlackTilesFromFloor(afterGivenDays(1, blackTiles));
        expect(result).equal(15);
    });
    it('should return 12', () => {
        const result = countBlackTilesFromFloor(afterGivenDays(2, blackTiles));
        expect(result).equal(12);
    });
    it('should return 37', () => {
        const result = countBlackTilesFromFloor(afterGivenDays(10, blackTiles));
        expect(result).equal(37);
    });
});


describe('Day 24 - next Days', () => {
    let blackTiles: boolean[][][];
    before(()=> {
        blackTiles = preparePartTwoInput();
    })

    it('should return 10', () => {
        const result = countBlackTilesFromFloor( blackTiles);
        expect(result).equal(10);
    });
    it('should return 15', () => {
        const result = countBlackTilesFromFloor(nextDay( blackTiles));
        expect(result).equal(15);
    });
    it('should return 12', () => {
        const result = countBlackTilesFromFloor(nextDay(nextDay(blackTiles)));
        expect(result).equal(12);
    });
});

const preparePartTwoInput = (): boolean[][][]  => {
    const input = 'sesenwnenenewseeswwswswwnenewsewsw\n' +
        'neeenesenwnwwswnenewnwwsewnenwseswesw\n' +
        'seswneswswsenwwnwse\n' +
        'nwnwneseeswswnenewneswwnewseswneseene\n' +
        'swweswneswnenwsewnwneneseenw\n' +
        'eesenwseswswnenwswnwnwsewwnwsene\n' +
        'sewnenenenesenwsewnenwwwse\n' +
        'wenwwweseeeweswwwnwwe\n' +
        'wsweesenenewnwwnwsenewsenwwsesesenwne\n' +
        'neeswseenwwswnwswswnw\n' +
        'nenwswwsewswnenenewsenwsenwnesesenew\n' +
        'enewnwewneswsewnwswenweswnenwsenwsw\n' +
        'sweneswneswneneenwnewenewwneswswnese\n' +
        'swwesenesewenwneswnwwneseswwne\n' +
        'enesenwswwswneneswsenwnewswseenwsese\n' +
        'wnwnesenesenenwwnenwsewesewsesesew\n' +
        'nenewswnwewswnenesenwnesewesw\n' +
        'eneswnwswnwsenenwnwnwwseeswneewsenese\n' +
        'neswnwewnwnwseenwseesewsenwsweewe\n' +
        'wseweeenwnesenwwwswnew';
    return updateInput(prepareInput(input));
}