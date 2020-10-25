import React, { FunctionComponent } from 'react';
import { Group, Rect, Shape } from 'react-konva';
import { Point, rotate, translate } from '../geometry';
import { BoundingBox } from '../layout';

export enum Direction {
  NORTH = 90,
  SOUTH = 270,
  EAST = 0,
  WEST = 180,
}

interface DoorProps {
  roomBox: BoundingBox;
  direction: Direction;
}

const Door: FunctionComponent<DoorProps> = ({
  roomBox: {
    topLeft: roomTopLeft,
    dimensions: { width: roomWidth, height: roomHeight },
  },
  direction,
}) => {
  const roomCenter = translate(roomTopLeft, roomWidth / 2, roomHeight / 2);
  const doorWidth = roomWidth / 2.5;
  const doorHeight = roomHeight / 8;

  const baseTopLeft = translate(
    roomCenter,
    roomWidth / 2 - doorHeight,
    -doorWidth / 2
  );
  const baseTopRight = translate(baseTopLeft, doorHeight, 0);
  const baseBottomLeft = translate(baseTopLeft, 0, doorWidth);
  const baseBottomRight = translate(baseTopRight, 0, doorWidth);

  const corners: Point[] = [
    baseTopLeft,
    baseTopRight,
    baseBottomRight,
    baseBottomLeft,
  ].map((corner) => {
    return rotate(corner, roomCenter, direction);
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
  box: BoundingBox;
  doorDirections: Direction[];
}

const Room: FunctionComponent<RoomProps> = ({ box, doorDirections }) => {
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = box;

  const doors = doorDirections.map((direction) => {
    return <Door key={direction} roomBox={box} direction={direction} />;
  });

  return (
    <Group>
      <Rect x={x} y={y} width={width} height={height} fill="black" />
      {doors}
      <Rect x={x} y={y} width={width} height={height} stroke="teal" />
    </Group>
  );
};

export default Room;
