import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Point } from '../geometry';

// (0, 0) is top-left square on first render
export interface GridLoc {
  gridX: number;
  gridY: number;
}

export const equal: (l1: GridLoc, l2: GridLoc) => boolean = (l1, l2) => {
  return l1.gridX === l2.gridX && l1.gridY === l2.gridY;
};

export const toString: (loc: GridLoc) => string = ({ gridX, gridY }) => {
  return `(${gridX}, ${gridY})`;
};

export const useGridSize = () => {
  return useSelector((state: RootState) => state.zoom.gridSize);
};

export const useGridTopLeft: (loc: GridLoc) => Point = ({ gridX, gridY }) => {
  const gridSize = useGridSize();
  return { x: gridX * gridSize, y: gridY * gridSize };
};

export const useGridCenter: (loc: GridLoc) => Point = ({ gridX, gridY }) => {
  const gridSize = useGridSize();
  return { x: (gridX + 0.5) * gridSize, y: (gridY + 0.5) * gridSize };
};

export const windowToGridLoc: (
  windowPoint: Point,
  gridSize: number,
  boardTopLeft: Point
) => GridLoc = ({ x, y }, gridSize, { x: boardX, y: boardY }) => {
  return {
    gridX: Math.floor((x + boardX) / gridSize),
    gridY: Math.floor((y + boardY) / gridSize),
  };
};
