import React, { FunctionComponent } from 'react';
import { Group, Rect, Shape } from 'react-konva';

const roomSize = 100;
const doorWidth = roomSize / 2.5;
const doorHeight = roomSize / 8;

interface Point {
  x: number;
  y: number;
}

export enum Direction {
  NORTH = 90,
  SOUTH = 270,
  EAST = 0,
  WEST = 180,
}

interface DoorProps {
  roomX: number;
  roomY: number;
  doorDirection: Direction;
}

const Door: FunctionComponent<DoorProps> = ({
  roomX,
  roomY,
  doorDirection,
}) => {
  const roomCenterX = roomX + roomSize / 2;
  const roomCenterY = roomY + roomSize / 2;

  const baseCorners = [
    {
      x: roomSize / 2 - doorHeight,
      y: doorWidth / 2,
    },
    { x: roomSize / 2, y: doorWidth / 2 },
    { x: roomSize / 2, y: -doorWidth / 2 },
    {
      x: roomSize / 2 - doorHeight,
      y: -doorWidth / 2,
    },
  ];

  const rotationRad = doorDirection * (Math.PI / 180);
  const sin = Math.sin(-rotationRad);
  const cos = Math.cos(rotationRad);

  const corners = baseCorners.map(({ x: baseX, y: baseY }) => {
    return {
      x: baseX * cos + baseY * sin + roomCenterX,
      y: baseX * sin - baseY * cos + roomCenterY,
    };
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
  x: number;
  y: number;
  doorDirections: Direction[];
}

const Room: FunctionComponent<RoomProps> = ({ x, y, doorDirections }) => {
  const doors = doorDirections.map((direction) => {
    return (
      <Door key={direction} roomX={x} roomY={y} doorDirection={direction} />
    );
  });

  return (
    <Group>
      <Rect x={x} y={y} width={roomSize} height={roomSize} fill="black" />
      {doors}
      <Rect x={x} y={y} width={roomSize} height={roomSize} stroke="black" />
    </Group>
  );
};

export default Room;
