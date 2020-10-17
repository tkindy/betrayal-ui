import React, { FunctionComponent } from 'react';
import { Rect } from 'react-konva';
import { useWindowDimensions } from '../windowDimensions';

const maxWidth = 200;
const maxHeight = maxWidth;

interface RoomStackProps {}

const RoomStack: FunctionComponent<RoomStackProps> = () => {
  const windowDimensions = useWindowDimensions();
  const width = Math.min(maxWidth, windowDimensions.width / 3);
  const height = Math.min(maxHeight, width);

  return (
    <Rect
      x={windowDimensions.width - width}
      y={windowDimensions.height - height}
      width={width + 20}
      height={height + 20}
      fill="grey"
      cornerRadius={10}
    />
  );
};

export default RoomStack;
