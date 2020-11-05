import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import { useDispatch } from 'react-redux';
import { openSpotClicked } from '../../features/board';
import { Direction } from '../room/Room';
import { GridLoc, useGridBox } from './grid';

interface OpenSpotProps {
  loc: GridLoc;
  from: Direction[];
}

const OpenSpot: FunctionComponent<OpenSpotProps> = ({ loc, from }) => {
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = useGridBox(loc);

  const dispatch = useDispatch();
  const onClick = () => dispatch(openSpotClicked(loc, from));

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={onClick}
      onTap={onClick}
    />
  );
};

export default OpenSpot;
