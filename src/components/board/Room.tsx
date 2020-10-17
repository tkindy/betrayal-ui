import React, { FunctionComponent } from 'react';
import { Group, Rect, Shape, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Point, rotate, translate } from './geometry';
import { GridLoc, useGridSize, useGridCenter, useGridTopLeft } from './grid';
import Players, { PlayerModel } from './Players';

const useDoorWidth = () => {
  return useGridSize() / 2.5;
};
const useDoorHeight = () => {
  return useGridSize() / 8;
};

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
  const gridSize = useGridSize();
  const doorWidth = useDoorWidth();
  const doorHeight = useDoorHeight();
  const roomCenter = useGridCenter(roomLoc);

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

export interface RoomProps {
  name: string;
  loc: GridLoc;
  doorDirections: Direction[];
  players: PlayerModel[];
}

const Room: FunctionComponent<RoomProps> = ({
  name,
  loc,
  doorDirections,
  players,
}) => {
  const doors = doorDirections.map((direction) => {
    return <Door key={direction} roomLoc={loc} doorDirection={direction} />;
  });

  useSelector((state: RootState) => state.zoom.gridSize);

  const { x, y } = useGridTopLeft(loc);
  const gridSize = useGridSize();

  return (
    <Group>
      <Rect x={x} y={y} width={gridSize} height={gridSize} fill="black" />
      {doors}
      <Rect x={x} y={y} width={gridSize} height={gridSize} stroke="teal" />
      <Text
        x={x}
        y={y}
        width={gridSize}
        height={gridSize / 2}
        text={name}
        fontSize={16}
        fill="red"
        align="center"
        verticalAlign="middle"
      />
      <Players players={players} roomLoc={loc} />
    </Group>
  );
};

export default Room;
