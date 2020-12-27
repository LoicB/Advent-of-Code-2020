import {prepareInput} from "../index";
import {expect} from "chai";
import {input} from "./index.spec";
import Tile from "../Tile";

describe('Test tile are adjacent', () => {
    let tiles: Tile[];
    before(()=> {
        tiles = prepareInput(input);
    })
    it('should return true', () => {
        const result = tiles[0].isAdjacentWith(tiles[1]);
        expect(result).equal(true);
    });
    it('should return true', () => {
        const result = tiles[1].isAdjacentWith(tiles[0]);
        expect(result).equal(true);
    });
    it('should return false', () => {
        const result = tiles[0].isAdjacentWith(tiles[2]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[2].isAdjacentWith(tiles[0]);
        expect(result).equal(false);
    });
    it('should return true', () => {
        const result = tiles[0].isAdjacentWith(tiles[3]);
        expect(result).equal(true);
    });
    it('should return true', () => {
        const result = tiles[3].isAdjacentWith(tiles[0]);
        expect(result).equal(true);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[2]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[2].isAdjacentWith(tiles[1]);
        expect(result).equal(false);
    });
});


describe('Test adjacent - 1951 only adjacent with 2311 and 2729', () => {
    let tiles: Tile[];
    before(() => {
        tiles = prepareInput(input);
    });

    it('should return true', () => {
        const result = tiles[1].isAdjacentWith(tiles[0]);
        expect(result).equal(true);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[2]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[3]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[4]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[5]);
        expect(result).equal(false);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[6]);
        expect(result).equal(false);
    });
    it('should return true', () => {
        const result = tiles[1].isAdjacentWith(tiles[7]);
        expect(result).equal(true);
    });
    it('should return false', () => {
        const result = tiles[1].isAdjacentWith(tiles[8]);
        expect(result).equal(false);
    });
});


describe('Test adjacent - 1171 only adjacent with 2473 and 1489', () => {
    let tiles: Tile[];
    before(() => {
        tiles = prepareInput(input);
    });

    it('should return false 2311', () => {
        const result = tiles[2].isAdjacentWith(tiles[0]);
        expect(result).equal(false);
    });
    it('should return false 1951', () => {
        const result = tiles[2].isAdjacentWith(tiles[1]);
        expect(result).equal(false);
    });
    it('should return false 1427', () => {
        const result = tiles[2].isAdjacentWith(tiles[3]);
        expect(result).equal(false);
    });
    it('should return true 1489', () => {
        const result = tiles[2].isAdjacentWith(tiles[4]);
        expect(result).equal(true);
    });
    it('should return true 2473', () => {
        const result = tiles[2].isAdjacentWith(tiles[5]);
        expect(result).equal(true);
    });
    it('should return false 2971', () => {
        const result = tiles[2].isAdjacentWith(tiles[6]);
        expect(result).equal(false);
    });
    it('should return false 2729', () => {
        const result = tiles[2].isAdjacentWith(tiles[7]);
        expect(result).equal(false);
    });
    it('should return false 3079', () => {
        const result = tiles[2].isAdjacentWith(tiles[8]);
        expect(result).equal(false);
    });
});