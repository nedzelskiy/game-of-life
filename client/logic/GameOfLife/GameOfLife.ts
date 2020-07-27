import { CellType } from '../../views/Cell/interfaces';

export default class GameOfLife {
  private static createField(fieldSize: number): CellType[][] {
    const gameFiled: CellType[][] = [];
    const cellsTypes = [CellType.LIVE, CellType.DEAD];
    for (let y = 0; y < fieldSize; y++) {
      gameFiled[y] = [];
      for (let x = 0; x < fieldSize; x++) {
        gameFiled[y][x] = cellsTypes[Math.floor(Math.random() * cellsTypes.length)];
      }
    }
    return gameFiled;
  }

  private static normalizeIndex(index: number, fieldSize: number): number {
    return index < 0
      ? fieldSize - Math.abs(index)
      : index >= fieldSize
        ? index - fieldSize
        : index;
  }

  private static countLiveNeighbours(y: number, x: number, gameFiled: CellType[][]): number {
    let countedNeighbours = 0;
    const neighboursCoordsShift = [-1, 0, 1];
    neighboursCoordsShift.forEach((shiftYNumber) => {
      const neighbourY = GameOfLife.normalizeIndex(y + shiftYNumber, gameFiled.length);
      neighboursCoordsShift.forEach((shiftXNumber) => {
        const neighbourX = GameOfLife.normalizeIndex(x + shiftXNumber, gameFiled.length);
        if (
          (neighbourY !== y || neighbourX !== x)
          && gameFiled[neighbourY][neighbourX] === CellType.LIVE
        ) {
          countedNeighbours++;
        }
      });
    });
    return countedNeighbours;
  };

  private static nextTick(gameField: CellType[][]): CellType[][] {
    const newGameField: CellType[][] = [];
    for (let y = 0; y < gameField.length; y++) {
      newGameField[y] = [];
      for (let x = 0; x < gameField.length; x++) {
        const countedLiveNeighbours = GameOfLife.countLiveNeighbours(y, x, gameField);

        switch (gameField[y][x]) {
          case CellType.LIVE: {
            if (countedLiveNeighbours > 1 && countedLiveNeighbours < 4) {
              newGameField[y][x] = CellType.LIVE;
            } else {
              newGameField[y][x] = CellType.DEAD;
            }
            break;
          }

          case CellType.DEAD: {
            if (countedLiveNeighbours === 3) {
              newGameField[y][x] = CellType.LIVE;
            } else {
              newGameField[y][x] = CellType.DEAD;
            }
            break;
          }
        }
      }
    }
    return newGameField;
  }

  runGame(callbackOnTickFinish: CallbackFunction, fieldSize: number = 50, tickInterval: number = 1000) {
    let gameField = GameOfLife.createField(fieldSize);
    setInterval(() => {
      gameField = GameOfLife.nextTick(gameField);
      callbackOnTickFinish(gameField);
    }, tickInterval);
  }
}

export type CallbackFunction = (gameFiled: CellType[][]) => void;

