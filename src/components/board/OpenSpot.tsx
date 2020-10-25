import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import { useDispatch } from 'react-redux';
import { openSpotClicked } from '../../features/board';
import { Direction } from '../room/Room';
import { GridLoc, useGridSize, useGridTopLeft } from './grid';

interface OpenSpotProps {
  loc: GridLoc;
  from: Direction[];
}

const OpenSpot: FunctionComponent<OpenSpotProps> = ({ loc, from }) => {
  const gridSize = useGridSize();
  const { x, y } = useGridTopLeft(loc);

  const dispatch = useDispatch();
  const onClick = () => dispatch(openSpotClicked(loc, from));

  return (
    <Rect
      x={x}
      y={y}
      width={gridSize}
      height={gridSize}
      onClick={onClick}
      onTap={onClick}
    />
  );
};

export default OpenSpot;
