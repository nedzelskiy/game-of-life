import { describe, it } from 'mocha';
import GameOfLife from './GameOfLife';
import { notDeepStrictEqual, strictEqual, deepStrictEqual } from "assert";
import { CellType } from '../../views/Cell/interfaces';

const GameOfLifeCloned = Object.create(GameOfLife);

describe('tests for GameOfLife', () => {
  const testCaseCells = [
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.LIVE, CellType.LIVE, CellType.LIVE, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD]
  ];
  const testCaseCellsNextTick = [
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD]
  ];
  const testCaseCells2 = [
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.LIVE, CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.LIVE, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD]
  ];
  const testCaseCells2NextTick = [
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.LIVE, CellType.DEAD, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.LIVE, CellType.LIVE, CellType.DEAD],
    [CellType.DEAD, CellType.LIVE, CellType.LIVE, CellType.DEAD, CellType.DEAD],
    [CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD, CellType.DEAD]
  ];
  it('should create random field', () => {
    const firstField = GameOfLifeCloned.createField(5);
    const secondField = GameOfLifeCloned.createField(5);
    notDeepStrictEqual(firstField, secondField);
  });
  it('should create field of needed size', () => {
    const size = 3;
    const field = GameOfLifeCloned.createField(size);
    strictEqual(size, field.length);
  });
  it('cells of field should by in CellType', () => {
    const res = GameOfLifeCloned.createField(4).filter((row: CellType[]) => {
      return row.filter(cell => cell !== CellType.DEAD && cell !== CellType.LIVE).length > 0;
    });
    strictEqual(0, res.length);
  });
  it('should normalize index if it < 0 or > field size', () => {
    strictEqual(GameOfLifeCloned.normalizeIndex(0, 3), 0);
    strictEqual(GameOfLifeCloned.normalizeIndex(-1, 3), 2);
    strictEqual(GameOfLifeCloned.normalizeIndex(-2, 3), 1);
    strictEqual(GameOfLifeCloned.normalizeIndex(3, 3), 0);
    strictEqual(GameOfLifeCloned.normalizeIndex(4, 3), 1);
    strictEqual(GameOfLifeCloned.normalizeIndex(5, 3), 2);
  });
  it('should count live neighbours', () => {
    strictEqual(GameOfLifeCloned.countLiveNeighbours(1, 0, testCaseCells), 1);
    strictEqual(GameOfLifeCloned.countLiveNeighbours(1, 2, testCaseCells), 3);
    strictEqual(GameOfLifeCloned.countLiveNeighbours(1, 4, testCaseCells2), 1);
    strictEqual(GameOfLifeCloned.countLiveNeighbours(3, 1, testCaseCells2), 3);
    strictEqual(GameOfLifeCloned.countLiveNeighbours(0, 0, testCaseCells2), 0);
  });
  it('should give correct next state after tick', () => {
    deepStrictEqual(GameOfLifeCloned.nextTick(testCaseCells), testCaseCellsNextTick);
    deepStrictEqual(GameOfLifeCloned.nextTick(testCaseCells2), testCaseCells2NextTick);
  });
});
