import { KonvaEventObject } from 'konva/types/Node';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Point, translate } from '../geometry';
import { BoundingBox } from '../layout';

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

export const centerDroppedOnGrid: (
  e: KonvaEventObject<DragEvent>,
  originalCenter: Point,
  gridSize: number,
  boardTopLeft: Point
) => GridLoc = (e, originalCenter, gridSize, boardTopLeft) => {
  const center = translate(originalCenter, e.target.x(), e.target.y());
  return windowToGridLoc(center, gridSize, boardTopLeft);
};

export const droppedOnGrid: (
  e: KonvaEventObject<DragEvent>,
  originalTargetBox: BoundingBox,
  gridSize: number,
  boardTopLeft: Point
) => GridLoc = (
  e,
  {
    topLeft: originalTargetTopLeft,
    dimensions: { width: targetWidth, height: targetHeight },
  },
  gridSize,
  boardTopLeft
) => {
  const originalCenter = translate(
    originalTargetTopLeft,
    targetWidth / 2,
    targetHeight / 2
  );
  return centerDroppedOnGrid(e, originalCenter, gridSize, boardTopLeft);
};
