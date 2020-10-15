import React, { FunctionComponent } from 'react';
import { Group, Rect, Shape } from 'react-konva';
import { Point, rotate, translate } from './geometry';
import { GridLoc, gridSize, gridToCenter, gridToTopLeft } from './grid';

const doorWidth = gridSize / 2.5;
const doorHeight = gridSize / 8;

export enum Direction {
  NORTH = 90,
  SOUTH = 270,
  EAST = 0,
  WEST = 180,
}

interface DoorProps {
  roomLoc: GridLoc;
  doorDirection: Direction;
}

const Door: FunctionComponent<DoorProps> = ({ roomLoc, doorDirection }) => {
  const roomCenter = gridToCenter(roomLoc);

  const baseTopLeft = translate(
    roomCenter,
    gridSize / 2 - doorHeight,
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
  loc: GridLoc;
  doorDirections: Direction[];
}

const Room: FunctionComponent<RoomProps> = ({ loc, doorDirections }) => {
  const doors = doorDirections.map((direction) => {
    return <Door key={direction} roomLoc={loc} doorDirection={direction} />;
  });

  const { x, y } = gridToTopLeft(loc);
  return (
    <Group>
      <Rect x={x} y={y} width={gridSize} height={gridSize} fill="black" />
      {doors}
      <Rect x={x} y={y} width={gridSize} height={gridSize} stroke="black" />
    </Group>
  );
};

export default Room;
