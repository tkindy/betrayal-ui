import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';

interface HovercardProps {
  x: number;
  y: number;
}

const Hovercard: FunctionComponent<HovercardProps> = ({ x, y }) => {
  return <Rect x={x} y={y} width={100} height={30} fill="yellow" />;
};

export default Hovercard;
