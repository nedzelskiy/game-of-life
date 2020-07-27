import * as React from 'react';
import Cell from '../Cell/Cell';
import { CellType } from '../Cell/interfaces';
import './styles.scss';

interface Props {
  cells: CellType[];
}

const CellsRow: React.FC<Props> = (props: Props) => (
  <div className="cells-row">
    {props.cells.map((cellType, index) => <Cell type={cellType} key={index} />)}
  </div>
);

export default CellsRow;
