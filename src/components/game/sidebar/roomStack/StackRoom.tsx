import React, { FunctionComponent } from 'react';
import { BoundingBox } from '../../../layout';
import {
  Floor,
  StackRoom as StackRoomModel,
} from '../../../../features/models';
import {
  add,
  multiply,
  Point,
  pointsToArray,
  subtract,
  translate,
} from '../../../geometry';
import { Group, Line, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import FlippedStackRoom from './FlippedStackRoom';

interface RoofPoints {
  peak: Point;
  left: Point;
  right: Point;
}

const getRoofPoints: (
  topLeft: Point,
  width: number,
  floorHeight: number
) => RoofPoints = (topLeft, width, floorHeight) => {
  const peak = translate(topLeft, width / 2, 0);
  const left = translate(topLeft, 0, floorHeight);
  const right = translate(left, width, 0);

  return { peak, left, right };
};

const getHousePoints: (
  topLeft: Point,
  width: number,
  floorHeight: number
) => number[] = (topLeft, width, floorHeight) => {
  const { peak, left: upperLeft, right: upperRight } = getRoofPoints(
    topLeft,
    width,
    floorHeight
  );
  const lowerLeft = translate(upperLeft, 0, 3 * floorHeight);
  const lowerRight = translate(lowerLeft, width, 0);

  return pointsToArray([peak, upperRight, lowerRight, lowerLeft, upperLeft]);
};

const getHouseBoundingBox: (roomBox: BoundingBox) => BoundingBox = (
  roomBox
) => {
  const {
    topLeft: roomTopLeft,
    dimensions: { width: roomWidth, height: roomHeight },
  } = roomBox;

  const houseWidth = roomWidth * 0.8;
  const houseHeight = roomHeight * 0.8;

  return {
    topLeft: translate(
      roomTopLeft,
      (roomWidth - houseWidth) / 2,
      (roomHeight - houseHeight) / 2
    ),
    dimensions: {
      width: houseWidth,
      height: houseHeight,
    },
  };
};

const calcRoofIncenter: (box: BoundingBox) => Point = ({
  topLeft,
  dimensions: { width, height },
}) => {
  const { peak, left, right } = getRoofPoints(topLeft, width, height);
  const sideLength = Math.sqrt((width * width) / 4 + height * height);

  return multiply(
    add(
      multiply(peak, width),
      multiply(left, sideLength),
      multiply(right, sideLength)
    ),
    1 / (2 * sideLength + width)
  );
};

const drawFloor = (
  floor: Floor,
  possibleFloors: Floor[],
  topLeft: Point,
  width: number,
  height: number
) => {
  const fill = possibleFloors.includes(floor) ? 'gold' : 'gray';
  const widthProp = 0.9;
  const windowWidth = width * widthProp;
  const windowHeight = height * 0.8;

  if ([Floor.UPPER, Floor.GROUND, Floor.BASEMENT].includes(floor)) {
    const windowXInset = (width - windowWidth) / 2;
    const windowYInset = (height - windowHeight) / 2;

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

  const { peak, left, right } = getRoofPoints(topLeft, width, height);
  const incenter = translate(
    calcRoofIncenter({ topLeft, dimensions: { width, height } }),
    0,
    height * 1
  );

  const adjust = (p: Point) =>
    add(multiply(subtract(incenter, p), 1 - widthProp), p);

  return (
    <Line
      key={floor}
      points={pointsToArray([peak, right, left].map(adjust))}
      closed={true}
      fill={fill}
    />
  );
};

interface HouseProps {
  roomBox: BoundingBox;
  nextRoom: StackRoomModel;
}

const House: FunctionComponent<HouseProps> = ({ roomBox, nextRoom }) => {
  const {
    topLeft,
    dimensions: { width, height },
  } = getHouseBoundingBox(roomBox);
  const floorHeight = height / 4;

  return (
    <Group>
      {[Floor.ROOF, Floor.UPPER, Floor.GROUND, Floor.BASEMENT].map((floor, i) =>
        drawFloor(
          floor,
          nextRoom.possibleFloors,
          translate(topLeft, 0, i * floorHeight),
          width,
          floorHeight
        )
      )}

      <Line
        points={getHousePoints(topLeft, width, floorHeight)}
        closed={true}
        stroke="gray"
        strokeWidth={3}
      />
    </Group>
  );
};

interface StackRoomProps {
  box: BoundingBox;
}

const StackRoom: FunctionComponent<StackRoomProps> = ({ box }) => {
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = box;

  const { nextRoom, flippedRoom } = useSelector(
    (state: RootState) => state.roomStack
  );

  if (flippedRoom) {
    return <FlippedStackRoom box={box} flippedRoom={flippedRoom} />;
  }

  return nextRoom ? (
    <Group>
      <Rect x={x} y={y} width={width} height={height} fill="black" />
      <House roomBox={box} nextRoom={nextRoom} />
    </Group>
  ) : (
    <Text
      x={x}
      y={y}
      width={width}
      height={height}
      align="center"
      verticalAlign="middle"
      fontSize={16}
      text="Empty"
    />
  );
};

export default StackRoom;
