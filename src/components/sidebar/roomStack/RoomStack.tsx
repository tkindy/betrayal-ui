import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import RoomStackControl from '../../controls/RoomStackControl';
import { translate } from '../../geometry';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import FlexContainer, { FlexDirection } from '../flex/FlexContainer';
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

interface RoomStackProps {
  box: BoundingBox;
}

const RoomStack: FunctionComponent<RoomStackProps> = ({ box }) => {
  const {
    topLeft,
    dimensions: { width, height },
  } = box;

  const controlBox: BoundingBox = {
    topLeft: translate(
      topLeft,
      calcUnitsLength(height, yUnits.spacing),
      calcUnitsLength(height, yUnits.spacing + yUnits.room + yUnits.spacing)
    ),
    dimensions: {
      width: calcUnitsLength(height, yUnits.room),
      height:
        height -
        calcUnitsLength(
          height,
          yUnits.spacing + yUnits.room + yUnits.spacing + yUnits.spacing
        ),
    },
  };

  return (
    <FlexContainer box={box} direction={FlexDirection.COLUMN}>
      {[
        {
          units: 8,
          render: ({
            topLeft: flexTopLeft,
            dimensions: { width: flexWidth, height: flexHeight },
          }) => {
            const roomSize = Math.min(flexWidth, flexHeight);
            const stackBox: BoundingBox = {
              topLeft: translate(
                flexTopLeft,
                flexWidth / 2 - roomSize / 2,
                flexHeight / 2 - roomSize / 2
              ),
              dimensions: { width: roomSize, height: roomSize },
            };
            return <StackRoom box={stackBox} />;
          },
        },
        { units: 1, render: () => null },
        { units: 2, render: (box) => <RoomStackControl box={box} /> },
      ]}
    </FlexContainer>
  );
};

export default RoomStack;
