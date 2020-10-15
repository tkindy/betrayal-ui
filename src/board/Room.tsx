import React, { FunctionComponent } from 'react';
import { Group, Rect, Shape } from 'react-konva';
import { Point, rotate, translate, translateByPoint } from './geometry';

const roomSize = 100;
const doorWidth = roomSize / 2.5;
const doorHeight = roomSize / 8;

export enum Direction {
  NORTH = 90,
  SOUTH = 270,
  EAST = 0,
  WEST = 180,
}

interface DoorProps {
  roomLoc: Point;
  doorDirection: Direction;
}

const Door: FunctionComponent<DoorProps> = ({ roomLoc, doorDirection }) => {
  const baseTopLeft = {
    x: roomSize / 2 - doorHeight,
    y: -doorWidth / 2,
  };
  const baseTopRight = translate(baseTopLeft, doorHeight, 0);
  const baseBottomLeft = translate(baseTopLeft, 0, doorWidth);
  const baseBottomRight = translate(baseTopRight, 0, doorWidth);

  const roomCenter = translate(roomLoc, roomSize / 2, roomSize / 2);

  const corners: Point[] = [
    baseTopLeft,
    baseTopRight,
    baseBottomRight,
    baseBottomLeft,
  ]
    .map((corner) => translateByPoint(corner, roomCenter))
    .map((corner) => {
      return rotate(corner, roomCenter, doorDirection);
    });

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        corners.forEach(({ x, y }, i) => {
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });

        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill="gold"
    />
  );
};

interface RoomProps {
  loc: Point;
  doorDirections: Direction[];
}

const Room: FunctionComponent<RoomProps> = ({ loc, doorDirections }) => {
  const doors = doorDirections.map((direction) => {
    return <Door key={direction} roomLoc={loc} doorDirection={direction} />;
  });

  const { x, y } = loc;
  return (
    <Group>
      <Rect x={x} y={y} width={roomSize} height={roomSize} fill="black" />
      {doors}
      <Rect x={x} y={y} width={roomSize} height={roomSize} stroke="black" />
    </Group>
  );
};

export default Room;
