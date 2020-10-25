import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { RoomStackState } from '../../features/roomStack';
import { useWindowDimensions } from '../windowDimensions';
import { getAreaBoundingBox } from './shared';
import StackRoom from './StackRoom';

const RoomStack: FunctionComponent<RoomStackState> = ({ nextRoom }) => {
  const areaBox = getAreaBoundingBox(useWindowDimensions());
  const {
    topLeft,
    dimensions: { width, height },
  } = areaBox;

  return (
    <Group>
      <Rect
        x={topLeft.x}
        y={topLeft.y}
        width={width + 20}
        height={height + 20}
        fill="grey"
        cornerRadius={10}
      />
      <StackRoom nextRoom={nextRoom} areaBox={areaBox} />
    </Group>
  );
};

export default RoomStack;
