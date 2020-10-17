import React, { FunctionComponent } from 'react';
import { Group, Line, Rect } from 'react-konva';
import {
  RoomStackState,
  StackRoom as StackRoomModel,
} from '../../features/roomStack';
import { Dimensions, Point, translate } from '../geometry';
import { useWindowDimensions } from '../windowDimensions';

const aspectRatio = 1.25;
const maxWidth = 200;
const houseXProp = 0.5;
const houseYProp = 0.4;
const houseTopInset = 20;

const getHousePoints: (
  topLeft: Point,
  width: number,
  floorHeight: number
) => number[] = (topLeft, width, floorHeight) => {
  const peak = translate(topLeft, width / 2, 0);
  const upperLeft = translate(topLeft, 0, floorHeight);
  const lowerLeft = translate(upperLeft, 0, 3 * floorHeight);
  const upperRight = translate(upperLeft, width, 0);
  const lowerRight = translate(lowerLeft, width, 0);

  return [peak, upperRight, lowerRight, lowerLeft, upperLeft]
    .map(({ x, y }) => [x, y])
    .flat();
};

interface StackRoomProps {
  stackTopLeft: Point;
  stackDimensions: Dimensions;
  nextRoom?: StackRoomModel;
}

const StackRoom: FunctionComponent<StackRoomProps> = ({
  stackTopLeft,
  stackDimensions: { width, height },
  nextRoom,
}) => {
  const houseWidth = width * houseXProp;
  const houseHeight = height * houseYProp;
  const houseSidesInset = (width - houseWidth) / 2;
  const houseTopLeft = translate(stackTopLeft, houseSidesInset, houseTopInset);
  const outlineStyle = nextRoom ? {} : { dash: [20, 10] };
  const floorHeight = houseHeight / 4;

  return (
    <Line
      points={getHousePoints(houseTopLeft, houseWidth, floorHeight)}
      stroke="black"
      closed={true}
      {...outlineStyle}
    />
  );
};

const RoomStack: FunctionComponent<RoomStackState> = ({ nextRoom }) => {
  const windowDimensions = useWindowDimensions();
  const width = Math.min(maxWidth, windowDimensions.width / 3);
  const height = width * aspectRatio;
  const topLeft = {
    x: windowDimensions.width - width,
    y: windowDimensions.height - height,
  };

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
      <StackRoom
        stackTopLeft={topLeft}
        stackDimensions={{ width, height }}
        nextRoom={nextRoom}
      />
    </Group>
  );
};

export default RoomStack;
