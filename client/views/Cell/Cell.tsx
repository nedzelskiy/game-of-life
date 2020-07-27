import * as React from 'react';
import { CellType } from './interfaces';
import './styles.scss';

export interface Props {
  type?: CellType;
}

const Cell: React.FC<Props> = (props: Props) =>
  <div
    className={`cell ${props.type}`}
  />;


Cell.defaultProps = {
  type: CellType.LIVE,
};

export default Cell;
