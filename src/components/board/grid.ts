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
  const targetTopLeft = translate(
    originalTargetTopLeft,
    e.target.x(),
    e.target.y()
  );
  const center = translate(targetTopLeft, targetWidth / 2, targetHeight / 2);
  return windowToGridLoc(center, gridSize, boardTopLeft);
};
