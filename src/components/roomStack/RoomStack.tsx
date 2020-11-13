import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { translate } from '../geometry';
import { BoundingBox, Dimensions } from '../layout';
import { useWindowDimensions } from '../windowDimensions';
import StackRoom from './StackRoom';

const yUnits = {
  spacing: 1,
  room: 8,
  button: 2,
};

const totalYUnits =
  yUnits.spacing +
  yUnits.room +
  yUnits.spacing +
  yUnits.button +
  yUnits.spacing;

const totalXUnits = yUnits.spacing + yUnits.room + yUnits.spacing;

const calcUnitsLength = (areaHeight: number, units: number) =>
  areaHeight * (units / totalYUnits);

const getRoomBox: (areaBox: BoundingBox) => BoundingBox = (areaBox) => {
  const {
    topLeft: areaTopLeft,
    dimensions: { height: areaHeight },
  } = areaBox;

  const roomSize = calcUnitsLength(areaHeight, yUnits.room);
  const spacing = calcUnitsLength(areaHeight, yUnits.spacing);

  return {
    topLeft: translate(areaTopLeft, spacing, spacing),
    dimensions: {
      width: roomSize,
      height: roomSize,
    },
  };
};

const getAreaBox: (windowDimensions: Dimensions) => BoundingBox = (
  windowDimensions
) => {
  const { width: windowWidth, height: windowHeight } = windowDimensions;

  const height = Math.max(windowHeight / 3, 250);
  const width = calcUnitsLength(height, totalXUnits);

  return {
    topLeft: {
      x: windowWidth - width,
      y: windowHeight - height,
    },
    dimensions: {
      width,
      height,
    },
  };
};

const RoomStack: FunctionComponent<{}> = () => {
  const windowDimensions = useWindowDimensions();
  const areaBox = getAreaBox(windowDimensions);
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
        stroke="black"
        cornerRadius={10}
      />
      <StackRoom box={getRoomBox(areaBox)} />
    </Group>
  );
};

export default RoomStack;
