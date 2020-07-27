import * as React from 'react';
import { render } from 'react-dom';
import Cells from './views/Cells/Cells';
import { CellType } from './views/Cell/interfaces';
import GameOfLife from './logic/GameOfLife/GameOfLife';
import './common.styles.scss';

function renderField(gameFiled: CellType[][]) {
  render(
    <Cells gameFiled={gameFiled} />,
    document.getElementById('root'),
  );
}
const gameOfLife = new GameOfLife();
gameOfLife.runGame((gameFiled: CellType[][]) => {
  renderField(gameFiled);
});
