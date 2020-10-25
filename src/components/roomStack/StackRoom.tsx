import React, { FunctionComponent } from 'react';
import { BoundingBox } from '../layout';
import { Floor, StackRoom as StackRoomModel } from '../../features/models';
import { Point, translate } from '../geometry';
import { Group, Line, Rect, Text } from 'react-konva';
import { getRoomBoundingBox } from './shared';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import FlippedStackRoom from './FlippedStackRoom';

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

const drawFloor = (
  floor: Floor,
  possibleFloors: Floor[],
  topLeft: Point,
  width: number,
  height: number
) => {
  const fill = possibleFloors.includes(floor) ? 'gold' : 'gray';

  if ([Floor.UPPER, Floor.GROUND, Floor.BASEMENT].includes(floor)) {
    const windowWidth = width * 0.9;
    const windowHeight = height * 0.8;
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

  const top = translate(topLeft, width / 2, 0);
  const left = translate(topLeft, 0, height);
  const right = translate(left, width, 0);
  return (
    <Line
      key={floor}
      points={pointsToArray([top, right, left])}
      closed={true}
      fill={fill}
      stroke="black"
      strokeWidth={5}
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
  areaBox: BoundingBox;
}

const StackRoom: FunctionComponent<StackRoomProps> = ({ areaBox }) => {
  const roomBox = getRoomBoundingBox(areaBox);
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = roomBox;

  const { nextRoom, flippedRoom } = useSelector(
    (state: RootState) => state.roomStack
  );

  if (flippedRoom) {
    const { name, doorDirections } = flippedRoom;
    return (
      <FlippedStackRoom
        areaBox={areaBox}
        name={name}
        doorDirections={doorDirections}
      />
    );
  }

  return nextRoom ? (
    <Group>
      <Rect x={x} y={y} width={width} height={height} fill="black" />
      <House roomBox={roomBox} nextRoom={nextRoom} />
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
