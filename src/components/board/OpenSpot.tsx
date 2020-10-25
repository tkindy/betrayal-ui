import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import { GridLoc, useGridSize, useGridTopLeft } from './grid';

interface OpenSpotProps {
  loc: GridLoc;
}

const OpenSpot: FunctionComponent<OpenSpotProps> = ({ loc }) => {
  const gridSize = useGridSize();
  const { x, y } = useGridTopLeft(loc);

  return <Rect x={x} y={y} width={gridSize} height={gridSize} />;
};

export default OpenSpot;
