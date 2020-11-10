import React, { FunctionComponent } from 'react';
import { Group, Rect, RegularPolygon } from 'react-konva';
import { useWindowDimensions } from '../windowDimensions';
import { getAreaBoundingBox } from './shared';
import StackRoom from './StackRoom';

const RoomStack: FunctionComponent<{}> = () => {
  const windowDimensions = useWindowDimensions();
  const areaBox = getAreaBoundingBox(windowDimensions);
  const {
    topLeft,
    dimensions: { width, height },
  } = areaBox;

  return (
    <Group>
      <Rect
        x={topLeft.x + 10}
        y={10}
        width={width - 20}
        height={windowDimensions.height - 20}
        fill="grey"
        stroke="black"
        cornerRadius={10}
      />
      <StackRoom areaBox={areaBox} />
      <RegularPolygon
        x={topLeft.x + width / 2}
        y={200}
        sides={5}
        radius={100}
        fill="black"
      />
    </Group>
  );
};

export default RoomStack;
