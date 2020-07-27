import * as React from 'react';
import CellsRow from '../CellsRow/CellsRow';
import { CellType } from '../Cell/interfaces';

export interface Props {
  gameFiled: CellType[][];
}

const Cells: React.FC<Props> = (props: Props) => {
  return (
    <div className="cells">
      {props.gameFiled.map((cellsRow, index) =>
        <CellsRow
          key={index}
          cells={cellsRow}
        />
      )}
    </div>
  )
};

export default Cells;
