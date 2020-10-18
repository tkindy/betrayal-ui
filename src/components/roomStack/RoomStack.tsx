import React, { FunctionComponent } from 'react';
import { Group, Line, Rect } from 'react-konva';
import {
  Floor,
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

const pointsToArray: (points: Point[]) => number[] = (points) => {
  return points.map(({ x, y }) => [x, y]).flat();
};

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

  return pointsToArray([peak, upperRight, lowerRight, lowerLeft, upperLeft]);
};

interface StackRoomProps {
  nextRoom?: StackRoomModel;
}

const drawFloor = (
  floor: Floor,
  possibleFloors: Floor[],
  topLeft: Point,
  width: number,
  height: number
) => {
  const windowWidth = width * 0.9;
  const windowHeight = height * 0.8;
  const windowXInset = (width - windowWidth) / 2;
  const windowYInset = (height - windowHeight) / 2;
  const fill = possibleFloors.includes(floor) ? 'gold' : 'gray';

  if ([Floor.UPPER, Floor.GROUND, Floor.BASEMENT].includes(floor)) {
    const { x, y } = translate(topLeft, windowXInset, windowYInset);

    return (
      <Rect
        key={floor}
        x={x}
        y={y}
        width={windowWidth}
        height={windowHeight}
        fill={fill}
      />
    );
  }

  const top = translate(topLeft, width / 2, windowYInset);
  const left = translate(topLeft, windowXInset, windowHeight + windowYInset);
  const right = translate(left, windowWidth, 0);
  return (
    <Line
      key={floor}
      points={pointsToArray([top, right, left])}
      closed={true}
      fill={fill}
    />
  );
};

interface StackRoomDimensions {
  houseTopLeft: Point;
  houseDimensions: Dimensions;
}

export const useStackRoomDimensions: () => StackRoomDimensions = () => {
  const {
    topLeft: stackTopLeft,
    dimensions: { width, height },
  } = useStackDimensions();

  const houseWidth = width * houseXProp;
  const houseHeight = height * houseYProp;
  const houseSidesInset = (width - houseWidth) / 2;
  const houseTopLeft = translate(stackTopLeft, houseSidesInset, houseTopInset);

  return {
    houseTopLeft,
    houseDimensions: {
      width: houseWidth,
      height: houseHeight,
    },
  };
};

const StackRoom: FunctionComponent<StackRoomProps> = ({ nextRoom }) => {
  const {
    houseTopLeft,
    houseDimensions: { width: houseWidth, height: houseHeight },
  } = useStackRoomDimensions();
  const floorHeight = houseHeight / 4;
  const outlineStyle = nextRoom ? { fill: 'black' } : { dash: [20, 10] };

  return (
    <Group>
      <Line
        points={getHousePoints(houseTopLeft, houseWidth, floorHeight)}
        stroke="black"
        closed={true}
        {...outlineStyle}
      />
      {nextRoom &&
        [
          Floor.ROOF,
          Floor.UPPER,
          Floor.GROUND,
          Floor.BASEMENT,
        ].map((floor, i) =>
          drawFloor(
            floor,
            nextRoom.possibleFloors,
            translate(houseTopLeft, 0, i * floorHeight),
            houseWidth,
            floorHeight
          )
        )}
    </Group>
  );
};

interface StackDimensions {
  topLeft: Point;
  dimensions: Dimensions;
}

export const useStackDimensions: () => StackDimensions = () => {
  const windowDimensions = useWindowDimensions();
  const width = Math.min(maxWidth, windowDimensions.width / 3);
  const height = width * aspectRatio;
  const topLeft = {
    x: windowDimensions.width - width,
    y: windowDimensions.height - height,
  };

  return { topLeft, dimensions: { width, height } };
};

const RoomStack: FunctionComponent<RoomStackState> = ({ nextRoom }) => {
  const {
    topLeft,
    dimensions: { width, height },
  } = useStackDimensions();

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
      <StackRoom nextRoom={nextRoom} />
    </Group>
  );
};

export default RoomStack;
