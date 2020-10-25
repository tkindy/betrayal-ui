import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import { useDispatch } from 'react-redux';
import { openSpotClicked } from '../../features/board';
import { GridLoc, useGridSize, useGridTopLeft } from './grid';

interface OpenSpotProps {
  loc: GridLoc;
}

const OpenSpot: FunctionComponent<OpenSpotProps> = ({ loc }) => {
  const gridSize = useGridSize();
  const { x, y } = useGridTopLeft(loc);

  const dispatch = useDispatch();

  return (
    <Rect
      x={x}
      y={y}
      width={gridSize}
      height={gridSize}
      onClick={() => dispatch(openSpotClicked(loc))}
    />
  );
};

export default OpenSpot;
