import { Point } from './geometry';

export const gridSize = 200;

// (0, 0) is top-left square on first render
export interface GridLoc {
  gridX: number;
  gridY: number;
}

export const gridToTopLeft: (loc: GridLoc) => Point = ({ gridX, gridY }) => {
  return { x: gridX * gridSize, y: gridY * gridSize };
};

export const gridToCenter: (loc: GridLoc) => Point = ({ gridX, gridY }) => {
  return { x: (gridX + 0.5) * gridSize, y: (gridY + 0.5) * gridSize };
};
