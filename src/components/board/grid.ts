import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Point } from './geometry';

// (0, 0) is top-left square on first render
export interface GridLoc {
  gridX: number;
  gridY: number;
}

export const useGridSize = () => {
  console.log('using grid size');
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
